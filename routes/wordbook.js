var express = require("express");
var router = express.Router();

// 引入自定义的单词教材关系controller
const WordbookController = require("../controllers/wordbook");

// 定义单词教材关系列表路由，get请求
router.get("/", WordbookController.list);
// 定义单条单词教材关系路由，get请求
router.get("/:id", WordbookController.info);
// 定义添加单词教材关系路由，post请求
router.post("/", WordbookController.add);
// 定义修改单词教材关系路由，put请求
router.put("/", WordbookController.update);
// 定义删除单词教材关系路由，delete请求
router.delete("/", WordbookController.remove);

module.exports = router;
