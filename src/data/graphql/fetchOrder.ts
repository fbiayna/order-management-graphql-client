import { gql } from '@apollo/client'

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

export default fetchOrder
