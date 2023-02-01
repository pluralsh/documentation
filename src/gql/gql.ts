/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment RepoFragment on Repository {\n    id\n    name\n    description\n    documentation\n    icon\n    darkIcon\n    private\n    tags {\n      tag\n    }\n  }\n": types.RepoFragmentFragmentDoc,
    "\n  fragment RecipeFragment on Recipe {\n    name\n    description\n    provider\n    private\n    repository {\n      description\n    }\n    recipeSections {\n      repository {\n        name\n      }\n      configuration {\n        name\n        type\n        optional\n        documentation\n        longform\n      }\n    }\n  }\n": types.RecipeFragmentFragmentDoc,
    "\n  query Recipes($repoName: String!) {\n    recipes(repositoryName: $repoName, first: 500) {\n      edges {\n        node {\n          ...RecipeFragment\n        }\n      }\n    }\n  }\n": types.RecipesDocument,
    "\n  query Repos {\n    repositories(first: 5000) {\n      edges {\n        node {\n          ...RepoFragment\n        }\n      }\n    }\n  }\n": types.ReposDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RepoFragment on Repository {\n    id\n    name\n    description\n    documentation\n    icon\n    darkIcon\n    private\n    tags {\n      tag\n    }\n  }\n"): (typeof documents)["\n  fragment RepoFragment on Repository {\n    id\n    name\n    description\n    documentation\n    icon\n    darkIcon\n    private\n    tags {\n      tag\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RecipeFragment on Recipe {\n    name\n    description\n    provider\n    private\n    repository {\n      description\n    }\n    recipeSections {\n      repository {\n        name\n      }\n      configuration {\n        name\n        type\n        optional\n        documentation\n        longform\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeFragment on Recipe {\n    name\n    description\n    provider\n    private\n    repository {\n      description\n    }\n    recipeSections {\n      repository {\n        name\n      }\n      configuration {\n        name\n        type\n        optional\n        documentation\n        longform\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Recipes($repoName: String!) {\n    recipes(repositoryName: $repoName, first: 500) {\n      edges {\n        node {\n          ...RecipeFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Recipes($repoName: String!) {\n    recipes(repositoryName: $repoName, first: 500) {\n      edges {\n        node {\n          ...RecipeFragment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Repos {\n    repositories(first: 5000) {\n      edges {\n        node {\n          ...RepoFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Repos {\n    repositories(first: 5000) {\n      edges {\n        node {\n          ...RepoFragment\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;