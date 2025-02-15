const { createFaq, findAllfaq } = require("../../services/faq.service");

const createFaqController = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "please enter faqs",
      });
    }

    const faq = await createFaq(payload);

    return res.status(201).json({
      success: true,
      message: "created",
      data: faq,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getFaqController = async (req, res) => {
  try {
    const faqs = await findAllfaq();

    if (!faqs) {
      return res.status(404).json({
        success: false,
        message: "faqs not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "faqs",
      data: faqs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createFaqController, getFaqController };
