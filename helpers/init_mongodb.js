const { default: mongoose } = require("mongoose");

const username = "ckanja";
const password = "root";
const cluster = "cluster0";
const dbname = "jwtAuth";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.upby5.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
db.on("disconnected", () => {
  console.log("Mongoose connection is disconnected.")
})

process.on('SIGINT', async() => {
  await mongoose.connection.close()
  process.exit(0)
})