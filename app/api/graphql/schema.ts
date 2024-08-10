const schema = `#graphql

  type Person {
    name: String!
  }

  type Query {
    me: Person!
  }

`

export default schema
