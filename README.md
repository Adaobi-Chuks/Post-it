# POST-IT

# Overview
This contains the code source for the [Post-It](https://post-its.onrender.com) API which is located at the link below
```
https://post-its.onrender.com
```
To view the documentation in order to get you started on testing the endpoints navigate [here](https://post-its.onrender.com/api/docs) or use the link below
```
https://post-its.onrender.com/api/v1/docs
```
To view the Entity Relationship Diagram (ERM) navigate [here](https://dbdesigner.page.link/FNigWjwqEgoSUX6e9) or use the link below
```
https://dbdesigner.page.link/FNigWjwqEgoSUX6e9
```
#### This API is designed to manage operations on a Post-It app by providing services for managing users, posts and comments.

## The API has three main components:

- Users: Allows for creating, updating, getting a user with the use of id or the user's handle, getting all users, loging in a user, logging out a user, deleting users who can access the API.
- Posts: Allows for creating, updating, getting a post, getting all of a user's posts either with an id or with the user's handle and deleting of posts.
- Comments: Allows for creating, updating, getting a comment, getting all comments under a post and deleting of comments.

## Requirements
Some important requirements were implemented in the api. Navigate [here](/requirements.md) to view the listed requirements implemented and reasons for them.

# How To Use
- Clone the repo 
- cd into the directory such that you are in `post-it`.
- Create a new MongoDB database and copy your DATABASE_URI
- Create a .env file at the root of the folder and include your DATABASE_URI and a secret_key to generate tokens in the file in the format below
```
DATABASE_URI = {The DATABASE_URI you created}
SECRET = {Your secret keyword}

```
- To run the solution, make sure you have [nodejs](https://nodejs.org/) installed.
- Use the following command in your terminal to initialize the applicationa and to install the necessary dependencies.
```
npm install
nodemon
```

# Testing Endpoints
- You need to have Postman or any other similar app or extension installed to test this API.
- You can make a request from you local computer or through the live endpoint
- If you're using the live endpoint then your {base url} is
```
https://post-its.onrender.com
```
- If you're using your cloned app then your {base url} is
```
https://localhost:9871
```
- Ensure to input the right userId, postId or commentId when making your tests.

GOODLUCK 😎❤.