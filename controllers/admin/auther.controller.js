const joi = require("joi");
const {
  createAuthor,
  deleteAuthor,
  updateAuthor,
  findAllAuthor,
} = require("../../services/author.service");


const authorValidate = joi.object({
  name: joi.string().required(),
  bio: joi.string().optional(),
  image: joi.string().optional(),
});

const createAuthorController = async (req, res) => {
  try {
    const payload = await authorValidate.validateAsync(req.body);

    if (!payload) {
      return res.status(400).json({
        success: false,
        msg: "enter author detail",
      });
    }
    const author = await createAuthor(payload);
    return res.status(201).json({
      sucess: true,
      data: author,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteAuthorController = async (req, res) => {
  try {
    const author = req.body;
    if (!author) {
      return res.status(400).json({
        success: false,
        msg: "enter author detail",
      });
    }

    const deletedAuthor = await deleteAuthor(author);

    console.log(deletedAuthor);

    if (!deletedAuthor) {
      return res.status(404).json({
        success: false,
        msg: "Author not found",
      });
    }

    return res.status(200).json({
      success: true,
      deletedAuthor,
      message: "author deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateAuthorController = async (req, res) => {
  try {
    const author = req.body;
    if (!author) {
      return res.status(400).json({
        success: false,
        msg: "enter author detail",
      });
    }
    const updatedAuthor = await updateAuthor(author.find, author.update);

    if (!updatedAuthor) {
      return res.status(404).json({
        success: false,
        msg: "Author not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedAuthor,
      message: "author updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllAuthorController=async(req,res)=>{
    try{
        const allAuthor=await findAllAuthor();

        if(!allAuthor){
            return res.status(404).json({
                success:false,
                message:"no author are found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Author Details",
            data:allAuthor
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = {
  createAuthorController,
  deleteAuthorController,
  updateAuthorController,
  getAllAuthorController
};
