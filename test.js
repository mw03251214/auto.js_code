//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");

云闪付();

function 云闪付() {
    var appName = "云闪付";
    //closeApp(appName);
    func.toApp(appName);
    while (className("TextView").text("我 的").findOnce() == null) {
        sleep(1000);
    }
    sleep(1500);
    func.sClick(className("TextView").text("首 页").findOnce());
    //点击签到按钮
    func.sClick(id("com.unionpay:id/frog_float_notgif").findOne());
    // 等待签到页面加载
    textContains("连续签到").findOne();

    if (text("今日已签到").findOnce() == null) {
        func.sClick(text("立即签到").findOnce());
        sleep(1500);
        /*
        if (text("去抽奖").findOnce() != null) {
            func.sClick(text("去抽奖").findOnce());
            var area, areaP;
            while (1) {
                try {
                    area = id("com.unionpay:id/tv_title").text("签到抽奖专区").findOnce();
                    areaP = area.parent();
                    sleep(2000);
                    func.cClick(areaP.parent().child(2).child(0).child(0).child(0).child(0).child(0).child(3));
                    idContains("resultBtn").findOnce();
                    break;
                } catch (err) {
                    sleep(2500);
                }
            }
        }
        */
    }
    toastLog(appName + "已签到");
    sleep(1000);
}
