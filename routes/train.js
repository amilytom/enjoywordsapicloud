var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const TrainController = require("../controllers/train");

// 定义单词列表路由，get请求
router.get("/", TrainController.list);
// 定义单条单词路由，get请求
router.get("/:eid", TrainController.info);
// 定义添加单词路由，post请求
router.post("/", TrainController.add);
// 定义修改单词路由，put请求
router.put("/", TrainController.update);
// 定义删除单词路由，delete请求
router.delete("/", TrainController.remove);

module.exports = router;
