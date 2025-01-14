import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js';

const router = express.Router()

// Register a company
router.post('/register', upload.single('image') , registerCompany);

// Company Login
router.post('/login', loginCompany)

// Get Company Data
router.get('/company', getCompanyData)

// Post a Job
router.post('/post-job', postJob)

// Get Applicants data of Company
router.get('/applicants', getCompanyJobApplicants)

// Get Company job List
router.get('/list-job', getCompanyPostedJobs)

// Change Application Status
router.post('/change-status', changeJobApplicationStatus)

// Change Applications Visibility
router.post('/change-visibility', changeVisibility)

export default router;
