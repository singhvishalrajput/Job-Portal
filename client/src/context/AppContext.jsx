import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    });

    const [isSearched, setIsSearched] = useState(false)
    
    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])


    // Function to fetch job data
    const fetchJobs = async () =>{
        try {

            const { data } = await axios.get(backendUrl +'/api/jobs')

            if(data.success){
                setJobs(data.jobs)
                console.log(data.jobs);                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to fetch company Data
    const fetchCompanyData = async() =>{
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: {token: companyToken }})
            
            if(data.success){
                setCompanyData(data.company)
                console.log(data);
                
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    

    useEffect(()=>{
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')

        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }

    },[])

    useEffect(() =>{
        if(companyToken){
            fetchCompanyData()
        }
    }, [companyToken])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}