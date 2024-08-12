const schema = `#graphql

  type Tweet {
    content: String!
  }

  type Profile {
    username: String!
  }

  union SearchResult = Tweet | Profile

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
    search: [SearchResult]!
  }

`

export default schema
