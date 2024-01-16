const {Router}=require("express");
const { getGoalsList, saveGoals, updateGoals, deleteGoals } = require("../controllers/GoalsListController");

const router=Router()

router.get("/get",getGoalsList);
router.post("/saveGoals",saveGoals);
router.put("/updateGoals/:id",updateGoals);
router.delete("/deleteGoals/:id",deleteGoals);

module.exports=router;