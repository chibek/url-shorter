import gql from "graphql-tag";

export const CONTEXT_URL = gql`
  query {
    urls {
      id
      name
      shortUrl
      longUrl
      customUrl
      clicks
      created_at
      updated_at
    }
  }
`;
