# 🚑 Gyant Challenge Delivery 🏥

## Description
Create a web application that allows a doctor to review the EHR (one after another) and label it with one of a number of conditions. The case id, doctor id, label, and time to label the case should be recorded for each decision.

## Technologies chosen (backend):

- NodeJS
- Typescript
- NestJS
- MongoDB

## Table of Contents

🏁 [Getting Started](./README.md#getting-started)

- [Requirements](./README.md#requirements)
- [Installing](./README.md#installing)
- [Running](./README.md#running)

🎆 [Endpoints](./README.md#endpoints)

##### EHRs
- [POST `/ehr`](./README.md#post-ehr)
- [GET `/ehr`](./README.md#get-ehr)
- [GET `/ehr/:id`](./README.md#get-ehrId)
- [PATCH `/ehr/:id`](./README.md#patch-ehrId)

##### Conditions
- [POST `/condition`](./README.md#post-condition)
- [GET `/condition`](./README.md#get-condition)
- [GET `/condition/:id`](./README.md#get-conditionId)

- [Other Endpoints](./README.md#other-endpoints)

💽 [Database](./README.md#database)

🧥 [Use Case](./README.md#use-case)

## Getting Started

### Requirements

NodeJS version 18.12.1 or higher

### Installing

```bash
$ npm i
```

## Running

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Endpoints

### POST `/ehr`

Inserts all the EHR files into the database.

#### Request Body

This endpoint doesn't take in any parameters in the request body.

#### Success response
```json
Successfully saved the medical cases: 3
```

#### Error response
```json
{
  "name": "E_DB_INSERT",
  "message": "Error occurred while inserting into MongoDB:" (plus error thrown by MongoDB),
}
```

### GET `/ehr`

Returns an array with all EHRs stored in the database.

#### Request Body

This endpoint doesn't take in any parameters in the request body.

#### Success Response

```json
[
  {
  "_id": "63b03ab6a0b2f4affdcf9e80",
  "description": "Patient presents with Flank Pain. The patient is a 51-year-old female...",
  "__v": 0
  },
  ...
]
```

#### Error response
```json
{
  "name": "E_DB_FIND",
  "message": "Error occurred while fetching data from MongoDB:"  (plus error thrown by MongoDB),
}
```

### GET `/ehr/:id`

Returns an EHR when passed its ID as a path variable.

#### Request Body

This endpoint doesn't take in any parameters in the request body.

#### Success Response

```json
{
  "_id": "63b03ab6a0b2f4affdcf9e7e",
  "description": "Patient  is an 42 year old  male.    Chief Complaint: Establish Care and...",
  "__v": 0
}
```

#### Error response
```json
{
  "name": "E_DB_FIND",
  "message": "Error occurred while fetching data from MongoDB:"  (plus error thrown by MongoDB),
}
```

### PATCH `/ehr/:id`

This endpoint is used to label an EHR. It will add the filed `label` with whatever label is sent in the request body.

#### Request Body
```json
{
  "label": "B300"
}
```

#### Success Response

```json
{
  "_id": "63b03ab6a0b2f4affdcf9e7e",
  "description": "Patient  is an 42 year old  male.    Chief Complaint: Establish Care and...",
  "__v": 0,
  "label": "B300"
}
```

#### Error response
```json
{
  name: "E_DB_FIND",
  message: "Error occurred while updating data in MongoDB:"  (plus error thrown by MongoDB),
}
```

### POST `/condition`

Parses the conditions' csv file and loads the data into MongoDB.

#### Request Body

This endpoint doesn't take in any parameters in the request body.

#### Success Response
```json
Successfully saved the conditions: 123
```

#### Error response
```json
{
  "name": "E_DB_INSERT",
  "message": "Error occurred while inserting into MongoDB:" (plus error thrown by MongoDB),
}
```

### GET `/condition`

Returns all conditions present in the database. This can be used by the doctor to check the condition's code before labeling an EHR.

#### Request Body

This endpoint doesn't take in any parameters in the request body.

#### Success Response
```json
[
  {
    "_id": "63b03affa0b2f4affdcf9e86",
    "code": "A09",
    "description": "Infectious gastroenteritis and colitis, unspecified",
    "__v": 0
  },
  {
    "_id": "63b03affa0b2f4affdcf9e8f",
    "code": "F340",
    "description": "Cyclothymic disorder",
    "__v": 0
  },
  ...
]
```

#### Error response
```json
{
  "name": "E_DB_FIND",
  "message": "Error occurred while fetching data from MongoDB:"  (plus error thrown by MongoDB),
}
```

### GET `/condition/:id`

Returns a condition from the database when it's ID is provided as a path variable. This can be used by the doctor to check the condition's code before labeling an EHR.

#### Request Body

This endpoint doesn't take in any parameters in the request body.

#### Success Response
```json
{
  "_id": "63b03affa0b2f4affdcf9e8d",
  "code": "B9789",
  "description": "Other viral agents as the cause diseases classified elsewhere",
  "__v": 0
}
```

#### Error response
```json
{
  "name": "E_DB_FIND",
  "message": "Error occurred while fetching data from MongoDB:"  (plus error thrown by MongoDB),
}
```

### Other Endpoints

There are other endoints that were created automatically using NestJS' resource creation in the cli. Although these endpoints aren't needed for the use case (and thus not documented in this file), they were left in the API's code for later completion/improvement.

## Database

The database of choice for this test task is MongoDB and the conncection string is `mongodb://localhost/nest`. During the development of this project MongoDB Compass was used to check the DB and make sure all data was being inserted/updated/deleted correctly.

## Use Case

Use the Postman Collection provided in the file `Gyant.postman_collection.json` to test the API. The methods should be executed in the order they are presented in to make sure all the data is loaded before fetching or updating EHRs or conditions.

_A service built by Harris Markov - 31/12/2022_ 🏄