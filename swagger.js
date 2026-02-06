const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Intern API",
      version: "1.0.0",
      description:
        "API documentation for Authentication, RBAC, and Task Management"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  // Swagger will read comments from routes
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(swaggerOptions);
