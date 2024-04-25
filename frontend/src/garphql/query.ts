import { gql } from "@apollo/client";

const GET_SUBMISSIONS = gql`
  query GetSubmissions {
    submissions {
      id
      submittedAt
      data
    }
  }
`;

const GET_SUBMISSION = gql`
  query Submission($submissionId: ID!) {
    submission(id: $submissionId) {
      data
    }
  }
`;

const DELETE_SUBMISSION = gql`
  mutation DeleteSubmission($deleteSubmissionId: ID!) {
    deleteSubmission(id: $deleteSubmissionId)
  }
`;

const UPDATE_SUBMISSION = gql`
  mutation UpdateSubmission($updateSubmissionId: ID!, $data: JSON) {
    updateSubmission(id: $updateSubmissionId, data: $data) {
      id
      data
      submittedAt
    }
  }
`;

const CREATE_SUBMISSION = gql`
  mutation CreateSubmission($submittedAt: DateTime!, $data: JSON!) {
    createSubmission(submittedAt: $submittedAt, data: $data) {
      id
      submittedAt
      data
    }
  }
`;

export {
  GET_SUBMISSIONS,
  GET_SUBMISSION,
  DELETE_SUBMISSION,
  UPDATE_SUBMISSION,
  CREATE_SUBMISSION,
};
