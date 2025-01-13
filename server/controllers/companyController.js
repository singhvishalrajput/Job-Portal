
// Register a new company
export const registerCompany = async (req, res) =>{

    const { name, email, password } = req.body

    const imageFile = req.file;

    if(!name || !name || !password || !image){
        return res.json({success:false, message:'Missing Details'})
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