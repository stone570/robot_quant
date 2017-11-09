#!/usr/bin/python
#coding=utf-8

'''
全局变量

'''
# 策略ID
strategyId = "3"
# 开始日期
startDateStr = ''
# 截至日期
endDateStr = ''

# 初始化资金
initMoney = 0.0

# 初始化返还金额  （卖出股票为正，买入股票为负）
tradeMoney = 0

orderList = {}
positionList = {}

# 自定义参数词典
diyParams = {}

periodType='D'
changePeriod=20

currentPeriod = 1


# 设置手续费
# 买入时万分之三
buyCost=0.0003
# 卖出时万分之三加千分之一印花税
sellCost=0.0013
# 每笔交易最低扣5块钱
minCost=5
