import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
// @ts-ignore
import imgbbUploader from 'imgbb-uploader';
import cloudinary from 'cloudinary';
import path from 'path'
import userModel from "./user.model";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";
import cloudStore from "../../utils/fileManagement/cloudStore";
import deleteFastFile from "../../lib/file/deleteFastFile";
import parsedURL from "../../lib/file/parsedUrl";
import { photoUpload } from "../../utils/fileManagement/upload.config";
import axios from "axios";
import { deleteImageFromCloudinary } from "../../lib/cloudinary/deleteImage";

// Create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body
        const result = await UserService.createUserToDB(user)
        sendApiResponse(res, 200, true, 'User created successfully', result)
    } catch (error) {
        next(error)
    }
}

// Get users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers();
    sendApiResponse(res, 200, true, 'Users fetched successfully', result)
}

/**
 * JWT GENERATE TOKEN WHEN SIGN IN USER
 * -------------------------------------
 * When user will sign in, then jwt token will be generated.
 * You can use this jwt token in Authorization. 
 * */

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    // const password = req.body.password;

    // const user = email

    /**
     * You can check the user email and password Here ;
     * If successfully login user, then sign token will be generated else Unauthorized user,Invalid Login
     * */

    // Check if the email exists in the database
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Sign in jwt token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessExpire = process.env.JWT_ACCESS_EXPIRES_IN;

    const token = jwt.sign({ user }, `${accessTokenSecret}`, {
        expiresIn: `${accessExpire}`
    })

    res.status(200).json({
        success: true,
        user: user,
        token: token
    });
}


// File Uploading
const fileUpload = async (req: Request, res: Response, next: NextFunction) => {

    // ========UPLOAD FILES LOCALLY=========
    // try {
    //     // Handle photo upload, only single photo
    //     photoUpload.single('photo')(req, res, async (err) => {
    //         if (err) {
    //             console.error('Error uploading photo:', err);
    //             return next(err);
    //         }

    //         const photoPath = req.file?.path;
    //         const photoURL = `${req.protocol}://${req.get('host')}/` + photoPath?.replace(/\\/g, "/"); //Upload file as URL: http://localhost:5000/uploads/user-1728138253070.png
    //         if (photoURL) {
    //             sendApiResponse(res, 200, true, 'Photo Uploaded Successfully', photoURL)
    //         }
    //         else {
    //             sendApiResponse(res, 400, false, 'Error Uploading Photo')
    //         }

    //     })
    // }
    // catch (error) {
    //     next(error)
    // }

    // ===========END OF UPLOAD FILES LOCALLY=========


    //==============Upload into ImgBB===================
    // try {
    //     // Use the Multer middleware to handle the file upload
    //     cloudStore.single('photo')(req, res, async (err: any) => {
    //         if (err) {
    //             // Handle Multer error (e.g., file size exceeds limit)
    //             return res.status(400).send(err.message);
    //         }

    //         // Multer has processed the file, and it can be accessed in req.file
    //         const uploadedFile = req.file;

    //         if (!uploadedFile) {
    //             return res.status(400).json({ message: 'No file uploaded' });
    //         }

    //         // Convert buffer to a file path and upload to ImgBB
    //         const imgBBResponse = await imgbbUploader({
    //             apiKey: `${process.env.IMGBB_API_KEY}`, //IMGBB API Key from ENV file
    //             name: path.parse(uploadedFile.originalname).name, // Name for the image
    //             base64string: uploadedFile.buffer.toString('base64') // Convert file buffer to base64
    //         });

    //         // Respond with ImgBB response
    //         res.status(200).json({
    //             message: 'Photo uploaded successfully to ImgBB',
    //             data: imgBBResponse,
    //             imgbbUrl: imgBBResponse.url, // Direct URL to the image
    //             deleteUrl: imgBBResponse.delete_url // URL to delete the image from ImgBB
    //         });
    //     });
    // } catch (error) {
    //     console.error('Error in fileUpload controller:', error);
    //     res.status(500).send('Internal Server Error');
    // }

    //==============END OF UPLOADING INTO IMGBB===================


    //==============Upload into Cloudinary===================

    // try {
    //     // Configure Cloudinary
    //     cloudinary.v2.config({
    //         cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    //         api_key: `${process.env.CLOUDINARY_API_KEY}`,
    //         api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
    //     });

    //     // Use Multer middleware to handle the file upload
    //     cloudStore.single('photo')(req, res, async (err: any) => {
    //         if (err) {
    //             // Handle Multer error (e.g., file size exceeds limit)
    //             return res.status(400).send(err.message);
    //         }

    //         // Multer has processed the file, and it can be accessed in req.file
    //         const uploadedFile = req.file;

    //         if (!uploadedFile) {
    //             return res.status(400).json({ message: 'No file uploaded' });
    //         }

    //         // Upload the image to Cloudinary
    //         cloudinary.v2.uploader.upload_stream(
    //             { resource_type: 'image' },
    //             (error, result) => {
    //                 if (error) {
    //                     console.error('Error uploading to Cloudinary:', error);
    //                     return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
    //                 }

    //                 // Respond with Cloudinary response
    //                 res.status(200).json({
    //                     message: 'Photo uploaded successfully to Cloudinary',
    //                     // data: result,
    //                     imgUrl: result?.secure_url, // Direct URL to the image
    //                     publicId: result?.public_id, // Public ID of the image in Cloudinary
    //                 });
    //             }
    //         ).end(uploadedFile.buffer); // Send the file buffer to Cloudinary
    //     });
    // } catch (error) {
    //     console.error('Error in fileUpload controller:', error);
    //     res.status(500).send('Internal Server Error');
    // }

    //==============END OF UPLOADING INTO CLOUDINARY===================
}

// File Deleting
const deleteFileData = async (req: Request, res: Response) => {

    /*
    When you want to delete any product or delete any user information with their photo or other files.
    This deleting method will help you.
    Just fetch the data from database then you will get photo url. just pass this url to parsedURL() method, then
    deleteFastFile() will delete the file
    */

    // ===============DELETE LOCAL FILE============

    // const path = 'http://localhost:5000/uploads/user-1728138253071.png'
    // const urlconversion = parsedURL(path) // convert into uploads/user-1728138253071.png like this
    // if (urlconversion) {
    //     deleteFastFile(urlconversion) // takes the file path as parameter, uploads/user-3843.png and delete it.
    //     sendApiResponse(res, 200, true, 'Deleted file successfully')
    // }
    // else {
    //     console.log('Not Deleted, Try again later')
    // }

    // ===============END OF DELETING LOCAL FILE============



    //==========DELETE IMAGE FROM CLOUDINARY============

    // const publicId = req.query.publicId as string; // Get publicId from the query parameter

    // if (!publicId) {
    //     return res.status(400).json({ message: 'No public ID provided' });
    // }

    // try {
    //     const result = await deleteImageFromCloudinary(publicId); // Function will delete the image

    //     if (result.result === 'ok') {
    //         res.status(200).json({ message: 'Image deleted successfully from Cloudinary' });
    //     } else {
    //         res.status(400).json({ message: 'Failed to delete image from Cloudinary', result });
    //     }
    // } catch (error: any) {
    //     console.error(error);
    //     res.status(500).json({ message: error.message });
    // }


    // ==========END OF DELETE IMAGE FROM CLOUDINARY =====
}


// These are accessible from different files.
export const userController = {
    createUser,
    getUsers,
    signInUser,
    fileUpload,
    deleteFileData
}