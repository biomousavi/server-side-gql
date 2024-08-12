const resolvers = {
  SearchType: {
    __resolveType: (obj) => {
      console.log(obj)

      if (obj.species) return 'Animal'
      else return 'Person'
    },
  },
  Query: {
    me: () => {
      return 'sdasdsa'
    },
    search: () => {
      return [
        { id: 214343, name: 'Person name' },
        { id: 343, species: 'something' },
      ]
    },
  },
}

export default resolvers
