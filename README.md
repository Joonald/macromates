# Macromates

Macromates is a web application tailored for nutrition communities such as healthy eaters, gym goers, and nutrition chefs to share and discover nutritious recipes. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a seamless platform for users to post, browse, and favorite recipes.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **User Registration and Authentication**
- **Recipe Posting**
- **Recipe Browsing and Searching**
- **Favoriting Recipes**
- **Commenting on Recipes**
- **User Profiles**
- **Community Engagement**

## Technologies

- **Frontend:**
  - React
  - Tailwind CSS
  - react-slick (for sliders)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose for ODM)
- **Authentication:**
  - JWT (JSON Web Tokens)
- **Image Storage:**
  - TBD

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/your-username/macromates.git
cd macromates
```

## Install Dependencies

- **Backend:**

```bash
cd backend
npm install
```

- **Frontend:**

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a .env file in the backend directory with the following variables:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

## Run the Application

- **Backend:**

```bash
cd backend
npm run dev
```

- **Frontend:**

```bash
cd frontend
npm run dev
```

The application should now be running on http://localhost:5173.

## Usage

## User Registration

- Sign up with an email and password.
- Verify your email address (if email verification is implemented).

## Posting a Recipe

- Log in to your account.
- Navigate to the "Create Recipe" page.
- Fill in the recipe details, including title, ingredients, instructions, and upload images.
- Publish your recipe.

## Browsing and Searching

- Use the search bar to find recipes by keyword.
- Apply filters to narrow down your search by cuisine, dietary preferences, etc.

## Favoriting and Commenting

- Favorite recipes to save them to your profile for quick access.
- Leave comments on recipes to provide feedback or ask questions.
