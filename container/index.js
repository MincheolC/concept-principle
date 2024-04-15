const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from Docker!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
