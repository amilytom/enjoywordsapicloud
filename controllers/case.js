// 引入公共方法
const Common = require("../utils/common");

// 引入Class表的model
const CaseModel = require("../models/case");

// 引入单词表的model
const WordModel = require("../models/word");

// 引入词性表的model
const SpeechModel = require("../models/speech");

// 引入常量
const Constant = require("../constant/constant");

// 引入dateformat包
const dateFormat = require("dateformat");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// 配置对象
let exportObj = {
  list,
  info,
  add,
  update,
  remove,
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取单词教材列表方法
function list(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.query, ["page", "rows"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 根据前端提交参数计算SQL语句中需要的offset，即从多少条开始查询
        let offset = req.query.rows * (req.query.page - 1) || 0;
        // 根据前端提交参数计算SQL语句中需要的limit，即查询多少条
        let limit = parseInt(req.query.rows) || 20;
        // 设定一个查询条件对象
        let whereCondition = {};
        // 如果查询单词教材名存在，查询对象增加单词教材名
        if (req.query.example) {
          //whereCondition.example = req.query.example; //精确查询
          whereCondition.example = { [Op.like]: `%${req.query.example}%` }; //模糊查询
        }
        if (req.query.translation) {
          //whereCondition.translation = req.query.translation; //精确查询
          whereCondition.translation = {
            [Op.like]: `%${req.query.translation}%`,
          }; //模糊查询
        }
        // 通过offset和limit使用model去数据库中查询，并按照创建时间排序
        CaseModel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [["created_at", "DESC"]],
          include: [
            {
              model: WordModel,
              attributes: ["word"],
              where: {
                word: { [Op.like]: `%${req.query.word}%` },
              },
            },
            {
              model: SpeechModel,
              attributes: ["pos", "posname"],
            },
          ],
          raw: true,
        })
          .then(function (result) {
            // 查询结果处理
            // 定义一个空数组list，用来存放最终结果
            let list = [];
            //console.log(result);
            // 遍历SQL查询出来的结果，处理后装入list
            result.rows.forEach((v, i) => {
              let obj = {
                id: v.id,
                wordid: v.wordid,
                word: v["Word.word"],
                example: v.example,
                voice: v.voice,
                translation: v.translation,
                posid: v.posid,
                pos: v["Speech.pos"],
                posname: v["Speech.posname"],
                createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              list.push(obj);
            });
            // 给返回结果赋值，包括列表和总条数
            resObj.data = {
              list,
              count: result.count,
            };
            // 继续后续操作
            cb(null);
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取单条单词教材方法
function info(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["id"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 使用admin的model中的方法查询
        CaseModel.findByPk(req.params.id, {})
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                id: result.id,
                wordid: result.wordid,
                example: result.example,
                voice: result.voice,
                translation: result.translation,
                posid: result.posid,
                createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.CASE_NOT_EXSIT);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 添加单词教材方法
function add(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(
        req.body,
        ["wordid", "example", "voice", "translation", "posid"],
        cb
      );
    },
    // 添加方法，依赖校验参数方法
    add: (cb) => {
      // 使用admin的model中的方法插入到数据库
      CaseModel.create({
        wordid: req.body.wordid,
        example: req.body.example,
        voice: req.body.voice,
        translation: req.body.translation,
        posid: req.body.posid,
      })
        .then(function (result) {
          // 插入结果处理
          // 继续后续操作
          cb(null);
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 修改单词教材方法
function update(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(
        req.body,
        ["id", "wordid", "example", "voice", "translation", "posid"],
        cb
      );
    },
    // 更新方法，依赖校验参数方法
    update: (cb) => {
      // 使用admin的model中的方法更新
      CaseModel.update(
        {
          wordid: req.body.wordid,
          example: req.body.example,
          voice: req.body.voice,
          translation: req.body.translation,
          posid: req.body.posid,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
        .then(function (result) {
          // 更新结果处理
          if (result[0]) {
            // 如果更新成功
            // 继续后续操作
            cb(null);
          } else {
            // 更新失败，传递错误信息到async最终方法
            cb(Constant.CASE_NOT_EXSIT);
          }
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 删除单词教材方法
function remove(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ["id"], cb);
    },
    remove: (cb) => {
      // 使用admin的model中的方法更新
      CaseModel.destroy({
        where: {
          id: req.body.id,
        },
      })
        .then(function (result) {
          // 删除结果处理
          if (result) {
            // 如果删除成功
            // 继续后续操作
            cb(null);
          } else {
            // 删除失败，传递错误信息到async最终方法
            cb(Constant.CASE_NOT_EXSIT);
          }
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}
