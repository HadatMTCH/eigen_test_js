require('rootpath')();

const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const router = express.Router();
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const bookRoutes = require('./routes/BookRoutes');
const memberRoutes = require('./routes/MemberRoutes');
const borrowRoutes = require('./routes/BorrowRoutes');

exports.db = mongoose.connect('mongodb://' + process.env.DB_HOST + process.env.DB_DATABASE, { useNewUrlParser: true });

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(router);
app.use(cors());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', bookRoutes);
app.use('/', memberRoutes);
app.use('/', borrowRoutes);

app.listen(process.env.PORT, function () {
  console.log("Node server running on http://localhost:" + process.env.PORT);
  console.log("Swagger documentation available at http://localhost:" + process.env.PORT + "/api-docs");
});