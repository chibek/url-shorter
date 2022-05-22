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

export const CONTEXT_URL_BY_ID = gql`
  query findOne($id: String!) {
    findOne(id: $id) {
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
