import { Term } from "../models/index.js";

const getTerm = async () => {
    const test = await Term.findAll();
    console.log(test)
    const response = await Term.findOne();
    return response;
}

export {
    getTerm,
}