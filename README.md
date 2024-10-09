
# Rapid Dine

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Admin Section](#admin-section)
  - [User Section](#user-section)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

Welcome to Rapid Dine! This application allows users to browse, purchase, and enjoy food items from various menus. Admins can manage products and orders effectively.

## Features

### Admin Section

- **Add Product**: Admins can add new food items to the menu.
- **View Orders**: Admins can view all orders placed by users.
- **Change Order Status**: Admins can update order statuses to "Delivered", "Processing", or "Out for Delivery".
- **View All Products**: Admins have access to the entire product list.

### User Section

- **Create Account**: Users can sign up and create an account.
- **Purchase Food Items**: Users can browse and purchase food items.
- **Dummy Stripe Payment Integration**: Integrated with a dummy Stripe payment gateway.
- **Filter Products**: Users can filter products by product menu.

## Technology Stack

- **Frontend**: React
- **Backend**: Express
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Image Upload**: Cloudinary

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/surajkedar-2003/Rapid_Dine.git
    cd RapidDine
    ```

2. **Install dependencies**:
    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install

    # Install admin dependencies
    cd ../admin
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the `server` directory and add the following:
      ```env
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      STRIPE_API_KEY=your_dummy_stripe_api_key
      CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret
      ```

4. **Start the application**:
    ```bash
    # Start backend server
    cd server
    npm run server

    # Start frontend server
    cd ../client
    npm run dev

    # Start admin server
    cd ../admin
    npm run dev
    

    ```

## Usage

1. **Admin Operations**:
   - Navigate to the admin panel.
   - Add, view, and manage products.
   - View and update order statuses.

2. **User Operations**:
   - Sign up and log in to your account.
   - Browse and purchase food items.
   - Use the dummy Stripe payment integration for transactions.
   - Filter products by menu.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.
