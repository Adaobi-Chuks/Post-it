const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 9871;
const SALTROUNDS = 10;
const ENUM = {
    GUEST: "guest",
    ADMIN: "admin",
    MALE: "male",
    FEMALE: "female"
};
const DATABASES = {
    USER: "user"
};
const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected",
        ERROR: "There was an error while connecting to the database."
    },
};

export {
    DATABASE_URI,
    PORT,
    SALTROUNDS,
    ENUM,
    DATABASES,
    MESSAGES
};