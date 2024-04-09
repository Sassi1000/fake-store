const mongoose = require('mongoose')
const app = require("./app");
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async (url) => {
  await mongoose.connect(url)
}

connectDB(process.env.CONNECTION_STRING_MONGO)
  .then(() => {
    console.log("The data base has been connected");
  })
  .catch(err => console.log(err.message))

const port = 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})