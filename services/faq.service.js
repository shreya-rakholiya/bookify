const faqModel = require("../models/faq")

const createFaq=async(input)=>{
    const faq=await new faqModel(input).save();
    return faq;
}

const findAllfaq=async()=>{
    const faqs=await new faqModel.find();
    return faqs;
}

const deleteFaq=async(query)=>{
    const faq=await new faqModel.deleteMany(query);
    return faq;
}

module.exports={
    createFaq,
    findAllfaq,
    deleteFaq
}