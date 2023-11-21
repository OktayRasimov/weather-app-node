if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const express = require("express");
const app = express();

app.use(express.static("../client"));
app.use(express.json());

app.post("/weather", (req, res) => {});

app.listen(3000, () => {
  console.log(`STARTIRA ALOOOOOOOO`);
});
