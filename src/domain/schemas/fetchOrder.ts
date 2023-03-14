import { gql } from '@apollo/client'

const fetchOrder = gql`
  query FetchOrder($fetchOrderId: ID!) {
    fetchOrder(id: $fetchOrderId) {
      _id
      state
      updatedAt
      createdAt
      assignedTo
      customer {
        _id
        address
        email
        name
      }
      lineItems {
        _id
        quantity
        product {
          _id
          name
          price
        }
      }
    }
  }
`

export default fetchOrder
