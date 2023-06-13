# ContactManager_Backend_API

### A backend application implemented using Node.js and Express.js framework. It serves as a RESTful API for managing contacts and user authentication. Let's break down the code structure and functionality:

## Server.js
  Imports necessary modules and files, including Express, error handlers, database connection, and environment variables.
  Connects to the database using connectDB() function.
  Creates an instance of the Express application.
  Sets up middleware for parsing JSON data and handling routes.
  Defines error handling middleware using errorHandler.
  Starts the server and listens on the specified port.
## Routes
### contactRoutes.js
  Imports necessary modules and controllers for managing contacts.
  Creates an instance of the Express Router.
  Sets up middleware for validating tokens using validateToken.
  Defines routes for various contact operations, such as getting all contacts, creating a contact, updating a contact, and deleting a contact.
### userRoute.js
  Imports necessary modules and controllers for user management.
  Creates an instance of the Express Router.
  Sets up middleware for validating tokens using validateToken.
  Defines routes for user registration, user login, and getting the current user's information.
  
## Controllers
### contactController.js
  Imports necessary modules and the Contact model.
  Defines controller functions for various contact operations, including getting all contacts, creating a contact, getting a contact by ID, updating a contact, and   deleting a contact.
  These functions interact with the Contact model to perform CRUD operations on the database.
### userController.js
  Imports necessary modules and the User model.
  Defines controller functions for user registration, user login, and getting the current user's information.
  These functions interact with the User model to perform operations like creating a new user, validating user credentials, and retrieving user information.
  
## Models
### contactModel.js
  Defines the contact schema using Mongoose.
  The schema includes fields such as user_id (reference to the User model), name, email, phone, and cityName.
  The model is exported for use in the contact controller.
### userModel.js
  Defines the user schema using Mongoose.
  The schema includes fields such as username, email, and password.
  The model is exported for use in the user controller.
  
This code represents a basic backend application for managing contacts and user authentication. It utilizes Express.js for routing, Mongoose for interacting with the MongoDB database, and JWT for token-based authentication.




