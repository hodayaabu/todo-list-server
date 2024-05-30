import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { taskRoutes } from "./api/task/task.routes.js";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3030;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}


app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/task", taskRoutes);

// Fallback route
app.get("/**", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});


// Listening port
server.listen(PORT, () => {

  console.log("Server is running on port: " + PORT);
});
