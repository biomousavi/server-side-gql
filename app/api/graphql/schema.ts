export const schema = `#graphql

  type User {
    id: ID!
    name: String!
    createAt: String!
    token: String
  } 

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    signin(input:AuthInput!): User
    createUser(input:AuthInput!): User
  }
`
