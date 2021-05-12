import pkg from 'mongoose';
const { connect, connection } = pkg;


connection.on("connected", () => {
    console.log("Connection Established");
});

connection.on("reconnected", () => {
    console.log("Connection Reestablished");
});

connection.on("disconnected", () => {
    console.log("Connection Disconnected");
});

connection.on("close", () => {
    console.log("Connection Closed");
});

connection.on("error", error => {
    console.log("ERROR: " + error);
});


export async function __connect(url) {
    return await connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
};