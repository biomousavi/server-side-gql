const schema = `#graphql

  interface Character {
    name: String!
    outfit: String!
    strengthStat: Int!
  }

  type Person implements Character {
    name: String!
    outfit: String!
    strengthStat: Int!

    background: String!
  }

  type Alien implements Character {
    name: String!
    outfit: String!
    strengthStat: Int!

    homeWorld: String!
  }

  type Query {
    me: Person!
    characters: [Alien!]!
  }

`

export default schema
