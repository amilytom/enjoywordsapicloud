// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 定义model
const User = seque.define(
  "User",
  {
    // 主键
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 用户名
    username: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    // 密码
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    // 姓名
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    // 学段
    stage: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // 年级
    grade: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // 学期
    term: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // 上次登录时间
    lastLoginAt: {
      type: Sequelize.DATE,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "stu_users",
  }
);

// 导出model
module.exports = User;
