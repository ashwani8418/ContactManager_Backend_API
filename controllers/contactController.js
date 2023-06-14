const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET/api/contacts
// @access private

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({
    contacts,
  });
});

// @desc create a contact
// @route POST/api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, phone, cityName } = req.body;
  if (!name || !email || !phone || !cityName) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const emailAvailable = await Contact.findOne({email});
  if(emailAvailable){
    res.status(400);
    throw new Error(`Contact already saved with the email is ${email}`);
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    cityName,
    user_id: req.user.id,
  });
  console.log(contact);
  res.status(200).json({ contact });
});

// @desc Get a contacts with id
// @route GET/api/contacts/id
// @access private
const getContact = asyncHandler(async (req, res) => {
  
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found😒");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to see other user contact");
  }
  res.status(200).json({
    contact,
  });
});

// @desc Update a contacts with id
// @route PUT/api/contacts/id
// @access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found😒");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ updatedContact });
});

// @desc Delete a contacts with id
// @route DELETE/api/contacts/id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found😒");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contact");
  }
  await Contact.deleteOne({_id : req.params.id});
  res.status(200).json(contact);
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
