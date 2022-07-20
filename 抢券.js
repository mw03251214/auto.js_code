auto.waitFor();
// 导入模块
var func = require("func_list.js");
var cfg = func.config_dict();

main();

function main() {
    device.setMusicVolume(0);       //设为静音
    let selectedArr = ["光大活动", "中信活动", "京东相关", "BP直达", "招商便民生活", "招商倒计时领取", "饿了么来伊份", "平安瑞幸", "金融会员日"];
    //---------------配置区域-----------------
    let scriptName = func.dialogs_select(selectedArr);      // 设置查找的文本        
    // 设置屏幕常亮6分钟
    device.keepScreenOn(1000 * 60 * 6);
    if (scriptName == "光大活动") { 光大活动(); }
    else if (scriptName == "中信活动") { 中信活动(); }
    else if (scriptName == "京东相关") {
        select_func = func.dialogs_select(Object.keys(京东()));
        eval("京东()." + select_func + "()");
    }

    else if (scriptName == "BP直达") { BP直达(); }
    // else if (scriptName == "交行5积分") { 交行9点5积分(); }
    // else if (scriptName == "华彩生活瑞幸") { 华彩生活瑞幸(); }
    else if (scriptName == "招商便民生活") { 招商便民生活(); }
    else if (scriptName == "招商倒计时领取") { 招商倒计时领取(); }
    else if (scriptName == "饿了么来伊份") {
        select_func = func.dialogs_select(Object.keys(饿了么来伊份()));
        eval("饿了么来伊份()." + select_func + "()");
    }
    else if (scriptName == "金融会员日") { 金融会员日(); }
    else if (scriptName == "平安瑞幸") { 平安瑞幸(); }

    // else if (scriptName == "云闪付APPStore") { 云闪付().云闪付APPStore(); }
    // else if (scriptName == "云闪付2022新年捡漏") { 云闪付().云闪付2022新年捡漏(); }
    toastLog("结束");
    device.cancelKeepingAwake();
}

function get_server_delay(req_url) {
    try {
        http.__okhttp__.setTimeout(2000);       // 设置超时2秒
        http.get(req_url);
        return http.request_time().requestDelay_dnsStart;
    } catch (e) {
        log("get server delay over time");
        return 40;
    }
}


// ------------------------------------------------------
function 平安瑞幸() {
    let card_type = func.dialogs_select(["信用卡", "借记卡"]);
    let find_id;
    if (card_type == "信用卡") { find_id = "z3273543"; }
    else if (card_type == "借记卡") { find_id = "z3267850" }
    let target_time = "10,00,00,000";
    func.to_scheme("paesuperbank://?paesuperbank=%7B%22td%22%3A%7B%22id%22%3A%22%E5%94%A4%E9%86%92%E6%B5%AE%E5%B1%82%22%2C%22label%22%3A%22APP%E4%B8%8B%E8%BD%BD%E6%B5%AE%E5%B1%82%E7%AB%8B%E5%8D%B3%E6%89%93%E5%BC%80-%E6%A0%B7%E5%BC%8F2%22%7D%2C%22url%22%3A%22https%3A%2F%2Fb.pingan.com.cn%2Fkuaizhan%2Fpage%2Fcclife%2Flqzx%2F20220512%2Fh66228.html%3Factivity_FlowId%3Dm_A0O8P4cl5jtKSPbu9018%26campaignid%3D202205028912%26ai_id%3Dkuaizhan_h66228%26putInCode%3Dpocket-20170927-035742-380%26isNoInsertCard%3D2%26enUmForShare%3D888888888888%26SSLSOURCE%3DBROP-CMP%26putInCode%3Dpocket-20170927-035742-380%22%2C%22backRule%22%3A%22FLOAT%22%2C%22supId%22%3A%221283%22%7D");
    func.getTimeDiff("北京时间", target_time);
    let cnt = 30;
    while (cnt--) {
        func.cClick(idContains(find_id).findOnce());
        sleep(100);
    }
}
function 金融会员日() {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let h_arr = [10, 20, 30, 40, 50, 60];
    for (i = 0; i < h_arr.length; i++) {
        if (m < h_arr[i]) {
            m = h_arr[i];
            break;
        }
    }
    let target_time;
    if (m == 60) {
        target_time = h + ",59,59,999";
    } else {
        target_time = h + "," + m + ",00,000";
    }
    let func_type = func.dialogs_select(["到点点击进入等待", "详情页面领取"]);
    let text_arr = ["18元还款立减", "3元支付立减"];
    let cnt = 15;
    if (func_type == "到点点击进入等待") {
        let select_text = func.dialogs_select(text_arr);
        func.to_app("京东金融");
        // sleep(5000);
        func.getTimeDiff("京东时间", target_time, 1000 * 10);
        func.sClick(text(select_text).findOne());
        func.getTimeDiff("京东时间", target_time);
        text("温馨提示").findOne();
        while (cnt--) {
            func.sClick(text("是").findOnce());
            func.sClick(text("立即购买").findOnce());
            sleep(23);
        }
    } else {
        func.to_app("京东金融");
        func.getTimeDiff("京东时间", target_time);
        while (cnt--) {
            func.sClick(text("是").findOnce());
            func.sClick(text("立即购买").findOnce());
            sleep(23);
        }
    }
}
function 饿了么来伊份() {
    let stock_refresh = {
        饿了么提交订单() {
            let time_area = "北京时间";
            let h, m, minger;
            let server_delay = get_server_delay("http://cube.elemecdn.com") - 5;
            log("server_delay:" + server_delay);
            // dat = new Date();
            minger = func.dialogs_select([10000, 20000, 30000, 40000, 50000], "选择名额数量");
            h = func.dialogs_select(["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], "选择开始的小时数");
            m = dialogs.rawInput("请输入分钟:");
            let start_time = h + "," + m + ",00,000";
            log("start_time:" + start_time);
            while (text("提交订单").findOnce() == null) {
                toast("请手动跳转到 饿了么APP");
                sleep(2600);
            }
            toast("已转到 饿了么APP");
            func.getTimeDiff(time_area, start_time, server_delay);              // 等待到15秒的时候再进入
            // 线程用于处理执行时间
            threads.start(function () {
                sleep(minger / 10 * 7.5);
                exit();
            });
            while (1) {
                func.sClick(text("提交订单").findOnce());
                func.sClick(text("知道了").findOnce());
                func.sClick(text("确定").findOnce());
                sleep(43);
            }
        },
        饿了么倒计时() {
            let time_area = "北京时间";
            let h, m;
            let server_delay = get_server_delay("http://cube.elemecdn.com") - 5;
            log("server_delay:" + server_delay);
            // dat = new Date();
            // minger = func.dialogs_select([10000, 20000, 30000, 40000, 50000], "选择名额数量");
            h = func.dialogs_select(["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], "选择开始的小时数");
            m = dialogs.rawInput("请输入分钟:");
            let start_time = h + "," + m + ",00,000";
            log("start_time:" + start_time);
            func.getTimeDiff(time_area, start_time, server_delay);              // 等待到15秒的时候再进入
        },
        来伊份刷库存: function () {
            let cnt = 8;
            let payed, click_type;
            while (text("收银台").findOnce() == null) {
                toastLog("开始执行，等待一下");
                cnt = 8;
                click_type = ""
                func.sClick(text("立即购买").findOnce());
                func.sClick(className("android.view.View").text("已售罄").findOnce());
                while (cnt--) {
                    payed = text("实付款 ：").findOnce();
                    if (payed != null) {
                        // log("click_pay");
                        func.sClick(payed.parent().child(payed.parent().childCount() - 1));
                        click_type = "click_pay";
                    } else {
                        // log("click_sure");
                        func.sClick(text("确认").findOnce());
                        func.sClick(className("android.view.View").text("已售罄").findOnce());
                        click_type = "click_sure";
                    }
                    toast("当前cnt：" + cnt);
                    sleep(2500);
                    if (click_type == "") {
                        cnt = 8;
                        break;
                    }
                }
                log("click_type:" + click_type);
                if (click_type == "click_pay") {
                    toastLog("执行完一轮，返回一下");
                    back();
                    sleep(2000);
                }
            }
        },
    }
    return stock_refresh;
}
function 京东() {
    let jd_func = {
        到点切换领取: function (scheme_url, func_string, count, start_second, count_delay) {
            let count_delay = count_delay || 200;
            let time_area = time_area || "北京时间";
            let start_time;
            let h = new Date().getHours();           //时
            // start_second = '58,000'
            start_time = h + start_second || ",59,59,600";
            log(start_time);
            // TEST start_time = h + ",21,30,500";   // TEST
            if (new Date().getMinutes() < 59) {
                func.to_scheme(scheme_url);
                toastLog("切换到指定页面 测试等待");
                sleep(2500);
                toastLog("等待几秒");
                sleep(7000);
            }
            func.to_autojs();
            func.getTimeDiff(time_area, start_time);              // 等待到15秒的时候再进入
            func.to_scheme(scheme_url);
            while (count--) {
                func_string();              // 点击标签
                sleep(count_delay);
            }
        },
        整点点击: function (click_element, count, time_area, count_delay) {
            let count_delay = count_delay || 200;
            let time_area = time_area || "北京时间";
            let start_time;
            let h = new Date().getHours();           //时
            start_time = h + ",59,59,500";
            // TEST start_time = h + ",21,30,500";   // TEST
            func.getTimeDiff(time_area, start_time);              // 等待到15秒的时候再进入
            while (count--) {
                func.sClick(click_element);              // 点击标签
                sleep(count_delay);
            }
        }
    }
    let jd = {
        苹果券: function () {
            let scheme_url = 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","sourceValue":"babel-act","sourceType":"babel","url":"https://pro.m.jd.com/mall/active/3KwXX8TkUoxiYL5ZfDPzs7w7xqEV/index.html?utm_user=plusmember&gx=RnE1l2ANOjXdydTCOBKuwaU&ad_od=share&hideyl=1&cu=true&utm_source=weixin&utm_medium=weixin&utm_campaign=t_1000072672_17053_001&utm_term=500879a71fb64499ba0adf506754815d&PTAG=17053.1.1&_openapp=1"}';
            let func_string = function () {
                click("立即领取");
            }
            jd_func.到点切换领取(scheme_url, func_string, 20);
        },
        切换领取618惊喜券: function () {
            let scheme_url = 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","sourceValue":"babel-act","sourceType":"babel","url":"https://prodev.m.jd.com/mall/active/21Shup6BDitJApvnfuc8AjHnzfZ4/index.html?cu=true&utm_source=www.linkstars.com&utm_medium=tuiguang&utm_campaign=t_1000089893_157_0_184__b3106242b6736605&utm_term=09fd51f0f1734fd795f36f133d00296c&_openapp=1&toappactive=1"}';
            let func_string = function () {
                element = textContains("大促惊喜券").findOnce();
                if (element != null) {
                    try {
                        log('click');
                        func.sClick(element.parent().child(1).child(2));
                    } catch (e) {
                        log(e);
                    }
                }
            }
            jd_func.到点切换领取(scheme_url, func_string, 2, ',59,58,500');
        },
        京东618惊喜券: function () {
            let scheme_url = 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","sourceValue":"babel-act","sourceType":"babel","url":"https://prodev.m.jd.com/mall/active/21Shup6BDitJApvnfuc8AjHnzfZ4/index.html?cu=true&utm_source=www.linkstars.com&utm_medium=tuiguang&utm_campaign=t_1000089893_157_0_184__b3106242b6736605&utm_term=09fd51f0f1734fd795f36f133d00296c&_openapp=1&toappactive=1"}';
            func.to_scheme(scheme_url);
            let click_btn = null;
            let element, count;
            count = 0;
            while (click_btn == null) {
                element = textContains("大促惊喜券").findOnce();
                if (element == null) {
                    if (count == 0) {
                        toastLog("等待加载");
                    } else if (count > 9) {
                        count = 0;
                    } else {
                        sleep(300);
                    }
                } else {
                    try {
                        click_btn = element.parent().child(1).child(2);
                    }
                    catch (e) {
                        log("报错了:" + e);
                        continue;
                    }
                }
                count = coun
                t + 1;
            }
        }
    }
    return jd;

}

function BP直达() {
    let local_config = storages.create("local_config");
    let storage_bps = {};
    if (local_config.contains("BP直达")) {
        storage_bps = local_config.get("BP直达");
    }
    let select_item = func.dialogs_select(["---增加新BP链接", "---云端获取BP"].concat(Object.keys(storage_bps)));

    let bp_scheme;
    if (select_item == "---增加新BP链接") {
        // select_item = func.dialogs_select(["京东", "淘宝"]);
        let input_name = rawInput("请输入BP名称");
        bp_scheme = rawInput("请输入BP链接");
        if (storage_bps == {}) {
            storage_bps = { input_name: bp_scheme }
        }
        local_config.put("BP直达", storage_bps);
        func.to_scheme(bp_scheme);
        toast("已跳转BP链接");
    } else if (select_item == "---云端获取BP") {
        http.__okhttp__.setTimeout(3000);
        let res = func.jianguoyun("auto.js_code/", "BP_LIST.txt");
        let res_json = JSON.parse(res);
        local_config.put("BP直达", res_json);
    } else {
        bp_scheme = storage_bps[select_item];
        let jump_way = func.dialogs_select(["整点跳转", "直接跳转"]);
        if (jump_way == "整点跳转") {
            let h = new Date().getHours();
            log(h + "59,59,999");
            func.getTimeDiff("北京时间", h + ",59,59,999");
        }
        func.to_scheme(bp_scheme);
        toast("已跳转BP链接");
    }
}
function 招商倒计时领取() {
    let appName, url;
    appName = "招商银行"
    url = "";
    if (url != "") {
        func.to_scheme(url);
    } else {
        func.to_app(appName);
    }
    let cnt = 0;
    toastLog("等待立即领取出现");
    while (func.sClick(textStartsWith("立即").findOne()) == false) {
        if (cnt == 0) {
            toastLog("等待立即领取加载...")
        }
        cnt = cnt + 1;
        sleep(50);
        if (cnt > 1000 / 50 * 3) {
            cnt = 0;
        }
    }
    toastLog("已点击");
}

function 招商领取(page_text, wait_text, popup_wait_text, select_text, sure_btn) {
    /**
    @param page_text 等待目标页面 加载的文字
    @param wait_text 等待时间到点后 加载的文字
    @param popup_wait_text 等待点击后 弹窗加载的文字
    @param select_text 等待目标页面 要选择的文字
    @param sure_btn 等待选择界面后确认 的文字
     */
    while (text(page_text).findOnce() == null) {
        toast("等待跳转到:" + page_text + "页面");
        sleep(2200);
    }
    let cnt;
    cnt = 0
    while (func.sClick(text(wait_text).findOnce()) == false) {
        if (cnt % 10 == 0) {
            toast("等待选择奖品");
        }
        cnt = cnt + 1;
        sleep(300);

    }
    let popup_parent, popup_child;
    popup_parent = text(popup_wait_text).findOne().parent();
    popup_child = popup_parent.findByText(select_text);
    if (popup_child.size() > 0) {
        func.cClick(popup_child.get(0));
    }
    sleep(200);
    func.sClick(text(sure_btn).findOne());
}

function 招商便民生活() {
    let page_text, wait_text, popup_wait_text, select_text, sure_btn;
    page_text = "便民生活 遇见美好";
    wait_text = "选择奖品";
    popup_wait_text = "请选择奖品";
    select_text = func.dialogs_select(["双立人", "洁柔", "九阳", "1.8元", "5000微克", "4000微克"]);
    sure_btn = "确认领取";
    while (textContains("体验便民频道").findOnce() == null) {
        toast("请跳转到 生活-便民活动领取页面");
        sleep(2600);
    }
    招商领取(page_text, wait_text, popup_wait_text, select_text, sure_btn);
}

// 到点点击
function 光大活动() {
    toastLog("到点点击");
    let scheme_url = {
        "朴朴50-25周六日10点": "yghsh://jump?channel=FUNGUIDE_VOUCHERS_TEMPB&platform=FUNGUIDE&skipUrl=https://yghsh.cebbank.com/static/coupon/page/VouchersNew/index.html#/couponslist/listdetail/couponsdetail/126291&channelName=shanquan&batchId=126291&tag=shareDetail",
        "朴朴50-10平日10点": "yghsh://jump?channel=FUNGUIDE_VOUCHERS_TEMPB&platform=FUNGUIDE&skipUrl=https://yghsh.cebbank.com/static/coupon/page/VouchersNew/index.html#/couponslist/listdetail/couponsdetail/126279&jsonData=&channelName=shanquan&batchId=126279&tag=shareDetail",
        "美团30-15": "yghsh://jump?channel=FUNGUIDE_VOUCHERS_TEMPB&platform=FUNGUIDE&skipUrl=https://yghsh.cebbank.com/static/coupon/page/VouchersNew/index.html#/couponslist/listdetail/couponsdetail/126291&jsonData=&channelName=shanquan&batchId=126291&tag=shareDetail",
        "周五百果园25买50": "yghsh://jump?channel=FUNGUIDE_VOUCHERS_TEMPA&platform=FUNGUIDE&skipUrl=https://yghsh.cebbank.com/static/coupon/page/VouchersNew/index.html#/couponslist/listdetail/couponsdetail/132161&jsonData=&channelName=shanquan&batchId=132161&tag=shareDetail",
        "平日肯德基5买10": "yghsh://jump?channel=FUNGUIDE_VOUCHERS_TEMPA&platform=FUNGUIDE&skipUrl=https://yghsh.cebbank.com/static/coupon/page/VouchersNew/index.html#/couponslist/listdetail/couponsdetail/132093&jsonData=&channelName=shanquan&batchId=132093&tag=shareDetail",
        "平日叮咚15买20": "yghsh://jump?channel=FUNGUIDE_VOUCHERS_TEMPA&platform=FUNGUIDE&skipUrl=https://yghsh.cebbank.com/static/coupon/page/VouchersNew/index.html#/couponslist/listdetail/couponsdetail/132099&jsonData=&channelName=shanquan&batchId=132099&tag=shareDetail",
        "平日百果园10买20": "yghsh://jump?channel=FUNGUIDE_VOUCHERS_TEMPA&platform=FUNGUIDE&skipUrl=https://yghsh.cebbank.com/static/coupon/page/VouchersNew/index.html#/couponslist/listdetail/couponsdetail/132157&jsonData=&channelName=shanquan&batchId=132157&tag=shareDetail",
    }
    let startTime, targetViewText;
    let actNames = ["周五石化200-120", "10点美团30-15", "朴朴50-25周六日10点", "朴朴50-10平日10点", "周五百果园25买50", "平日百果园10买20", "平日叮咚15买20", "平日肯德基5买10"];
    let actName = func.dialogs_select(actNames);      // 设置查找的文本

    if (actName == "10点美团30-15" || actName == "朴朴50-25周六日10点" || actName == "周五百果园25买50" || actName == "平日百果园10买20" || actName == "平日叮咚15买20" || actName == "平日肯德基5买10") {
        startTime = "10,00,00,000";
    } else if (actName == "周五石化200-120" || actName == "") {
        startTime = "14,59,59,500";
    }

    let appName = "阳光惠生活";
    let timeArea = "北京时间";
    if (!!scheme_url[actName]) {
        func.to_scheme(scheme_url[actName]);
    } else {
        func.to_app(appName);
    }
    // 等待进入指定页面
    while (!textContains("优惠细则").findOnce()) {
        toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
        sleep(1000);
    }
    toastLog("已到达指定页面，等待");
    let click_btn;
    click_btn = text("确认购买").findOnce();
    if (click_btn == null) {
        click_btn = textContains("立即抢购").findOnce();
    }
    //   定位元素
    func.getTimeDiff(timeArea, startTime,);
    while (text("收银台").findOnce() == null) {
        func.sClick(text("确认购买").findOnce());
        func.sClick(textContains("立即抢购").findOnce());
        func.sClick(text("确认").findOnce());
        sleep(23);
    }
    toastLog("已点击，请确认结果");
    sleep(3000);
}

// 等待页面变价
function 中信活动() {
    let appName = "动卡空间";
    let pkgName = "com.citiccard.harmony.app";
    let timeArea = "北京时间";
    let startTime, targetViewText;
    let actNames = ["10点-15点-9积分兑换", "周三六11点-5折必胜客百果园", "9积分捡漏"];
    let actName = func.dialogs_select(actNames);      // 设置查找的文本
    let couDes, couClick;    // 券描述列表
    let nowDate = new Date();
    let item_page_text = "价格: 1个权益+9个积分";

    switch (actName) {
        case "10点-15点-9积分兑换":
            if (func.dialogs_select(["基础权益", "额外权益"]) == "基础权益") {
                couDes = ["京东支付券15元", "天猫15元", "奈雪18元", "百果园18元", "腾讯视频VIP"];
            }
            else {
                couDes = ["喜茶25", "京东支付券20", "天猫20元", "星巴克中杯", "迪士尼20", "麦当劳25", "美团外卖20", "优酷会员45天", "芒果TV45天"];
            }
            toastLog("等待页面变化");
            // log(nowDate.getHours() <= 9);
            // 如果当前小时数 大于10，则是15点场
            if (nowDate.getHours() <= 9) {
                startTime = "09,59,50,000"
            } else {
                startTime = "14,59,50,000"
                couDes = ["【下午茶】喜茶25元抵用券（15点抢兑）"];
            }

            if (couDes.length == 1) {
                targetViewText = couDes[0];               // 设置查找的文本
            } else {
                targetViewText = func.dialogs_select(couDes);               // 设置查找的文本
            }

            func.to_app(appName);             // 启动APP
            couClick = null;          // 找券
            while (couClick == null) {
                if (couDes == "星巴克中杯饮品电子券") {
                    couClick = text(targetViewText).findOnce();          // 找券
                } else {
                    couClick = textContains(targetViewText).findOnce();          // 找券
                }
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
                sleep(1000);
            }
            // toastLog("已到达等待页面，提前15秒自动进入");
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待到15秒的时候再进入
            func.sClick(couClick);              // 点击标签
            text(item_page_text).findOne();             // 等待进入指定页面
            toastLog("已到达指定页面，等待");
            //点击元素
            let un_start, to_pay = null;
            un_start = text("未开始").findOne();
            let un_x, un_y;
            un_x = un_start.bounds().centerX();
            un_y = un_start.bounds().centerY();
            while (to_pay == null) {
                click(un_x, un_y);
                sleep(100);
                to_pay = text("去支付").findOnce();
            }
            func.sClick(to_pay);
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
        case "周三六11点-5折必胜客百果园":
            toastLog("到点点击");
            startTime = "11,00,00,000";             // 设置时间点
            couDes = ["必胜客100元代金券", "必胜客50元代金券", "达美乐50元代金券", "肯德基50元代金券", "乐凯撒50元代金券"];             // 券名称
            targetViewText = func.dialogs_select(couDes);               // 设置查找的文本
            func.to_app(appName);             // 启动APP
            // 等待进入指定页面
            couClick = text(targetViewText).findOnce();
            while (couClick == null) {
                couClick = text(targetViewText).findOnce();
                toastLog("请跳转到，首页-精彩365--5折友券,\n直到提示已到达等待页面");
                sleep(2500);
            }
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);
            sleep(200);              // 等待时间
            func.sClick(couClick);             // 点击元素
            // 点击元素
            while (func.sClick(text("确认").findOnce()) == false) {
                func.sClick(className("Button").text("立即购买").findOnce());
                func.sClick(className("Button").text("已售罄").findOnce());
                sleep(100);
            }
            // func.sClick(text("确认").findOne());
            toastLog("已点击，请确认结果");
            sleep(3000);
            break;
        case "9积分捡漏":
            couDes = ["App Store", "迪士尼25", "必胜客20", "奈雪", "喜茶25元", "苏宁支付券", "京东支付券", "天猫20",
                "星巴克中杯饮品电子券", "名创优品20", "网易严选20", "百果园20", "美团外卖20", "优酷VIP", "腾讯视频", "芒果TV", "爱奇艺VIP"];
            appName = "动卡空间"
            let cnt = 0;
            targetViewText = func.dialogs_select(couDes);               // 设置查找的文本
            func.to_app(appName);             // 启动APP
            while (text(item_page_text).findOnce() == null) {
                sleep(100);
                cnt = cnt + 1;
                if (cnt >= 25) {
                    cnt = 0;
                    toastLog("请手动切换到要捡漏的商品页面");
                }
            }             // 等待进入指定页面
            sleep(300);
            nowDate = new Date();

            if (nowDate.getHours() <= 10) {
                startTime = "10,18,20,000"
            } else if (nowDate.getHours() >= 15) {
                startTime = "15,18,20,000"
            } else {
                startTime = "00,01,01,100"
            }
            toastLog("18分启动.....");
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            let exWhile = false;
            // 门店查找方式
            if (text("适用门店").findOnce() != null) {
                while (1) {
                    if (func.sClick(text("去兑换").findOnce())) {
                        func.sClick(text("去支付").findOne());
                        while (1) {
                            if (text("适用门店").findOnce() != null) {
                                exWhile = false
                                break;
                            }
                            if (text("交易时间").findOnce() != null) {
                                exWhile = true
                                break;
                            }
                        }
                        if (exWhile) { break; }
                    }
                    if (func.sClick(text("适用门店").findOnce())) {
                        className("EditText").depth(14).findOne();
                        back();
                        sleep(400);
                    }
                    sleep(150);
                }
            } else {
                let item = null;
                // 无门店查找
                while (1) {
                    if (func.sClick(text("去兑换").findOnce())) {
                        func.sClick(text("去支付").findOne());
                        while (1) {
                            if (text("适用门店").findOnce() != null) {
                                exWhile = false
                                break;
                            }
                            if (text("交易时间").findOnce() != null) {
                                exWhile = true
                                break;
                            }
                        }
                        if (exWhile) { break; }
                    } else {
                        back();
                        item = textContains(targetViewText).depth(17).findOnce();
                        cnt = 0;
                        while (item == null) {
                            item = textContains(targetViewText).depth(17).findOnce();
                            sleep(50);
                            scrollDown(0);
                            cnt = cnt + 1;
                            // 滑动3次就手动滑动一次
                            if (cnt >= 3) {
                                swipe(500, 850, 500, 600, 100);
                                cnt = 0;
                            }
                            sleep(50);
                            func.sClick(text("点击查看更多").findOnce());
                            sleep(50);
                        }
                        func.sClick(item);
                        text(item_page_text).findOne();
                    }
                    sleep(150);
                }
            }
    }
}

function randomSwipe(sx, sy, ex, ey) {
    //设置随机滑动时长范围
    var timeMin = 400
    var timeMax = 700
    //设置控制点极限距离
    var leaveHeightLength = 500

    if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
        var my = (sy + ey) / 2
        var y2 = my + random(0, leaveHeightLength)
        var y3 = my - random(0, leaveHeightLength)

        var lx = (sx - ex) / 3
        if (lx < 0) { lx = -lx }
        var x2 = sx + lx / 2 + random(0, lx)
        var x3 = sx + lx + lx / 2 + random(0, lx)
    } else {
        var mx = (sx + ex) / 2
        var y2 = mx + random(0, leaveHeightLength)
        var y3 = mx - random(0, leaveHeightLength)

        var ly = (sy - ey) / 3
        if (ly < 0) { ly = -ly }
        var y2 = sy + ly / 2 + random(0, ly)
        var y3 = sx + ly + ly / 2 + random(0, ly)
    }

    var time = [0, random(timeMin, timeMax)]
    var track = bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)

    log("控制点A坐标：" + x2 + "," + y2)
    log("控制点B坐标：" + x3 + "," + y3)
    log("滑动时长：" + time[1])
    // log(time.concat(track));
    gestures(time.concat(track))
}

function bezierCreate(x1, y1, x2, y2, x3, y3, x4, y4) {
    var h = 100;
    var cp = [{ x: x1, y: y1 + h }, { x: x2, y: y2 + h }, { x: x3, y: y3 + h }, { x: x4, y: y4 + h }];
    var numberOfPoints = 100;
    var curve = [];

    var dt = 1.0 / (numberOfPoints - 1);
    for (var i = 0; i < numberOfPoints; i++) {
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;

        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;

        var t = dt * i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }

    var array = [];
    for (var i = 0; i < curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
    return array
}

/*------------------------------------NOT VALID------------------------------------
function 交行9点5积分() {
    toastLog("等待页面变化");
    let appName = "买单吧";
    let timeArea = "北京时间";
    let startTime = "08,59,57,000"
    let actNames = ["加油卡充值30元红包", "缴费类15元红包", "话费20元红包", "话费10元红包", "本月2倍积分", "一键加油15元红包"];
    let actName = func.dialogs_select(actNames);      // 设置查找的文本
    func.to_app(appName);
    // 等待进入指定页面
    let get_packet, packet_parent, packet_childcount;
    textContains("本月可用兑换资格").findOne();
    toastLog("已到达指定页面");
    func.getTimeDiff(timeArea, startTime);              // 等待时间
    while (1) {
        get_packet = text(actName).findOnce();
        if (get_packet != null) {
            packet_parent = get_packet.parent().parent();
            packet_childcount = packet_parent.childCount();
            if (func.sClick(packet_parent.child(packet_childcount - 1))) {
                sleep(100);
            }
        }
        if (func.sClick(text("确定").findOnce())) {
            toastLog("已点击确定");
            break;
        }
    }
}

function 华彩生活瑞幸() {
    let appName, startTime, select_txt, timeArea;
    timeArea = "北京时间";
    appName = "华彩生活";
    startTime = "10,00,00,000";
    select_txt = func.dialogs_select(["23元瑞幸咖啡", "26元瑞幸咖啡", "29元瑞幸咖啡"]);
    func.to_app(appName);
    let click_btn = text("确认购买").depth(13).findOnce();
    while (click_btn == null) {
        func.sClick(textContains(select_txt).depth(15).findOnce());
        toast("请手动跳转到券页面");
        sleep(2500);
        click_btn = text("确认购买").depth(13).findOnce();
    }
    toastLog("已找到指定按钮，请勿切换页面");
    sleep(3000);
    func.getTimeDiff(timeArea, startTime, 1000);
    func.sClick(click_btn);
}
function 云闪付() {
    let work = {
        云闪付APPStore: function () {
            let appName, startTime, click_text, timeArea, click_btn, cnt;
            timeArea = "北京时间";
            appName = "云闪付";

            let select_func = func.dialogs_select(["9点签到金兑换", "14点签到金兑换", "10点积点兑换"]);
            if (select_func == "9点签到金兑换" || select_func == "14点签到金兑换") {
                if (select_func == "9点签到金兑换") {
                    startTime = "09,00,00,000";
                } else {
                    startTime = "14,00,00,000";
                }
                click_text = "去兑换";
                func.to_scheme(cfg["url_scheme"]["云闪付"]["签到"]);
                let click_btn = text(click_text).findOnce();
                while (click_btn == null) {
                    toast("请手动跳转到券页面");
                    sleep(2500);
                    click_btn = text(click_text).findOnce();
                }
                toastLog("已找到指定按钮，请勿切换页面");
                sleep(3000);
                cnt = 6;
                func.getTimeDiff(timeArea, startTime);
                while (cnt--) {
                    func.sClick(click_btn);
                    sleep(222);
                }
            } else if (select_func == "10点积点兑换") {
                startTime = "09,59,50,000";
                func.to_scheme(cfg["url_scheme"]["云闪付"]["会员中心"]);
                while (textStartsWith("App").textEndsWith("00起兑").findOnce() == null) {
                    toast("请手动跳转到券页面");
                    sleep(2500);
                }
                toastLog("已找到指定按钮，请勿切换页面");
                func.getTimeDiff(timeArea, startTime);
                let cnt = 0;
                while (!func.sClick(text("确认兑换").findOnce())) {
                    func.sClick(text("立即兑换").findOnce());
                    sleep(50);
                    cnt = cnt + 1;
                    if (cnt > 40) {
                        toast("等待点击按钮出现");
                        cnt = 0;
                    }
                }
            }
        },
        云闪付2022新年捡漏: function () {
            let coupon_id, url_jump, coupon_dict, coupon_id_list;
            coupon_id_list = [];
            coupon_dict = {};
            coupon_desc_list = func.dialogs_checkbox(Object.keys(cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"]), "抢券_云闪付新年捡漏", "多选");
            coupon_desc_list.forEach(coupon_desc => {
                url_jump = cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"][coupon_desc];
                coupon_id = url_jump.slice(-16);
                coupon_id_list.push(coupon_id);
                coupon_dict[coupon_id] = coupon_desc;
            })
            print(coupon_desc_list);
            func.to_app("云闪付");
            http.__okhttp__.setTimeout(3000);       // 设置超时2秒
            let res, res_text, coupon_quota, break_flag, url_origin, url_jump_prefix;
            url_jump_prefix = url_jump.slice(0, -16);
            break_flag = false;
            while (true) {
                // coupon_id_list.forEach(coupon_id => {
                for (let i = 0; i < coupon_id_list.length; i++) {
                    coupon_id = coupon_id_list[i];
                    url_origin = "https://content.95516.com/koala-pre/koala/coupon/state?cityCd=350200&couponId=" + coupon_id;
                    try {
                        res = http.get(url_origin);
                        res_text = res.body.json();
                        coupon_quota = res_text["params"]["couponQuota"];
                        // 如果券的百分比不为0，则跳转, xm券为null
                        if (coupon_quota != "以实际宣传为准" && coupon_quota != "今日已抢完") {
                            func.to_scheme(url_jump_prefix + coupon_id);
                            device.vibrate(1000);
                            log(coupon_dict[coupon_id] + ":" + coupon_quota);
                            // to_js_flag = true;
                            // func.sClick(text("立即领取").findOnce());
                            if (func.sClick(text("立即领取").findOne(5000))) {
                                if (text("请完成安全验证").findOne(5000) != null) {
                                    while (text("请完成安全验证").findOnce() != null) {
                                        toast("请完成验证");
                                        sleep(2500);
                                    }
                                } else {
                                    toast("查找安全验证超时，继续");
                                }
                            }
                            if (text("恭喜您领取成功").findOnce() != null) {
                                break_flag = true;
                                break;
                            }
                        }
                    } catch (e) {
                        log("报错：" + e);
                    }
                }
                if (break_flag) {
                    break;
                }
                toast("未成功，等待3s继续...");
                sleep(3000);
            }
            func.dialogs_alert("捡漏完成，退出");
        },
        云闪付2022新年: function () {
            let url_ysf, coupon_desc;
            let startTime, timeArea;

            timeArea = "北京时间";
            if (func.dialogs_select(["日常11点券", "周三14点券"]) == "日常11点券") {
                coupon_desc = func.dialogs_select(Object.keys(cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"]));
                url_ysf = cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"][coupon_desc];
            } else {
                coupon_desc = func.dialogs_select(Object.keys(cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年_周三14点"]));
                url_ysf = cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年_周三14点"][coupon_desc];
            }

            // coupon_id = func.dialogs_select(Object.keys(cfg["url_scheme"]["云闪付"]["云闪付_券_圆梦新年"][coupon_desc]))


            if (coupon_desc.substring(0, 5) == "周三14点") {
                startTime = "13,59,55,000";
            } else {
                startTime = "10,59,55,000";
            }
            toastLog("开始时间:" + startTime);
            func.to_scheme(url_ysf);
            toastLog("测试查看,2秒后 切回autojs");
            textContains("活动咨询").findOne();
            sleep(1000);
            func.to_autojs();
            toastLog("等待55秒，自动跳转至云闪付对应券页面");
            // 准备倒计时
            func.getTimeDiff(timeArea, startTime);
            func.to_scheme(url_ysf);
            toastLog("已跳转云闪付，如未跳转，请手动切换");
            if (func.sClick(text("立即领取").findOne(10000))) {
                toastLog("超时退出");
            }
        }
    }
    return work;
}
this.云闪付捡漏 = function () {
        let targetViewText, targetText;
        // targetViewText = func.dialogs_select(["10-2线上", "10-2线下"]);
        while (text("奖励中心").findOnce() == null) {
            toastLog("请跳转到 \" 奖励中心 \"，直到提示  已到达等待页面");
            sleep(2000);
        }
        // switch (targetViewText) {
        //     case "10-2线上":
        //         counponText = "满10可用";
        //         targetText = "线上指定商户";
        //         break;
        //     case "10-2线下":
        //         counponText = "满10可用";
        //         targetText = "线下指定商户";
        //         break;
        // }
        let clickFlag, exWhile, clickItems, clickItem, itemParent, itemIndex, upItemText;
        exWhile = false;
        clickFlag = 1;
        while (1) {
            if (clickFlag == 1) {
                counponText = "满10可用";
                targetText = "线下指定商户";
                clickFlag = 2;
            } else {
                counponText = "满10可用";
                targetText = "线上指定商户";
                clickFlag = 1;
            }
            // 查找券位置
            while (1) {
                try {
                    clickItems = text(counponText).find();
                    log("找到 " + counponText + " 数量：" + clickItems.length);
                    if (clickItems.nonEmpty()) {
                        for (let i = 0; i < clickItems.length; i++) {
                            clickItem = clickItems[i];
                            itemIndex = clickItem.indexInParent();
                            itemParent = clickItem.parent();
                            upItemText = (itemParent.child(itemIndex + 1)).text();
                            log(upItemText);
                            // 如果文本一致，就退出选择
                            if (upItemText == targetText) {
                                exWhile = true;
                                break;
                            }
                        }
                    }
                    // 如果退出选项
                    if (exWhile) {
                        break;
                    }
                }
                catch (e) {
                    log("123");
                }
            }
            // 点击进入 等待
            func.sClick(clickItem);
            // 等待是否到达立即领取页面
            text("优惠券到账后24小时内有效").findOne();
            // 如有立即领取，点击 退出程序
            if (func.sClick(text("立即领取").findOnce())) {
                // 如果已点击，就等待手动返回
                while (text("奖励中心").findOnce() == null) {
                    toastLog("等待手动返回...");
                    sleep(2500);
                }
            } else {
                toastLog("未捡漏成功....");
                sleep(2000);
                back();
                text("奖励中心").findOne();
                toastLog("已返回....");
                sleep(1500);
            }
        }
    }
this.云闪付锦鲤活动 = function () {
        let startTime;
        let appName = "云闪付";
        let timeArea = "北京时间";
        toastLog("到点点击");

        let currentWeekday = new Date().getDay();
        let counponText;
        // 返回的周日0 周一返回1，周二2
        switch (currentWeekday) {
            case 5:
                counponText = "满20可用";
                break;
            case 6:
                counponText = "满35可用";
                break;
            case 0:
                counponText = "满50可用";
                break;
        }
        let selectFunc;
        selectFunc = func.dialogs_select(["每日券", "云闪付捡漏", "周五六日10点", "周五六日15点"]);
        let clockBefore, clockAfter;
        let clock9, clock10, clock15;
        let targetText;
        targetText = "线下指定商户";
        clock9 = "09:00";
        clock10 = "10:00";
        clock15 = "15:00";
        switch (selectFunc) {
            case "每日券":
                counponText = "满10可用";
                targetText = func.dialogs_select(["线下指定商户", "线上指定商户"]);
                startTime = "08,59,58,800";
                clockAfter = clock9;
                clockBefore = clock10;
                break;
            case "周五六日10点":
                startTime = "09,59,58,500";
                clockAfter = clock10;
                clockBefore = clock15;
                break;
            case "周五六日15点":
                startTime = "14,59,58,500";
                clockAfter = clock15;
                clockBefore = clock10;
                break;
            case "云闪付捡漏":
                云闪付捡漏();
                break;
        }
        let getCouponWay;       //定义领券方式
        getCouponWay = func.dialogs_select(["提前1秒进入页面领取", "切换时间标签领券"]);
        func.to_app(appName);
        while (text("明日预告").findOnce() == null) {
            // 如果能点击按钮，就等待设置文本
            try {
                if (func.sClick(className("ViewFlipper").idContains("marquee").findOnce()) == true) {
                    // 只要找到一个不为空
                    if (textContains("跳过").findOnce() != null || descContains("跳过").findOnce() != null) {
                        sleep(600);
                        continue;
                    } else {
                        text("历史记录").findOne();
                        func.sClick(text("奖励中心").depth(15).findOne());
                        func.sClick(text("奖励中心").depth(17).findOne());
                    }
                }
            }
            catch (e) {
                continue;
            }
        }
        // 等待进入指定页面
        while (text("奖励中心").findOnce() == null) {
            toastLog("请跳转到 \" 奖励中心 \"，直到提示  已到达等待页面");
            sleep(1500);
        }
        toastLog("已到达 \" 奖励中心 \"");
        let clickBtn, clickItems;
        if (getCouponWay == "提前1秒进入页面领取") {
            func.sClick(text(clockAfter).findOne());   //点击目标时间按钮
            sleep(1000);
            // 查找券位置
            while (1) {
                try {
                    clickItems = text(counponText).find();
                    log("找到 " + counponText + " 数量：" + clickItems.length);
                    if (clickItems.nonEmpty()) {
                        for (let i = 0; i < clickItems.length; i++) {
                            clickBtn = clickItems[i];
                            itemIndex = clickBtn.indexInParent();
                            itemParent = clickBtn.parent();
                            upItemText = (itemParent.child(itemIndex + 1)).text();
                            log(upItemText);
                            // 如果文本一致，就退出选择
                            if (upItemText == targetText) {
                                exWhile = true;
                                break;
                            }
                        }
                    }
                    // 如果退出选项
                    if (exWhile) {
                        break;
                    }
                }
                catch (e) {
                    log(e);
                }
            }
            // 准备倒计时
            func.getTimeDiff(timeArea, startTime);

            func.sClick(clickBtn);// 时间到达 点击Jk
            text("优惠券到账后24小时内有效").findOne();         // 等待是否到达立即领取页面
            if (func.sClick(text("立即领取").findOne(10000)) == false) {
                toastLog("超时退出...");
            }
        } else if (getCouponWay == "切换时间标签领券") {
            // 点击另一个时间
            func.sClick(text(clockBefore).findOne());
            sleep(500);
            func.sClick(text(clockBefore).findOne());
            sleep(500);
            func.sClick(text(clockBefore).findOne());
            sleep(800);
            // 定义子按钮的位置
            let childIdx;
            switch (selectFunc) {
                case "每日券":
                    if (counponText == "线下指定商户") {
                        childIdx = 2;
                    }
                    else if (counponText == "线上指定商户") {
                        childIdx = 8;
                    }
                case "周五六日10点":
                    childIdx = 2;
                    break;
                case "周五六日15点":
                    childIdx = 2;
                    break;
            }
            // 定义目标时间，提前获取
            let targetClock;
            targetClock = text(clockAfter).findOne();
            toastLog("已到达指定页面，等待");
            //  等待倒计时
            func.getTimeDiff(timeArea, startTime);
            // 寻找目标按钮
            func.sClick(targetClock);
            while (1) {
                // 点击目标时间
                try {
                    clickBtn = text(counponText).findOnce().parent().parent().child(childIdx);
                } catch (error) {
                    continue;
                }
                if (clickBtn.text() != "立即领取") {
                    func.sClick(text(clockBefore).findOne());
                    sleep(100);
                    func.sClick(text(clockAfter).findOne());
                    sleep(100);
                    while (text(counponText).findOnce() == null) {
                        func.sClick(text(clockAfter).findOnce());
                        sleep(100);
                    }
                } else {
                    break;
                }
            }
            func.sClick(clickBtn);
        }
        toastLog("已完成");
    }
function 京喜领券() {
    let timeArea = "京东时间";
    let startTime, targetViewText;
    let actNames = ["0点京喜95折", "京东券"];
    let actName = func.dialogs_select(actNames);      // 设置查找的文本
    let coupon_url, url_页面;
    switch (actName) {
        case "0点京喜95折":
            startTime = "23,59,59,990";
            targetViewText = "立即领取";
            coupon_url = "http://coupon.m.jd.com/coupons/show.action?key=g7udi9d8e5260e8b7a8a76c0d01209e8&roleId=62130462";
            url_页面 = (cfg["url_scheme"]["京东"]["京喜_券"]).replace("replace_url", coupon_url);
            break;
    }
    // 跳转到APP
    func.to_scheme(url_页面);

    // 等待进入指定页面
    let couClick = textContains(targetViewText).findOnce();
    while (couClick == null) {
        couClick = textContains(targetViewText).findOnce();
        toastLog("等待跳转到京喜优惠券页面");
        sleep(1000);
    }
    func.getTimeDiff(timeArea, startTime);              // 等待时间
    func.sClick(couClick);             // 点击元素
    sleep(100);
    func.sClick(couClick);             // 点击元素
    sleep(100);
    func.sClick(couClick);             // 点击元素
    toast("已点击");
    sleep(3000);

}
function 农行缴费() {
    let startTime, targetViewText;
    let appName = "云闪付";
    let timeArea = "北京时间";
    toastLog("到点点击");
    startTime = "09,59,59,700";
    targetViewText = "[6179]";
    func.to_app(appName);
    // 等待进入指定页面
    let card = textContains(targetViewText).findOnce();
    while (card == null) {
        card = textContains(targetViewText).findOnce();
        toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
        sleep(800);
    }
    toastLog("已到达指定页面，等待");
    //  等待倒计时
    func.getTimeDiff(timeArea, startTime);
    // 点击进入 等待
    func.sClick(card);
    while (1) {
        if (text('¥10.00').findOnce()) {
            if (func.sClick(text("确认付款").findOnce())) { break; }
        } else {
            sleep(50);
        }
    }
}
function 掌上生活活动() {
    let startTime, targetViewText;
    let actNames = ["周三五折", "10点拼团星巴克"];
    let actName = func.dialogs_select(actNames);      // 设置查找的文本
    let appName = "掌上生活";
    let timeArea = "北京时间";
    let cnt = 3;
    switch (actName) {
        // 10点
        case "周三五折":            //10点
            toastLog("提前5秒进入");
            startTime = "09,59,55,000";
            targetViewText = func.dialogs_select(["（周三5折）喜茶20元代金券",
                "（周三5折）必胜客50元代金券",
                "（周三5折）肯德基20元全场通兑代金券"]);
            func.to_app(appName);
            // 等待进入指定页面
            while (!text(targetViewText).findOnce()) {
                toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
                sleep(800);
            }
            toastLog("已到达指定页面，等待");
            //  提前10秒 开始查找
            func.getTimeDiff(timeArea, startTime);
            // 点击进入 等待
            func.sClick(text(targetViewText).findOne());
            while (1) {
                if (!func.sClick(textContains("立即抢购").findOnce())) {
                    sleep(200);
                } else {
                    break;
                }
            }
            break;
        case "10点拼团星巴克":            //10点
            toastLog("提前15秒 进入");
            startTime = "09,59,45,000";
            targetViewText = "星巴克中杯手工调制饮品";
            func.to_app(appName);
            // 等待进入指定页面
            while (!textContains("成团").findOnce()) {
                toastLog("请跳转到券领取页面，直到提示  已到达等待页面");
                sleep(800);
            }
            toastLog("已到达指定页面，等待");
            //  提前10秒 开始进入
            func.getTimeDiff(timeArea, startTime);
            func.sClick(textContains("成团").findOnce());
            let clickBtn;
            func.getTimeDiff(timeArea, "09,59,59,700");
            while (1) {
                try {
                    clickBtn = text(targetViewText).findOnce().parent().child(8).child(0);
                    // 点击立即抢
                    while (cnt > 0) {
                        clickBtn.click();
                        sleep(200);
                        cnt = cnt - 1;
                    }
                    break;
                }
                catch (e) { continue; }
            }
            break;
    }
    toastLog("已点击，请确认结果");
    sleep(3000);
}
function 工行活动() {
    let appName = "工银e生活";
    let timeArea = "北京时间";
    let startTime = "10,29,59,680";
    couName = "确定"
    func.to_app(appName);             // 启动APP
    // 找到使用流程，且找到对应券名称沃尔玛的情况下就是 券的详情页
    while (!(text("安全验证").findOnce())) {
        toastLog("请进入活动页面，直到提示  已到达等待页面");
        sleep(333);
    }
    let sureBtn = className("android.widget.Button").text(couName).findOne();
    toastLog("已到达指定页面，等待");
    func.getTimeDiff(timeArea, startTime);              // 等待时间
    // 等待点击立即购买
    func.sClick(sureBtn);
    toastLog("已点击，请确认结果");
    sleep(3000);
}
// 等待页面变价
function 京东腾讯月() {
    let actNames = ["腾讯视频VIP月卡"]; //, "肯德基10元代金券"];
    //let actName = func.dialogs_select(actNames);      // 设置查找的文本
    toastLog("等待页面变化");
    let appName = "京东金融";
    func.to_app(appName);
    let tVip, getBtn;
    // 等待进入指定页面
    toastLog("请跳转到腾讯月卡领取页面，直到提示  已到达等待页面");
    sleep(800);
    className("android.view.View").text(actName).findOne();
    toastLog("已到达指定页面，等待");

    while (1) {
        try {
            tVip = className("android.view.View").text(actName).findOnce();
            // 找到领取按钮
            getBtn = tVip.parent().child(4).child(0);
            if (getBtn != null) {
                if (getBtn.text() == "立即领取" || getBtn.desc() == "立即领取") {
                    func.sClick(getBtn);
                    sleep(300);
                    func.sClick(getBtn);
                    sleep(300);
                    func.sClick(getBtn);
                    toastLog("结束,已点击！");
                    sleep(800);
                    break;
                }
            }
        } catch (e) {
            continue;
        }
    }
}
function 中行周二视频捡漏() {
    let aiqiyi, youku, tengx, pay5, cnt;
    aiqiyi = "爱奇艺VIP";
    youku = "优酷VIP"
    tengx = "腾讯视频VIP"
    pay5 = "确认支付";
    cnt = 0;
    while (1) {
        if (textContains(aiqiyi).findOnce() == null && textContains(youku).findOnce() == null && textContains(tengx).findOnce() == null) {
            toastLog("请跳转到 \" 视频会员 \"，直到提示  已到达等待页面");
            sleep(2500);
        } else {
            toastLog("已到 \" 视频会员 \"，页面");
            sleep(2500);
            break;
        }
    }
    let exflag = false;
    while (1) {
        if (func.sClick(text(pay5).findOnce()) == true) {
            toastLog("已点击确认支付");
            while (1) {
                if (text("当日库存已抢购完毕，请明日参加活动。").findOnce() != null) {
                    if (func.sClick(text("确认").findOnce()) == true) {
                        sleep(5000);
                        break;
                    }
                }
                sleep(1000);
                cnt = cnt + 1;
                if (cnt >= 10) {
                    cnt = 0;
                    exflag = true;
                    break;
                }
            }
            if (exflag) {
                toastLog("未找到库存完毕，退出");
                break;
            }
        } else {
            sleep(1000);
        }
    }
}
------------------------------------NOT VALID------------------------------------*/