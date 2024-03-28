# Driscolls Users News App Frontend

This is the frontend for the Driscolls Users News App, developed with React

## Important Note

Before running the front-end application, you must first have the backend server running. The backend code is stored in a separate repository and must be cloned, set up, and launched. Please visit the backend repository at [Driscolls Users News App Backend](https://github.com/josmanolo/driscolls-users-news-app) for instructions on how to get it up and running.

## Application Functionality

The application starts with a login page. You can log in using the following credentials:

**For Admin Role:**

`Email: man@gmail.com `
`Password: 123`

Admin users have access to both the User Management and News sections. Within the User Management panel, admins can register, edit, and delete users.

**For User Role:**`

`Email: josmanolo@gmail.com `
`Password: 123`

Standard users only have access to the News section where they can view the list of news articles.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) version 14 or higher.

## Installation

To install the Driscolls Users News App Frontend, follow these steps:

### Using HTTPS:`

git clone <https://github.com/yourusername/driscolls-users-news-frontend.git>

`Using SSH:`

git clone <git@github.com>:yourusername/driscolls-users-news-frontend.git

`Using GitHub CLI:`

gh repo clone yourusername/driscolls-users-news-frontend

`Without Cloning`
Download the ZIP file from the GitHub repository and extract it.
 ## Usage

To run the Driscolls Users News App Frontend, follow these steps:

1. Navigate to the project directory:`

`cd driscolls-users-news-frontend`

2. Install the required dependencies:

`npm install`

3. Start the React development server:

`npm start`

 The app will launch in your default browser at `http://localhost:3000`.

## Building for Production

To build the app for production, run:`

npm run build


`This will generate the `build` folder that you can serve using any web server.

## Project Structure

The frontend project structure should look something like this:`

public/ src/ components/ hooks/ utils/ App.js index.js ... .env .gitattributes .gitignore package-lock.json package.json README.md
