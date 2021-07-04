//GRAPHQL backend server API
const express = require('express')
const app = express()
const port = 3000
const graphql = require('graphql')
// To create graphql server
const { graphqlHTTP } = require('express-graphql')
const mockdata= require("./MOCK_DATA.json")

app.use('/graphql',graphqlHTTP({
  schema,
  graphql:true
}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})