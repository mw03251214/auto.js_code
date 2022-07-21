// 
// function widget_wait_load(load_elements, action_chains, reverse) {
//     /**
//      * 等待控件加载
//      * @param {dict} load_elements [{text:'123', id:'456'},{id:'456'}}]  定位是否加载的判断条件链
//      * @param {function / Array} action_chains 定位是否加载的判断条件链
//      * @param {boolean} reverse 是否反转条件，即为判断消失
//      */
//     this.load_elements = load_elements || [];
//     this.reverse = reverse || false;
//     if (typeof (action_chains) == "Array") {
//         this.action_chains = function () {
//             for (let act in action_chains) { eval(act); }
//         };
//     } else {
//         this.action_chains = action_chains;
//     }
//     let find_rules = '';
//     for (let k in this.load_elements) {
//         find_rules = find_rules + k + '("' + this.load_elements[k] + '").';
//     }
//     find_rules = find_rules + 'findOnce()';
//     if (this.reverse) {
//         while (eval(find_rules) != null) {
//             this.action_chains();
//             toastLog("控件" + this.load_elements + ", 未加载:");
//             sleep(2500);
//         }
//     } else {
//         while (eval(find_rules) == null) {
//             this.action_chains();
//             toastLog("控件" + this.load_elements + ", 未加载:");
//             sleep(2500);
//         }
//     }
//     toastLog("控件" + this.load_elements + ", 已加载:");
//     sleep(2500);
// }



function config_dict() {
    let cfg_dict = {
        "url_scheme": {
            "工商": {
                "小象1": "com.icbc.androidclient://startType=PORTALINJECT&menuId=xiaoxiangleyuan&shareCurrentUUID=",
                "小象2": "com.icbc.androidclient://startType=PORTALINJECT&menuId=taskCenter&injectParams=dGFyZ2V0PWVsZmxk&shareCurrentUUID=",
            },
            "京东": {
                "极速版领红包": 'openjdlite://virtual?params={"category":"jump","des":"m","url":"https://prodev.m.jd.com/jdlite/active/31U4T6S4PbcK83HyLPioeCWrD63j/index.html"}',
                "极速版挖宝": 'jdlite://virtual?params={"category":"jump","des":"m","url":"https://bnzf.jd.com/?activityId=pTTvJeSTrpthgk9ASBVGsw&inviterId=YCQC5KqI8pcwIWRdZoUtoV1TkoIVm_064LWtTUNvKIg&utm_user=plusmember&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends"}',
                "评价中心": 'openApp.jdMobile://virtual?params={"des":"commentCenter","business":"1","category":"jump"}',
                "京喜_券": 'openapp.jdpingou://virtual?params={"des":"m","category":"jump","url":"replace_url"}',
                "领京豆": 'openapp.jdmobile://virtual?params={"category":"jump","des":"m","url":"https://bean.m.jd.com"}',
                "领券中心": 'openapp.jdmobile://virtual?params={"category":"jump","des":"m","url":"https://coupon.m.jd.com/center/getCouponCenter.action"}',
                "种豆得豆": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://bean.m.jd.com/plantBean/index.action"}',

                "个护签到": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://prodev.m.jd.com/mall/active/2tZssTgnQsiUqhmg5ooLSHY9XSeN/index.html#/"}',
                "陪伴计划签到": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://prodev.m.jd.com/mall/active/kPM3Xedz1PBiGQjY4ZYGmeVvrts/index.html"}',
                "校园签到": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://prodev.m.jd.com/mall/active/2QUxWHx5BSCNtnBDjtt5gZTq7zdZ/index.html"}',
                "鞋靴馆签到": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://prodev.m.jd.com/mall/active/4RXyb1W4Y986LJW8ToqMK14BdTD/index.html"}',
                "服饰馆签到": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://pro.m.jd.com/mall/active/4RBT3H9jmgYg1k2kBnHF8NAHm7m8/index.html"}',
                "箱包馆签到": 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","url":"https://prodev.m.jd.com/mall/active/ZrH7gGAcEkY2gH8wXqyAPoQgk6t/index.html"}',

            },
            "京东金融": {
                "金融签到": "jdmobile://share?jumpType=7&jumpUrl=4120&channel=default&sourceUrl=1000*https://f.ua.jd.com/downloadApp/index.html?id=7038",
                "双签领取页": "jdmobile://share?jumpType=7&jumpUrl=1374&sourceUrl=1000*https://u2.jr.jd.com/downloadApp/index.html?id=1709",
            },
            "建行": {
                "lzf签到": "ccbapp://applet.ccb.com?funcid=18001001&app_type=1&appid=app2021071500000001&appName=龙支付签到&launchFrom=desktop&launchFrom=desktop",
            },
            "云闪付": {
                "会员中心": "upwallet://applet?encryptAppId=472741b326b7bb5c&toLink=https%3A%2F%2Fcloudvip.95516.com%2F&scenarioId=1006",
                "签到": "upwallet://html/open.95516.com/s/open/html/oauth.html?redirectUri=https://youhui.95516.com/newsign/unionpay/oauth",
                // 云闪付_券 尾部拼接券ID
                "云闪付_券": "upwallet://rn/rncoupondetail?couponId=",

            },
            "招商": {
                "饭票签到": "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=100856&cmb_app_trans_parms_start=here&param=v2&appflag=0",
                "便民生活": "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=791166&cmb_app_trans_parms_start=here&channel=share&appflag=0",
            },
            "农行": {
                "小豆": "bankabc://%7B%22method%22%3A%22jumpToSharedProduct%22%2C%22param%22%3A%22rR4uOmAzpF49gqwDYQiLp20AltfnLciJg3Fyp5ijEIlD6KSfPdLMNyKsM8JboO6MwU4dRe9KEsPXqC4shEX19X6hEiWyiILqbgLFXv9xJ5Jc7WP8cgtQBKyWQwTlznpR47%2BlnPSHUcgGQwprcCrZljQQsb3H9RhiJ2D2qeBt4JJz84Yh2iQ9R1lu%2FY%2BWKtaP25m0LbNLiCBYzuVXpAI%2BZfQKjVDNu72M0bgLPJtM1yg7oAXVGsadNuQMbKRz0XWTmkZzKVNYYupr4XqG08l6VvoOh1qETuzMO5mSCup%2FrhpJbwn4v5yYWC68q2FmK6K8YXpHZRtZyVIQwKrZKYjGCZ%2BdeHNIQKJe2plRNjawvy1QfB%2FYEIxcT68HT63j3KJK0%2FxlZSrAvT9cbSKRHkxleVMdKn8uj8HVMWs8l1DMdrLJK0tNFerEfKnSptOj4bSiQ6kvE4M2fMWrUzVIDPYLCHe2xvp9kZOZufXgyE5wze30A6S1HhYbMbNNCql08lmP0wQ3l%2Fp8fBF6hmgoQ73vZPphwCEOQxonP7IzQJC9%2Bl03cbmmPDij%2BBHrrczU55456whyF167TTNstajIJ4rERfcYdlkv3VOQEaXo%2BsUUrdXbI6wjb9vErff5hUgaW2%2FMl%2FZjNZthSCybk58RIUT3ndyGTtBSg%2B3hP4C4%2FvzRl3TXL0yiIELKVkzrELbYENRqWib%2B5aGXN1a54ll48VdKQiJFSZhEfYp27AW49Qxe7epmorgOuUBd76FZwMZCR%2Bg1QRnSS21%2F0PRVHSvWj3BDeST7nIue51s83rsZb9rkrE52ADZNwBV5mFrcRYyQoaKe%22%7D",
            },
            "浦发": {
                "金豆": "spdbbank://wap.spdb.com.cn/awakeapp?login_flag=0&support_type=1&path=vue|mspmk-cli-welfare/goldenBean/",
            },
            "支付宝": {
                "余额宝": "alipays://platformapi/startapp?appId=20000032",
                "芭芭农场": "alipays://platformapi/startapp?appId=68687599",
                "淘宝农场": "tbopen://m.taobao.com/tbopen/index.html?action=ali.open.nav&module=h5&bootImage=0&bc_fl_src=zfb_spare1&visa=&h5Url=https://pages.tmall.com/wow/hdwk/act/2020nhj-single?wh_biz=tm&disableNav=YES&disableProgress=YES&hd_from=alipay_mayifarm"
            },
            "others": {
                "和包签到": "cmpay:// ?actionId=1515&channelId=k7zaPN2hQcxiPqM2GMzisdkYNH8TB0Gd",
            }
        },
    }
    return cfg_dict;
}

// ----------------------通用功能区-----------------------
// jgy
function jianguoyun(path, file_name, is_pics) {
    let jg_user = "mw03251214@163.com";
    let jg_key = "arncqibcyzuv5msh";
    let jg_headers = {
        "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(jg_user + ':' + jg_key).getBytes(), 2)),
        "Content-Type": "text/plain;charset=UTF-8",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.1"
    };
    let is_pics = is_pics || false;
    // log("is_pics:", is_pics);
    try {
        let res = http.get('https://dav.jianguoyun.com/dav/' + path + file_name,
            {
                headers: jg_headers
            }
        );
        // threads.shutDownAll();
        if (is_pics) {
            return res.body.bytes();
        } else {
            return res.body.string();
        }
        // engines.execScript(CONFIG.scriptName, res);
    } catch (error) {
        alert("加载超时,请重启脚本,请检查网络.或者该文件已经被作者删除~~~");
        return "";
    }
}

// 切换到autojs
function to_autojs() {
    let cnt = 0;
    let pkg_name = app.getPackageName("Autox.js") || app.getPackageName("Auto.js") || app.getPackageName("sj.xotuA");
    while (currentPackage() != pkg_name) {
        if (cnt == 0) {
            log("....started package");
            app.startActivity({
                packageName: pkg_name,
                className: "org.autojs.autojs.ui.main.MainActivity_",
            });
        } else if (cnt > 50) {
            cnt = 0;
            toastLog("超时重新启动....started package");
            app.startActivity({
                packageName: pkg_name,
                className: "org.autojs.autojs.ui.main.MainActivity_",
            });
        }
        cnt = cnt + 1;
        sleep(100);
    }
    log("already in package");
    // waitForPackage(pkg_name, period = 50);
    // toast("已到达autojs");
}

function to_scheme(data_url) {
    to_autojs();
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: data_url,
    });
}

function to_pkg(pkg_name) {
    to_autojs();
    sleep(800);
    app.launchPackage(pkg_name);
    waitForPackage(pkg_name, period = 100);
}

function to_app(appName) {
    to_autojs();
    sleep(800);
    // while (currentPackage() != getPackageName(appName)) {
    launchApp(appName);
    // sleep(2500);
    // }
}

function cClick(element) {
    if (element != null) {
        click(element.bounds().centerX(), element.bounds().centerY());
        if (element.text() != null && element.text() != "") {
            log("cClick_text: " + element.text());
        } else if (element.desc() != null && element.desc() != "") {
            log("cClick_desc: " + element.desc());
        } else if (element.id() != null && element.id() != "") {
            log("cClick_id: " + element.id());
        } else {
            log("cClick: text/desc/id all empty");
        }
        return true;
    } else {
        // log("cClick_null");
        return false;
    }
}

function sClick(element) {
    if (element != null) {
        if (element.click()) {
            if (element.text() != null && element.text() != "") {
                log("sClick_text: " + element.text());
            } else if (element.desc() != null && element.desc() != "") {
                log("sClick_desc: " + element.desc());
            } else if (element.id() != null && element.id() != "") {
                log("sClick_id: " + element.id());
            } else {
                log("sClick: text/desc/id all empty");
            }
        } else {
            click(element.bounds().centerX(), element.bounds().centerY());
            log("sClick: click center x y")
        }
        return true;
    } else {
        log("sclick_null")
    }
    return false;
}

/*
    小米使用参数1，2，华为使用0
*/
function toAppMulti(appName, cnt) {
    to_autojs();
    sleep(1000);
    let app_btn;
    launchApp(appName);
    sleep(3000);
    while (!(text(appName).findOnce() != null &&
        (text("使用以下方式打开").findOnce() != null || text("请选择要使用的应用").findOnce() != null))) {
        toastLog("等待弹窗加载");
        sleep(2600);
    }
    app_btn = text(appName).find();
    func.sClick(app_btn[cnt - 1]);
    toastLog("已点击指定APP，等待加载");
    sleep(2600);
    waitForPackage(app.getPackageName(appName));
}


function huaweiUnlock() {
    let pwd = "081573" //解锁密码
    if (!device.isScreenOn()) {
        while (!device.isScreenOn()) {
            device.wakeUp();
            sleep(800);
        }
        toastLog("unlock");
        //while (text("紧急呼叫").findOnce() == null) {
        while (text("紧急呼叫").findOnce() == null) {
            swipe(300, 60, 300, 850, 400);
            sleep(900);
        }
        toastLog("输入密码");
        for (let i = 0; i < pwd.length; i++) {
            desc(pwd[i]).findOne().click();
        }
    }
}

function xiaomiUnlock() {
    let pwd = "081573" //解锁密码
    let stDelay = 90;
    if (!device.isScreenOn()) {
        while (!device.isScreenOn()) {
            device.wakeUp();
            sleep(1800);
        }
        while (text("紧急呼叫").findOnce() == null) {
            swipe(400, 2000, 400, 1000, stDelay);
            sleep(600);
            stDelay = stDelay + 5;
        }
        toastLog(stDelay);
        sleep(1200);
        for (let i = 0; i < pwd.length; i++) {
            sClick(desc(pwd[i]).findOnce());
        }
    }
}


// 手势解锁密码 xy为中心点坐标，offset为滑动区域 两个点之间的距离
function gesture_pwd(appName) {
    let pwd = "147895";
    let pointX, pointY, point;
    let offSet;
    offSet = device.width * 0.25;
    // 增加判断，避免小米手机判断成0的情况
    if (offSet == 0) {
        switch (device.model) {
            case "Redmi Note 7":
                offSet = 1080 * 0.25;
                break;
            default:
                offSet = 1080 * 0.25;
                break;
        }
    }

    switch (appName) {
        case "万商云":
            offSet = 341;
            point = id("com.bill.quickmoney:id/lock_9_view").findOnce();
            log("万商云");
            break;
        case "缤纷生活":
            point = id("lock_pattern").findOnce();
            log("缤纷生活");
            break;
        case "买单吧":
            point = id("com.bankcomm.maidanba:id/login_gestureLockView_rl").findOnce();
            log("买单吧");
            break;
        case "邮储信用卡":
            point = idContains("com.yitong.mbank.psbc.creditcard:id/view_lock_pattern").findOnce();
            log("邮储信用卡");
            break;
        case "浦大喜奔":
            // point = id("com.spdbccc.app:id/pattern_lock_body_layout").findOnce();
            point = className("android.widget.FrameLayout").findOnce();
            log("浦大喜奔");
            break;
        case "浦发银行":
            point = id("lpv_pattern_loginunlock").findOnce();
            log("浦发银行");
            break;
        case "华彩生活":
            point = id("com.HuaXiaBank.HuaCard:id/gesture_container").findOnce();
            log("华彩生活");
            break;
        case "招商银行":
            point = id("cmb.pb:id/vGestureContentView").findOnce();
            log("招商银行");
            break;
        case "邮储银行":
            point = id("lockPatternLogin").findOnce();
            log("邮储银行");
            break;
        case "中国农业银行":
            point = (text("切换登录方式").findOne()).parent().child(1);
            log("中国农业银行");
            break;
        case "中国工商银行":
            point = id("com.icbc:id/ifopges_lock_patterns").findOnce();
            log("中国工商银行");
            break;
    }
    let execStr;
    // 根据APP名称区分滑动持续时间
    if (appName == "招商银行" || appName == "缤纷生活" || appName == "万商云" || appName == "浦大喜奔") {
        execStr = "gesture(1100";
    } else {
        execStr = "gesture(850";
    }
    if (point == null) { return false; }
    if (appName == "浦大喜奔") {
        x = 540;
        y = 1307;
    }
    else {
        x = point.bounds().centerX();
        y = point.bounds().centerY();
    }
    log("x =", x);
    log("y =", y);
    log("offSet =", offSet);
    let arr = pwd.split("");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
            pointX = x - offSet;
            pointY = y - offSet;
        } else if (arr[i] == 4) {
            pointX = x - offSet;
            pointY = y
        } else if (arr[i] == 7) {
            pointX = x - offSet;
            pointY = y + offSet;
        } else if (arr[i] == 2) {
            pointX = x;
            pointY = y - offSet;
        } else if (arr[i] == 5) {
            pointX = x;
            pointY = y;
        } else if (arr[i] == 8) {
            pointX = x;
            pointY = y + offSet;
        } else if (arr[i] == 3) {
            pointX = x + offSet;
            pointY = y - offSet;
        } else if (arr[i] == 6) {
            pointX = x + offSet;
            pointY = y;
        } else if (arr[i] == 9) {
            pointX = x + offSet;
            pointY = y + offSet;
        }
        execStr = execStr + ",[" + pointX + "," + pointY + "]";
    }
    execStr = execStr + ")";
    engines.execScript("hello", execStr);
}
// -----------通用功能区------------------
function floatyMove(window, view, clickAction) {
    let show = function () { }
    //记录按键被按下时的触摸坐标
    let x = 0, y = 0;
    //记录按键被按下时的悬浮窗位置
    let windowX, windowY;
    //记录按键被按下的时间以便判断长按等动作
    let downTime;
    let onClick = show
    if (clickAction) {
        onClick = () => { clickAction() }
    }
    view.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过5秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 5500) {
                    exit();
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    onClick(clickAction);
                }
                return true;
        }
        return true;
    });
}

// 传入悬浮窗和悬浮窗的某个控件ID
function floatyInit(window, winView) {
    // 设置单击可移动事件
    // window.text.click(() => {
    //     floatyWin.setAdjustEnabled(!floatyWin.isAdjustEnabled());
    // });
    floatyMove(window, winView);
    window.setPosition(20, 110);
    // if (device.brand == "HUAWEI") {
    //     //设置浮窗位置
    //     window.setPosition(420, 50);
    // } else if (device.brand == "xiaomi") {
    //     //设置浮窗位置
    //     window.setPosition(520, 50);
    // }
    // 如果需要浮窗一直显示，则可以设置这个
    // setInterval(() => { }, 1000);
    return window;
}


function setFloatyVal(window, textVal) {
    //对控件的操作需要在UI线程中执行
    ui.run(function () {
        window.text.setText(textVal);
    });
}

function floaty_win_init() {
    let floatyWin = floaty.window(
        <frame gravity="center" bg="#1F1F1F" h="25dp" >
            <text id="text" textSize="16sp" textStyle="bold" typeface="monospace" textColor="#00FFFF"></text>
        </frame >
    );
    // 对生成的悬浮窗初始化
    floatyInit(floatyWin, floatyWin.text);
    return floatyWin;
}


function strTime_to_timestamp(strTime) {
    let tDate, stDate;
    // 如果输入的时间是0点，则目标天数要+1
    if (strTime.substr(0, 2) == "00") {
        tDate = getToday(needNextDay = true) + "," + strTime;
    } else {
        tDate = getToday() + "," + strTime;
    }
    stDate = tDate.split(",");
    return (new Date(stDate[0], stDate[1], stDate[2], stDate[3], stDate[4], stDate[5], stDate[6]).getTime());
}


// 时间校准 获取时间差函数
function getTimeDiff(area, targetTime, serverDelay) {
    // 生成今天的时间戳
    let targetDelay = serverDelay || 0;
    let targetTimestamp = strTime_to_timestamp(targetTime) - targetDelay;
    // let real_target_time = targetTime;
    // if (serverDelay > 9000) {
    //     let new_dt = new Date(targetTimestamp);
    //     let new_dt_sec = new_dt.getSeconds();
    //     if (new_dt_sec < 10) {
    //         new_dt_sec = "0" + new_dt_sec;
    //     }
    //     real_target_time = new_dt.getHours() + "," + new_dt.getMinutes() + "," + new_dt.getSeconds();
    // }
    // 获取当前时间戳
    curTimestamp = new Date().getTime();

    if (targetTimestamp < curTimestamp) {
        toastLog("目标时间小于当前时间，退出不执行");
        log("targetTimestamp:" + targetTimestamp);
        log("curTimestamp:" + curTimestamp);
        return 0;
    }

    let floatWin = floaty_win_init();
    //当剩余时间超过15秒的时候 等待
    while (targetTimestamp - curTimestamp > 15000) {
        curTimestamp = new Date().getTime();
        setFloatyVal(floatWin, "目标:" + targetTime + ",倒计时:" + Math.trunc((targetTimestamp - curTimestamp) / 1000));
        //console.log("等待倒计时：", Math.trunc((targetTimestamp - curTimestamp) / 1000));
        // toastLog("剩余时间:", targetTimestamp - curTimestamp);
        sleep(1000);
    }
    // 剩余时间在15秒内时
    let timeDiff = calTimeDiff(area);       // 统计时间差

    let cnt = 0;
    curTimestamp = new Date().getTime() + timeDiff;
    while (curTimestamp < targetTimestamp) {
        sleep(10);
        cnt = cnt + 1;
        if (cnt >= 99) {
            setFloatyVal(floatWin, "目标:" + targetTime + ",倒计时:" + Math.trunc((targetTimestamp - curTimestamp) / 1000));
            //console.log("等待倒计时：", Math.trunc((targetTimestamp - curTimestamp) / 1000));
            cnt = 0;
        }
        curTimestamp = new Date().getTime() + timeDiff;
    }
    // 如果有设置浮窗显示，则需要手动关闭
    floatWin.close();
}

function calTimeDiff(area) {
    let timeDiff;
    // 获取时间误差
    switch (area) {
        case "京东时间":
            // timeDiff = Math.max(jdTime(), jdTime(), jdTime());
            timeDiff = jdTime();
            break;
        case "北京时间":
            // timeDiff = Math.trunc((beiJingTime() + beiJingTime()) / 2);
            // timeDiff = Math.max(tbTime(), tbTime(), tbTime());
            timeDiff = tbTime();
            break;
        case "淘宝时间":
            // timeDiff = Math.max(tbTime(), tbTime(), tbTime());
            timeDiff = tbTime();
            break;
        case "苏宁时间":
            // timeDiff = Math.max(snTime(), snTime(), snTime());
            timeDiff = snTime();
            break;
        // default:
        //     timeDiff = Math.trunc((beiJingTime() + beiJingTime()) / 2);
        //     break;
    }
    return timeDiff;
}

function getToday(needNextDay) {
    let date;
    date = new Date();
    // 如果下一天有值，则加1
    if (needNextDay != undefined) {
        date.setDate(date.getDate() + 1);
    }
    let seperator1 = ",";
    let year = date.getFullYear();
    let month = date.getMonth();
    let strDate = date.getDate();
    return year + seperator1 + month + seperator1 + strDate;
}

//京东时间
function jdTime() {
    log("请求京东时间");
    let res, local_timestamp, response_data, response_timestamp, delta, req_delay;
    let time_limit = 400;
    delta = 0;
    // 获取取一次时间耗时
    try {
        http.__okhttp__.setTimeout(800);       // 设置超时2秒
        local_timestamp = new Date();
        res = http.get("https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5");
    } catch (error) {
        log(error);
        toastLog("报错了 返回0");
        return delta;
    }
    // edTimestamp = new Date();
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        exit();
    }
    req_delay = http.request_time().requestDelay_callStart;
    log("与服务器延迟:" + req_delay + "毫秒");

    if (req_delay <= time_limit) {
        response_data = res.body.json();
        response_timestamp = Number(response_data.currentTime2);
        delta = response_timestamp - local_timestamp - req_delay;
        log("误差", delta);
    }
    //返回时间差
    return delta;
}

// 北京时间
function beiJingTime() {
    let res, resTime, resTimestamp, sigma, delta, timeLimit;
    timeLimit = 1000;
    delta = 0;
    log("请求北京时间");
    // 获取取一次时间耗时
    while (1) {
        stTimestamp = new Date();
        try {
            http.__okhttp__.setTimeout(800);       // 设置超时2秒
            res = http.get("http://www.hko.gov.hk/cgi-bin/gts/time5a.pr?a=1");
        } catch (error) {
            log(error);
            toastLog("报错了 返回0");
            return 0;
        }
        edTimestamp = new Date();

        if (res.statusCode != 200) {
            toast("请求失败: " + res.statusCode + " " + res.statusMessage);
            exit();
        }
        log("请求总时长", edTimestamp - stTimestamp);

        if (edTimestamp - stTimestamp <= timeLimit) {
            resTime = res.body.string();
            resTimestamp = Number(resTime.replace("0=", ""));
            sigma = edTimestamp - stTimestamp;
            delta = resTimestamp - stTimestamp - Math.trunc(sigma / 2); // 返回的时间-开始时间
            log("时延", sigma);
            log("误差", delta);
            break;
        }
    }
    //返回时间差
    return delta;
}

// 淘宝时间
function tbTime() {
    log("请求淘宝时间");
    let res, local_timestamp, response_data, response_timestamp, delta, req_delay;
    let time_limit = 300;
    delta = 0;
    // 获取取一次时间耗时
    try {
        http.__okhttp__.setTimeout(800);       // 设置超时2秒
        local_timestamp = new Date();
        res = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
    } catch (error) {
        log(error);
        toastLog("报错了 返回0");
        return delta;
    }
    // edTimestamp = new Date();
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        exit();
    }
    req_delay = http.request_time().requestDelay_callStart;
    log("请求延迟:" + req_delay + "毫秒");

    if (req_delay <= time_limit) {
        response_data = res.body.json();
        response_timestamp = Number(response_data.data.t);
        delta = response_timestamp - local_timestamp - req_delay;
        log("误差", delta);
    }
    //返回时间差
    return delta;
}

// 苏宁时间
function snTime() {
    log("请求苏宁时间");
    let res, local_timestamp, response_data, response_timestamp, delta, req_delay;
    let time_limit = 300;
    delta = 0;
    // 获取取一次时间耗时
    try {
        http.__okhttp__.setTimeout(800);       // 设置超时2秒
        local_timestamp = new Date();
        res = http.get("https://f.m.suning.com/api/ct.do");
    } catch (error) {
        log(error);
        toastLog("报错了 返回0");
        return delta;
    }
    // edTimestamp = new Date();
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
        exit();
    }
    req_delay = http.request_time().requestDelay_callStart;
    log("请求延迟:" + req_delay + "毫秒");

    if (req_delay <= time_limit) {
        response_data = res.body.json();
        response_timestamp = Number(response_data.currentTime);
        delta = response_timestamp - local_timestamp - req_delay;
        log("误差", delta);
    }
    //返回时间差
    return delta;
}

function dialogs_checkbox(inArr, titles, multi_choice) {
    /**
      @param  inArr 传入的显示的数组
      @param  titles, 显示的标题，同时是配置的key，格式，文件名_function名
      @param  multi_choice, 单选/多选，默认单选
      返回选择的
  */
    let local_config = storages.create("local_config");
    if (titles == undefined) {
        titles = "选择启动";
    }
    let select_index_list, last_indices, check_last_indices;
    check_last_indices = new Array();
    if (local_config.contains(titles)) {
        try {
            last_indices = local_config.get(titles);
            log("last_indices:" + last_indices);
            last_indices.forEach(idx => {
                if (idx < inArr.length) {
                    check_last_indices.push(idx);
                }
            })
        } catch (e) {
            check_last_indices = [0];
        }
    } else {
        check_last_indices = [0];
    }
    // 根据不同传入参数，显示单选或多选
    if (multi_choice == "单选") {
        select_index_list = dialogs.singleChoice(titles, inArr, check_last_indices[0]);
    } else if (multi_choice == "多选") {
        select_index_list = dialogs.multiChoice(titles, inArr, check_last_indices);
    } else {
        alert("传入参数有误");
        exit();
    }
    // 判断用户是否已选择
    if (typeof (select_index_list) == "object") {
        if (select_index_list.length == 0) { exit(); }
    } else {
        if (select_index_list == -1) { exit(); }
    }
    if (select_index_list == -1 || select_index_list == []) {
        exit();
    }
    if (multi_choice == "单选") {
        // 是单选，返回单选的值,并数组写入配置
        local_config.put(titles, [select_index_list]);      // 保存上一次的配置
        return [inArr[select_index_list]];
    } else if (multi_choice == "多选") {
        // 是多选，返回单选的值,并数组写入配置
        local_config.put(titles, select_index_list);        // 保存上一次的配置
        let select_item;
        select_item = [];
        select_index_list.forEach(idx => {
            select_item.push(inArr[idx]);
        })
        return select_item;
    } else {
        return [];
    }

}

function dialogs_select(inArr, titles) {
    if (titles == undefined) {
        titles = "选择启动";
    }
    let selIdx = dialogs.select(titles, inArr);
    if (selIdx == -1) {
        exit();
    }
    return inArr[selIdx];
}


// 自定义超时通知框
function dialogs_alert(title) {
    let dia_alear = dialogs.build({
        title: title || "",
        // contentColor: "#21211F",
        positive: "确定"
    });
    dia_alear.on("show", () => {
        setTimeout(function () {
            log("dialogs_alert 退出");
            exit();
        }, 100);
    })
    dia_alear.show();
}

// 返回多个结果，默认5
function match_imgs(find_img, screenshot, find_region, max_match) {
    // let pic_folder = files.cwd() + "/piccs/";
    // let find_img = images.read(pic_folder + file_name);
    let big_img, recycle_flag;
    recycle_flag = false;
    if (screenshot) {
        big_img = screenshot;
    } else {
        sleep(100);
        recycle_flag = true;
        big_img = images.captureScreen();
    }
    let match_point = images.matchTemplate(
        img = big_img,
        template = find_img,
        options = {
            threshold: 0.82,
            region: find_region,
            max: max_match || 15,
        })
    // sleep(100);
    // find_img.recycle();
    sleep(100);
    if (recycle_flag) { big_img.recycle(); }
    sleep(100);
    log("match result:" + match_point.matches);
    // big_img.recycle();
    return match_point.points;
}

// 只返回一个结果
function match_img(file_name, screenshot, find_region) {
    let match_result;
    match_result = match_imgs(file_name, screenshot, find_region, 1);
    if (match_result == []) {
        return null;
    } else {
        return match_result[0];
    }
}

function match_img_click(file_name, screenshot, find_region) {
    let match_point;
    match_point = match_img(file_name, screenshot, find_region);
    if (match_point) {
        click(match_point.x, match_point.y);
        return true;
    } else {
        return false;
    }
}


module.exports = {
    jianguoyun: jianguoyun,
    config_dict: config_dict,
    floaty_win_init: floaty_win_init,
    cClick: cClick,
    sClick: sClick,
    to_app: to_app,
    to_pkg: to_pkg,
    to_autojs: to_autojs,
    to_scheme: to_scheme,
    toAppMulti: toAppMulti,
    // huaweiUnlock: huaweiUnlock,
    // xiaomiUnlock: xiaomiUnlock,
    gesture_pwd: gesture_pwd,
    // widget_wait_load: widget_wait_load,
    getTimeDiff: getTimeDiff,
    calTimeDiff: calTimeDiff,
    dialogs_alert: dialogs_alert,
    dialogs_select: dialogs_select,
    dialogs_checkbox: dialogs_checkbox,
    match_imgs: match_imgs,
    match_img: match_img,
    match_img_click: match_img_click,
}



// "云闪付_券_圆梦新年": {
//     "全国畅享-5折10电商券1": "upwallet://rn/rncoupondetail?couponId=3102021122031298",
//     "全国畅享-5折10电商券2": "upwallet://rn/rncoupondetail?couponId=3102021122031260",
//     "全国畅享-5折商超券30": "upwallet://rn/rncoupondetail?couponId=3102021122031319",
//     "全国畅享-xyk还款券10": "upwallet://rn/rncoupondetail?couponId=3102021121630580",

//     "本地-非厦门-商超30": "upwallet://rn/rncoupondetail?couponId=3102021122031140",
//     "本地-非厦门-便利店10": "upwallet://rn/rncoupondetail?couponId=3102021122031124",
//     "本地-非厦门-餐饮10": "upwallet://rn/rncoupondetail?couponId=3102021122031135",
//     "本地-非厦门-线上券10": "upwallet://rn/rncoupondetail?couponId=3102021122031149",

//     "精选-苏宁5折15": "upwallet://rn/rncoupondetail?couponId=3102021122131595",
//     "精选-中石油5折20": "upwallet://rn/rncoupondetail?couponId=3102021122031343",

//     "本地-厦门-商超30": "upwallet://rn/rncoupondetail?couponId=3102021121529747",
//     "本地-厦门-便利店10": "upwallet://rn/rncoupondetail?couponId=3102021121529743",

//     "闪付-50减10": "upwallet://rn/rncoupondetail?couponId=3102021122031281",
//     "闪付-10减5": "upwallet://rn/rncoupondetail?couponId=3102021122031286",

//     "全国畅享-生活缴费券6-3": "upwallet://rn/rncoupondetail?couponId=3102021122031307",
//     "全国畅享-折扣汇5券": "upwallet://rn/rncoupondetail?couponId=3112021122031315",
// },
// "云闪付_券_圆梦新年_周三14点": {
//     "周三14点-心愿大礼-华为P50": "upwallet://rn/rncoupondetail?couponId=3112021122332450",
//     "周三14点-心愿大礼-红包5K": "upwallet://rn/rncoupondetail?couponId=3112021122332455",
//     "周三14点-心愿大礼-Dyson": "upwallet://rn/rncoupondetail?couponId=3112021122332448",
//     "周三14点-心愿大礼-switch": "upwallet://rn/rncoupondetail?couponId=3112021122332447",
//     "周三14点-心愿大礼-携程": "upwallet://rn/rncoupondetail?couponId=3112021122432462",

//     "周三14点-品质爆款-电动牙刷": "upwallet://rn/rncoupondetail?couponId=3112021122332449",
//     "周三14点-品质爆款-家乐福800": "upwallet://rn/rncoupondetail?couponId=3112021122432757",
//     "周三14点-品质爆款-悟空套装": "upwallet://rn/rncoupondetail?couponId=3112021122332454",
//     "周三14点-品质爆款-三星堆套装": "upwallet://rn/rncoupondetail?couponId=3112021122332452",

//     "周三14点-口碑好货-还款券50": "upwallet://rn/rncoupondetail?couponId=3112021122432463",
//     "周三14点-口碑好货-美团券50": "upwallet://rn/rncoupondetail?couponId=3112021122332456",
//     "周三14点-口碑好货-悟空单个": "upwallet://rn/rncoupondetail?couponId=3112021122332453",
//     "周三14点-口碑好货-三星堆办单个": "upwallet://rn/rncoupondetail?couponId=3112021122332451",
// },