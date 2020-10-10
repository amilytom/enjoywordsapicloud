var express = require("express");
var router = express.Router();

// 引入自定义的教材controller
const BookController = require("../controllers/book");

// 定义教材列表路由，get请求
router.get("/", BookController.list);
// 定义单条教材路由，get请求
router.get("/:bid", BookController.info);
// 定义添加教材路由，post请求
router.post("/", BookController.add);
// 定义修改教材路由，put请求
router.put("/", BookController.update);
// 定义删除教材路由，delete请求
router.delete("/", BookController.remove);

module.exports = router;
