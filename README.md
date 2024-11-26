# E-Commerce Web Project

An advanced e-commerce platform built with React, Firebase, and TailwindCSS, offering a seamless shopping experience. This project is designed to cater to entrepreneurs and customers alike, providing tools for product management, secure transactions, and a responsive interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Overview

This e-commerce platform is a full-stack project enabling entrepreneurs to sell products and customers to browse and purchase items. The system includes product management for businesses, inventory tracking, and a shopping cart feature for users. Firebase handles backend services such as authentication and Firestore database operations.

## Features

- **User Roles**:
  - **Entrepreneurs**: Manage product listings, view inventory, and monitor sales.
  - **Customers**: Browse products, add items to their shopping cart, and securely checkout.
- **Product Management**: Businesses can add, update, or delete product listings.
- **Inventory Tracking**: Automatic tracking of product inventory upon sales.
- **Shopping Cart**: Customers can add products to a cart and proceed to checkout.
- **Authentication**: Secure user authentication with Firebase.
- **Responsive Design**: Built with TailwindCSS to ensure the platform is mobile-friendly.
- **Dynamic Animations**: Smooth interactions using Framer Motion.
- **Image Carousels**: Product showcases implemented with Glide.js.

## Technologies Used

- **Frontend**: React.js, React Router, Material-UI, TailwindCSS, Framer Motion
- **Backend**: Firebase (Authentication, Firestore, Hosting, Functions)
- **State Management**: React Context API (or other state management tools)
- **Testing**: Jest, React Testing Library
- **Icons**: FontAwesome and Material Icons
- **Styling**: TailwindCSS and Material-UI
- **Animations**: Framer Motion and Glide.js

## Installation

### Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **Yarn**
- A **Firebase** account (for backend setup)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/e-commerce-web-project.git
cd e-commerce-web-project
```

### Install Dependencies

To install all the dependencies, run:

```bash
npm install
```

Or, if using Yarn:

```bash
yarn install
```

This will install all the necessary dependencies listed in the package.json file.

### Environment Configuration

Create a .env file in the root directory to store environment variables, including Firebase configuration keys. Example:

```bash
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### Running the Application

To start the development server, use the following command:

```bash
npm start
```

or

```bash
yarn start
```

This will run the application locally on <http://localhost:3000>.

### Running Tests

To run the tests for your React components, use:

```bash
npm test
```

or

```bash
yarn test
```

### Build for Production

To build the project for production, use:

```bash
npm run build
```

or

```bash
yarn build
```

This will create an optimized production build in the build folder. You can deploy this build to a server or hosting platform.

### Run it remotely

<https://shopsphere5.netlify.app/>

## Usage

### Entrepreneurs

1. Register or log in as an entrepreneur.
2. Add or manage product listings, including images, descriptions, and pricing.
3. Track inventory and monitor sales in the dashboard.

### Customers

1. Register or log in as a customer.
2. Browse products by categories or search for specific items.
3. Add items to the shopping cart and proceed to secure checkout.
4. View order history and track purchases.

## Contact

If you have any questions, suggestions, or feedback, feel free to open an issue or contact the project maintainers:

Email: <shabbeerpetersen10@gmail.com>
