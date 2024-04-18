// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Submission" type defines the queryable fields for every submission in our data source.
  
  scalar DateTime
  scalar JSON
  
  type Submission {
    id: ID
    submittedAt: DateTime
    data:JSON
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    submissions: [Submission]
  }
`;

export default typeDefs;
