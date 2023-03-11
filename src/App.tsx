import React from 'react'
import { useQuery, gql } from '@apollo/client'
import ReactJson from 'react-json-view'

const App = () => {
  // Schema

  const fetchOrders = gql`
    query FetchOrders {
      fetchOrders {
        assignedTo
        createdAt
        customer {
          address
          email
          id
          name
        }
        id
        lineItems {
          id
          product {
            id
            name
            price
          }
          quantity
        }
        state
        updatedAt
      }
    }
  `

  // Query

  const { loading, error, data } = useQuery(fetchOrders)

  // Render

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      <h1>Fetch Orders</h1>
      <ReactJson src={data} />
    </div>
  )
}

export default App
