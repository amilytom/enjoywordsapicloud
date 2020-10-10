var express = require("express");
var router = express.Router();

// 引入自定义的词性controller
const SpeechController = require("../controllers/speech");

// 定义词性列表路由，get请求
router.get("/", SpeechController.list);
// 定义单条词性路由，get请求
router.get("/:pid", SpeechController.info);
// 定义添加词性路由，post请求
router.post("/", SpeechController.add);
// 定义修改词性路由，put请求
router.put("/", SpeechController.update);
// 定义删除词性路由，delete请求
router.delete("/", SpeechController.remove);

module.exports = router;
