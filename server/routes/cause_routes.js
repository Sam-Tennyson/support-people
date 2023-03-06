const express = require("express");
const {addCauseNow, getAllCauseListData, getCauseDataById, updateCauseDataById, deleteCauseDataById}  = require("../controllers/controller_cause_list");

const routerr = express.Router()
routerr.post("/causeList", addCauseNow)
routerr.get("/causeList", getAllCauseListData)
routerr.get("/causeList/:id", getCauseDataById)
routerr.put("/causeList/:id", updateCauseDataById)
routerr.delete("/causeList/:id", deleteCauseDataById)

module.exports = routerr