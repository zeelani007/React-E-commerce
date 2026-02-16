                // routes/SupportHelp.js
import express from "express";
import SupportModel from "../Modal/SupportHelpModal.js"; // ✅ match correct path and name
import BASE_URL from "../../../frontend/src/Config/config.js";
// aur isko bhi uncomment krenge jab payment getway work krega
// import OrderModel from "../Modal/OrderModal.js";
import HelpSupportUserQueryReply_Email from "../../helpSupport_UserqueryReply_Email/HelpSupportUserQueryReply_Email.js";

const router = express.Router();

router.post("/support", async (req, res) => {
  try {
    const newEntry = new SupportModel(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Support query saved." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Jab Finally Project Me payment Getway Work Krega To iss function ko Uncomment Krenge
// router.post("/support", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const orderExists = await OrderModel.findOne({ userEmail: email });

//     if (!orderExists) {
//       return res.status(403).json({ message: "Only buyers can submit support requests." });
//     }

//     const newEntry = new SupportModel(req.body);
//     await newEntry.save();
//     res.status(201).json({ message: "Support query saved." });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get("/admin/support-notifications", async (req, res) => {
  try {
    const supportQueries = await SupportModel.find()
      .sort({ _id: -1 }) // latest first
      .limit(10); // show latest 10 messages
    res.status(200).json(supportQueries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//admin reply user
router.post("/admin/reply-support", async (req, res) => {
  const { userId, replyMessage } = req.body;
  if (!userId || !replyMessage) return res.status(400).send("Missing fields");

  // 1. Find the support message entry
  const supportEntry = await SupportModel.findById(userId);
  if (!supportEntry) return res.status(404).send("Support message not found");

  // 2. Use email from support entry
  const userEmail = supportEntry.email;

  // 3. Send email reply
  await HelpSupportUserQueryReply_Email(userEmail, "Support Reply", replyMessage);

  // 4. Delete the support entry
  await SupportModel.findByIdAndDelete(userId);

  res.send("Reply sent");
});






export default router;
