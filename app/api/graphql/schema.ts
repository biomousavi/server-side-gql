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
    issues: [Issue]!
  } 

  input AuthInput {
    email: String!
    password: String!
  }

  input issuesFilterInput {
    statuses: [Issue!]
  }

  type Query {
    me: User!
    issues(input: issuesFilterInput): [Issue]!
  }

  type Mutation {
    signin(input:AuthInput!): User
    createUser(input:AuthInput!): User
    createIssue(input:CreateIssueInput!): Issue
  }
`
