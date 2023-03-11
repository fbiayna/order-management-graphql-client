import React, { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import ReactJson from 'react-json-view'

// Schema

const fetchOrder = gql`
  query FetchOrder($fetchOrderId: ID!) {
    fetchOrder(id: $fetchOrderId) {
      id
      state
      updatedAt
      createdAt
      assignedTo
      customer {
        address
        email
        id
        name
      }
      lineItems {
        id
        product {
          id
          name
          price
        }
        quantity
      }
    }
  }
`

const App = () => {
  // State

  const [orderIdInput, setOrderIdInput] = useState<string>('')
  const [getOrder, { loading, error, data }] = useLazyQuery(fetchOrder)
  const [queryCompleted, setQueryCompleted] = useState<boolean>(false)

  // Actions

  const onOrderIdInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderIdInput(event.target.value)
    setQueryCompleted(false)
  }

  const onFetchOrderSubmitTapped = () => {
    orderIdInput && getOrder({ variables: { fetchOrderId: orderIdInput } })
    setQueryCompleted(true)
    setOrderIdInput('')
  }

  // Render

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      <h1>Fetch Order</h1>
      <input
        type='text'
        value={orderIdInput}
        onChange={onOrderIdInputChanged}
        placeholder='Enter an orderId'
      />
      <button onClick={onFetchOrderSubmitTapped}>Search</button>
      {!loading && queryCompleted && (!data || !data.fetchOrder) && <p>No data found</p>}
      {data && data.fetchOrder && <ReactJson src={data.fetchOrder} />}
    </div>
  )
}

export default App
