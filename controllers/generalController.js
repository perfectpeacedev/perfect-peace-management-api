import {getNews} from "../services/news.js";
import { getStudentContact, getTeacherContact, sendResetPin } from "../services/resetPin.js";
import { getStudents } from "../services/test.js";
import { changeStudentPassword, changeTeacherPassword, getStudentDetails, getTeacherDetails } from "../services/user.js";


const fetchNews = async (req, res, next) => {
    try {
        const data = await getNews();
        res.json(data);
    } catch (error) {
        console.log(error)
        next(error)
    }
}


const fetchUserDetails = async (req, res, next) => {
    const { userRole, id } = req.params.user;

    try {
        
        if(!userRole){
            throw new Error("Not loggedn");
        }

        if(userRole === "STAFF"){
            const data = await getTeacherDetails(id)
            res.json(data)
        }else{
            const data = await getStudentDetails(id);
            res.json(data);
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

const resetPin = async (req, res, next) => {
    const { userRole, id } = req.params.user;
    let contact = "";
    try {
        
        
        if(!userRole){
            throw new Error("Not loggedn");
        }

        if(userRole === "STAFF"){
            contact = await getTeacherContact(id);
        }else{
            contact = await getStudentContact(id);
        }

        const data = await sendResetPin([contact]);

        res.json(data)


    } catch (error) {
        console.log(error)
        next(error)
    }
}

const updatePassword = async (req, res, next) => {
    const { userRole, id } = req.params.user;
    const { password } = req.body;
    let response;

    try {
        
        if(!userRole){
            throw new Error("Not loggedn");
        }

        if(userRole === "STAFF"){
            response = await changeTeacherPassword(id, password);
        }else{
            response = await changeStudentPassword(id, password);
        }

        res.json(response)


    } catch (error) {
        console.log(error)
        next(error)
    }
}


export {
    fetchNews,
    fetchUserDetails,
    resetPin,
    updatePassword
}

