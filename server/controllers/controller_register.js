const { createErrorResponse } = require("../../helpers/responseHelpher");
const commonFunctions = require("../../utils/commonFunctions");
const registerService = require("../../services/register_services");
const { ERROR_TYPES, MESSAGES } = require("../../utils/constants");

module.exports = {
    register_user: async (req, res)=> {
        
        try {
            const { name, email, pass, phone} = req.body;
            let newRegisterData = {
                name, email, pass: commonFunctions.hashPassword(pass), phone
            }

            const isUserExists = await registerService.findOne({ email });
            if (isUserExists) throw createErrorResponse(MESSAGES.USER_ALREADY_EXISTS, ERROR_TYPES.BAD_REQUEST);
            let createdAccount = await registerService.create(newRegisterData);
            const token = await commonFunctions.encryptJwt({ userId: createdAccount._id, date: Date.now()});
            console.log(token);
            res.status(200).json({
                msg: "Successfully registered",
                token,
                createdAccount
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({
                errMsg: err.message
            });
        }
    },
    
    login_user: async (req, res) => {
        try {
            const {email, pass} = req.body
            
            const user = await registerService.findOne({ email});
            if (!user || !commonFunctions.compareHash(pass, user.pass || '')) throw createErrorResponse(MESSAGES.INVALID_USER, ERROR_TYPES.BAD_REQUEST);
            const token = await commonFunctions.encryptJwt({ userId: user._id, date: Date.now()});
            res.status(200).json({
                data: user,
                token
            });
            
        } catch(err) {
            console.log(err.message, ">>>>>>>>>>>>>");
            res.status(400).send({errMgs: err.message});
        }
    },
}