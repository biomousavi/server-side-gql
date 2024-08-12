const schema = `#graphql

  type Person {
    id:ID!
    name:String!
  }

  type Animal {
    id:String!
    species:String!
  }

  union SearchType = Animal | Person

  type Query {
    me: String!
    search: [SearchType]!
  }

`

export default schema
