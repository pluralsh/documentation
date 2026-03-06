/**
 * Parses the Plural OpenAPI schema to extract all API operations and build
 * the data shape used by the REST API reference page.
 *
 * Schema: https://raw.githubusercontent.com/pluralsh/console/refs/heads/master/schema/openapi.json
 */

const OPENAPI_URL =
  'https://raw.githubusercontent.com/pluralsh/console/refs/heads/master/schema/openapi.json'

/** Local schema path for build environments without network (e.g. Docker). */
const LOCAL_OPENAPI_PATH = 'schema/openapi.json'

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

function getSchemaFromRef(doc: OpenAPIDoc, ref: string): OpenAPISchema | null {
  if (!ref.startsWith('#/components/schemas/')) return null
  const name = ref.replace('#/components/schemas/', '')

  return doc.components?.schemas?.[name] ?? null
}

/** Strips undefined values so the result is safe for Next.js serialization. */
function cleanSchemaProperty(p: SchemaProperty): SchemaProperty {
  const out: SchemaProperty = { name: p.name, type: p.type }

  if (p.description != null) out.description = p.description
  if (p.required) out.required = true
  if (p.enum && p.enum.length > 0) out.enum = p.enum
  if (p.format) out.format = p.format
  if (p.arrayItemType) out.arrayItemType = p.arrayItemType
  if (p.properties && p.properties.length > 0)
    out.properties = p.properties.map(cleanSchemaProperty)
  if (p.arrayItemProperties && p.arrayItemProperties.length > 0)
    out.arrayItemProperties = p.arrayItemProperties.map(cleanSchemaProperty)

  return out
}

function resolveSchemaProperty(
  doc: OpenAPIDoc,
  name: string,
  prop: OpenAPIProp,
  isRequired: boolean,
  seen: Set<string>
): SchemaProperty {
  if (prop.$ref) {
    const refName = prop.$ref.replace('#/components/schemas/', '')

    if (seen.has(refName)) {
      return cleanSchemaProperty({ name, type: refName, required: isRequired })
    }
    seen.add(refName)
    const resolved = getSchemaFromRef(doc, prop.$ref)

    if (resolved?.properties) {
      return cleanSchemaProperty({
        name,
        type: 'object',
        required: isRequired,
        description: resolved.description ?? prop.description ?? null,
        properties: resolveSchemaProperties(doc, resolved, new Set(seen)),
      })
    }

    return cleanSchemaProperty({
      name,
      type: resolved?.type ?? 'object',
      required: isRequired,
      description: prop.description ?? null,
    })
  }

  if (prop.type === 'array' && prop.items) {
    const { items } = prop

    if (items.$ref) {
      const refName = items.$ref.replace('#/components/schemas/', '')

      if (!seen.has(refName)) {
        seen.add(refName)
        const resolved = getSchemaFromRef(doc, items.$ref)

        if (resolved?.properties) {
          return cleanSchemaProperty({
            name,
            type: 'array',
            required: isRequired,
            description: prop.description ?? null,
            arrayItemType: refName,
            arrayItemProperties: resolveSchemaProperties(
              doc,
              resolved,
              new Set(seen)
            ),
          })
        }
      }

      return cleanSchemaProperty({
        name,
        type: 'array',
        required: isRequired,
        arrayItemType: refName,
        description: prop.description ?? null,
      })
    }

    return cleanSchemaProperty({
      name,
      type: 'array',
      required: isRequired,
      description: prop.description ?? null,
    })
  }

  if (prop.type === 'object' || prop.properties) {
    return cleanSchemaProperty({
      name,
      type: 'object',
      required: isRequired,
      description: prop.description ?? null,
      properties: resolveSchemaProperties(
        doc,
        prop as OpenAPISchema,
        new Set(seen)
      ),
    })
  }

  return cleanSchemaProperty({
    name,
    type: prop.type ?? 'string',
    required: isRequired,
    description: prop.description ?? null,
    enum: prop.enum,
    format: prop.format,
  })
}

function resolveSchemaProperties(
  doc: OpenAPIDoc,
  schema: OpenAPISchema | null,
  seen = new Set<string>()
): SchemaProperty[] {
  if (!schema) return []

  if (schema.$ref) {
    const refName = schema.$ref.replace('#/components/schemas/', '')

    if (seen.has(refName)) return []
    seen.add(refName)
    const resolved = getSchemaFromRef(doc, schema.$ref)

    return resolveSchemaProperties(doc, resolved, seen)
  }

  if (!schema.properties) return []

  const required = schema.required ?? []
  const properties: SchemaProperty[] = []

  for (const [propName, prop] of Object.entries(schema.properties)) {
    properties.push(
      resolveSchemaProperty(
        doc,
        propName,
        prop,
        required.includes(propName),
        new Set(seen)
      )
    )
  }

  return properties
}

function buildExampleFromProp(
  doc: OpenAPIDoc,
  prop: OpenAPIProp | OpenAPISchema,
  seen = new Set<string>()
): unknown {
  if (!prop) return {}

  if ('$ref' in prop && prop.$ref) {
    const refName = prop.$ref.replace('#/components/schemas/', '')

    if (seen.has(refName)) return {}
    seen.add(refName)
    const resolved = getSchemaFromRef(doc, prop.$ref)

    return buildExampleFromSchema(doc, resolved, seen)
  }

  if (prop.type === 'array') {
    const itemSchema = prop.items
    const item = itemSchema?.$ref
      ? buildExampleFromProp(doc, itemSchema, new Set(seen))
      : {}

    return [item]
  }

  if (prop.type === 'object' || (prop as OpenAPISchema).properties) {
    return buildExampleFromSchema(doc, prop as OpenAPISchema, seen)
  }

  if (prop.type === 'string') return (prop as OpenAPIProp).enum?.[0] ?? 'string'
  if (prop.type === 'integer' || prop.type === 'number') return 0
  if (prop.type === 'boolean') return false

  return {}
}

function buildExampleFromSchema(
  doc: OpenAPIDoc,
  schema: OpenAPISchema | null,
  seen = new Set<string>()
): unknown {
  if (!schema) return {}

  if (schema.$ref) {
    return buildExampleFromProp(doc, schema, seen)
  }

  if (schema.type === 'array') {
    const itemSchema = schema.items
    const item = itemSchema?.$ref
      ? buildExampleFromProp(doc, itemSchema, new Set(seen))
      : {}

    return [item]
  }

  if (schema.type === 'object' || schema.properties) {
    const obj: Record<string, unknown> = {}

    for (const [key, prop] of Object.entries(schema.properties ?? {})) {
      if (prop?.$ref) {
        obj[key] = buildExampleFromProp(doc, prop, new Set(seen))
      } else if (prop?.type === 'array') {
        const item = prop.items?.$ref
          ? buildExampleFromProp(doc, prop.items, new Set(seen))
          : {}

        obj[key] = [item]
      } else if (prop?.type === 'string') {
        obj[key] = prop.enum?.[0] ?? 'string'
      } else if (prop?.type === 'integer' || prop?.type === 'number') {
        obj[key] = 0
      } else if (prop?.type === 'boolean') {
        obj[key] = false
      } else {
        obj[key] = 'string'
      }
    }

    return obj
  }

  return {}
}

function getResponseSchemaForStatus(
  doc: OpenAPIDoc,
  response: OpenAPIResponse
): OpenAPISchema | null {
  const responseSchema = response?.content?.['application/json']?.schema

  if (!responseSchema) return null
  if (responseSchema.$ref) {
    return getSchemaFromRef(doc, responseSchema.$ref)
  }

  return responseSchema
}

/** Parse status code string to number, e.g. "200" -> 200, "default" -> 200 */
function parseStatusCode(code: string): number {
  if (code === 'default') return 200
  const n = parseInt(code, 10)

  return Number.isNaN(n) ? 200 : n
}

/** Sort order for response codes: 2xx first, then 4xx, then 5xx, then others */
function sortResponses(a: ResponseSample, b: ResponseSample): number {
  const order = (s: number) =>
    s >= 200 && s < 300 ? 0 : s >= 400 && s < 500 ? 1 : s >= 500 ? 2 : 3
  const diff = order(a.status) - order(b.status)

  return diff !== 0 ? diff : a.status - b.status
}

async function loadOpenApiDoc(): Promise<OpenAPIDoc> {
  if (typeof window === 'undefined') {
    try {
      const path = await import('path')
      const fs = await import('fs')
      const cwd = process.cwd()
      const localPath = path.join(cwd, LOCAL_OPENAPI_PATH)

      if (fs.existsSync(localPath)) {
        const raw = fs.readFileSync(localPath, 'utf-8')

        return JSON.parse(raw) as OpenAPIDoc
      }
    } catch {
      // Fall through to fetch
    }
  }

  const res = await fetch(OPENAPI_URL)

  if (!res.ok) throw new Error(`Failed to fetch OpenAPI: ${res.status}`)

  return (await res.json()) as OpenAPIDoc
}

export async function fetchRestApiData(): Promise<{
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
  defaultEndpointId: string
}> {
  const doc = await loadOpenApiDoc()

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
        const resolved = bodySchema?.$ref
          ? getSchemaFromRef(doc, bodySchema.$ref)
          : bodySchema
        const required = (resolved?.required ?? []) as string[]

        if (resolved?.properties) {
          for (const [name, prop] of Object.entries(resolved.properties)) {
            const propSchema = prop?.$ref
              ? getSchemaFromRef(doc, prop.$ref)
              : (prop as OpenAPISchema)

            params.push({
              name,
              type: propSchema?.type ?? prop?.type ?? 'string',
              required: required.includes(name),
              description: prop?.description ?? propSchema?.description ?? null,
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
        const schema = getResponseSchemaForStatus(doc, responseSpec)
        const desc = responseSpec?.description
        const example = schema
          ? buildExampleFromSchema(doc, schema)
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
            properties: resolveSchemaProperties(doc, schema),
          })
        }
      }
      responses.sort(sortResponses)
      responseSchemas.sort((a, b) => {
        const order = (s: number) =>
          s >= 200 && s < 300 ? 0 : s >= 400 && s < 500 ? 1 : s >= 500 ? 2 : 3
        const diff = order(a.status) - order(b.status)

        return diff !== 0 ? diff : a.status - b.status
      })

      if (responses.length === 0) {
        responses.push({ status: 200, body: '{}' })
      }

      const rawDesc = op.description ?? ''
      const description =
        !rawDesc || rawDesc.toLowerCase() === 'no description' ? '' : rawDesc

      endpointDetails[opId] = {
        id: opId,
        operationName: operationIdToTitle(opId),
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
    if (a === 'OTHER') return 1
    if (b === 'OTHER') return -1

    return a.localeCompare(b)
  })

  for (const title of sortedTitles) {
    const endpoints = sectionsMap.get(title) ?? []

    if (endpoints.length > 0) {
      apiSections.push({ title, endpoints })
    }
  }

  const firstOp = apiSections[0]?.endpoints[0]?.id

  return {
    apiSections,
    endpointDetails,
    defaultEndpointId: firstOp ?? 'ListAgentRuns',
  }
}
