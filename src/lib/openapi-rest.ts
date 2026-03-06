/**
 * Parses the Plural OpenAPI schema to extract all API operations and build
 * the data shape used by the REST API reference page.
 *
 * Fetches the spec at runtime with per-pod in-memory cache (TTL and stale-on-error).
 * Configure via OPENAPI_SPEC_URL and OPENAPI_CACHE_TTL_MS (default 24h).
 */

import SwaggerParser from '@apidevtools/swagger-parser'
import isEmpty from 'lodash/isEmpty'

const DEFAULT_OPENAPI_URL =
  'https://raw.githubusercontent.com/pluralsh/console/refs/heads/master/schema/openapi.json'

/** Default TTL 24h so we hit the upstream at most ~once per day per pod. */
const DEFAULT_CACHE_TTL_MS = 24 * 60 * 60 * 1000

function getOpenApiSpecUrl(): string {
  if (
    typeof process.env.OPENAPI_SPEC_URL === 'string' &&
    process.env.OPENAPI_SPEC_URL
  ) {
    return process.env.OPENAPI_SPEC_URL
  }

  return DEFAULT_OPENAPI_URL
}

function getCacheTtlMs(): number {
  const raw = process.env.OPENAPI_CACHE_TTL_MS

  if (raw == null || raw === '') return DEFAULT_CACHE_TTL_MS

  const n = parseInt(raw, 10)

  return Number.isNaN(n) || n < 0 ? DEFAULT_CACHE_TTL_MS : n
}

/** Per-pod cache state (server-only; never runs in browser). */
let cachedPayload: {
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
} | null = null
let cachedAt: number = 0
let inFlight: Promise<{
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
}> | null = null

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

export interface Endpoint {
  id: string
  name: string
  path: string
  method: HttpMethod
}

export interface ApiSection {
  title: string
  endpoints: Endpoint[]
}

export interface Parameter {
  name: string
  type: string
  required?: boolean
  description?: string | null
  kind?: 'query' | 'path' | 'body'
}

export interface ResponseSample {
  status: number
  body: string
}

export interface SchemaProperty {
  name: string
  type: string
  description?: string | null
  enum?: string[]
  format?: string
  required?: boolean
  properties?: SchemaProperty[]
  arrayItemType?: string
  arrayItemProperties?: SchemaProperty[]
}

export interface ResponseSchemaInfo {
  status: number
  description?: string
  contentType: string
  properties: SchemaProperty[]
}

export interface EndpointDetail {
  id: string
  operationName: string
  method: HttpMethod
  path: string
  description: string
  parameters: Parameter[]
  responses: ResponseSample[]
  responseSchemas: ResponseSchemaInfo[]
}

interface OpenAPIPathItem {
  get?: OpenAPIOperation
  post?: OpenAPIOperation
  put?: OpenAPIOperation
  patch?: OpenAPIOperation
  delete?: OpenAPIOperation
}

interface OpenAPIResponse {
  description?: string
  content?: { 'application/json'?: { schema?: OpenAPISchema } }
}

interface OpenAPIOperation {
  tags?: string[]
  operationId?: string
  summary?: string
  description?: string
  parameters?: OpenAPIParameter[]
  requestBody?: {
    content?: { 'application/json'?: { schema?: OpenAPISchema } }
  }
  responses?: Record<string, OpenAPIResponse>
}

interface OpenAPIParameter {
  name: string
  in: 'query' | 'path' | 'header'
  required?: boolean
  schema?: { type?: string; enum?: string[] }
  description?: string
}

interface OpenAPISchema {
  type?: string
  $ref?: string
  description?: string
  enum?: string[]
  format?: string
  properties?: Record<string, OpenAPIProp>
  items?: OpenAPISchema
  required?: string[]
}

interface OpenAPIProp {
  type?: string
  $ref?: string
  enum?: string[]
  format?: string
  items?: OpenAPISchema
  description?: string
  properties?: Record<string, OpenAPIProp>
  required?: string[]
}

interface OpenAPIDoc {
  paths: Record<string, OpenAPIPathItem>
  components?: { schemas?: Record<string, OpenAPISchema> }
}

type SchemaLike = OpenAPISchema | OpenAPIProp
const METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const

function capitalizeWord(w: string): string {
  if (!w) return w

  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
}

function operationIdToTitle(opId: string): string {
  const words = opId
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(/\s+/)

  return words
    .map((w, i) => (i === 0 ? capitalizeWord(w) : w.toLowerCase()))
    .join(' ')
}

function tagToSection(tag: string): string {
  return tag.split('-').map(capitalizeWord).join(' ')
}

function hasSchemaProperties(
  schema: SchemaLike | null | undefined
): schema is SchemaLike & { properties: Record<string, OpenAPIProp> } {
  return !isEmpty(schema?.properties)
}

function getSchemaType(schema: SchemaLike | null | undefined): string {
  if (!schema) return 'string'
  if (schema.type) return schema.type
  if (hasSchemaProperties(schema)) return 'object'

  return 'string'
}

/** Strips undefined values so the result is safe for Next.js serialization. */
function cleanSchemaProperty(p: SchemaProperty): SchemaProperty {
  const out: SchemaProperty = { name: p.name, type: p.type }
  const { properties, arrayItemProperties } = p

  if (p.description != null) out.description = p.description
  if (p.required) out.required = true
  if (!isEmpty(p.enum)) out.enum = p.enum
  if (p.format) out.format = p.format
  if (p.arrayItemType) out.arrayItemType = p.arrayItemType
  if (!isEmpty(properties)) {
    out.properties = (properties ?? []).map(cleanSchemaProperty)
  }
  if (!isEmpty(arrayItemProperties)) {
    out.arrayItemProperties = (arrayItemProperties ?? []).map(
      cleanSchemaProperty
    )
  }

  return out
}

function resolveSchemaProperty(
  name: string,
  prop: SchemaLike,
  isRequired: boolean,
  seen: Set<object>
): SchemaProperty {
  if (prop.type === 'array' && prop.items) {
    const arrayItemProperties = hasSchemaProperties(prop.items)
      ? resolveSchemaProperties(prop.items, new Set(seen))
      : undefined

    return cleanSchemaProperty({
      name,
      type: 'array',
      required: isRequired,
      description: prop.description ?? null,
      arrayItemType: getSchemaType(prop.items),
      arrayItemProperties,
    })
  }

  if (hasSchemaProperties(prop)) {
    return cleanSchemaProperty({
      name,
      type: 'object',
      required: isRequired,
      description: prop.description ?? null,
      properties: resolveSchemaProperties(prop, new Set(seen)),
    })
  }

  return cleanSchemaProperty({
    name,
    type: getSchemaType(prop),
    required: isRequired,
    description: prop.description ?? null,
    enum: prop.enum,
    format: prop.format,
  })
}

function resolveSchemaProperties(
  schema: SchemaLike | null,
  seen = new Set<object>()
): SchemaProperty[] {
  if (!schema || !hasSchemaProperties(schema)) return []
  if (seen.has(schema)) return []

  seen.add(schema)
  const required = schema.required ?? []
  const properties: SchemaProperty[] = []

  for (const [propName, prop] of Object.entries(schema.properties)) {
    properties.push(
      resolveSchemaProperty(
        propName,
        prop,
        required.includes(propName),
        new Set(seen)
      )
    )
  }

  return properties
}

function buildExampleFromSchema(
  schema: SchemaLike | null,
  seen = new Set<object>()
): unknown {
  if (!schema) return {}
  if (seen.has(schema)) return {}

  if (schema.type === 'array') {
    const itemSchema = schema.items
    const item = itemSchema
      ? buildExampleFromSchema(itemSchema, new Set([...seen, schema]))
      : {}

    return [item]
  }

  if (hasSchemaProperties(schema)) {
    const nextSeen = new Set(seen)

    nextSeen.add(schema)
    const obj: Record<string, unknown> = {}

    for (const [key, prop] of Object.entries(schema.properties)) {
      obj[key] = buildExampleFromSchema(prop, new Set(nextSeen))
    }

    return obj
  }

  if (schema.type === 'string') return schema.enum?.[0] ?? 'string'
  if (schema.type === 'integer' || schema.type === 'number') return 0
  if (schema.type === 'boolean') return false

  return {}
}

function getResponseSchemaForStatus(
  response: OpenAPIResponse
): OpenAPISchema | null {
  return response?.content?.['application/json']?.schema ?? null
}

/** Parse status code string to number, e.g. "200" -> 200, "default" -> 200 */
function parseStatusCode(code: string): number {
  if (code === 'default') return 200
  const n = parseInt(code, 10)

  return Number.isNaN(n) ? 200 : n
}

/** Sort order for response codes: 2xx first, then 4xx, then 5xx, then others */
function responseStatusOrder(s: number): number {
  return s >= 200 && s < 300 ? 0 : s >= 400 && s < 500 ? 1 : s >= 500 ? 2 : 3
}

function sortResponses(a: ResponseSample, b: ResponseSample): number {
  const diff = responseStatusOrder(a.status) - responseStatusOrder(b.status)

  return diff !== 0 ? diff : a.status - b.status
}

function sortResponseSchemas(
  a: ResponseSchemaInfo,
  b: ResponseSchemaInfo
): number {
  const diff = responseStatusOrder(a.status) - responseStatusOrder(b.status)

  return diff !== 0 ? diff : a.status - b.status
}

/** Section title used for the "other" tag; sort this last in section order. */
const SECTION_OTHER_TITLE = 'Other'

async function fetchOpenApiDocRaw(url: string): Promise<OpenAPIDoc> {
  const res = await fetch(url)

  if (!res.ok) throw new Error(`Failed to fetch OpenAPI: ${res.status}`)

  const rawDoc = (await res.json()) as OpenAPIDoc

  return (await SwaggerParser.dereference(rawDoc)) as OpenAPIDoc
}

function parseOpenApiDocIntoRestData(doc: OpenAPIDoc): {
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
} {
  const sectionsMap = new Map<string, Endpoint[]>()
  const endpointDetails: Record<string, EndpointDetail> = {}

  for (const [path, pathItem] of Object.entries(doc.paths ?? {})) {
    for (const method of METHODS) {
      const op = pathItem[method as keyof OpenAPIPathItem] as
        | OpenAPIOperation
        | undefined

      if (!op) continue

      const opId = op.operationId ?? `${method}-${path}`
      const httpMethod = method.toUpperCase() as HttpMethod

      const endpoint: Endpoint = {
        id: opId,
        name: op.summary ?? operationIdToTitle(opId),
        path,
        method: httpMethod,
      }

      const tag = op.tags?.[0] ?? 'other'
      const sectionTitle = tagToSection(tag)
      const existing = sectionsMap.get(sectionTitle) ?? []

      existing.push(endpoint)
      sectionsMap.set(sectionTitle, existing)

      const params: Parameter[] = []

      for (const p of op.parameters ?? []) {
        const kind =
          p.in === 'path' ? 'path' : p.in === 'query' ? 'query' : null

        if (!kind) continue
        params.push({
          name: p.name,
          type: p.schema?.type ?? 'string',
          required: p.required ?? false,
          description: p.description ?? null,
          kind,
        })
      }

      if (op.requestBody?.content?.['application/json']?.schema) {
        const bodySchema = op.requestBody.content['application/json'].schema
        const required = bodySchema.required ?? []

        if (hasSchemaProperties(bodySchema)) {
          for (const [name, prop] of Object.entries(bodySchema.properties)) {
            params.push({
              name,
              type: getSchemaType(prop),
              required: required.includes(name),
              description: prop.description ?? null,
              kind: 'body',
            })
          }
        }
      }

      const responses: ResponseSample[] = []
      const responseSchemas: ResponseSchemaInfo[] = []

      for (const [code, responseSpec] of Object.entries(op.responses ?? {}) as [
        string,
        OpenAPIResponse,
      ][]) {
        const status = parseStatusCode(code)
        const schema = getResponseSchemaForStatus(responseSpec)
        const desc = responseSpec?.description
        const example = schema
          ? buildExampleFromSchema(schema)
          : desc
            ? { error: desc }
            : { message: `HTTP ${status}` }

        responses.push({
          status,
          body: JSON.stringify(example, null, 2),
        })

        if (schema) {
          responseSchemas.push({
            status,
            description: desc,
            contentType: 'application/json',
            properties: resolveSchemaProperties(schema),
          })
        }
      }
      responses.sort(sortResponses)
      responseSchemas.sort(sortResponseSchemas)

      if (isEmpty(responses)) {
        responses.push({ status: 200, body: '{}' })
      }

      const rawDesc = op.description ?? ''
      const description =
        !rawDesc || rawDesc.toLowerCase() === 'no description' ? '' : rawDesc

      const displayName = op.summary ?? operationIdToTitle(opId)

      endpointDetails[opId] = {
        id: opId,
        operationName: displayName,
        method: httpMethod,
        path,
        description,
        parameters: params,
        responses,
        responseSchemas,
      }
    }
  }

  const apiSections: ApiSection[] = []
  const sortedTitles = [...sectionsMap.keys()].sort((a, b) => {
    if (a === SECTION_OTHER_TITLE) return 1
    if (b === SECTION_OTHER_TITLE) return -1

    return a.localeCompare(b)
  })

  for (const title of sortedTitles) {
    const endpoints = sectionsMap.get(title) ?? []

    if (!isEmpty(endpoints)) {
      apiSections.push({ title, endpoints })
    }
  }

  return { apiSections, endpointDetails }
}

/**
 * Returns REST API reference data from the OpenAPI spec.
 * Uses per-pod in-memory cache with TTL; on refresh failure keeps serving stale if available.
 */
export async function fetchRestApiData(): Promise<{
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
}> {
  if (typeof window !== 'undefined') {
    throw new Error('fetchRestApiData is server-only')
  }

  const ttlMs = getCacheTtlMs()
  const now = Date.now()

  if (cachedPayload != null && now - cachedAt < ttlMs) {
    return cachedPayload
  }

  if (inFlight != null) {
    return inFlight
  }

  const url = getOpenApiSpecUrl()
  const doRefresh = async (): Promise<{
    apiSections: ApiSection[]
    endpointDetails: Record<string, EndpointDetail>
  }> => {
    try {
      const doc = await fetchOpenApiDocRaw(url)
      const payload = parseOpenApiDocIntoRestData(doc)

      cachedPayload = payload
      cachedAt = Date.now()

      return payload
    } catch (err) {
      if (cachedPayload != null) return cachedPayload

      throw err
    } finally {
      inFlight = null
    }
  }

  inFlight = doRefresh()

  return inFlight
}
