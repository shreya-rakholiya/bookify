import { Response } from "express";
import { Request } from "../../types/request";
import { bookModel } from "../../models/book";
import { reviewModel } from "../../models/review";

export const getReviewsOfBookController=async(req:Request,res:Response)=>{
    try{

    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

export const getAllBooksWithReviewsController = async (req: Request, res: Response) => {
    try {
      // Since we're starting from the Book model, first get all books
      const books = await bookModel.find();
      
      // Map through books and add reviews to each book
      const booksWithReviews = await Promise.all(
        books.map(async (book) => {
          // Find all reviews for this book and populate user information
          const bookReviews = await reviewModel.find({ bookId: book._id })
            .populate('user', 'name email profilePicture')
            .lean();
          
          // Convert book to plain object and add reviews
          return {
            ...book.toObject(),
            reviews: bookReviews,
            reviewCount: bookReviews.length
          };
        })
      );
      
      return res.status(200).json({
        success: true,
        data: booksWithReviews
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };
  