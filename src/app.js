const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// API routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
