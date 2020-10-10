var express = require("express");
var router = express.Router();

// 引入自定义的班级controller
const ClassController = require("../controllers/class");

// 定义班级列表路由，get请求
router.get("/", ClassController.list);
// 定义单条班级路由，get请求
router.get("/:cid", ClassController.info);
// 定义添加班级路由，post请求
router.post("/", ClassController.add);
// 定义修改班级路由，put请求
router.put("/", ClassController.update);
// 定义删除班级路由，delete请求
router.delete("/", ClassController.remove);

module.exports = router;
