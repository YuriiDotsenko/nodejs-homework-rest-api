const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const mongoose = require("mongoose");

// const dotenv = require("dotenv");
// dotenv.config();

// const { DB_HOST } = process.env;

// const { Schema, model } = mongoose;

// const contactSchema = Schema({
//   name: {
//     type: String,
//     required: [true, "Set name for contact"],
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Contact = model("contact", contactSchema);

// const newContact = {
//   name: "Bobert Bobson",
//   email: "bobertb@mail.com",
//   phone: "(898) 789 456 123",
// };

// mongoose
//   .connect(DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     try {
//       // console.log("Database connection successful");
//       const result = await Contact.create(newContact);
//       console.log(result);
//     } catch (error) {
//       console.log(error.message);
//     }
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
