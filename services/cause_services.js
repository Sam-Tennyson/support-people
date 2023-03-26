const { CauseSchema } = require("../server/models/cause_list_schema");

let causeService = {}

/**
* function to create.
*/
causeService.create = async (payload) => await new CauseSchema(payload).save();

/**
* function to find one.
*/
causeService.findOne = async (criteria, projection = {}) => await CauseSchema.findOne(criteria, projection).lean();


module.exports = causeService;