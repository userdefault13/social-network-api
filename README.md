[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Social Network API

## Description
This is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. The API uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Installation
1. Clone the repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Configure your MongoDB database settings in the `.env` file.

## Usage
1. Run `npm start` to start the server.
2. Use API testing tools like Postman to interact with the API endpoints.


## Models
### User
- `username`
  - String
  - Unique
  - Required
  - Trimmed
- `email`
  - String
  - Required
  - Unique
  - Must match a valid email address
- `thoughts`
  - Array of _id values referencing the Thought model
- `friends`
  - Array of _id values referencing the User model (self-reference)

#### Schema Settings
- Create a virtual called `friendCount` that retrieves the length of the user's friends array field on query.

### Thought
- `thoughtText`
  - String
  - Required
  - Must be between 1 and 280 characters
- `createdAt`
  - Date
  - Default value set to the current timestamp
  - Use a getter method to format the timestamp on query
- `username` (The user that created this thought)
  - String
  - Required
- `reactions` (These are like replies)
  - Array of nested documents created with the `reactionSchema`

#### Schema Settings
- Create a virtual called `reactionCount` that retrieves the length of the thought's reactions array field on query.

### Reaction (SCHEMA ONLY)
- `reactionId`
  - Use Mongoose's ObjectId data type
  - Default value set to a new ObjectId
- `reactionBody`
  - String
  - Required
  - 280 character maximum
- `username`
  - String
  - Required
- `createdAt`
  - Date
  - Default value set to the current timestamp
  - Use a getter method to format the timestamp on query

## API Routes
### /api/users
- GET all users
- GET a single user by its _id and populate thought and friend data
- POST a new user
  - Example data:
  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
- PUT to update a user by its _id
- DELETE to remove a user by its _id


## Contribution
Contributions are welcome, broski! Here's how you can contribute:
1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Create a pull request and describe your changes in detail.

## License
This project is licensed under the MIT License.