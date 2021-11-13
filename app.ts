import express from "express";

export const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!").end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
// [END gae_node_request_example]

module.exports = app;
