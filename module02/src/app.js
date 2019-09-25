// Creating Application

import express from "express";
import routes from "./routes";

/*
 * Classes are a good way of naming and representing a feature
 */
class App {
  constructor() {
    this.server = express(); // The Application has a HTTP server

    this.middlewares();
    this.routes();
  }

  // Registers middlewares
  middlewares() {
    this.server.use(express.json());
  }

  // Registers routes
  routes() {
    this.server.use(routes);
  }
}

export default new App().server; // Exporting server of a instance of the Application
