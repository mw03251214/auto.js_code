// 导入模块
var func = require("func_list.js");

func.toApp("京东");
while (true) {
    func.cClick(text("全部").findOnce());
    func.cClick(text("待付款").findOnce());
    func.cClick(text("去支付").findOnce());
    if (func.cClick(id("com.jd.lib.cashier.feature:id/cf").findOnce())) {
        while (func.cClick(text("返回商家").findOnce()) == false) {
            func.sClick(text("立即支付").findOnce());
            func.sClick(text("确认支付").findOnce());
        }
        text("完成").findOne();
    }
    if (func.sClick(text("立即抽奖").findOnce())) {
        text("恭喜你").findOne();
    }
    text("待付款").findOne();
}