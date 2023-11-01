import fs from 'fs';
import productModel from '../models/productModel.js';
import slugify from 'slugify';
const cerateProductController=async(req,res)=>{
    try {
        const {name,description,price,category,quantity,shipping} =  req.fields;
        const {photo} = req.files;
        if(!name || !description || !price || !category || !quantity){
           return res.status(400).send({
                success: false,
                massage:'Please fill all the fields'
            });   
        }
        if(!photo || photo.size>1000000){
            return res.status(400).send({
                success: false,
                massage:'Please upload a less then 1mb photo'
            });
        }
        const product = await productModel({...req.fields, slug:slugify(name)});
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
        await product.save();
        res.status(200).send({
            success: true,
            massage:'Product created successfully',
            product
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            massage:'Error in creating product',
            error
        });
    }
}

export const getAllProductsController=async(req,res)=>{
    try {
        const products = await productModel.find({}).select('-photo').populate('category').limit(15).sort({createdAt:-1});
        res.status(200).send({
            success: true,
            massage:'All products',
            countTotal:products.length,
            products
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in getting all products',
            error
        })
    }
}

export const getSingleProductController=async(req,res)=>{
    try {
        const {slug} = req.params;
        const products = await productModel.findOne({slug}).select('-photo').populate('category');
        res.status(200).send({
            success:true,
            massage:'single product',
            products,
        });
        
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in getting single product',
            error
        })
    }
}

export const getProductPhotoController=async(req,res)=>{
    try {
        const {pid} = req.params;
        const products = await productModel.findById(pid).select('photo');
        if(products.photo.data){
            res.set('Content-type',products.photo.contentType);
            res.status(200).send(products.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in getting product photo',
            error
        })
    }
}
export const deleteProductController = async(req,res)=>{
    try {
        const {id} = req.params;
        const products = await productModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            massage:'product deleted successfully',
            products
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in deleting product',
            error
        })
    }
}
export const updateProductController = async(req,res)=>{
    try {
        const {slug} = req.params;
        const {name,description,price,category,quantity,shipping} =  req.fields;
        const {photo} = req.files;
        if(!name || !description || !price || !category || !quantity){
           return res.status(400).send({
                success: false,
                massage:'Please fill all the fields'
            });   
        }
        if(!photo || photo.size>1000000){
            return res.status(400).send({
                success: false,
                massage:'Please upload a less then 1mb photo'
            });
        }
        const product = await productModel.findByIdAndUpdate(slug,{...req.fields, slug:slugify(name)},{new:true});
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
        await product.save();
        res.status(200).send({
            success: true,
            massage:'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            massage:'Error in updateing product',
            error
        });
    }
}
export const productFilterController = async(req,res)=>{
    try {
        const {checked,radio} = req.body;
        let args = {};
        if(checked.length>0) args.category = checked;
        if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            massage:'Product filters successfully',
            products,
        })


    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'Error in product filters',
            error
        })
    }
}
export const productCountController=async(req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            massage:'successfully count',
            total,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in count',
            error,
        })
    }
}

export const productListController = async(req,res)=>{
    try {
        const {page} = req.params;
        const perPage = 6;
        const products = await productModel.find({})
        .select('-photo')
        .skip((page -1)*perPage)
        .limit(perPage)
        .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            massage:'successfully list the product',
            products
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in list',
            error
        })
    }
}

export const searchProductController= async(req,res)=>{
    try {
        const {keyword} = req.params;
        const result = await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}},
            ],
        }).select("-photo")
        res.json(result);
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in search',
            error,
        })
    }
}

export const relatedProductController = async(req,res)=>{
    try {
        const {pid,cid} = req.params;
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select('-photo').limit(3).populate('category');
        res.status(200).send({
            success:true,
            massage:'related product found successfully',
            products,
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in related product',
            error,
        })
    }
}
export default cerateProductController;