---
sidebar_position: 1
sidebar_label: "Authentication"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Authentication Guide

### How to Authenticate

In order to make requests to this API and authenticate your requests, you should provide authentication parameters using HTTP headers

```
Authorization: Bearer <public_key>
Signature: <signature>
```

| # | **Parameter** | **Type** | **Description**                                                                  | **Default** |
|---|---------------|----------|----------------------------------------------------------------------------------|-------------|
| 1 | Authorization | string   | This mandatory parameter should contain your public API key with `Bearer` prefix |      -      |
| 2 | Signature     | string   | This is also mandatory parameter and should contain your [signature hash](#signature).         |      -      |

### Signature

You need to generate a signature hash on your side, based on your request data and your secret key. This part is very important as if you would use SDK you could proceed by just passing secret key.

Here's the simple code that shows you an example of how to generate a signature on various programming languages:
<Tabs>
    <TabItem value="php" label="PHP" default>
```php
<?php
// The body array
$body = [
    'order_id' => '123',
    'currency' => 'uah',
    'wallet_type' => 'ecom',
    'amount' => 10,
    'payway' => 'card',
    // ...
];

$bodyJson = json_encode($body);

// Define the secret key
$secretKey = '<your-secret-key>';

// Generate the HMAC signature using the hash_hmac function
$signature = hash_hmac('sha256', $bodyJson, $secretKey);

// Print the signature
echo $signature;
        ```
    </TabItem>
    <TabItem value="nodejs" label="NodeJS / Javascript" default>
```js
const hmac = require('crypto-js/hmac-sha256');

const body = {
    order_id: '123',
    currency: 'uah',
    wallet_type: 'ecom',
    amount: 10,
    payway: 'card',
    // ...
};

const signature = hmac(JSON.stringify(body), 'secretKey')
  .toString();

// 0a059c58184f388c6fe56bc07bf0b71f941ad85175283b5257fc9490422d9f6e
        ```
    </TabItem>
    <TabItem value="python" label="Python" default>
```python
import hashlib
import hmac
import json


def sign(data: str, secret_key: str):
    secret_key = bytes(secret_key, "utf8")

    return hmac.new(secret_key, data.encode(), hashlib.sha256).hexdigest()

data = {
    'order_id': '123',
    'currency': 'uah',
    'wallet_type': 'ecom',
    'amount': 10,
    'payway': 'card',
    # ...
}

payload = json.dumps(data)
signature = sign(payload, 'secretKey')

print(signature)
# 0ff2fa58c4811407c4cd5fcb5adef76bf32c4213a579da5b17ebffb61525cb11
        ```
    </TabItem>
</Tabs>

### Verifying signature

Each response and callback contains Signature header signed with your secret key. It is important to verify response/callback signature in order to prevent possible security vulnerabilities
```php
<?php
/** @var \Psr\Http\Message\ResponseInterface $response */
if($response->getHeaderLine('Signature') === hash_hmac('sha256', $response->getBody()->getContents(), $secretKey))
{
  // You can trust
}
```

### Formats and Guidelines

You required to include `merchantId` parameter into each request's request body.
```json
{
    "merchantId": "<your-merchant-id"
}
```

Also the API returns data in format of `application/json`. Each response contains at least these two parameters

| # | **Parameter** | **Type** | **Description**                                                                                   |
|---|---------------|----------|---------------------------------------------------------------------------------------------------|
| 1 | status        | boolean  | The status of operation, if it's `true` that it's successful and if it's `false` then it's failed |
| 2 | code          | integer  | The code of the operation status. Check up this page to read more about status codes              |