const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const carRouter = require("./src/routes/carRoutes");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema de gerenciamento de uma locadora de carro",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/carRoutes.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(carRouter);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});