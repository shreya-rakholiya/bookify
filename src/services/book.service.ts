import { FilterQuery, ObjectId, Types } from "mongoose";
import { Ibook } from "../types/model.types";
import { bookModel } from "../models/book";

export const createBook = async (input: FilterQuery<Ibook>) => {
  const book = await bookModel.create(input)
  return book;
};

export const findBook = async (bookId: any) => {
  const book = await bookModel.findOne({_id:bookId})
  .populate('image')
  .populate('author')
  .populate('category')
  // .populate('reviews')
  .lean();
  console.log(book,"bookkkkk");
  
  return book;
};

export const findAllBook = async () => {
  const books = await bookModel.find()
  .populate('image')
  .populate('author')
  .populate('category')
  // .populate('reviews')
  .lean();
  // console.log(books,"allll boookkkksss");
  
  return books;
};

export const updateBook = async (
  query: FilterQuery<Ibook>,
  update: Partial<Ibook>
) => {
  let book;
  if(update.totalCopies){
     book = await bookModel.updateOne(query, {...update,$inc: { copiesAvailable: update.totalCopies }}, { new: true });
  }else{
    book = await bookModel.updateOne(query, update, { new: true });
  }
  
  return book;
};

export const deleteBook = async (bookId: any) => {
  console.log(bookId,"shfuidhgio");
  
  const book = await bookModel.findByIdAndDelete({ _id: bookId });
  return book;
};

export const updateBookAvailibility = async (
  bookId: Types.ObjectId,
  quantity: number
) => {
  const book = await bookModel.findByIdAndUpdate(
    bookId,
    { $inc: { copiesAvailable: quantity } },
    { new: true }
  );
  console.log(book,"updated boookkk quantittyyyyy");
  
  return book;
};

export const countBook=async()=>{
  const count=await bookModel.countDocuments();
  return count;
}
export const getBookByAuthor=async(aId:ObjectId)=>{
  const book=await bookModel.find({author:aId})
  .populate('image')
  .populate('author')
  .populate('category')
  return book;
}

export const countBookOfAuthor=async(aId:ObjectId)=>{
  const count=await bookModel.countDocuments({author:aId});
  return count;
}