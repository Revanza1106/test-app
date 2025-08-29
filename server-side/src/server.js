const express = require("express");
const app = express();
const routes = require("./routes/teritorryRoutes");

app.use(express.json());

app.use("/api/teritorry", routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
