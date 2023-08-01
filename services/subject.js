import { Subject } from "../models/index.js";

const subjects = async () => {
    return await Subject.findAll();
}

export {subjects};