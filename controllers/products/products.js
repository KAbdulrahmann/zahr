import Product from "../../models/Product.js";
import ProductStat from "../../models/ProductStat.js";




export const getProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      
      // const productsWithStats = await Promise.all(
      //   products.map(async (product) => {
      //       const stat = await ProductStat.find({
      //           productId: product._id
      //       })
      //       return {
      //           ...product._doc,
      //           stat,
      //       }
      //   })
      // );
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

// add product function
export const addProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  
  // update product function
  export const updateProduct = async (req, res) => {
    const { id: _id } = req.params;
    const product = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No product with that id");
  
    const updatedProduct = await Product.findByIdAndUpdate(_id, {...product, _id}, { new: true });
  
    res.json(updatedProduct);
  };
  
  // delete product function
  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No product with that id");
  
    await Product.findByIdAndRemove(id);
  
    res.json({ message: "Product deleted successfully" });
  };
  
    // get product function
  export const getProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
  
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
