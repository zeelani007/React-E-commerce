import express from "express"
const transactionrouter = express.Router();
import {getAllTransactions} from "../Controller/TransactionController.js"

transactionrouter.get("/all", getAllTransactions)

export default transactionrouter;