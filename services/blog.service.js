const blogModel = require("../models/blog");

const createBlog = async (input) => {
  const savedBlog = await blogModel(input).save();
  return savedBlog;
};
const findBlog = async (query) => {
  const blog = await blogModel.find(query);
  return blog;
};

const updateBlog = async (query, updates) => {
  const blog = await blogModel.updateMany(query, updates);
  return blog;
};

const deleteBlog = async (query) => {
  const blog = await blogModel.deleteOne(query);
  return blog;
};

module.exports = {
  createBlog,
  findBlog,
  updateBlog,
  deleteBlog,
};
