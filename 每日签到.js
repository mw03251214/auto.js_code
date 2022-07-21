auto.waitFor();
var func = require("func_list.js");
var cfg = func.config_dict();

// var dev_model = device.model;
// var dev_mate30, dev_honor8, dev_redmi;
// dev_mate30 = "TAS-AL00";
// dev_honor8 = "FRD-AL00";
// dev_redmi = "Redmi Note 7";

main();

function main() {
    device.setMusicVolume(0);       //设为静音
    let show_arr;
    show_arr = ["京东.领京豆", "京东.领券中心", "京东.金融签到", "京东.金融双签", "京东.种豆得豆",
        //                                                                                                                                                           "京东.校园签到", "京东.陪伴计划签到", "京东.个护签到", "京东.鞋靴馆签到", "京东.服饰馆签到", "京东.箱包馆签到",
        "京东.极速版领红包", "京东.极速版挖宝",
        "云闪付.签到", "云闪付.领积点",
        "浦发_金豆签到", "浦发xyk_积分签到", "农行_小豆签到", "值得买_签到", "买单吧_签到",
        "和包签到", "建行生活签到", "工商_小象乐园"
    ];
    let select_items;
    //     if (new Date().getHours() <= 1) {
    //         select_items = ["京东.极速版挖宝"];
    //     } else {
    select_items = func.dialogs_checkbox(show_arr, "每日签到记录", "多选");
    //     }
    select_items.forEach(item => {
        // log(item);
        if (item == undefined) {
            log('current is undefinde');
        } else {
            if (item.indexOf("京东") != -1 || item.indexOf("云闪付") != -1) { eval(item.replace(".", "().") + "()"); }
            else if (item == "工商_小象乐园") { 工商_小象乐园(); }

            else if (item == "沃钱包_泡泡签到") { 沃钱包(); }
            else if (item == "浦发_金豆签到") { 浦发_金豆签到(); }
            else if (item == "浦发xyk_积分签到") { 浦发xyk_积分签到(); }
            else if (item == "农行_小豆签到") { 农行_小豆签到(); }
            else if (item == "值得买_签到") { 值得买_签到(); }
            else if (item == "买单吧_签到") { 买单吧_签到(); }
            else if (item == "和包签到") { 和包签到(); }
            else if (item == "建行生活签到") { 建行生活签到(); }
        }

    });
    func.dialogs_alert("已完成.");
}

// ======================签到代码==================================
function 建行生活签到() {
    func.to_app("建行生活");
    // let vipp, vipp_parent;
    while (!(text("优惠适用商户").findOnce() != null || text("优惠券发放说明").findOnce() != null)) {
        // vipp = text("会员有礼").findOnce();
        // if (vipp != null) {
        //     vipp_parent = vipp.parent();
        //     func.sClick(vipp_parent.child(vipp.indexInParent() + 1).child(0));
        // }
        func.sClick(text("061144ed-d390-4c46-9ea7-21456aa0a5db").findOnce());
        toastLog("等待，签到页面，加载");
        sleep(2600);
    }
    while (!(textContains("获得奖励").findOnce() != null || text("今日已签到").findOnce() != null)) {
        func.sClick(text("立即签到").findOnce());
        toastLog("等待，签到完成，加载");
        sleep(2600);
    }
}

function 和包签到() {
    func.to_scheme(cfg["url_scheme"]["others"]["和包签到"]);
    while (text("月签礼连续3个月（任一天）签到").findOnce() == null) {
        toastLog("等待，签到页面，加载");
        sleep(2600);
    }
    sleep(1000);
    while (textContains("已完成签到").findOnce() == null) {
        func.sClick(idContains("opr").findOnce());
        sleep(1000);
    }
}
function 云闪付() {
    let func_obj = {
        领积点: function () {
            func.to_scheme(cfg["url_scheme"]["云闪付"]["会员中心"]);
            while (!(text("我的积点").findOnce() != null &&
                text("积点乐园").findOnce() != null)) {
                sleep(3000);
            }
            toastLog("已到达领取页面，等待...");
            sleep(5000);
            func.sClick(text("全部收取").findOnce());
            toastLog("云闪付, 已领取积点");
            sleep(2000);
        },

        签到: function () {
            let appName = "云闪付";
            //closeApp(appName);
            // func.to_app(appName);
            // while (className("TextView").text("我的").findOnce() == null) {
            //     if (textContains("跳过").findOnce() != null || descContains("跳过").findOnce() != null) {
            //         sleep(800);
            //         continue;
            //     }
            //     sleep(1000);
            // }
            // sleep(1500);
            // func.sClick(className("TextView").text("首页").findOnce());
            // //点击签到按钮
            // func.sClick(id("com.unionpay:id/frog_float").findOne());
            func.to_scheme(cfg["url_scheme"]["云闪付"]["签到"]);
            // 等待签到页面加载
            textContains("连续签到").findOne();

            if (text("今日已签到").findOnce() == null) {
                func.sClick(text("立即签到").findOnce());
                sleep(1500);
            }
            toastLog(appName + "已签到");
            sleep(1000);
        }
    }
    return func_obj;
}


function 沃钱包() {
    let appName = "沃钱包";
    func.to_app(appName);
    while (text("领福利 有惊喜").findOnce() == null) {
        func.sClick(textContains("下次再说").findOnce());
        func.sClick(idContains("wopay_wallet_advertisement_dialog_cancel_iv").findOnce());
        func.sClick(idContains("wopay_main_mine_tv").text("我的").findOnce());
        func.sClick(idContains("wopay_mine_item_name_tv").text("泡泡").findOnce());
        func.sClick(text("每日签到得好礼").findOnce());
        toastLog("等待加载 签到页面");
        sleep(2000);
    }
    toastLog("已到达 签到页面");
    sleep(3500);
    while (textContains("今日已签到").findOnce() == null) {
        if (func.sClick(textContains("签到领奖励").findOnce())) {
            toastLog("已点击 签到领奖励按钮");
        } else {
            toastLog("未找到/点击失败 签到领奖励按钮");
        }
        sleep(2500);
    }
    toastLog(appName + ",已签到");
    sleep(2000);
}

function 工商_小象乐园() {
    let appName = "中国工商银行";
    //closeApp(appName);
    func.to_scheme(cfg["url_scheme"]["工商"]["小象1"]);

    while (textContains("你已经陪小象").findOnce() == null) {
        toastLog("等待小象界面加载...");
        sleep(2500);
        if (text("请输入手势密码登录").findOnce()) {
            toastLog("已找到手势密码按钮");
            sleep(500);
            func.gesture_pwd(appName);
            toastLog("已输入 mima");
            sleep(6000);
            func.to_autojs();
            toastLog("已切换到autojs，等待回去");
            sleep(8000);
            func.to_scheme(cfg["url_scheme"]["工商"]["小象2"]);
            toastLog("已切换回工商");
            sleep(3000);
        }
    }
    log("已跳转回工商，等待查找剩余香蕉");
    sleep(2000);
    // 点击香蕉
    // 点击任务
    let left_banana, mission_btn;
    while (1) {
        left_banana = textStartsWith("剩余").findOnce();
        if (left_banana != null) { break; }
        left_banana = textContains("加载中...").findOnce();
        if (left_banana != null) { break; }
        sleep(1000);
    }
    sleep(1000);
    // 查找并点击香蕉
    let bananas;
    bananas = className("ListView").rowCount(5).findOnce();
    if (bananas != null) {
        for (let i = bananas.childCount() - 1; i >= 0; i--) {
            // 点击喂小象
            func.cClick(left_banana);
            sleep(1000);
            // 点击香蕉
            func.cClick(bananas.child(i));
            sleep(1000);
        }
    }
    while (text("进入任务中心查看更多任务").findOnce() == null) {
        try {
            if (left_banana.depth() == 12) {
                mission_btn = left_banana.parent().parent().child(0).child(2);
            } else {
                // 荣耀8
                mission_btn = left_banana.parent().parent().parent().child(0).child(2);
            }
            func.sClick(mission_btn);
            sleep(800);
        } catch (e) {
            toastLog("查找任务按钮 报错"); sleep(2500);
            continue;
        }
        toastLog("等待任务界面加载");
        sleep(2500);
    }
    func.sClick(text("进入任务中心查看更多任务").findOne());
    sleep(800);
    text("任务中心").findOne();
    toastLog("已到达任务中心");
    sleep(2000);
    while (text("今日签到成功").findOnce() == null) {
        try {
            func.sClick(text("可用香蕉").findOnce().parent().parent().child(2));
        }
        catch (e) {
            continue;
        }
        toastLog("等待签到成功");
        sleep(3000);
    }
}

function 招商() {
    this.饭票签到 = function () {
        func.to_scheme(cfg["url_scheme"]["招商"]["饭票签到"]);
        let congratulation, getAir, item_parent, today = null;
        while (today == null) {
            congratulation = textContains("恭喜您在").findOnce();
            if (congratulation != null) {
                item_parent = congratulation.parent().parent().parent();
                func.sClick(item_parent.child(item_parent.childCount() - 1));
                sleep(1000);
            }
            getAir = textContains("很遗憾抽中了空气").findOnce();
            if (getAir != null) {
                item_parent = getAir.parent().parent().parent();
                func.sClick(item_parent.child(item_parent.childCount() - 1));
                sleep(1000);
            }

            today = text("今日").depth(12).findOnce();
            sleep(1000);
        }
        sleep(1500);
        func.sClick(today.parent().parent().child(1));
        toast("已点击打卡领饭票,等待5s");
        sleep(5000);
        // 判断如果还在饭票页面则说明 已经打过卡
        if (text("每周一到周五打卡浏览指定页面，打卡当天可获得一次抽奖机会").findOnce() == null) {
            back();
        }
        toast("今日已打卡");
        sleep(3000);
    }
    this.便民生活 = function () {
        let appName = "招商银行";
        func.to_scheme(cfg["url_scheme"]["招商"]["便民生活"]);
        // 等待手势密码加载
        id("vGestureContentView").findOne();
        sleep(500);
        func.gesture_pwd(appName);
        sleep(2000);
        let my_energy, get_energy;
        while (text("查询我的公积金").findOnce() == null) {
            my_energy = text("我的能量：").findOnce();
            if (my_energy != null) {
                get_energy = my_energy.parent().parent().child(2);
                sleep(1200);
                func.sClick(get_energy);
            }
            sleep(2000);
        }
        sleep(2000);
        let plus30, plus_parent, plus_parent_childcount;
        let sign_btn, sign_text;

        plus30 = text("+30").depth(14).findOne();
        plus_parent = plus30.parent().parent();
        plus_parent_childcount = plus_parent.childCount();
        sign_btn = plus_parent.child(plus_parent_childcount - 1);
        sleep(1200);
        if (sign_btn.childCount() != 0) {
            sign_text = sign_btn.child(0).text();
            if (sign_text == "去签到") {
                func.sClick(sign_btn);          // 点击签到
                while (text("服务大厅").findOnce() == null) {
                    toast("已点击，等待服务大厅加载");
                    sleep(2500);
                }
                toast("服务大厅 已加载");
                sleep(3000);
                back();
                toast("返回，等待领取");
                while (sign_text == "去签到") {
                    plus30 = text("+30").depth(14).findOnce();
                    if (plus30 != null) {
                        plus_parent = plus30.parent().parent();
                        plus_parent_childcount = plus_parent.childCount();
                        sign_btn = plus_parent.child(plus_parent_childcount - 1);
                        sign_text = sign_btn.child(0).text();
                    }
                    sleep(1000);
                }
                func.sClick(sign_btn);      // 点击领取
                toast("已点击领取");
                sleep(2000);
            }
        }
        toastLog("便民生活, 已签到");
        sleep(3000);
    }
    return this;
}

// 中行缤纷生活
function 中行缤纷生活() {
    // test3
    let appName = "缤纷生活";
    //closeApp(appName);
    func.to_app(appName);
    while (text("我的").findOnce() == null) {
        ;
    }
    sleep(1000);
    while (text("登录手机号更改").findOnce() == null) {
        func.sClick(text("我的").findOnce());
        sleep(1000);
    }
    // 签到按钮
    let signBtnId = "imgRight";
    while (id(signBtnId).findOnce() == null) {
        func.to_autojs();
        func.to_app(appName);
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

    let currentWeekday = new Date().getDay();
    // 0 返回的周日 周一返回1，周二2
    if (currentWeekday == 0) {
        currentWeekday = 6
    } else {
        currentWeekday = currentWeekday - 1
    }
    let signFlag, idx, weekdayText, signCnt;
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
function 农行_小豆签到() {
    let appName = "中国农业银行";
    //closeApp(appName);
    func.to_scheme(cfg["url_scheme"]["农行"]["小豆"]);
    //toastLog("我的已点击");
    while (textContains("小豆订单").findOnce() == null) {
        if (func.sClick(desc("我的").depth(6).findOnce())) { sleep(1500); }
        else if (func.sClick(text("我的").depth(6).findOnce())) { sleep(1500); }
        sleep(1500);
        if (func.sClick(text("小豆").depth(15).findOnce())) { sleep(1500); }
        else if (func.sClick(desc("小豆").depth(15).findOnce())) { sleep(1500); }

        if (text("切换登录方式").findOnce() != null) {
            //toastLog("滑动手势");
            sleep(500);
            func.gesture_pwd(appName);
            sleep(2000);
        }
        sleep(2000);
    }
    sleep(3000);
    while (text("已经签到").findOnce() == null) {
        if (func.sClick(text("收起").findOnce())) { sleep(1200); }
        if (func.sClick(text("签到有礼").findOnce())) { sleep(1200); }
        if (func.sClick(text("签到得豆").findOnce())) { sleep(1200); }
        sleep(2500);
    }
    if (func.sClick(text("已经签到").findOnce())) { sleep(1200); }
    toastLog(appName + "已签到");
    sleep(1000);
}

// 浦发金豆签到
function 浦发_金豆签到() {
    let appName = "浦发银行";
    let today_is_done = false;
    let local_config = storages.create("local_config");
    if (local_config.contains("浦发_金豆签到")) {
        if (local_config.get("浦发_金豆签到") == new Date().getDate()) {
            toastLog(appName + "已签到");
            sleep(3000);
            return 0;
        }
    }
    //closeApp(appName);
    func.to_scheme(cfg["url_scheme"]["浦发"]["金豆"]);

    while (!(text("切换登录方式").findOnce() || text("更多快捷方式登录").findOnce())) {
        toastLog("等待登录窗口加载"); sleep(2600);
    }
    sleep(500);
    func.gesture_pwd(appName);
    toastLog("已输入登陆密码..."); sleep(2600);
    while (text("开启签到提醒").findOnce() == null) {
        toastLog("等待签到页面加载"); sleep(2600);
    }
    toastLog("已查找到 签到提醒"); sleep(2600);
    while (textStartsWith("+").findOnce() == null) {
        func.sClick(text("稍后更新").findOnce());
        toastLog("等待加载 金豆+号按钮");
        sleep(2600);
    }
    toastLog("已找到 金豆+号按钮"); sleep(2600);
    let cnt, signs, sign_text;
    while (1) {
        cnt = 0;
        auto.service.serviceInfo = auto.service.serviceInfo;
        signs = textStartsWith("+").find();
        log("当前sign_length:" + signs.length);
        if (today_is_done == false) {
            if (signs.length > 8) {
                today_is_done = true;
            } else {
                toastLog("当前查找+号结果数量不足8个,异常，请检查"); sleep(2600);
                continue;
            }
        }
        try {
            for (let i = 0; i < signs.length; i++) {
                sign_text = signs[i].text();
                if (sign_text * 0 == 0) {
                    func.sClick(signs[i]);
                    cnt = cnt + 1;
                }
            }
            log("当前cnt为：" + cnt);
            if (cnt <= 8 && today_is_done) {
                break;
            }
        } catch (e) {
            log(e);
            toastLog("报错了，未找到多余的连续签到");
        }
        sleep(2500);
    }
    local_config.put("浦发_金豆签到", new Date().getDate());
    toastLog(appName + "已签到");
    sleep(3000);
}

function 京东() {
    let func_in_func = {
        common_sign: function (title, jump_url, wait_element_load, complete_element, click_elements) {
            /** 
            * @param {String} title 任务标题
            * @param {String} jump_url 跳转app的data url
            * @param {String} wait_element_load 判断是否加载的 文本 语句，用eval执行，
            * @param {String} complete_element 判断是否完成的 文本 语句，用eval执行
            * @param {Function} click_elements 跳转app的data url
            */
            toastLog("任务:" + title + ",开始");
            func.to_scheme(jump_url);       //跳转app
            while (1) {
                if (eval("(" + wait_element_load + ")")) {
                    break;
                } else {
                    toastLog("等待 活动开始页面 加载...");
                    sleep(2500);
                }
            }
            while (1) {
                click_elements();
                if (eval("(" + complete_element + ")")) {
                    break;
                } else {
                    toastLog("等待 完成页面 加载...");
                    sleep(2500);
                    auto.service.serviceInfo = auto.service.serviceInfo;
                }
            }
            toastLog("任务:" + title + ", 已完成");
            sleep(2500);
        },
        多次重复签到: function (scheme_title, load_text) {
            let jump_url = cfg["url_scheme"]["京东"][scheme_title];
            let click_func = function () {
                func.sClick(text("签到").findOnce());
                func.sClick(text("立即翻牌").findOnce());
            }
            func_in_func.common_sign(scheme_title, jump_url, wait_element_load = 'textContains("' + load_text + '").findOnce()',
                complete_element = 'textContains("今日已签").findOnce()', click_func);
        }
    }
    let func_obj = {
        极速版领红包: function () {
            func.to_scheme(cfg["url_scheme"]["京东"]["极速版领红包"]);
            let left_today, left_today_parent, left_idx;
            left_today = text("今日剩余").findOnce();
            while (left_today == null) {
                left_today = textContains("今日剩余").findOnce();
                toastLog("等待加载");
                sleep(3500);
            }
            let left_times = 10;
            while (left_times != 0) {
                left_today = textContains("今日剩余").findOnce();
                if (left_today != null) {
                    try {
                        if (left_today.text() == "今日剩余") {
                            auto.service.serviceInfo = auto.service.serviceInfo;
                            log("今日剩余-1");
                            left_idx = left_today.indexInParent();
                            left_today_parent = left_today.parent();
                            left_times = left_today_parent.child(left_idx + 1).text();
                            toastLog("当前剩余次数1=" + left_times);
                        } else {
                            log("今日剩余-2");
                            left_times = left_today.text().slice(4, 5);
                            toastLog("当前剩余次数2=" + left_times);
                        }
                    } catch (e) {
                        toastLog("捕捉到错误,记录文本：" + left_today.text());
                        sleep(2600);
                        continue;
                    }
                    func.sClick(left_today.parent().parent());
                } else {
                    toastLog("未找到文本：今日剩余");
                }
                sleep(2500);
            }
        },
        极速版挖宝: function () {
            let local_config = storages.create("local_config");
            if (local_config.contains("极速版挖宝")) {
                if (local_config.get("极速版挖宝") == new Date().getDate()) {
                    toastLog("极速版挖宝 今日已签到");
                    return 0;
                }
            }
            func.to_scheme(cfg["url_scheme"]["京东"]["极速版挖宝"]);
            while (textContains("元微信现金恭喜").findOnce() == null) {
                toastLog("等待加载...");
                sleep(2500);
            }
            toastLog("挖宝界面已加载...");
            sleep(2500);
            if (textContains("今日奖励已领取").findOnce() != null) {
                toast("极速挖宝已签到");
                return 0;
            }
            func.sClick(text("玩一玩").findOne());
            toastLog("点击玩一玩 增加生命...");
            sleep(6000);
            back();
            textContains("元微信现金恭喜").findOne();
            let scroll_bar, bar_parent, click_parent;
            let item, ex_flag, ex_count, continue_find_click;
            ex_count = 0;
            continue_find_click = true;
            // text = "本场奖励已领取完哦～"
            while (1) {
                ex_flag = true;
                if (text("奖励已锁定，复活后可正常领奖！").findOnce() != null) {
                    toastLog("任务失败"); sleep(2600);
                    break;
                }
                try {
                    scroll_bar = text("¥").depth(16).findOnce();
                    if (scroll_bar == null) {
                        if (ex_count > 3) {
                            toastLog("查找钱币符号超时，表示已完成");
                            try {
                                // 关闭按钮
                                // textContains("获得本关奖励").findOnce().parent().child(0)
                                // textContains("按钮进行微信提现").findOnce().parent().child(0)
                                // textContains("优惠券奖励已直接").findOnce().parent().child(0)
                                // textContains("继续挖宝").findOnce().parent().child(0)
                                // 等待钱币符号重新出现
                                let timeout_cnt = 0;
                                while (scroll_bar == null) {
                                    scroll_bar = text("¥").depth(16).findOnce();
                                    if (continue_find_click) {
                                        if (func.cClick(textContains("继续挖宝").findOnce())) {
                                            continue_find_click = false;
                                            toastLog("已点击继续挖宝按钮，等待5秒");
                                            sleep(2600);
                                        }
                                    }
                                    timeout_cnt = timeout_cnt + 1;
                                    toast("等待钱币符号加载...");
                                    sleep(2600);
                                    if (timeout_cnt > 5) {
                                        toastLog("钱币符号超时未加载，直接记录完成");
                                        break;
                                    }
                                }
                                toastLog("钱币符号, 已加载..."); sleep(2600);
                                // 尝试点击一个按钮
                                bar_parent = scroll_bar.parent().parent();
                                click_parent = bar_parent.child(bar_parent.childCount() - 1).child(0).child(0);
                                if (func.sClick(click_parent.child(0).child(0))) {
                                    toastLog("已点击挖宝按钮"); sleep(2600);
                                } else {
                                    toastLog("点击挖宝按钮, 失败..."); sleep(2600);
                                }
                            } catch (e) {
                                toastLog("点击第二次挖宝 报错了");
                                sleep(2600);
                                log(e);
                            }
                            break;
                        }
                        ex_count = ex_count + 1;
                        sleep(1000);
                        continue;
                    }
                    bar_parent = scroll_bar.parent().parent();
                    click_parent = bar_parent.child(bar_parent.childCount() - 1).child(0).child(0);
                    log("click_parent.childCount():" + click_parent.childCount());
                    for (let i = 0; i < click_parent.childCount(); i++) {
                        if (text("奖励已锁定，复活后可正常领奖！").findOnce() != null ||
                            i > 7) {
                            toastLog("任务失败"); sleep(2600);
                            ex_flag = true;
                            break;
                        }
                        item = click_parent.child(i);
                        // log("item.childCount():" + item.childCount());
                        if (item.childCount() == 1) {
                            func.sClick(item.child(0));
                            toastLog("已点击...");
                            sleep(3500);
                            ex_flag = false;
                        } else {
                            continue;
                        }
                    }
                }
                catch (e) {
                    log("极速版挖宝 报错：" + e);
                    continue;
                }
                ex_count = 0;
                if (ex_flag) {
                    break;
                }
            }
            // 记录今天日期，避免重复执行
            local_config.put("极速版挖宝", new Date().getDate());
        },
        领京豆: function () {
            let scheme_title = "领京豆";
            let jump_url = cfg["url_scheme"]["京东"][scheme_title];
            let click_func = function () {
                func.cClick(text("签到领京豆").findOnce());
                if (text("签到日历").findOnce() != null) {
                    sleep(2000);
                    back();
                    sleep(2000);
                }
            }
            func_in_func.common_sign(scheme_title, jump_url, wait_element_load = 'textContains("领京豆").findOnce()',
                complete_element = 'textContains("已连").findOnce()', click_func);
        },
        领券中心: function () {
            let scheme_title = "领券中心";
            let jump_url = cfg["url_scheme"]["京东"][scheme_title];
            let howto, howto_idx, howto_parent;
            let click_func = function () {
                func.sClick(text("签到领奖励").findOnce());
                howto = textContains("怎么领").depth(7).findOnce();
                if (howto != null) {
                    try {
                        howto_idx = howto.indexInParent();
                        howto_parent = howto.parent();
                        func.sClick(howto_parent.child(howto_idx + 1));
                    }
                    catch (e) { log('查找错误') }
                }
            }
            func_in_func.common_sign(scheme_title, jump_url, wait_element_load = 'className("ImageView").desc("领券中心").findOnce()',
                complete_element = '!text("签到领奖励").findOnce()', click_func);
        },
        签到领豆: function () {
            func.to_scheme(cfg["url_scheme"]["京东"]["领券中心"])
            while (className("ImageView").desc("领券中心").findOnce() == null) {
                toastLog("等待领券中心加载");
                sleep(2500);
            }
            sleep(1200);
            let signBtn;
            signBtn = text("签到领奖励").findOnce();
            // }
            if (signBtn != null) {
                while (!func.sClick(className("ImageView").desc("关闭弹窗").findOnce())) {
                    func.sClick(text("签到领奖励").findOnce());
                    toastLog("已点击 签到按钮,等待弹窗加载");
                    sleep(2500);
                }
            }
            toastLog("今日已领券");
            sleep(2500);
            // while (text("首页").findOnce() == null) {
            //     back();
            //     sleep(2000);
            // }
        },
        金融签到: function () {
            func.to_scheme(cfg["url_scheme"]["京东金融"]["金融签到"]);
            while (text("今天").findOnce() == null) {
                toast("等待跳转到金融签到页面");
                sleep(2200);
            }
            toast("已到达指定页面");
            sleep(2500);
            let already_sign;
            already_sign = textContains("签到领金贴").findOnce();
            if (already_sign == null) {
                already_sign = textContains("签到并瓜分金贴").findOnce();
            }
            // 判断两种签到按钮
            if (already_sign == null) {
                toastLog("金融 已签到");
            } else {
                while (!(textContains("签到成功获").findOnce() != null ||
                    textContains("恭喜瓜分成功").findOnce() != null ||
                    textContains("恭喜你获得").findOnce() != null)) {
                    func.sClick(already_sign);
                    toastLog("金融 已点击签到按钮，等待...");
                    sleep(2500);
                }
                toastLog("金融 已签到");
            }
            sleep(3000);
        },
        金融双签: function () {
            func.to_scheme(cfg["url_scheme"]["京东金融"]["双签领取页"]);
            while (text("领取京豆奖励").findOnce() == null) {
                toast("等待跳转到双签页面");
                sleep(2200);
            }
            toast("已到达指定页面");
            sleep(2500);
            let already_sign;
            already_sign = textContains("今日已领取").findOnce();
            if (already_sign == null) {
                while (text("您已领取双签礼包").findOnce() == null) {
                    func.sClick(text("立即领取").findOnce());
                    sleep(1500);
                    func.sClick(textContains("双签领取").findOnce());
                    toast("已点击领取,等待已领取加载");
                    sleep(3000);
                }
            }
            toastLog("双签奖励已领取");
            sleep(3000);
        },
        种豆得豆: function () {
            let scheme_title = "种豆得豆";
            let jump_url = cfg["url_scheme"]["京东"][scheme_title];
            let click_func = function () {
                let beans_bottle;

                func.sClick(textContains("收下京豆").findOnce());
                beans_bottle = textContains("x").find();
                if (beans_bottle.nonEmpty()) {
                    beans_bottle.forEach(beans => { func.cClick(beans); sleep(1500) })
                }
            }
            func_in_func.common_sign(scheme_title, jump_url, wait_element_load = 'textContains("豆苗成长值").findOnce()',
                complete_element = 'textEndsWith("0").findOnce() || textContains("7点再来领取").findOnce()',
                click_func);
        },
        校园签到: function () { func_in_func.多次重复签到("校园签到", "京东校园 天天签到赚京豆"); },
        陪伴计划签到: function () { func_in_func.多次重复签到("陪伴计划签到", "陪伴频道签到赚京豆"); },
        个护签到: function () { func_in_func.多次重复签到("个护签到", "个护签到领京豆"); },
        鞋靴馆签到: function () { func_in_func.多次重复签到("鞋靴馆签到", "签到领京豆"); },
        服饰馆签到: function () { func_in_func.多次重复签到("服饰馆签到", "签到赢好礼"); },
        箱包馆签到: function () { func_in_func.多次重复签到("箱包馆签到", "签到领京豆"); },
    }

    return func_obj;
}

// 买单吧
function 买单吧_签到() {
    let appName = "买单吧";
    //closeApp(appName);
    func.to_app(appName);
    while (className("TextView").id("tv_title").text("我的").findOnce() == null) {
        ;
        func.sClick(id("ivADClose").findOnce());
    }
    func.sClick(text("我的").findOne().parent().parent().parent().parent().child(2));
    text("羊毛资讯").findOne();
    sleep(1000);
    // 任意一个找到就退出循环
    while (!(textContains("客官明天再来哟").findOnce() != null || textContains("今日已签到").findOnce() != null)) {
        func.sClick(id("com.bankcomm.maidanba:id/iv_signin").findOnce());
        func.sClick(text("立即签到").findOnce());
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
    sleep(3000);
}

// 浦发
function 浦发xyk_积分签到() {
    let appName = "浦大喜奔";
    //closeApp(appName);
    func.to_app(appName);
    while (!func.sClick(text("我的").findOnce())) {
        func.sClick(idContains("close").findOnce());
        toastLog("等待 我的 按钮加载");
        sleep(2500);
    }
    // func.sClick(text("我的").findOne());
    // 等待我的页面加载
    while (text("我的订单").findOnce() == null) {
        toast("等待我的订单加载");
        sleep(2600);
    }
    toast("我的订单已加载");
    sleep(2600);
    while (text("签到").findOnce() == null) {
        func.to_autojs();
        func.to_app(appName);
        sleep(3000);
    }
    while (textContains("手势密码").findOnce() == null) {
        func.sClick(text("签到").findOne());
        sleep(2000);
    }
    sleep(1000);
    func.gesture_pwd(appName);
    toastLog("手势密码输入完成");
    sleep(1000);
    // 等待签到页面加载
    text("每日签到").findOne();
    toastLog("已找到每日签到");
    sleep(2600);
    if (text("已签到").findOnce() == null) {
        // waitSign = text("立即签到").findOnce();
        while (text("立即签到").findOnce() == null) {
            sleep(1000);
            if (text("已签到").findOnce() != null) {
                break;
            }
        }
        // func.sClick(waitSign.parent().parent().parent().parent().child(4));
        func.sClick(text("立即签到").findOnce());
    }
    toastLog(appName + "已签到");
    sleep(1000);
}


function 值得买_签到() {
    let appName = "什么值得买";
    func.to_app(appName);
    let signBtn = null;

    sleep(800);
    while (text("已连续签到").findOnce() == null) {
        if (signBtn == null) {
            signBtn = id("tv_login_sign").findOnce();
            func.sClick(id("tab_usercenter").text("我的").findOnce());
            sleep(800);
            func.sClick(idContains("close").findOnce());
            sleep(800);
            //;
        } else {
            func.sClick(signBtn);
        }
        // 关闭更新提示
        func.sClick(id("com.smzdm.client.android:id/iv_content_cancel").findOnce());
        func.sClick(id("com.smzdm.client.android:id/iv_close").findOnce());
        toastLog("等待签到加载");
        sleep(2000);
    }
    //textContains("已连续签到").findOne();
    toastLog(appName + "已签到");
    sleep(2200);
}

// 邮储信用卡
// function 邮储信用卡() {
//     let appName = "邮储信用卡";
//     func.to_app(appName);
//     while (text("我的").findOnce() == null) {
//         ;
//         func.sClick(text("确认").findOnce());
//         let Continue = className("TextView").text("继续使用").findOnce();
//         if (Continue != null) {
//             func.sClick(Continue);
//         }
//     }
//     sleep(800);
//     func.sClick(text("我的").findOnce());
//     sleep(800);
//     // 等待我的页面加载
//     sleep(800);
//     func.sClick(text("签到有礼").findOne());
//     while (!(text("明天再来哦").findOnce() != null || textContains("恭喜获得").findOnce() != null)) {
//         func.sClick(text("立即签到").findOnce());
//         sleep(800);
//         if (text("忘记手势密码").findOnce() != null) {
//             sleep(500);
//             func.gesture_pwd(appName);
//             sleep(1000);
//         }
//     }
//     toastLog(appName + "已签到");
//     sleep(1000);
// }

// 邮储银行
// function 邮储银行() {
//     let appName = "邮储银行";
//     //closeApp(appName);
//     func.to_app(appName);
//     while (className("RadioButton").text("我的").findOnce() == null) {
//         ;
//     }
//     sleep(1000);
//     func.sClick(text("我的").findOnce());
//     // 签到按钮
//     //toastLog("我的已点击");
//     while (textContains("上次登录").findOnce() == null) {
//         if (text("忘记手势").findOnce() != null) {
//             //toastLog("滑动手势");
//             sleep(500);
//             func.gesture_pwd(appName);
//             sleep(1000);
//         }
//     }
//     //toastLog("找签到");
//     while (text("已签到").findOnce() == null) {
//         func.sClick(id("tvName").text("签到有礼").findOnce());
//         sleep(1200);
//         func.sClick(text("签 到").findOnce());
//         sleep(1200);
//     }
//     toastLog(appName + "已签到");
//     sleep(1000);
// }

// 华彩生活
// function 华彩生活() {
//     let appName = "华彩生活";
//     //closeApp(appName);
//     func.to_app(appName);
//     while (text("我的").findOnce() == null) {
//         ;
//     }
//     sleep(1000);
//     func.sClick(text("我的").findOnce());
//     // 等待我的页面加载
//     text("自动还款").findOne();
//     // 签到按钮
//     while (id("iv_sign").findOnce() == null) {
//         func.to_autojs();
//         func.to_app(appName);
//         sleep(3000);
//     }
//     sleep(800);
//     func.sClick(id("iv_sign").findOnce());

//     while (textContains("恭喜您获得").findOnce() == null && text("今日已签").findOnce() == null) {
//         func.sClick(text("连续签到抽大奖").findOnce());
//         sleep(800);
//         if (text("请输入手势密码").findOnce() != null) {
//             sleep(500);
//             func.gesture_pwd(appName);
//             sleep(1000);
//         }
//     }
//     toastLog(appName + "已签到");
//     sleep(1000);
// }

// function 工银e生活() {
//     let appName = "工银e生活";
//     //closeApp(appName);
//     func.to_app(appName);
//     while (id("radio_button1").text("生活").findOnce() == null) {
//         ;
//     }
//     func.sClick(id("radio_button1").text("生活").findOne());
//     // 点击输入框
//     func.sClick(text("扫一扫").findOne().parent().child(1));
//     // 商城
//     id("tv_title").text("历史搜索").findOne();
//     sleep(1000);
//     func.sClick(className("TextView").id("tv_name").text("购物日").findOne());
//     sleep(1000);
//     id("tv_title").text("特色活动").findOne();
//     sleep(1000);
//     // 第二个商城
//     func.sClick(id("tv_name").text("购物日").findOne());
//     sleep(800);
//     text("点击签到").findOne();
//     sleep(2000);
//     func.sClick(text("点击签到").findOnce());

//     toastLog(appName + "已签到");
//     sleep(1000);
// }



// function 南航打卡() {
//     let find_text, find_idx;
//     func.to_scheme("csa://android.mbp.csair.com:80?action=PullUp&activityID=98&utm_source=yd&utm_campaign=ttdk&utm_channel=app");

//     while (text("已打卡").findOnce() == null) {
//         find_text = textStartsWith("您已连续打卡").textEndsWith("天").findOnce();

//         if (find_text != null) {
//             find_idx = find_text.indexInParent();
//             func.sClick(find_text.parent().child(find_idx - 1));
//             toast("已点击 立即打卡");
//             sleep(3000);
//         }
//         toast("等待完成 打卡完成");
//         sleep(2500);
//     }
//     toastLog("南航 打卡完成");
//     sleep(2500);
// }

// function 龙支付签到() {
//     func.to_scheme(cfg["url_scheme"]["建行"]["lzf签到"]);
//     text("今天").findOne();
//     while (text("今日已签到").findOnce() == null) {
//         if (func.sClick(text("立即签到").findOnce())) {
//             sleep(3000);
//         }
//     }
//     toast("LZF已签到");
//     sleep(3000);
// }