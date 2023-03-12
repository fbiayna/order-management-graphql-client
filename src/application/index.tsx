import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import OrderSearchScreen from '../presentation/OrderSearchScreen'

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_SERVER_URL_PROD
      : process.env.REACT_APP_SERVER_URL_DEV,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <OrderSearchScreen />
    </React.StrictMode>
  </ApolloProvider>,
)
