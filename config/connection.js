const { connect, connection } = require("mongoose");

const connectionString =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialnetworkDB";
    
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log("MongoDB connected");
module.exports = connection;