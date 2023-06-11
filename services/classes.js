import { Class } from "../models/index.js";

const classes = async () => {
    return await Class.findAll({
        attributes: ["name"]
    });
}

export {classes};