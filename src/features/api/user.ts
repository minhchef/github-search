import { gql } from "@apollo/client";
import apolloClient from "./apolloClient";

const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 5) {
      edges {
        node {
          ... on User {
            login
            avatarUrl
            url
          }
        }
      }
    }
  }
`;

const GET_USER_REPOS = gql`
  query GetUserReposOrdered(
    $login: String!
    $first: Int!
    $after: String
    $orderBy: RepositoryOrderField!
  ) {
    user(login: $login) {
      repositories(
        first: $first
        after: $after
        orderBy: { field: $orderBy, direction: DESC }
      ) {
        totalCount
        edges {
          node {
            id
            name
            description
            url
            stargazerCount
            watchers {
              totalCount
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String!) {
    createIssue(
      input: { repositoryId: $repositoryId, title: $title, body: $body }
    ) {
      issue {
        id
        title
        url
      }
    }
  }
`;

const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues(
    $login: String!
    $repositoryName: String!
    $first: Int!
    $after: String
  ) {
    repository(owner: $login, name: $repositoryName) {
      issues(first: $first, after: $after, states: OPEN) {
        totalCount
        edges {
          node {
            id
            title
            createdAt
            author {
              login
              avatarUrl
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const searchUsers = async (query: string) => {
  const response = await apolloClient.query({
    query: SEARCH_USERS,
    variables: { query },
  });
  return response.data;
};

export const getUserRepos = async (
  login: string,
  first = 5,
  after: string | null = null,
  orderBy: "STARGAZERS" | "WATCHERS" = "STARGAZERS"
) => {
  const response = await apolloClient.query({
    query: GET_USER_REPOS,
    variables: { login, first, after, orderBy },
  });
  return response.data;
};

export const createIssue = async (
  repositoryId: string,
  title: string,
  body: string
) => {
  const response = await apolloClient.mutate({
    mutation: CREATE_ISSUE,
    variables: { repositoryId, title, body },
  });
  return response.data;
};

export const getRepositoryIssues = async (
  login: string,
  repositoryName: string,
  first = 5,
  after: string | null = null
) => {
  const response = await apolloClient.query({
    query: GET_REPOSITORY_ISSUES,
    variables: { login, repositoryName, first, after },
  });
  return response.data;
};
