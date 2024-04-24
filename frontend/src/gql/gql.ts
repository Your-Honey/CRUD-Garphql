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
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetSubmissions {\n      submissions {\n        id\n        submittedAt\n        data\n      }\n    }\n  ": types.GetSubmissionsDocument,
    "\n    query Submission($submissionId: ID!) {\n      submission(id: $submissionId) {\n        data\n      }\n    }\n  ": types.SubmissionDocument,
    "\n    mutation DeleteSubmission($deleteSubmissionId: ID!) {\n      deleteSubmission(id: $deleteSubmissionId)\n    }\n  ": types.DeleteSubmissionDocument,
    "\n    mutation UpdateSubmission($updateSubmissionId: ID!, $data: JSON) {\n      updateSubmission(id: $updateSubmissionId, data: $data) {\n        id\n        data\n        submittedAt\n      }\n    }\n  ": types.UpdateSubmissionDocument,
    "\n    mutation CreateSubmission($submittedAt: DateTime!, $data: JSON!) {\n      createSubmission(submittedAt: $submittedAt, data: $data) {\n        id\n        submittedAt\n        data\n      }\n    }\n  ": types.CreateSubmissionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSubmissions {\n      submissions {\n        id\n        submittedAt\n        data\n      }\n    }\n  "): (typeof documents)["\n    query GetSubmissions {\n      submissions {\n        id\n        submittedAt\n        data\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Submission($submissionId: ID!) {\n      submission(id: $submissionId) {\n        data\n      }\n    }\n  "): (typeof documents)["\n    query Submission($submissionId: ID!) {\n      submission(id: $submissionId) {\n        data\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteSubmission($deleteSubmissionId: ID!) {\n      deleteSubmission(id: $deleteSubmissionId)\n    }\n  "): (typeof documents)["\n    mutation DeleteSubmission($deleteSubmissionId: ID!) {\n      deleteSubmission(id: $deleteSubmissionId)\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateSubmission($updateSubmissionId: ID!, $data: JSON) {\n      updateSubmission(id: $updateSubmissionId, data: $data) {\n        id\n        data\n        submittedAt\n      }\n    }\n  "): (typeof documents)["\n    mutation UpdateSubmission($updateSubmissionId: ID!, $data: JSON) {\n      updateSubmission(id: $updateSubmissionId, data: $data) {\n        id\n        data\n        submittedAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateSubmission($submittedAt: DateTime!, $data: JSON!) {\n      createSubmission(submittedAt: $submittedAt, data: $data) {\n        id\n        submittedAt\n        data\n      }\n    }\n  "): (typeof documents)["\n    mutation CreateSubmission($submittedAt: DateTime!, $data: JSON!) {\n      createSubmission(submittedAt: $submittedAt, data: $data) {\n        id\n        submittedAt\n        data\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;