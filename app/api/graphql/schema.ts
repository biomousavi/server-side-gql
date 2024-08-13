export const schema = `#graphql

  type Issue {
    id: ID!
    createdAt: String!
    userId: String!
    user: User!
    status: IssueStatus
    content: String!
    name: String!
  }

  input CreateIssueInput {
    name: String!
    content: String!
    status: IssueStatus
  }

  enum IssueStatus {
    BACKLOG
    TODO
    INPROGRESS
    DONE
  }



  type User {
    id: ID!
    email: String!
    createdAt: String!
    token: String
  } 

  input AuthInput {
    email: String!
    password: String!
  }

  type Query {
    me: User!
  }

  type Mutation {
    signin(input:AuthInput!): User
    createUser(input:AuthInput!): User
    createIssue(input:CreateIssueInput!): Issue
  }
`
