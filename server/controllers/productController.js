import ProductModel from "../models/productModel.js";

export const createProductController = async(request, response) => {
  try {
    const {
      name ,
      image ,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = request.body
  } catch (error) {
    
  }
}