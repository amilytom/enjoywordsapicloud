var express = require("express");
var router = express.Router();

// 引入自定义的字典controller
const DictController = require("../controllers/dict");

// 定义字典列表路由，get请求
router.get("/", DictController.list);
// 定义单条字典路由，get请求
router.get("/:did", DictController.info);
// 定义添加字典路由，post请求
router.post("/", DictController.add);
// 定义修改字典路由，put请求
router.put("/", DictController.update);
// 定义删除字典路由，delete请求
router.delete("/", DictController.remove);

module.exports = router;
