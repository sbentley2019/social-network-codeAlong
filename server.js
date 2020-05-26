const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"));
mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.get("/", (req, res) => {
  fs.readFile("./docs/apiDocs.json", (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/post", postRoutes());
app.use("/auth", authRoutes());
app.use("/user", userRoutes());
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
