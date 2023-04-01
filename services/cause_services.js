const { CauseSchema } = require("../server/models/cause_list_schema");

let causeService = {}

/**
* function to create.
*/
causeService.create = async (payload) => await new CauseSchema(payload).save();

/**
* function to update one.
*/
causeService.findOneAndUpdate = async (criteria, dataToUpdate, projection = {}) => await CauseSchema
  .findOneAndUpdate(criteria, dataToUpdate, projection).lean();


/**
* function to find one.
*/
causeService.findOne = async (criteria, projection = {}) => await CauseSchema.findOne(criteria, projection).lean();


module.exports = causeService;