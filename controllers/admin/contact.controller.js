const { deleteContact, findContact, findAllContact } = require("../../services/contact.service");

const getAllContactController = async (req, res) => {
  try {
    const contacts = await findAllContact();

    if (!contacts) {
      return res.status(404).json({
        success: false,
        message: "no contacts are found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "contact Details",
      data: contacts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteContactController = async (req, res) => {
  try {
    const contact = req.body;
    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "enter author detail",
      });
    }

    const deletedContact = await deleteContact(contact);

    console.log(deletedContact);

    if (!deleteContact) {
      return res.status(404).json({
        success: false,
        message: "contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "contact deleted successfully",
      deletedContact,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllContactController,
  deleteContactController,
};
