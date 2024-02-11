#Node Express Product API

## Product Management API

Welcome to the Product Management API! This API allows you to manage product data efficiently. Below, you'll find detailed information on how to interact with the API endpoints, authentication, validation, and more.

This application is built using

1.  NodeJS, ExpressJs
2.  EJS template
3.  JsonWebToken
4.  Yup
5.  Helmet
6.  Swagger
7.  MongoDB Mongoose

### Base URL

The base URL for accessing the API is: [Node-products-API](https://node-products-api-vma.onrender.com)

#### Authentication

To access certain endpoints such as adding, updating, or deleting products, you need to authenticate using JSON Web Tokens (JWT). Obtain a JWT token by signing in as an admin.

Username : **admin**

Password : **adminPassword**

Keep in mind that , with these admin credentials, you are only allowed to create , update or delete the newly created products by you. You don't have the privileges to delete the existing 5 products in the API.

Detailed information regarding endpoints are mentoined in swagger documentation

### [Swagger Documentation](https://node-products-api-vma.onrender.com/api-docs/)

For detailed information on each endpoint, request and response payloads, refer to the Swagger documentation provided at: [https://node-products-api-vma.onrender.com/api-docs/](https://node-products-api-vma.onrender.com/api-docs/)

### Server-Side Validation

Request payloads for adding and updating products are validated on the server side to ensure data integrity with the help of Yup package. Validation errors will be returned with appropriate error messages.

### Data Storage

Data is stored in MongoDB

### Security Headers

For enhanced security, this API sets secure response headers using the helmet package.

### Deployement

Application is deployed in Render Hoisting Provider.

©2024 Node-Product-API. All rights reserved.

Author: V M Aravind
