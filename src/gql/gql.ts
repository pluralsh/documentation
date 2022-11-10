/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  fragment RepoFragment on Repository {\n    id\n    name\n    description\n    documentation\n    icon\n    darkIcon\n    private\n  }\n": types.RepoFragmentFragmentDoc,
    "\n  fragment RecipeFragment on Recipe {\n    name\n    description\n    provider\n    private\n    repository {\n      description\n    }\n    recipeSections {\n      repository {\n        name\n      }\n      configuration {\n        name\n        type\n        optional\n        documentation\n        longform\n      }\n    }\n  }\n": types.RecipeFragmentFragmentDoc,
    "\n  query Recipes($repoName: String!) {\n    recipes(repositoryName: $repoName, first: 500) {\n      edges {\n        node {\n          ...RecipeFragment\n        }\n      }\n    }\n  }\n": types.RecipesDocument,
    "\n  query Recipe($id: ID!) {\n    recipe(id: $id) {\n      ...RecipeFragment\n    }\n  }\n": types.RecipeDocument,
    "\n  query Repos {\n    repositories(first: 5000) {\n      edges {\n        node {\n          ...RepoFragment\n        }\n      }\n    }\n  }\n": types.ReposDocument,
};

export function graphql(source: "\n  fragment RepoFragment on Repository {\n    id\n    name\n    description\n    documentation\n    icon\n    darkIcon\n    private\n  }\n"): (typeof documents)["\n  fragment RepoFragment on Repository {\n    id\n    name\n    description\n    documentation\n    icon\n    darkIcon\n    private\n  }\n"];
export function graphql(source: "\n  fragment RecipeFragment on Recipe {\n    name\n    description\n    provider\n    private\n    repository {\n      description\n    }\n    recipeSections {\n      repository {\n        name\n      }\n      configuration {\n        name\n        type\n        optional\n        documentation\n        longform\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment RecipeFragment on Recipe {\n    name\n    description\n    provider\n    private\n    repository {\n      description\n    }\n    recipeSections {\n      repository {\n        name\n      }\n      configuration {\n        name\n        type\n        optional\n        documentation\n        longform\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query Recipes($repoName: String!) {\n    recipes(repositoryName: $repoName, first: 500) {\n      edges {\n        node {\n          ...RecipeFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Recipes($repoName: String!) {\n    recipes(repositoryName: $repoName, first: 500) {\n      edges {\n        node {\n          ...RecipeFragment\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query Recipe($id: ID!) {\n    recipe(id: $id) {\n      ...RecipeFragment\n    }\n  }\n"): (typeof documents)["\n  query Recipe($id: ID!) {\n    recipe(id: $id) {\n      ...RecipeFragment\n    }\n  }\n"];
export function graphql(source: "\n  query Repos {\n    repositories(first: 5000) {\n      edges {\n        node {\n          ...RepoFragment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Repos {\n    repositories(first: 5000) {\n      edges {\n        node {\n          ...RepoFragment\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;