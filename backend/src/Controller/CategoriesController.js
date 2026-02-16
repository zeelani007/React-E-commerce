import Category from "../Modal/CategoriesModal.js"
//add new Category
export const addCategory = async (req, res) => {
    try {
        const {category} = req.body;
        if(!category) {
            return res.status(404).json({message:"Category name is required"});
        }
            const existingCategory = await Category.findOne({category});
            if(existingCategory) {
                return res.status(409).json({message: "Category already exists"});
            }
            const categorys = new Category({category});
            await categorys.save();
            res.status(201).json({message: "Category created", category})
        }catch(error) {
             console.log('Server Error', error)
            res.status(500).json({message: "Server error", error})
        }
    }


    // get all categories
    export const getAllCategories = async (req, res) => {
        try {
            const categories = await Category.find().sort({createdAt: -1})
            res.status(201).json({categories})
        }catch(error) {
            res.status(500).json({message: "Server error", error})
        }
    }


export  const deleteCategories = async (req, res) => {
        try {
            const {id} = req.params;
            const categoriesdelete = await Category.findOneAndDelete({_id: id})
            if(!categoriesdelete) {
                return res.status(404).json({message: "Category not found"})
            }
            res.status(200).json({message: "Categories deleted successfully"})
        }catch(error) {
            res.status(500).json({message: "Failed to delete Categories Server Error", error})
        }
    }