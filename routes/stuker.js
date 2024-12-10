import express from "express";
import db from "../models/db-stw.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/active-orders", (req, res) => {
  const query =
    "SELECT active_orders_stw.order_id, active_orders_stw.purchase_location, active_orders_stw.dropoff_location, active_orders_stw.fee, active_orders_stw.estimation_purchase, active_orders_stw.order_detail,  user_stw.profile_picture, user_stw.username " +
    "FROM active_orders_stw " +
    "INNER JOIN user_stw ON active_orders_stw.client_id = user_stw.id";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching orders" });
    } else {
      res.status(200).json(results);
    }
  });
});

router.get("/active-order/:orderId", (req, res) => {
  const { orderId } = req.params;
  const query =
    "SELECT active_orders_stw.*, user_stw.profile_picture, user_stw.username" +
    " FROM active_orders_stw " +
    "INNER JOIN user_stw ON active_orders_stw.client_id = user_stw.id " +
    "WHERE active_orders_stw.order_id = ?;";
  db.query(query, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching order details" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Order not found" });
    } else {
      console.log(results);
      res.status(200).json(results[0]);
    }
  });
});

export default router;
