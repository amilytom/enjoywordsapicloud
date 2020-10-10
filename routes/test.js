var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const TestController = require("../controllers/test");

// 定义单词列表路由，get请求
router.get("/", TestController.list);
// 定义单条单词路由，get请求
router.get("/:tid", TestController.info);
// 定义添加单词路由，post请求
router.post("/", TestController.add);
// 定义修改单词路由，put请求
router.put("/", TestController.update);
// 定义删除单词路由，delete请求
router.delete("/", TestController.remove);

module.exports = router;
