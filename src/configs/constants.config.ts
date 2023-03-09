const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 9871;
const SALTROUNDS = 10;
const SECRET = process.env.SECRET!;
const MAXAGE = 3 * 24 * 60 * 60;
const ENUM = {
    GUEST: "guest",
    ADMIN: "admin",
    MALE: "male",
    FEMALE: "female"
};
const DATABASES = {
    USER: "user",
    POST: "post",
    COMMENT: "comment",
};
const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected",
        ERROR: "There was an error while connecting to the database."
    },
    USER: {
        DUPLICATE_EMAIL: "Email already exist.",
        DUPLICATE_USERNAME: "UserName already exist.",
        CREATED: "User created successfully.",
        INVALID_ID: "User ID does not exist.",
        UPDATED: "User updated successfully.",
        FETCHED: "User fetched successfully",
        FETCHEDALL: "All available users fetched successfully",
        DELETED: "User deleted successfully",
    },
    POST: {
        CREATED: "Post created successfully.",
        FETCHED: "Post fetched successfully",
        FETCHEDALL: "All available posts fetched successfully",
        INVALID_ID: "Post ID does not exist.",
        UPDATED: "Post updated successfully.",
        DELETED: "Post deleted successfully"
    },
    COMMENT: {
        CREATED: "Comment created successfully.",
        INVALID_ID: "Comment ID does not exist.",
        FETCHED: "Comment fetched successfully",
        FETCHEDALL: "All available comment fetched successfully",
        UPDATED: "Comment updated successfully.",
        DELETED: "Comment deleted successfully"
    },
};

export {
    DATABASE_URI,
    PORT,
    SALTROUNDS,
    SECRET,
    MAXAGE,
    ENUM,
    DATABASES,
    MESSAGES
};