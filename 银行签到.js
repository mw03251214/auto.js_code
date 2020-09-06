auto.waitFor();
var func = require('func_list.js');

main();
//买单吧();
function main() {
    什么值得买();
    招商银行();
    jd_sign();
    云闪付();
    浦发银行();
    工银e生活();
    邮储银行();
    浦发信用卡();
    邮储信用卡();
    华彩生活();
    买单吧();
    alert('已完成.');
}

// ======================签到代码==================================
// 邮储银行
function 邮储银行() {
    let appName = '邮储银行';
    //closeApp(appName);
    func.toApp(appName);
    while (className('RadioButton').text('我的').findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text('我的').findOnce());
    // 签到按钮
    //toastLog('我的已点击');
    while (textContains('上次登录').findOnce() == null) {
        if (text('忘记手势').findOnce() != null) {
            //toastLog('滑动手势');
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    //toastLog('找签到');
    while (text('已签到').findOnce() == null) {
        func.sClick(id('tvName').text('签到有礼').findOnce());
        sleep(1200);
        func.sClick(text('签 到').findOnce());
        sleep(1200);
    }
    toastLog(appName + '已签到');
    sleep(1000);
}

// 浦发金豆签到
function 浦发银行() {
    let appName = '浦发银行';
    //closeApp(appName);
    func.toApp(appName);
    while (text('首页').findOnce() == null) {
        func.passAd();
    }
    sleep(1800);
    func.sClick(id('radio_button5').text('我的').findOnce());
    // 等待我的页面加载
    text('日历提醒').findOne();
    // 签到按钮
    while (text('金豆').findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    func.sClick(text('金豆').findOnce());
    while (text('我的成长').findOnce() == null) {
        sleep(800);
        if (text('切换登录方式').findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(1000);
    if (textContains('连续签到').find().length > 2) {
        func.sClick(textContains('连续签到').findOnce());

    }
    toastLog(appName + '已签到');
    sleep(1000);
}

function jd_sign() {
    func.toApp("京东");
    //等待首页加载
    while (className('TextView').text('首页').findOnce() == null) {
        func.sClick(id('xk').findOnce());
        toastLog('等待首页...');
        func.passAd();
        func.sClick(textContains('取消').findOnce());
        func.sClick(descContains('取消').findOnce());
        sleep(1500);
    }
    let getBeans = className('TextView').text('领京豆').findOne();
    func.sClick(getBeans.parent());
    //等待进店领豆加载
    className('TextView').text('进店领豆').findOne();
    if (className('TextView').text('已连续签到').findOnce()) {
        toastLog('今日已签到');
    }
    else {
        func.sClick(className('TextView').text('签到领京豆').findOnce());
        while (className('TextView').text('签到提醒').findOnce() == null
            && text('全民抢京豆').findOnce() == null) {
            sleep(1000);
        }
        toastLog('签到成功');
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back();
        sleep(3000);
    }
    let getCon = text('领券').findOne();
    func.sClick(getCon.parent());
    className('ImageView').desc('领券中心').findOne();

    if (className('TextView').text('立即签到').findOnce() == null) {
        toastLog('今日已领券');
    }
    else {
        func.sClick(className('TextView').text('立即签到').findOnce());
        className('ImageView').desc('关闭弹窗').findOne();
        func.sClick(className('ImageView').desc('关闭弹窗').findOne());
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back();
        sleep(3000);
    }
}

// 买单吧
function 买单吧() {
    let appName = '买单吧';
    //closeApp(appName);
    func.toApp(appName);
    while (className('TextView').id('tv_title').text('我的').findOnce() == null) {
        func.passAd();
        func.sClick(id('ivADClose').findOnce());
    }
    func.sClick(text('我的').findOne());
    sleep(2000);
    while (id('rl_title_white').findOnce() == null) {
        func.sClick(id('com.bankcomm.maidanba:id/tv_sign').text('每日签到').findOnce());
        sleep(1000);
        func.sClick(idContains('lose').findOnce());
        log(appName + '等待登录');
        sleep(1500);
        if (text('手势登录').findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(1000);
    while (!(text('客官明天再来呦').findOnce() != null || text('完成').findOnce() != null)) {
        func.sClick(id('bt_signin').text('签到').findOnce());
        func.sClick(id('com.bankcomm.maidanba:id/bt_signin').text('抽奖').findOnce());
        sleep(1000);
        func.sClick(id('com.bankcomm.maidanba:id/bt_welfare_lottery').text('去抽奖').findOnce());
    }
    toastLog(appName + '已签到');
    sleep(1000);
}

// 浦发
function 浦发信用卡() {
    let appName = '浦大喜奔';
    //closeApp(appName);
    func.toApp(appName);
    while (text('我的').findOnce() == null) {
        func.passAd();
    }
    func.sClick(text('我的').findOne());
    // 等待我的页面加载
    text('我的订单').findOne();
    while (className('ImageView').id('iv_user_leader_title_3').findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    func.sClick(className('ImageView').id('iv_user_leader_title_3').findOne());
    // 输入手势密码
    text('请输入手势密码').findOne();
    sleep(500);
    func.gesture_pwd(appName);
    sleep(1000);
    // 等待签到页面加载
    text('每日签到').findOne();
    sleep(1000);
    text('周一').findOne();
    sleep(1000);
    if (text('今天').findOnce().parent().child(1).text() == '待签到') {
        // 立即签到按钮
        let signNow;
        if (text('周一').find().length == 1) {
            signNow = text('周二').find()[1];
        } else {
            signNow = text('周一').find()[1];
        }
        func.sClick(signNow.parent().parent().child(3));
        sleep(800);
    }
    toastLog(appName + '已签到');
    sleep(1000);
}

// 邮储信用卡
function 邮储信用卡() {
    let appName = '邮储信用卡';
    func.toApp(appName);
    while (text('我的').findOnce() == null) {
        func.passAd();
        let Continue = className('TextView').text('继续使用').findOnce();
        if (Continue != null) {
            func.sClick(Continue);
        }
    }
    sleep(800);
    func.sClick(className('TextView').text('我的').findOne());
    // 等待我的页面加载
    let myBill = text('我的账单').findOne();
    sleep(800);
    func.sClick(myBill.parent().parent().parent().child(4));
    while (text('今日已签到').findOnce() == null) {
        func.sClick(text('马上签到').findOnce());
        sleep(800);
        if (text('忘记手势密码').findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + '已签到');
    sleep(1000);
}

// 华彩生活
function 华彩生活() {
    let appName = '华彩生活';
    //closeApp(appName);
    func.toApp(appName);
    while (className('RadioButton').text('我的').findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(text('我的').findOnce());
    // 等待我的页面加载
    text('自动还款').findOne();
    // 签到按钮
    while (id('iv_sign').findOnce() == null) {
        func.toAutojs();
        func.toApp(appName);
        sleep(3000);
    }
    sleep(800);
    func.sClick(id('iv_sign').findOnce());

    while (textContains('恭喜您获得').findOnce() == null && text('今日已签').findOnce() == null) {
        func.sClick(text('连续签到抽大奖').findOnce());
        sleep(800);
        if (text('请输入手势密码').findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    toastLog(appName + '已签到');
    sleep(1000);
}

// 云闪付
function 云闪付() {
    let appName = '云闪付';
    //closeApp(appName);
    func.toApp(appName);
    while (className('TextView').text('我 的').findOnce() == null) {
        func.passAd();
    }
    func.sClick(className('TextView').text('首 页').findOnce());
    //点击签到按钮
    func.sClick(id('com.unionpay:id/frog_float_notgif').findOne());
    // 等待签到页面加载
    className('TextView').textContains('已连续签到').findOne();

    if (text('已签到').findOnce() == null) {
        func.sClick(className('TextView').text('立即签到').findOnce());
        sleep(1500);
        if (text('去抽奖').findOnce() != null) {
            func.sClick(text('去抽奖').findOnce());
            id('com.unionpay:id/tv_title').text('签到抽奖专区').findOne();
            sleep(5000);
            let area = id('com.unionpay:id/tv_title').text('签到抽奖专区').findOne();
            func.cClick(area.parent().parent().child(2).child(0).child(0).child(0).child(0).child(0).child(3));
            idContains('resultBtn').findOne();
        }
    }
    toastLog(appName + '已签到');
    sleep(1000);
}

function 工银e生活() {
    let appName = '工银e生活';
    //closeApp(appName);
    func.toApp(appName);
    while (id('radio_button1').text('生活').findOnce() == null) {
        func.passAd();
    }
    sleep(1000);
    func.sClick(id('radio_button1').text('生活').findOnce());

    sleep(800);
    func.sClick(text('商城').findOne());

    let shopMall = text('购物商城').findOne();
    sleep(1000);
    func.sClick(shopMall.parent().parent().parent().child(0));

    text('点击签到').findOne();
    sleep(2000);
    func.sClick(text('点击签到').findOnce());

    toastLog(appName + '已签到');
    sleep(1000);
}

function 招商银行() {
    let appName = '招商银行';
    setClip('＆https://t.cmbchina.com/RZV7f2＆');
    sleep(600);
    func.toApp(appName);
    func.passAd();
    func.sClick(text('立即查看').findOne());
    sleep(1000);
    while (text('周日').findOnce() == null) {
        if (id('ivBigHeadImage').findOnce() != null) {
            sleep(500);
            func.gesture_pwd(appName);
            sleep(1000);
        }
    }
    sleep(2000);
    let monday = text('周一').findOne();
    func.sClick(monday.parent().parent().parent().child(3));
    text('医保电子凭证').findOne();
    sleep(1200);
    back();
    sleep(800);
    setClip('');
    toastLog(appName + '已签到');
    sleep(1200);
}

function 什么值得买() {
    let appName = '什么值得买';
    func.toApp(appName);
    let signBtn = null;
    while (signBtn == null) {
        signBtn = id('tv_login_sign').findOnce();
        func.sClick(id('tab_usercenter').text('我的').findOnce());
        sleep(800);
        func.sClick(id('dialog_home_ads_close').findOnce());
        sleep(800);
        func.passAd();
    }
    sleep(800);
    func.sClick(signBtn);
    sleep(1000);
    textContains('已连续签到').findOne();
    toastLog(appName + '已签到');
    sleep(1200);
}