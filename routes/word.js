var express = require("express");
var router = express.Router();

// 引入自定义的单词controller
const WordController = require("../controllers/word");

// 定义单词列表路由，get请求
router.get("/", WordController.list);
// 定义单条单词路由，get请求
router.get("/:wid", WordController.info);
// 定义添加单词路由，post请求
router.post("/", WordController.add);
// 定义修改单词路由，put请求
router.put("/", WordController.update);
// 定义删除单词路由，delete请求
router.delete("/", WordController.remove);

module.exports = router;
