# ServeRest-Jest

Automated testing project for the [ServeRest](https://serverest.dev/) API using **Jest**, **SuperTest**, and **Joi**.

## Description

This project performs automated tests to validate the functionalities of the ServeRest API, ensuring the reliability and quality of its endpoints. The focus is on functional, contract, and integration testing.

## Technologies Used

- [Jest](https://jestjs.io/) - JavaScript testing framework.
- [SuperTest](https://github.com/visionmedia/supertest) - HTTP testing for APIs.
- [Joi](https://joi.dev/) - Schema validation for objects.
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/servertest-jest.git
   cd servertest-jest
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file with the API `BASE_URL`:

   ```bash
   BASE_URL=https://serverest.dev
   ```

## Running the Tests

1. Ensure the `.env` file is configured properly.
2. Execute the tests:
   ```bash
   npm test
   ```

## Continuous Integration

This project uses **GitHub Actions** to automatically run tests on every commit or pull request.

Pipeline file: `.github/workflows/ci.yml`
