# digitalapicraft-api

Brief description of the project.

# Installation

To install the project, follow these steps:

Clone the repository to your local machine.
Run npm install to install the dependencies.
Usage

# Development

To run the server in development mode, use the following command:
npm run dev

This will start the server using babel-node and reload it whenever you make changes to the code.

# Production

To build and run the server in production mode, use the following commands:

npm run build
npm start

This will build the project using babel and start the server using the compiled server.js file.

# Linting

To lint the code using eslint, use the following command:

npm run lint
This will check the code for any errors or warnings according to the configured rules.

# API Endpoints

The server is running on http://localhost:3000, and provides the following API endpoints:

## Random Users

Endpoint: /api/users/get-random-users

Method: GET

Description: Returns a JSON response with a list of randomly generated user objects.

## Word Count v1

Endpoint: /api/words/v1/get-word-count

Method: POST

Description: Fetch text file from 'http://norvig.com/big.txt' url and returns a JSON response with the count of each word in the text.

## Word Count v2

Endpoint: /api/words/v2/get-word-count

Method: POST

Description: Fetch text file from 'http://norvig.com/big.txt' url and returns a JSON response with the count of each word in the text, sorted in descending order by count.

Note: The word count functionality is implemented in the file src/utils/wordCount.js.
