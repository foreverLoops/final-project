const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.port || 3000;

app.use(cors());

app.listen(port, ()=> {
    console.log(`server listening on http://localhost:${port}`)
});