var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const MeanController = require("../controllers/mean");

// 定义单词列表路由，get请求
router.get("/", MeanController.list);
// 定义单条单词路由，get请求
router.get("/:mid", MeanController.info);
// 定义添加单词路由，post请求
router.post("/", MeanController.add);
// 定义修改单词路由，put请求
router.put("/", MeanController.update);
// 定义删除单词路由，delete请求
router.delete("/", MeanController.remove);

module.exports = router;
