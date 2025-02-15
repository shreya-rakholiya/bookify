const {
  findAllNewsLetter,
  deleteNewsLetter,
} = require("../../services/newsLetter.service");

const getNewsLetterController = async (req, res) => {
  try {
    const newsLetter = await findAllNewsLetter();
    if (!newsLetter) {
      return res.status(404).json({
        success: false,
        message: "No newsletter found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "newsLetter Details",
      data: newsLetter,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteNewsLetterController = async (req, res) => {
  try {
    const newsLetter = req.body;
    if (!newsLetter) {
      return res.status(400).json({
        success: false,
        message: "Enter newsletter details",
      });
    }

    const deletedNewsLetter = await deleteNewsLetter(newsLetter);
    console.log(deletedNewsLetter);
    if (!deletedNewsLetter) {
      return res.status(404).json({
        success: false,
        message: "newsLetter not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "newsLetter Deleted successfully",
      deletedNewsLetter,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getNewsLetterController,
  deleteNewsLetterController
};
