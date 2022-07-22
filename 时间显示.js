// 导入模块
var func = require("func_list.js");

var selectedArr = [
    "北京时间",
    "京东时间",
    "苏宁时间",
    "淘宝时间",
    "延迟测试",
    "饿了么倒计时"
];

var selectIndex = func.dialogs_select(selectedArr);

if (selectIndex == "延迟测试") {
    var targetAreas, targetUrl;
    targetAreas = ["北京时间", "京东时间", "苏宁时间", "淘宝时间",];
    // targetArea = func.dialogs_select(targetAreas);

    var res, stTimestamp, edTimestamp, resultStr, resultStr2;
    resultStr = "BY_Timestamps\n";
    resultStr2 = "BY_okHttpEvent\n";
    let htt = http;
    htt.__okhttp__.setTimeout(800);       // 设置超时2秒
    targetAreas.forEach(area => {
        switch (area) {
            case "北京时间":
                targetUrl = "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp";
                break;
            case "京东时间":
                targetUrl = "https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5";
                break;
            case "苏宁时间":
                targetUrl = "https://f.m.suning.com/api/ct.do";
                break;
            case "淘宝时间":
                targetUrl = "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp";
                break;
        }

        try {
            stTimestamp = new Date();
            res = htt.get(targetUrl);
            edTimestamp = new Date();
            resultStr = resultStr + area + "请求时差:" + (edTimestamp - stTimestamp) + "\n";
            resultStr2 = resultStr2 + area + "请求时差:" + http.request_time().requestDelay_dnsStart + "\n";
        } catch (error) {
            resultStr = resultStr + area + "请求失败" + "\n";
            log(area + " :" + error);
        }
    })
    log(resultStr);
    log(resultStr2);
    func.dialogs_alert(resultStr + "\n\n" + resultStr2);
} else if (selectIndex == "饿了么倒计时") {
    let time_area = "北京时间";
    let h, m;
    // dat = new Date();
    let minger = func.dialogs_select([10000, 20000, 30000, 40000, 50000], "选择名额数量");
    h = func.dialogs_select(["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"], "选择开始的小时数");
    m = dialogs.rawInput("请输入分钟:");
    let start_time = h + "," + m + ",00,000";
    log("start_time:" + start_time);
    // func.getTimeDiff(time_area, start_time, 20000);              // 提前20秒获取延迟参数
    let server_delay = get_server_delay("http://cube.elemecdn.com");
    log("server_delay:" + server_delay);
    func.getTimeDiff(time_area, start_time, server_delay);              // 等待到15秒的时候再进入
    sleep(999);

    let floatWin = func.floaty_win_init();
    let total_second = (minger / 10 * 7.5) - 1000;      //扣除上面等待的1s
    let total_timestamp = func.strTime_to_timestamp(start_time) + total_second;
    log("total_second:" + total_second);
    let cut_timestamp = new Date().getTime();
    while (cut_timestamp <= total_timestamp) {
        cut_timestamp = new Date().getTime();
        ui.run(function () {
            floatWin.text.setText("剩余时间:" + total_second / 1000);
        });
        total_second = total_second - 101;
        sleep(100);
    }
    floatWin.close();
} else {
    var halfHourFlag = 0;
    var timeDiff = 0;

    var window = floaty.window(
        <frame gravity="center" bg="#1F1F1F" h="25dp" >
            <text id="text" textSize="16sp" textStyle="bold" typeface="monospace" textColor="#00FFFF" />
        </frame >
    );

    window.exitOnClose();

    window.text.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });

    if (device.brand == "HUAWEI") {
        //设置浮窗位置
        window.setPosition(420, 50);
    } else if (device.brand == "xiaomi") {
        //设置浮窗位置
        window.setPosition(520, 50);
    }

    setInterval(() => {
        if (halfHourFlag == 1) {
            timeDiff = func.calTimeDiff(selectIndex);
            halfHourFlag = halfHourFlag + 1;
        }
        //对控件的操作需要在UI线程中执行
        ui.run(function () {
            window.text.setText(dynamicText(timeDiff));
        });
    }, 10);

    // 更新悬浮文字
    function dynamicText(timeDiffer) {
        var today, h, m, s;
        today = new Date(new Date().getTime() + timeDiffer);
        h = today.getHours();           //时
        m = today.getMinutes();         //分
        s = today.getSeconds();         //秒
        ms = today.getMilliseconds();   //毫秒
        if ((m == "29" || m == "59") && s >= "45" && (halfHourFlag <= 0)) {
            halfHourFlag = halfHourFlag + 1;
        }
        return util.format(selectIndex + ":%d:%s:%s:%s\n", h, m, s, ms);
        //var str = showTime();
        //var str = util.format("时间: %d:%d:%d\n", date.getHours(), date.getMinutes(), date.getSeconds());
        //str += util.format("内存使用量: %d%%\n", getMemoryUsage());
        //str += "当前活动: " + currentActivity() + "\n";
        //str += "当前包名: " + currentPackage();
        //return str;
    }

    // //获取内存使用率
    // function getMemoryUsage() {
    //     var usage = (100 * device.getAvailMem() / device.getTotalMem());
    //     //保留一位小数
    //     return Math.round(usage * 10) / 10;
    // }

    // function showTime(timeDiffer) {
    //     var today, h, m, s;
    //     today = new Date(new Date().getTime() + timeDiffer);
    //     h = checkTime(today.getHours());
    //     m = checkTime(today.getMinutes());
    //     s = checkTime(today.getSeconds());
    //     ms = today.getMilliseconds();
    //     if (m == "29" && s >= "40") {
    //         halfHourFlag = true;
    //     }
    //     return util.format(selectIndex + ":%d:%s:%s:%s\n", h, m, s, ms);
    // }
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