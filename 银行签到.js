auto.waitFor();
var func = require("func_list.js");

main();
//买单吧();
function main() {
    // 中行缤纷生活();
    // 招商银行();
    中国农业银行();
    什么值得买();
    jd_sign();
    YunShaofu();
    浦发银行();
    //工银e生活();
    //邮储银行();
    浦发信用卡();
    邮储信用卡();
    //华彩生活();
    买单吧();
    alert("已完成.");
}

// ======================签到代码==================================

// 中行缤纷生活
function 中行缤纷生活() {
    // test3
    var appName = "缤纷生活";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    while (text("登录手机号更改").findOnce() == null) {
        func.sClick(text("我的").findOnce());
        sleep(1000);
    }
    // 签到按钮
    var signBtnId = "imgRight";
    while (id(signBtnId).findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    func.sClick(id(signBtnId).findOnce());

    while (text("查看活力奖励>").findOnce() == null) {
        sleep(1000);
        if (textContains("手势登录密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(2500);
    text("查看活力奖励>").findOne();

    var currentWeekday = new Date().getDay();
    // 0 返回的周日 周一返回1，周二2
    if (currentWeekday == 0) {
        currentWeekday = 6
    } else {
        currentWeekday = currentWeekday - 1
    }
    var signFlag, idx, weekdayText, signCnt;
    signCnt = 0;

    while (true) {
        try {
            signFlag = textContains("连续签到").findOnce();
            if (signFlag == null) {
                signCnt = signCnt + 1;
            }
            // 如果查找连续签到超过5次没找到则退出，避免周日找不到的情况
            if (signCnt > 5) {
                break;
            }
            idx = signFlag.indexInParent();
            weekdayText = signFlag.parent().child(idx + 1).child(0).child(currentWeekday).child(0).text();
            //toastLog("weekdayText:" + weekdayText);
            if (weekdayText == "") {
                break;
            } else {
                func.cClick(signFlag.parent().child(idx + 2));
                sleep(3000);
                textContains("每周连续签到7天可获得翻倍").findOne();
                break;
            }
        }
        catch (e) {
            sleep(1000);
        }
    }

    toastLog(appName + "已签到");
    sleep(3000);
}

// 农行小豆
function 中国农业银行() {
    var appName = "中国农业银行";
    //closeApp(appName);
    func.toApp(appName);
    lineBtn = className("android.widget.LinearLayout").id("alphaTabsIndicator").findOnce();
    while (lineBtn == null) {
        lineBtn = className("android.widget.LinearLayout").id("alphaTabsIndicator").findOnce();
        sleep(1000);
    }
    sleep(1000);
    //点击我的按钮
    func.sClick(lineBtn.child(4));
    sleep(1200);
    // 签到按钮
    func.cClick(id("tv_my_haidou_unlogin").text("小豆").findOne());
    //toastLog("我的已点击");
    while (textContains("小豆秒杀").findOnce() == null) {
        if (text("切换登录方式").findOnce() != null) {
            //toastLog("滑动手势");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(2000);
        }
    }
    //toastLog("找签到");
    while (text("已经签到").findOnce() == null) {
        func.sClick(text("收起").findOnce());
        sleep(1200);
        func.sClick(text("签到有礼").findOnce());
        sleep(1200);
        func.sClick(text("签到得豆").findOnce());
        sleep(1200);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 邮储银行
function 邮储银行() {
    var appName = "邮储银行";
    //closeApp(appName);
    func.toApp(appName);
    while (className("RadioButton").text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text("我的").findOnce());
    // 签到按钮
    //toastLog("我的已点击");
    while (textContains("上次登录").findOnce() == null) {
        if (text("忘记手势").findOnce() != null) {
            //toastLog("滑动手势");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    //toastLog("找签到");
    while (text("已签到").findOnce() == null) {
        func.sClick(id("tvName").text("签到有礼").findOnce());
        sleep(1200);
        func.sClick(text("签 到").findOnce());
        sleep(1200);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 浦发金豆签到
function 浦发银行() {
    var appName = "浦发银行";
    //closeApp(appName);
    func.toApp(appName);
    while (text("首页").findOnce() == null) {
        func.passAd();
    }
    sleep(1800);
    func.sClick(id("radio_button5").text("我的").findOnce());
    // 等待我的页面加载
    text("日历提醒").findOne();
    // 签到按钮
    while (text("金豆").findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    while (text("开启签到提醒").findOnce() == null) {
        func.sClick(text("金豆").findOnce());
        sleep(800);
        if (text("切换登录方式").findOnce() || text("更多快捷方式登录").findOnce()) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(1000);
    var signs = textStartsWith("+").find();
    try {
        if (signs.length >= 2) {
            for (var i = 0; i < signs.length; i++) {
                func.sClick(signs[i]);
            }
        }
    }
    catch (e) {
        toastLog("未找到多余的连续签到");
        sleep(2000);
    }
    toastLog(appName + "已签到");
    sleep(3000);
}

function jd_sign() {
    func.toApp("京东");
    //等待首页加载
    while (text("首页").findOnce() == null) {
        func.sClick(id("xk").findOnce());
        toastLog("等待首页...");
        func.passAd();
        func.sClick(textContains("取消").findOnce());
        func.sClick(descContains("取消").findOnce());
        sleep(1500);
    }
    var getBeans = text("领京豆").findOne();
    func.sClick(getBeans.parent());
    // 等待页面加载
    textContains("可抵").findOne();
    sleep(800);

    while (textContains("已连").findOnce() == null) {
        func.cClick(text("签到领京豆").findOnce());
        sleep(800);
    }
    toastLog("已签到");
    sleep(1000);

    while (text("首页").findOnce() == null) {
        back();
        sleep(2000);
    }
    var getCon = text("领券").findOne();
    func.sClick(getCon.parent());

    while (className("ImageView").desc("领券中心").findOnce() == null) {
        // var closeBtn = id("com.jd.lib.coupon.feature:id/db").findOnce();
        // if (closeBtn != null) {
        //     func.sClick(closeBtn.parent().child(1));
        // }
        sleep(800);
    }
    sleep(1200);

    // 点击领话费券按钮
    var huafeis, huafeiParent, huafeiLen, huafeiParentChildCount;
    huafeis = text("话费券").find();
    if (!huafeis.nonEmpty()) {
        huafeis = text("话费神券").find();
    }
    // 如果话费券非空
    if (huafeis.nonEmpty()) {
        huafeiLen = huafeis.length;
        toastLog("找到" + huafeiLen + "个 话费券");
        for (let j = 0; j < huafeiLen; j++) {
            huafei = huafeis[j];
            try {
                huafeiParent = huafei.parent();
                huafeiParentChildCount = huafeiParent.childCount();
                log("childCount: " + huafeiParentChildCount);
                log("button Text: " + huafeiParent.child(huafeiParentChildCount - 1).text());
                if (huafeiParentChildCount == 3 && huafeiParent.child(huafeiParentChildCount - 1).text() == "领取") {
                    func.sClick(huafeiParent.child(huafeiParentChildCount - 1));
                    toastLog("准备领取话费券");
                    sleep(1500);
                } else {
                    continue;
                }
            } catch (e) {
                toastLog("找话费券报错了");
                continue;
            }
        }
    }

    var signBtn = text("立即领红包").findOnce();

    if (signBtn == null) {
        toastLog("今日已领券");
    }
    else {
        func.sClick(signBtn);
        className("ImageView").desc("关闭弹窗").findOne();
        func.sClick(className("ImageView").desc("关闭弹窗").findOne());
        toastLog("今日已领券");
        sleep(1000);
    }

    while (text("首页").findOnce() == null) {
        back();
        sleep(2000);
    }
}

// 买单吧
function 买单吧() {
    var appName = "买单吧";
    //closeApp(appName);
    func.toApp(appName);
    while (className("TextView").id("tv_title").text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(id("ivADClose").findOnce());
    }
    func.sClick(text("我的").findOne().parent().parent().parent().parent().child(2));
    text("羊毛资讯").findOne();
    sleep(1000);
    while (textContains("客官明天再来哟").findOnce() == null) {
        func.sClick(id("com.bankcomm.maidanba:id/bt_signin").findOnce());
        sleep(1000);
        func.sClick(id("com.bankcomm.maidanba:id/bt_welfare_lottery").text("去抽奖").findOnce());
        if (text("手势登录").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
        // 点击完成按钮
        func.sClick(id("com.bankcomm.maidanba:id/bt_ws_lottery_close").findOnce());
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 浦发
function 浦发信用卡() {
    var appName = "浦大喜奔";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(idContains("close").findOnce());
    }
    func.sClick(text("我的").findOne());
    // 等待我的页面加载
    text("我的订单").findOne();
    while (text("签到").findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    func.sClick(text("签到").findOne());
    // 输入手势密码
    textContains("手势密码").findOne();
    sleep(500);
    func.gesture_pwd(appName);
    sleep(1000);
    // 等待签到页面加载
    text("每日签到").findOne();
    sleep(1000);
    var waitSign = text("待签到").findOne();
    sleep(1000);
    func.sClick(waitSign.parent().parent().parent().parent().child(4));
    toastLog(appName + "已签到");
    sleep(1000);
}

// 邮储信用卡
function 邮储信用卡() {
    var appName = "邮储信用卡";
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(text("确认").findOnce());
        var Continue = className("TextView").text("继续使用").findOnce();
        if (Continue != null) {
            func.sClick(Continue);
        }
    }
    sleep(800);
    func.sClick(text("我的").findOnce());
    sleep(800);
    // 等待我的页面加载
    sleep(800);
    func.sClick(text("签到有礼").findOne());
    while (!(text("明天再来哦").findOnce() != null || textContains("恭喜获得").findOnce() != null)) {
        func.sClick(text("立即签到").findOnce());
        sleep(800);
        if (text("忘记手势密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + "已签到");
    sleep(1000);
}


// 华彩生活
function 华彩生活() {
    var appName = "华彩生活";
    //closeApp(appName);
    func.toApp(appName);
    while (text("我的").findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text("我的").findOnce());
    // 等待我的页面加载
    text("自动还款").findOne();
    // 签到按钮
    while (id("iv_sign").findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    func.sClick(id("iv_sign").findOnce());

    while (textContains("恭喜您获得").findOnce() == null && text("今日已签").findOnce() == null) {
        func.sClick(text("连续签到抽大奖").findOnce());
        sleep(800);
        if (text("请输入手势密码").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

function YunShaofu() {
    var appName = "com.unionpay";
    //closeApp(appName);
    func.toPackage(appName);
    while (className("TextView").text("我的").findOnce() == null) {
        sleep(1000);
    }
    sleep(1500);
    func.sClick(className("TextView").text("首页").findOnce());
    //点击签到按钮
    func.sClick(id("com.unionpay:id/frog_float").findOne());
    // 等待签到页面加载
    textContains("连续签到").findOne();

    if (text("今日已签到").findOnce() == null) {
        func.sClick(text("立即签到").findOnce());
        sleep(1500);
    }
    toastLog(appName + "已签到");
    sleep(1000);
}

function 工银e生活() {
    var appName = "工银e生活";
    //closeApp(appName);
    func.toApp(appName);
    while (id("radio_button1").text("生活").findOnce() == null) {
        func.passAd();
    }
    func.sClick(id("radio_button1").text("生活").findOne());
    // 点击输入框
    func.sClick(text("扫一扫").findOne().parent().child(1));
    // 商城
    id("tv_title").text("历史搜索").findOne();
    sleep(1000);
    func.sClick(className("TextView").id("tv_name").text("购物日").findOne());
    sleep(1000);
    id("tv_title").text("特色活动").findOne();
    sleep(1000);
    // 第二个商城
    func.sClick(id("tv_name").text("购物日").findOne());
    sleep(800);
    text("点击签到").findOne();
    sleep(2000);
    func.sClick(text("点击签到").findOnce());

    toastLog(appName + "已签到");
    sleep(1000);
}

function 招商银行() {
    var appName = "招商银行";
    // setClip("＆https://t.cmbchina.com/RZV7f2＆");
    sleep(600);
    func.toApp(appName);
    func.passAd();
    // func.sClick(text("立即查看").findOne());
    func.sClick(id("cmb.pb:id/textMarquee").findOne());
    text("历史搜索").findOne();
    sleep(2500);
    setText(0, "刮刮乐");
    sleep(800);
    func.sClick(text("功能").findOne());
    func.sClick(text("招牌便民刮刮乐").findOne());
    sleep(500);
    while (text("周日").findOnce() == null) {

        if (id("ivBigHeadImage").findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(2000);
    var monday = text("周一").findOne();
    func.sClick(monday.parent().parent().parent().child(3));
    text("医保电子凭证").findOne();
    sleep(1200);
    back();
    sleep(800);
    setClip("");
    toastLog(appName + "已签到");
    sleep(1200);
}

function 什么值得买() {
    var appName = "什么值得买";
    func.toApp(appName);
    var signBtn = null;
    while (signBtn == null) {
        signBtn = id("tv_login_sign").findOnce();
        func.sClick(id("tab_usercenter").text("我的").findOnce());
        sleep(800);
        func.sClick(id("dialog_home_ads_close").findOnce());
        sleep(800);
        func.passAd();
    }
    sleep(800);
    func.sClick(signBtn);
    sleep(1000);
    //textContains("已连续签到").findOne();
    toastLog(appName + "已签到");
    sleep(1200);
}