  import { ObjectId, Types } from "mongoose";

  export interface Iuser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    phone: string;
    address: string;
    borrowedBooks: Types.ObjectId[];
    purchasedBooks: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Iauthor {
    _id: string;
    name: string;
    bio: string;
    image: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IblogDetail {
    _id: string;
  }

  export interface Iblog {
    _id: string;
    title: string;
    image:ObjectId
    description: string;
    date: Date;
    createdBy?: ObjectId;
    blogDetail: ObjectId;
  }

  export interface Ibook {
    _id: string;
    title: string;
    image: ObjectId;
    author: string;
    price: number;
    isbn: number;
    category: string;
    publishedYear: number;
    publisher: string;
    description: string;
    totalCopies: number;
    copiesAvailable: number;
    reviews: ObjectId;
  }

  export interface Iborrow {
    _id: string;
    userId: ObjectId;
    bookId: ObjectId;
    orderId: ObjectId;
    borrowDate: Date;
    dueDate: Date;
    returnDate: Date;
    depositeAmount: number;
    status: string;
    depositeRefunded: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Icategory {
    _id: string;
    name: string;
    description: string;
  }

  export interface Icontact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    createdAt: Date;
  }

  export interface Ifaq {
    _id: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Ifine {
    _id: string;
    borrowId: ObjectId;
    user: ObjectId;
    amount: number;
    orderId: ObjectId;
    daysLate: number;
    reason: string;
    status: string;
  }

  export interface Imedia {
    _id: string;
    title: string;
    url: string;
    type: string;
  }

  export interface InewsLetter {
    _id: string;
    email: string;
    subscribedAt: Date;
  }

  export interface Iorder {
    _id: ObjectId;
    user: ObjectId;
    book: ObjectId;
    borrowId: ObjectId;
    fineId: ObjectId;
    purchaseId: ObjectId;
    amount: number;
    paymentType: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    status: string;
  }

  export interface IpasswordReset {
    _id: string;
    user: ObjectId;
    token: string;
    createdAt: Date;
    expiresAt: Date;
  }

  export interface Ipurchase {
    _id: string;
    user: ObjectId;
    book: ObjectId;
    orderId: ObjectId;
    quantity: number;
    purchaseDate: Date;
    totalAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Ireview {
    _id: string;
    user: ObjectId;
    description: string;
  }

  export interface Iwishlist {
    _id: string;
    user: ObjectId;
    book: ObjectId;
    addedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }
