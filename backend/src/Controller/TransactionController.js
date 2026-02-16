import Transaction from "../Modal/TransactionModal.js"
import User from "../Modal/TransactionModal.js"

export const getAllTransactions = async(req, res) => {
    try {
        const transactions = await Transaction.find().populate('users', 'categories').sort({createdAt: -1})
        res.json(transactions)
    }catch(error) {
        res.status(500).json({message:'Failed to fetch transaction'})
    }
}

export default getAllTransactions;