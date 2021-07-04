import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import {onError} from '@apollo/client/link/error'
import GetUsers from './components/getUser'


const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors) {
    graphqlErrors.map(({message,location,path})=>{
      alert(`Error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri:"http://localhost:4000/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
    <GetUsers/>
    </ApolloProvider>
  );
}

export default App;
