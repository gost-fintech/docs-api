---
sidebar_position: 3
sidebar_label: "Payout API"
---
# Payout API

### Payout Request

To create a payout request, you have to make a HTTP POST request to `/api/v2/payouts` endpoint
```
POST: https://confettipay.com/api/v2/payouts HTTP 1.1
```

**Request Body Example**
```json
{
    "amount": 5.0,
    "cardNumber": "<your-cardnumber>",
    "method": "c2c",
    "currency": "RUB",
    "recipient": "Павел Дуров",
    "orderId": "<your-custom-order-id>",
    "merchantId": "<your-merchant-id>",
    "callbackUri": "https://example.com/api/payout/callback",
    "bankId": 3,
}
```

**Request Body Parameters**
| #  | **Parameter** | **Type**     | **Description**                                                                                                                                        | **Required** |
|----|---------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
|  1 | amount*       | decimal      | The amount of the recharge. Numeric with a decimal point                                                                                               |      Yes     |
|  2 | cardNumber*   | string       | Number of Bank Card for transfering funds                                                                                                              |      Yes     |
|  3 | method*       | string       | The method of a payment, click [here](/docs/api-docs/payment-api#payment-methods) to see available methods                                             |      Yes     |
|  4 | currency      | string       | The currency used in this payment <br/> <ol><li>RUB - Russian Rubles</li> <li> UZS - Uzbekistani Sum</li> <li>KZT - Kazakhstani Tenge</li></ol>        |      No      |
|  6 | recipient*    | string       | The full name of the payout recipient / card holder                                                                                                    |      Yes     |
|  7 | orderId*      | string       | Custom ID for additional payout identification                                                                                                         |      Yes     |
|  8 | merchantId*   | string       | The merchant's Unique identifier                                                                                                                       |      Yes     |
|  9 | callbacklUri* | string       | The callback URL (link) where the payment server will send information about the payment processing result                                             |      Yes     |
| 10 | bankID*       | integer      | The identificator of a bank                                                                                                                            |      Yes     |

**Response (In case of successful payment)**:
```json
{
    "status": true,
    "result": {
        "address": "<recipient-address>",
        "recipient": "John Doe",
        "amount": -555,
        "id": "66a3abd89d9b5",
        "state": "pending"
    }
}
```

**Response Format**
| # | **Parameter** | **Type** | **Description**                                                                                   |   |
|---|---------------|----------|---------------------------------------------------------------------------------------------------|---|
| 1 | status        | boolean  | The status of operation, if it's `true` that it's successful and if it's `false` then it's failed |   |
| 2 | result        | object   | The object containing information about payment result                                            |   |

**Response Result Format**
| # | **Parameter** | **Type** | **Description**                                                                                          |
|---|---------------|----------|----------------------------------------------------------------------------------------------------------|
| 1 | amount        | integer  | The total amount of the payment, represented as a negative rounded number.                               |
| 2 | id            | string   | The unique identifier for the payment.                                                                   |
| 3 | state         | string   | The current state of the payout                                                                          |
| 4 | address       | string   | The address associated with recipient's address. (e.g. card number, phone number or bank account number) |
| 6 | recipient     | ?string  | The name of the recipient as provided in the invoice, if available.                                      |
