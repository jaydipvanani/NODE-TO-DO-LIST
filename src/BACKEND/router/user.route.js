let express = require("express");
let route = express.Router();
const { userController } = require("../controller");


route.post("/adduser", userController.adduser);

route.get("/getuser", userController.getuser)

route.delete("/deleteuser/:id"  , userController.deleteuser )

route.put("/updateuser/:id",userController.updateuser)


module.exports = route;
