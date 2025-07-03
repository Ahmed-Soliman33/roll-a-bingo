const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");
const cookieParser = require("cookie-parser");

const dbConnection = require("./config/database");
const deepSanitize = require("./middlewares/deepSanitizeMiddleware");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const ApiError = require("./utils/ApiError");
const { mountRoutes } = require("./routes");

// Connect to the database
dbConnection();

// Load environment variables from config.env file
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares

// Enhances security by setting appropriate HTTP headers.
app.use(helmet());

// Body parser middleware
// Restricts payload size to 10kb to prevent Denial of Service (DoS) attacks
app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Parses incoming URL-encoded payloads, such as form submissions.
app.use(express.urlencoded({ extended: true }));

// CORS configuration >> Enables Cross-Origin Resource Sharing (CORS).
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use((req, res, next) => {
  req.body = deepSanitize(req.body);
  req.query = deepSanitize(req.query);
  req.params = deepSanitize(req.params);
  next();
});

// Parses cookies from incoming requests.
app.use(cookieParser());

// Mount Routes
mountRoutes(app);

// Catch-all route for undefined routes
app.use((req, res, next) => {
  const error = new ApiError(
    `Can't find ${req.originalUrl} on this server!`,
    400
  );
  next(error);
});

// Global Error handling middleware
app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Handle unhandled promise (asynchronous) rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  // Close the server and exit the process
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
