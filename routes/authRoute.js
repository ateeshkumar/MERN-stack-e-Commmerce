import express from "express";
import registerController, { forgotPassword, loginController, testController } from '../controllers/authController.js';
import { adminAccess, requestSignIn } from "../middleware/authMiddleware.js";
const route = express.Router();

route.post('/register',registerController);
route.post('/login',loginController);
route.get('/test',requestSignIn,adminAccess,testController);
route.get('/user-auth',requestSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
route.get('/admin-auth',requestSignIn,adminAccess,(req,res)=>{
    res.status(200).send({ok:true});
});
route.post('/forgot-password',forgotPassword);
export default route;