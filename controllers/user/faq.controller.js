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

  module.exports={getFaqController}