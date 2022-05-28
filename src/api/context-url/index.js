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

export const CONTEXT_URL_CREATE = gql`
  mutation create($input: CreateUrlInput!) {
    create(createUrl: $input) {
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

export const CONTEXT_URL_UPDATE = gql`
  mutation update($input: UpdateUrlInput!) {
    update(updateUrl: $input) {
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

export const CONTEXT_URL_UPDATE_CLICK = gql`
  mutation create($input: String!) {
    updateClick(id: $input) {
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

export const CONTEXT_URL_DELETE = gql`
  mutation ($input: String!) {
    delete(id: $input)
  }
`;
