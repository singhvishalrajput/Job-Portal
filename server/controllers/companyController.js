import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";
import {v2 as cloudinary} from 'cloudinary'

// Register a new company
export const registerCompany = async (req, res) =>{

    const { name, email, password } = req.body
    
    const imageFile = req.file;

    if(!name || !email || !password || !imageFile){
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(imageFile)

        return res.json({success:false, message:'Missing Details'})
    }

    try {
        
        const companyExists = await Company.findOne({email})

        if(companyExists){
            return res.json({success:false, message:'Company already registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name, 
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id : company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({success:false, message: error.message})
    }

}

// Company Login
export const loginCompany = async (req, res) =>{

    

}

// Get Company data 
export const getCompanyData = async(req, res) =>{

}

// Post a new Job
export const postJob = async(req, res) =>{

}

// Get company job applicants
export const getCompanyJobApplicants = async(req, res) =>{

}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async(req, res) =>{

}

// Change Job Application Status
export const changeJobApplicationStatus = async(req, res) =>{

}

// change job Visibility
export const changeVisibility = async(req, res) =>{

}