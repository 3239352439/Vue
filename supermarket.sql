/*
Navicat MySQL Data Transfer

Source Server         : 666
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : supermarket

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-01-13 16:36:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `receiveId` int(255) NOT NULL AUTO_INCREMENT COMMENT '收货地址id',
  `linkMan` varchar(255) DEFAULT NULL COMMENT '联系人',
  `linkPhone` varchar(255) DEFAULT NULL COMMENT '联系电话',
  `userId` int(255) DEFAULT NULL COMMENT '用户id',
  `detailedAddress` varchar(255) DEFAULT NULL COMMENT '详细地址',
  `addressType` varchar(255) DEFAULT NULL COMMENT '地址类型',
  PRIMARY KEY (`receiveId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `carId` int(225) NOT NULL AUTO_INCREMENT COMMENT '购物车Id',
  `userId` int(225) DEFAULT NULL COMMENT '用户id',
  `goodId` int(255) DEFAULT NULL COMMENT '商品id',
  `count` int(12) DEFAULT NULL COMMENT '商品数量',
  PRIMARY KEY (`carId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT COMMENT '大的分类',
  `categoryName` varchar(255) DEFAULT NULL COMMENT '分类名',
  PRIMARY KEY (`categoryId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------

-- ----------------------------
-- Table structure for classifysmall
-- ----------------------------
DROP TABLE IF EXISTS `classifysmall`;
CREATE TABLE `classifysmall` (
  `classifyBigId` int(255) DEFAULT NULL COMMENT '分类大id',
  `classifySmallId` int(255) NOT NULL AUTO_INCREMENT COMMENT '分类小id',
  `classifyName` varchar(255) DEFAULT NULL COMMENT '小分类名称',
  `classifyImg` varchar(255) DEFAULT '' COMMENT '小分类图',
  PRIMARY KEY (`classifySmallId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classifysmall
-- ----------------------------

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `collectId` int(222) NOT NULL AUTO_INCREMENT COMMENT '收藏id',
  `userId` int(222) DEFAULT NULL COMMENT '用户id',
  `goodId` int(222) DEFAULT NULL COMMENT '收藏的商品',
  PRIMARY KEY (`collectId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `orderId` int(255) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `userId` int(255) DEFAULT NULL COMMENT '用户id',
  `status` varchar(255) DEFAULT NULL COMMENT '订单状态',
  `goodId` int(255) DEFAULT NULL COMMENT '商品id',
  `count` int(11) DEFAULT NULL COMMENT '商品数量',
  PRIMARY KEY (`orderId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `goodId` int(255) NOT NULL COMMENT '商品id',
  `goodName` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `originalPrice` float(10,2) DEFAULT NULL COMMENT '原价',
  `Price` float(10,2) DEFAULT NULL COMMENT '折扣价',
  `capacity` varchar(255) DEFAULT NULL COMMENT '商品数量',
  `size` varchar(255) DEFAULT NULL COMMENT '商品规格',
  `describe` varchar(255) DEFAULT NULL COMMENT '商品描述',
  `classifySmallId` varchar(255) DEFAULT NULL COMMENT '小分类',
  PRIMARY KEY (`goodId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------

-- ----------------------------
-- Table structure for productimg
-- ----------------------------
DROP TABLE IF EXISTS `productimg`;
CREATE TABLE `productimg` (
  `goodImgId` varchar(255) DEFAULT NULL COMMENT '商品图片',
  `goodId` int(20) DEFAULT NULL COMMENT '商品id',
  `ImgUrl` varchar(255) DEFAULT NULL COMMENT '商品图片',
  `detailsImg` varchar(255) DEFAULT NULL COMMENT '商品详情图'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of productimg
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(255) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userName` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `phone` int(255) DEFAULT NULL,
  `headeImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '头像',
  `carId` int(100) unsigned zerofill DEFAULT NULL COMMENT '购物车id',
  `time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
