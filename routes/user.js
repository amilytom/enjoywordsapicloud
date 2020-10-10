var express = require("express");
var router = express.Router();

// 引入自定义的用户controller
const UserController = require("../controllers/user");

// 定义用户列表路由，get请求
router.get("/", UserController.list);
// 定义单条用户路由，get请求
router.get("/:uid", UserController.info);
// 定义添加用户路由，post请求
router.post("/", UserController.add);
// 定义修改用户路由，put请求
router.put("/", UserController.update);
// 定义更改用户密码路由，put请求
router.put("/pwd", UserController.updatePwd);
// 定义删除用户路由，delete请求
router.delete("/", UserController.remove);

module.exports = router;
