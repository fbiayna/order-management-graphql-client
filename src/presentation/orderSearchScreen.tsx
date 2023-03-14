import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import ReactJson from 'react-json-view'
import fetchOrder from '../domain/schemas/fetchOrder'
import copies from '../application/assets/copies'

const OrderSearchScreen = () => {
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

  // Helper methods

  const getAnswer = () => {
    if (!queryCompleted) return

    if (loading) return <p>{copies.app.results.loading}</p>

    if (error)
      return (
        <p>
          {copies.app.results.error} {error.message}
        </p>
      )

    if (!data || !data.fetchOrder) return <p>{copies.app.results.noData}</p>

    return <ReactJson src={data.fetchOrder} />
  }

  // Render

  return (
    <div>
      <h1>{copies.app.title}</h1>
      <input
        type='text'
        value={orderIdInput}
        onChange={onOrderIdInputChanged}
        placeholder={copies.app.input.placeholder}
      />
      <button onClick={onFetchOrderSubmitTapped}>{copies.app.input.searchInput}</button>
      {getAnswer()}
    </div>
  )
}

export default OrderSearchScreen
