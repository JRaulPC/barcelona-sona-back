![Alt Text](https://cdn.discordapp.com/attachments/392765397910421507/1154170200569167922/title.png)

# Description 📖

This is the backend repository for the "Barcelona Sona" web application, developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The backend provides an API Rest with endpoints for various operations, including GET, PATCH, GET by ID, DELETE, and POST. This README will guide you through setting up and using the backend server.

The API Rest is deployed using onrender web services in the next URL

https://raul-perez-final-project-202307-bcn.onrender.com/

# Technologies Used ⚙️

- Node.js: Server-side JavaScript runtime.
- Express.js: Web framework for building RESTful APIs.
- MongoDB: NoSQL database for data storage.
- Mongoose: ODM (Object Data Modeling) library for MongoDB.
- dotenv: Environment variable management.

# Getting Started 💫

### Prerequisites

Before you begin, ensure you have met the following requirements:

Node.js and npm: Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from nodejs.org.

## Installation

git clone https://github.com/isdi-coders-2023/Raul-Perez-Final-Project-front-202307-bcn

npm install

## Usage

Start your

# Scripts 📝

    "start": "node . ",
    "start:dev": "nodemon .",
    "build": "tsc",
    "build:dev": "tsc -w",
    "prepare": "husky install",
    "test:dev": "jest --watch",
    "test": "jest",
    "test:coverage": "jest --coverage"

# Endpoints ✴

### GET All spots 📗

- Endpoint: /api/spots
- Method: GET
- Description: Retrieve a list of all spots.
- Request Parameters: None
- Response: An array of spots.

### GET Spot by ID 📘

- Endpoint: /api/spots/:id
- Method: GET
- Description: Retrieve a specific spot by its ID.
- Request Parameters: id (Spot ID)
- Response: A single spot.

### POST Create Spot 📙

- Endpoint: /api/spots
- Method: POST
- Description: Create a new spot.
- Request Body: JSON object containing spot data(without ID)
- Response: The created spot object.

### PATCH Update Spot by ID 📒

- Endpoint: /api/spots/:id
- Method: PATCH
- Description: Update a specific spot by its ID.
- Request Parameters: id (spot ID)
- Request Body: JSON object containing updated spot data.
- Response: The updated spot object.

### DELETE Spot by ID 📕

- Endpoint: /api/spots/:id
- Method: DELETE
- Description: Delete a specific spot by its ID.
- Request Parameters: id (Spot ID)
- Response: A success message.

# Error Handling

The API returns appropriate HTTP status codes and error messages in case of errors. Refer to each endpoint's documentation for details on possible error responses.

# Testing

Jest for unit testing and Supertest for integration endpoint testing.

## Contributing 🫲

Contributions to Barcelona Acoustics Explorer are welcome! If you would like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and test them thoroughly.
Commit your changes with clear and concise commit messages.
Push your branch to your fork.
Submit a pull request to the main branch of this repository.
