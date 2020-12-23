const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(require("./Routes/index.js"));

const port = process.env.PORT || 3001;
app.listen(port, async (err) => {
  if (err) {
    console.error(err);
  }

  try {
    await mongoose.connect(
      "mongodb+srv://cosbiome:Ac03901582@cluster0.lwb9l.mongodb.net/conteoPedidos?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`server on port ${port}`);
    console.log("base de datos contectada");
  } catch (error) {
    console.log(error);
  }
});
