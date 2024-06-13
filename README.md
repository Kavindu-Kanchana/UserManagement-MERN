# User Management System

An User Management System developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js)

## Objective:

Provide a feature-rich User Management System that allows for managing users. It should have two user types: user and admin.

## Features

#### 1. *User Authentication:*
   - User Registration
   - User Login
   - Admin Registration
   - Admin Login

#### 2. *User Account Management:*
   - Users can add a profile picture when creating the account.
   - Users can update their profile picture.
   - Users can update their account details.
   - Users can delete their account.

#### 3. *Password Recovery:*
   - Users can reset their password if they forget it by using email.

#### 4. *Sending Emails:*
   - When a user is registered, an email is sent.
   - Sends the OTP to reset the password.

#### 5. *Admin User Management*
   - Admin can view all the registered users.
   - Admin can edit the details of the user.
   - Admin can delete the user.
   - Admin can generates a report that includes all users.

## *Tech Stack:*

#### *MERN Stack for Development*

#### *Frontend:*
  - **Tailwindcss**: A utility-first CSS framework for styling.
  - **Axios**: A promise-based HTTP client for making API requests.
  - **Formik**: A library for building and managing forms in React.
  - **Framer Motion**: A library for creating animations and transitions in React.
  - **jsPDF**: A library for generating PDF documents.
  - **jsPDF AutoTable**: A plugin for jsPDF to create tables in PDF documents.
  - **JWT Decode**: A library for decoding JSON Web Tokens (JWT).
  - **React Hot Toast**: A library for displaying toast notifications in React.
  - **Zustand**: A small, fast, and scalable state-management solution for React.

#### *Backend:*
  - **Express Async Handler**: A middleware for handling exceptions in Express routes.
  - **CORS**: A middleware for enabling Cross-Origin Resource Sharing in Express.
  - **Bcryptjs**: A library for hashing passwords.
  - **Mailgen**: A library for generating email content.
  - **MongoDB Memory Server**: In-memory MongoDB instance for testing.
  - **Morgan**: A middleware for logging HTTP requests in Express.
  - **Multer**: A middleware for handling multipart/form-data, used for file uploads.
  - **Nodemailer**: A library for sending emails.
  - **OTP Generator**: A library for generating one-time passwords (OTPs).

#### *Authentication:*
  - **JWT (JSON Web Tokens)**: For secure authentication and information exchange.

#### SMTP Service:
  - **Ethereal Email**: Ethereal Email provides temporary email addresses for testing email functionality without using real accounts. [Visit Ethereal Email](https://ethereal.email/) for more information.

## Installation and Running the Project

### Frontend Setup
1. Clone or download this repository.
2. Navigate to the `frontend` folder in your terminal.
3. Run `npm install` to install dependencies from `package.json`.
4. Create a `.env` file in the `frontend` folder and add:

   ```
   REACT_APP_SERVER_DOMAIN='<server_domain>' # example 'http://localhost:8080'
   ```

### Backend Setup
1. Navigate to the `backend` folder in your terminal.
2. Run `npm install` to install dependencies from `package.json`.
3. Create a `.env` file in the `backend` folder and add:

   ```
   JWT_SECRET=YourJWTSecretKey,
   EMAIL=Ethereal_email,
   PASSWORD=Ethereal_password,
   ATLAS_URI=MONGODB_ATLAS_URI
   ```

### Running the Project
1. Start the backend server:
   ```
   npm start
   ```
   
2. Start the frontend server:
   ```
   npm start
   ```

### Project Details
- The project includes a homepage, navigation bar, and footer.
- The navigation bar features a user icon; hovering over it reveals options to login and register.
- After logging in, additional options like "Manage Account" and "Logout" appear.
- Visit `/adminregister` to register as an admin.
- Visit `/adminlogin` to login as an admin.
- Explore other functionalities as needed.

## Contribution

- This project was created Kavindu Kanchana