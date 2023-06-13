const express = require("express");
const router = express.Router();

const {
  getContact,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleWare/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
