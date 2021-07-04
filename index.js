//GRAPHQL backend server API
const express = require('express')
const app = express()
const port = 4000
const graphql = require('graphql')
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = graphql
// To create graphql server
const { graphqlHTTP } = require('express-graphql')
const mockdata= require("./MOCK_DATA.json")
const cors = require("cors");

app.use(cors());

// Define each field type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: ()=>({
    id :{ type: GraphQLInt },
    first_name :{ type: GraphQLString },
    last_name :{ type: GraphQLString },
    email :{ type: GraphQLString },
    gender :{ type: GraphQLString },
    ip_address :{ type: GraphQLString }
  })
})

//fields are all queries so all endpoint in restapi
// dont really need args but just for practise thats how you get args
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return mockdata;
      },
    },
  },
});


const Mutation = new GraphQLObjectType({
  name:"Mutations",
  "fields":{
    createUser: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString},
        last_name: { type: GraphQLString},
        email: { type: GraphQLString},
        gender: { type: GraphQLString},
        ip_address: { type: GraphQLString}
      },
      resolve(parent,args) {
        //db.query('insert into') <--- if we were using postSQL
        mockdata.push({id: mockdata.length +1, first_name: args.firstName, last_name: args.lastName, email: args.email, gender: args.gender, ip_address: args.ip_address })
        return args
      }
    }
  }
})


const schema = new GraphQLSchema({query:RootQuery , mutation:Mutation})


app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true
}))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})