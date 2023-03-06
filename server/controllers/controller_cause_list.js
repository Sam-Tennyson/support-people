const CauseList = require("../models/cause_list_schema");
module.exports = {
    addCauseNow: async (req, res) =>  {
        const data  = new CauseList(req.body)
        try {
            const newData = await data.save()
            res.status(201).json({
                success: true,
                message: 'New cause created successfully',
                Cause: newData,
            });
        } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        }
    },
    getAllCauseListData: async (req, res) => {
        try {
            const data = await CauseList.find()
            res.json({data, totalCount: data.length})
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
            const data = await CauseList.findById(req.params.id)
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
            const data = await CauseList.findById(req.params.id)
            data.title = req.body.title
            data.description = req.body.description
            res.status(201).json({
                success: true,
                message: 'Data Updated successfully',
                Cause: data,
            });
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
            const data = await CauseList.findByIdAndRemove(req.params.id)
            res.status(201).json({
                success: true,
                message: 'Data Deleted Successfully',
                Cause: data,
            });
        } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });  
        }
    }
}


