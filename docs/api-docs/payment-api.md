---
sidebar_position: 2
sidebar_label: "Payment API"
---

# Payment API Documenatation

### Creation of Payment

To create a new payment request, you have to make a HTTP POST request to `/api/v2/payments` endpoint
```
POST: https://confettipay.com/api/v2/payments HTTP 1.1
```

**Request Body Example**
```json
{
    "orderId": "<order-id>",
    "merchantId": "<your-merchant-id>",
    "amount": 5.0,
    "method": "c2c",
    "currency": "RUB",
    "userId": 1,
    "callbackUri": "https://example.com/api/payment/callback",
    "successUri": "https://example.com/payment/success",
    "failUri": "https://example.com/payment/failed"
}
```

**Request Body Parameters**
| #  | **Parameter** | **Type**     | **Description**                                                                                                       | **Required** |
|----|---------------|--------------|-----------------------------------------------------------------------------------------------------------------------|--------------|
|  1 | orderId*      | string       | Custom ID for additional payment identification                                                                       |      Yes     |
|  2 | merchantId*   | string       | Merchant's Unique Identifier                                                                                          |      Yes     |
|  3 | amount*       | decimal      | The amount of the recharge. Numeric with a decimal point                                                              |      Yes     |
|  4 | method*       | string       | The method of a payment, click [here](#payment-methods) to see available methods                                      |      Yes     |
|  5 | currency      | string       | The currency used in this payment 1. RUB - Russian Rubles 2. UZS - Uzbekistani Sum 3. KZT - Kazakhstani Tenge         |      No      |
|  6 | userId        | integer      | Unique user ID for replenishment through the terminal (Recommended)                                                   |      No      |
|  7 | callbackUri*  | string       | The callback URL (link) where the payment server will send information about the payment processing result            |      Yes     |
|  8 | successUri*   | string       | The URL (link) where user will be redirected after successfull payment                                                |      Yes     |
|  9 | failUri*      | string       | The URL (link) where user will be redirect after unsuccessfull payment                                                |      Yes     |
| 10 | banks         | list(string) | The list of bank slugs made for filtering payments by banks. See list of supported banks [here](/docs/api-docs/banks) |      No      |

**Response (In case of successful payment)**:
```json
{
    "status": true,
    "result": {
        "amount": 1000,
        "id": "66a3897d0820b",
        "state": "created",
        "address": "2202206869946447",
        "bank": "sber",
        "recipient": "Нестеренко Валерия Александровна",
        "rate": 88.3,
        "bankName": "Сбербанк"
    },
    "url": "https://confettipay.com/invoice/1/66a3897d0820b"
}
```

**Response Format**
| # | **Parameter** | **Type** | **Description**                                                                                   |   |
|---|---------------|----------|---------------------------------------------------------------------------------------------------|---|
| 1 | status        | boolean  | The status of operation, if it's `true` that it's successful and if it's `false` then it's failed |   |
| 2 | result        | object   | The object containing information about payment result                                            |   |
| 3 | url           | string   | The invoice URL containing information about payment transaction                                  |   |

**Response Result Format**
| # | **Parameter** | **Type** | **Description**                                                                                          |
|---|---------------|----------|----------------------------------------------------------------------------------------------------------|
| 1 | amount        | integer  | The total amount of the payment, represented as a rounded number.                                        |
| 2 | id            | string   | The unique identifier for the payment.                                                                   |
| 3 | state         | string   | The current state of the payment                                                                         |
| 4 | address       | string   | The address associated with recipient's address. (e.g. card number, phone number or bank account number) |
| 5 | bank          | ?string  | The name of the bank involved in the payment, if available.                                              |
| 6 | recipient     | ?string  | The name of the recipient as provided in the invoice, if available.                                      |
| 7 | rate          | ?decimal | The exchange or interest rate applied to the payment, if applicable.                                     |
| 8 | bankName      | ?string  | The full name of the bank, as provided in the invoice data, if available.                                |

### Status of Payment

To get the status of the specific payment, you have to make a HTTP POST request to `/api/v2/status` endpoint.
```
POST: https://confettipay.com/api/v2/status HTTP 1.1
```

**Request Body Example**
```json
{
    "merchantId": "<your-merchant-id>",
    "paymentId": "<payment-id>",
    "orderId": "<order-id>>",
    "paymentIds": ["<payment-id-1>", "<payment-id-2>"],
    "orderIds": ["<order-id-1>", "<order-id-2>"]
}
```

**Request Body Parameters**
| #  | **Parameter** | **Type**     | **Description**                                                                                                       | **Required** |
|----|---------------|--------------|-----------------------------------------------------------------------------------------------------------------------|--------------|
|  1 | merchantId*   | string       | The unique identifier of Merchant                                                                                     |      Yes     |
|  2 | orderId*      | string       | The custom order ID for identification                                                                                |      Yes     |
|  3 | paymentId*    | string       | The payment ID for identification                                                                                     |      Yes     |
|  5 | paymentIds    | list(string) | The list of payment IDs for identification                                                                            |      No      |
|  6 | orderIds      | list(string) | The list of order IDs for identification                                                                              |      No      |

:::note
The request can include either `paymentId`, `orderId`, `paymentIds` or `orderIds` to retrieve information about payments. If both single and multiple IDs are provided, single IDs will take precedence
:::

**Response Body Example**:
If a single `paymentId` or `orderId` is provided and matching payment is found, the API will return the payment information as an object
```json
{
    "datatime": 1721997981,
    "id": "66a3942dc1d4f",
    "orderId": "32rwtessddtstst",
    "created_at": "2024-07-26T12:18:53.000000Z",
    "status": 0,
    "state": "expired",
    "type": "payin",
    "userId": null,
    "amount": 555,
    "amount_commission_less": 521.7,
    "currency": "RUB",
    "rate": 88.37,
    "method": "c2c",
    "message": null
}
```

If `paymentIds` or `orderIds` are provided, the API will return an array of payment information
```json
[
    {
        "datatime": 1721997981,
        "id": "66a3942dc1d4f",
        "orderId": "32rwtessddtstst",
        "created_at": "2024-07-26T12:18:53.000000Z",
        "status": 0,
        "state": "expired",
        "type": "payin",
        "userId": null,
        "amount": 555,
        "amount_commission_less": 521.7,
        "currency": "RUB",
        "rate": 88.37,
        "method": "c2c",
        "message": null
    },
    {
        "datatime": 1721997981,
        "id": "23a4322dd1f5f",
        "orderId": "23sfgreerfded",
        "created_at": "2024-07-26T12:18:53.000000Z",
        "status": 0,
        "state": "created",
        "type": "payin",
        "userId": null,
        "amount": 342,
        "amount_commission_less": 521.7,
        "currency": "RUB",
        "rate": 88.37,
        "method": "c2c",
        "message": null
    }
]
```

**Response Format**
| #  | **Parameter**            | **Type**  | **Description**                                                                                                      |
|----|--------------------------|-----------|----------------------------------------------------------------------------------------------------------------------|
| 1  | datatime                 | integer   | The timestamp of the payment in seconds since the Unix epoch.                                                        |
| 2  | id                       | string    | The unique identifier of the payment status.                                                                         |
| 3  | orderId                  | string    | The unique identifier of the order.                                                                                  |
| 4  | created_at               | string    | The timestamp of when the payment was created, in ISO 8601 format.                                                   |
| 5  | status                   | integer   | The overall status of the payment (0 represents an initial state or default).                                        |
| 6  | state                    | string    | The current state of the payment process (e.g., "created", "approved").                                              |
| 7  | type                     | string    | The type of transaction (e.g., "payin", "payout").                                                                   |
| 8  | userId                   | ?string   | The identifier of the user associated with the transaction, if available.                                            |
| 9  | amount                   | integer   | The total amount involved in the transaction, as a numeric value.                                                    |
| 10 | amount_commission_less   | decimal   | The amount after deducting any commission, as a numeric value.                                                       |
| 11 | currency                 | string    | The currency code of the payment (e.g., "RUB" for Russian Ruble).                                                    |
| 12 | rate                     | decimal   | The exchange or conversion rate applied, if applicable.                                                              |
| 13 | method                   | string    | The payment method used, represented by its code (e.g., "c2c" for card-to-card transfers).                           |
| 14 | message                  | ?string   | A descriptive message about the payment, often used for status or error information, if available.                   |


### Payment Methods

Payment methods in this API are used in creation of payment process. They are also splitted by currency types

#### Available Payment Methods
| **Method key** | **Description**                                                                                                       | **Currency** |
|----------------|-----------------------------------------------------------------------------------------------------------------------|--------------|
| c2c            | Transfer by RU card number                                                                                            |      RUB     |
| c2ckz          | Transfer by KZ card number                                                                                            |      KZT     |
| c2cuz          | Transfer by UZ card number                                                                                            |      UZS     |
| sbp            | Russian fast payment system                                                                                           |      RUB     |
| m2c            | International payments                                                                                                |      ALL     |

