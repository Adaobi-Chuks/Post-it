const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 9871;
const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected",
        ERROR: "There was an error while connecting to the database."
    },
};

export {
    DATABASE_URI,
    PORT,
    MESSAGES
};