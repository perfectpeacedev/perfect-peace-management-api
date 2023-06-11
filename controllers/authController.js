import { getStudentUser, getTeacherUser, studentSignUp, teacherSignUp } from "../services/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret_key = process.env.JWT_KEY;

const signup = async (req, res, next) => {
    const { indexNumber, password } = req.body;
    let data;
    try {
        
        const [role, id] = indexNumber.split("/");
        console.log(role)
        console.log(id)
        if(role === "STU"){
            data = await studentSignUp(id, password);
        }
        else if(role === "STAFF"){
            data = await teacherSignUp(id, password);
        }

        if(data[0] === 0){
            throw new Error("User already signup")
        }

        res.json(data);

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const signin = async (req, res, next) => {
    const { indexNumber, password } = req.body;
    let user;
    try {
        const [role, id] = indexNumber.split("/");
        console.log(role)
        console.log(id)
        if(role === "STU"){
            user = await getStudentUser(id, password);
            console.log(user)
        }
        else if(role === "STAFF"){
            user = await getTeacherUser(id, password);
        }

        if(!user){
            res.status(404);
            throw Error("Index nunmber or password");
        }

        const payload = {
            id: id,
            userRole: role
        }

        

        const token = await jwt.sign(payload, jwt_secret_key);
        res.status(200).send({
            token: token
        });
    } catch (err) {
        console.log(err)
        next(err)
    }
};

export {
    signin,
    signup
}