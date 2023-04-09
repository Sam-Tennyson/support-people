
const JWT = require("jsonwebtoken");
const causeService = require("../../services/cause_services");
const registerService = require("../../services/register_services");
const commonFunctions = require("../../utils/commonFunctions");
const { CauseSchema } = require("../models/cause_list_schema");

module.exports = {
    addCauseNow: async (req, res) =>  {
        
        try {
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
                token = req.headers.authorization.split(" ")[1] 
                let {userId, date, iat} = commonFunctions.decryptJwt(token)
                let {title, description} = req.body
                let newData = {
                    title,
                    description,
                    userId
                } 
                // console.log(newData, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,")
                const createdCause = await causeService.create(newData)
                res.status(201).json({
                    success: true,
                    createdCause
                })
            }
        } catch(error) {
            res.status(401).json({
                message :"Auth Failed",
                error
            })
        }
       
    },
    getAllCauseListData: async (req, res) => {
        try {
            
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
                token = req.headers.authorization.split(" ")[1] 
                let {userId, date, iat} = commonFunctions.decryptJwt(token)

                // With Pagination
                const limitValue = req.query.limit || 2
                const skipValue = req.query.skip || 0
                const allValue = req.query.all || 0
                // console.log(allValue)
                if (allValue) {
                    const user = await registerService.findOne({ userId});
                    console.log(user)
                    const data = await CauseSchema.find().populate('userId').limit(limitValue).skip(skipValue)
                    const totalCount = await CauseSchema.count()
                    res.status(200).json({data, totalCount, user})

                } else {                    
                    const data = await CauseSchema.find({userId}).limit(limitValue).skip(skipValue)
                    const totalCount = await CauseSchema.find({userId}).count()
                    res.status(200).json({data, totalCount})
                }
            } else {                    
                res.status(400).json({
                    success: true,
                    message: 'Unauthorized access',
                })
            }
        } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        }
    },
    getCauseDataById: async (req, res)=> {
        try {
            const data = await CauseSchema.findById(req.params.id)
            res.json(data)
        } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        }
    },
    updateCauseDataById: async (req, res)=> {
        try {
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
                token = req.headers.authorization.split(" ")[1] 
                let {userId, date, iat} = commonFunctions.decryptJwt(token)
                const {userId: idd} = await CauseSchema.findById(req.params.id)
                // console.log( ">>", userId,  idd.toString())

                if (idd.toString() == userId) {
                    const data = await CauseSchema.findById(req.params.id)
                    
                    data.title = req.body.title
                    data.description = req.body.description

                    const createdCause = await data.save()
                    res.status(200).json({
                        success: true,
                        message: 'Data Updated successfully',
                        createdCause
                    })

                } else {                    
                    res.status(400).json({
                        success: true,
                        message: 'Unauthorized access',
                    })
                }
            } else {
                res.status(400).json({
                    success: true,
                    message: 'Unauthorized access',
                })
            }
            
        } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            }); 
        }
    },
    
    deleteCauseDataById: async (req, res)=> {
        try {
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
                token = req.headers.authorization.split(" ")[1] 
                let {userId, date, iat} = commonFunctions.decryptJwt(token)
                const {userId: idd} = await CauseSchema.findById(req.params.id)
                // console.log( ">>", userId,  idd)

                if (idd.toString() == userId) {
                    const data = await CauseSchema.findByIdAndRemove(req.params.id)
                    res.status(201).json({
                        success: true,
                        message: 'Data Deleted Successfully',
                        Cause: data,
                    });
                    // console.log("condition success")
                } 
                else {
                    // console.log("condition fail")
                    res.status(400).json({
                        success: true,
                        message: 'Unauthorized access',
                    })
                }
            }

        } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });  
        }
    }
}


