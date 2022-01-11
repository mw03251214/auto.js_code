auto.waitFor();
//toastLog(id("com.jd.lib.cashier.feature:id/cd").findOnce().click());
var func = require("func_list.js");
var cfg = func.config_dict();
let url_jd = "openApp.jdMobile://"
var invite_friend_img_text = "047afc56e31d6d4b";
var mission_key_word = "0爆竹";

log(click("领取"))

function member_card() {
    let authority, authority_idx;
    sleep(random_second(3500, 300, 1000));
    if (is_in_invite_friend_page()) {
        toastLog("member_card: 已有卡，在去完成界面，直接完成");
        return 0;
    }
    let authority_join;
    authority_join = textContains("确认授权并加入").findOnce();
    if (authority_join == null) {
        toastLog("member_card: 已有卡，未发现去完成描述，直接完成");
        sleep(random_second(1500, 80, 450));
    } else {
        log("member_card2: 加会员");
        while (1) {
            authority = textContains("确认授权即同意").findOnce();
            if (authority != null) {
                authority_idx = authority.indexInParent();
                if (func.cClick(authority.parent().child(authority_idx - 1))) {
                    sleep(random_second(1800, 100, 1000));
                    break;
                }
                sleep(random_second(1800, 100, 1000));
            }
        }
        sleep(1500);
        // func.sClick(authority_join);
        sleep(3000);
    }
}

function 城城现金() {
    let find_text, find_object, find_object_index, find_object_parent;	// 定义查找的变量
    while (1) {
        find_text = "有机会得大额现金";
        find_object = textContains(find_text).findOnce();
        if (find_object != null) {
            find_object_parent = find_object.parent();
            if (func.sClick(find_object_parent.child(find_object_parent.childCount() - 1))) {
                find_text = "京口令已复制";
                find_object = className("TextView").text(find_text).findOnce();
                while (find_object == null) {
                    toastLog("城城现金: 未发现京口令窗口，请手动点击邀请好友触发，否则不会返回");
                    sleep(3000);
                    // 如果没有找到京口令，但是弹出微信选择框，则退出
                    if (text("使用以下方式打开").findOnce() != null || text("请选择要使用的应用").findOnce() != null) {
                        find_object = null;
                        break;
                    }
                    find_object = className("TextView").text(find_text).findOnce();
                }
                if (find_object != null) {
                    find_object_parent = find_object.parent();
                    func.sClick(find_object_parent.child(find_object_parent.childCount() - 1));
                    toastLog("城城现金: 已点击 京口令 关闭按钮");
                    sleep(2000);
                }
                break;
            }
        }
        try {
            find_text = "提醒我明日来领钱";
            find_object = text(find_text).findOnce();
            if (find_object != null) {
                find_object_parent = find_object.parent().parent();
                func.sClick(find_object_parent.child(3));
            }
            find_text = "可微信零钱提现";
            find_object = text(find_text).findOnce();
            if (find_object != null) {
                find_object_parent = find_object.parent().parent().parent();
                func.sClick(find_object_parent.child(find_object_parent.childCount() - 1));
            }
            find_text = "邀请新朋友 更快赚现金";
            find_object = text(find_text).findOnce();
            if (find_object != null) {
                find_object_index = find_object.indexInParent();
                find_object_parent = find_object.parent();
                func.sClick(find_object_parent.child(find_object_index - 1));
            }
        } catch (e) {
            log("城城现金: error: " + e);
            continue;
        }
        // 如果活动结束 则退出
        if (text("活动已结束").findOnce() != null) {
            if (func.sClick(text("e300dc37709c6f82").findOnce())) { sleep(2000); }
            break;
        }
        toastLog("城城现金: 等待-有机会得大额现金-加载，其余手动完成");
        sleep(3000);
    }
}


function click_mission_btn() {
    let start_text, end_text;
    start_text = "集爆竹炸年兽"
    end_text = "0个爆竹"
    let find_object, find_object_index;	// 定义查找的变量
    // 点击任务按钮
    find_object = className("android.view.View").textStartsWith(start_text).textEndsWith(end_text).findOnce();
    if (find_object == null) { find_object = className("android.view.View").descStartsWith(start_text).descEndsWith(end_text).findOnce(); }
    // 解锁新春游庙会 解锁新春游庙会 每次消耗11550个爆竹
    start_text = "解锁";
    find_object = className("android.view.View").textStartsWith(start_text).findOnce();

    if (find_object != null) {
        find_object_index = find_object.indexInParent();
        func.sClick(find_object.parent().child(find_object_index + 1));
        func.sClick(find_object.parent().child(find_object_index + 2));
        toastLog("click_mission_btn: 点击了 任务框 按钮");
        sleep(2000);
        return true;
    }
    toastLog("click_mission_btn: 未找到 任务框 按钮");
    return false;
}

function 京东评价() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
    sleep(1000);
    // 1. 跳转评价中心
    func.to_scheme(cfg["url_scheme"]["京东"]["评价中心"]);
    // 2. 判断是否到达评价页面
    while (className("TextView").text("已评价/追评").findOnce() == null) { toastLog("未到达,评价界面"); sleep(2500); }
    // 3. 点击评价商品
    func.sClick(className("TextView").text("评价").findOne().parent().parent());
    // fullId = com.jd.lib.evaluatecenter.feature:id/dm =>text == text = · 47
    // fullId = com.jd.lib.evaluatecenter.feature:id/m8,text = 评价
    // items = className = android.widget.ListView, fullId = android:id/list =>list[1]
    // 4. 确保到达商品页面 下滑获取评价按钮
    className("TextView").text("购物车").findOne();
    sleep(1000);
    scrollDown();
    sleep(2500);
    text("评价").findOne().parent().click();
    // 5. 判断到评价详情界面
    while (!(text("默认排序").findOnce() != null && text("最新排序").findOnce() != null)) { toastLog("未到达,评价详情"); sleep(2500); }
    toastLog("到达商品评价处");
    sleep(2500);
    // 记录评论内容
    let comment_text_b, comment_text, comment = null;
    while (comment == null) {
        try {
            comment = text("最新排序").findOnce().parent().parent().parent().parent().parent().child(1).child(1).child(0).child(0).child(1).child(0).child(0);
            sleep(800);
        } catch (e) {
            sleep(500);
            continue;
        }
    }
    comment_text = comment.text();
    // 6. 选择是否有图
    let pic_video, has_pic;
    pic_video = className("android.widget.CheckBox").textContains("图/视频").findOnce();
    if (pic_video == null) { has_pic = false } else {
        has_pic = true;
        func.sClick(pic_video);
        toastLog("已点击 图/视频 按钮");
        sleep(2500);
    };
    // textContains("图/视频").findOne().click()
    comment = null;
    while (comment == null) {
        try {
            comment = text("最新排序").findOnce().parent().parent().parent().parent().parent().child(1).child(1).child(0).child(0).child(1).child(0).child(0);
            sleep(800);
        } catch (e) {
            sleep(500);
            continue;
        }
    }
    comment_text_b = comment.text();
    if (random(0, 9) >= 5) {
        comment_text = comment_text_b;
    }
    // 7. 没图就复制文案，有图就截屏
    let big_pic, pic_text, cur_pic, all_pic;
    let height, width, x, y;
    if (has_pic) {
        func.sClick(comment);
        toastLog("已点击第一条评价");
        // 有图：最新排序.parent.parent.parent.parent.parent.child(1).child(1)
        // 8 判断到达评价详情
        text("  说点儿什么呗~").findOne();
        sleep(1000);
        // 9. 获取文本
        // fullId = com.jd.lib.evaluatecenter.feature:id/g5，depth = 9
        // 点击图片
        func.sClick(className("RatingBar").findOnce().parent().parent().parent().child(3).child(0));
        // className = android.widget.ImageView，depth = 9
        height = device.height;
        width = device.width;
        x = 0;
        y = Math.floor(height / 6);
        height = Math.floor(height / 4 * 3);
        big_pic = textContains("1/").findOne();
        toastLog("已打开大图");
        sleep(2500);
        pic_text = big_pic.text();
        cur_pic = pic_text.substring(0, 1);
        all_pic = pic_text.substring(pic_text.length - 1);
        log("cur_pic:" + cur_pic);
        log("all_pic:" + all_pic);
        if (all_pic > 4) { all_pic = 4; }
        // className = android.widget.ImageButton，depth = 5，fullId = com.jd.lib.evaluatecenter.feature:id/b2
        let img, img_clip, file_path;
        while (cur_pic <= all_pic) {
            // 截屏
            img = images.captureScreen();
            img_clip = images.clip(img, x, y, width, height);
            file_path = path_date_string();
            images.save(img_clip, file_path);
            // app.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, android.net.Uri.fromFile(java.io.File(file_path))));        //刷新图库
            media.scanFile(file_path);
            swipe(width - 1, y, 100, y, 300);
            cur_pic = cur_pic * 1 + 1;
            log("cur_pic in:" + cur_pic);
            sleep(1500);
        }
        toastLog("截屏完成");
        sleep(2500);
    }
    // 返回到评价页面，点击评价
    while (className("TextView").text("已评价/追评").findOnce() == null) { back(); toastLog("未到达评价界面"); sleep(3500); }
    // 点击评价商品
    func.sClick(className("TextView").text("评价").findOne());
    // 等待商品评价页面加载
    text("物流服务评价").findOne();
    sleep(1500);
    // 点击所有rate
    className("android.widget.RatingBar").findOne();
    let rating_bars, rating_count, cur_rate = 0;
    rating_bars = className("android.widget.RatingBar").find();
    rating_count = rating_bars.length;
    while (cur_rate < rating_count) {
        rate_click(rating_bars[cur_rate]);
        toastLog("点击第" + (cur_rate + 1) + "个星级");
        sleep(1000);
        if (cur_rate == 0) { scrollDown(); sleep(800); scrollDown(); sleep(800); scrollDown(); sleep(800); }
        rating_bars = null;
        while (rating_bars == null) {
            rating_bars = className("android.widget.RatingBar").find();
            sleep(800);
        }
        cur_rate = cur_rate + 1;
    }
    // 设置文本
    setText(comment_text);
    toastLog("设置文本完成");
    sleep(1500);
    if (has_pic) {
        // 点击选择图片
        func.sClick(text("添加图片").findOnce());
        className("android.widget.TextView").depth(6).text("最近添加").findOne();
        sleep(1000);
        let img_list, img_cnt;
        img_cnt = 2;
        while ((img_cnt - 1) <= all_pic) {
            img_list = className("android.widget.ImageView").find();
            if (img_list.nonEmpty()) {
                func.sClick(img_list[img_cnt].parent().child(1));
                sleep(800);
                img_cnt = img_cnt + 1
            } else { continue; }
        }
        // func.sClick(className("android.widget.ImageView").find()[3].parent().child(1))
        //点击下一步 =》 完成
        func.sClick(textContains("下一步").findOne());
        sleep(1500);
        func.sClick(textContains("完成").findOne());
        sleep(1500);
    }
    // 返回商品评价页面
    text("物流服务评价").findOne();
    // 检查评价京豆是否已满
    let beans_a, beans_b, text_a, text_b;
    beans_a = textContains("京豆").findOne();
    beans_b = beans_a.parent().child(0);
    text_a = beans_a.text().substring(1, 3);
    text_b = beans_b.text();
    if (text_a != text_b) {
        alert("豆子未满");
    } else {
        // 提交
        func.sClick(text("提交").findOne());
        // 评价成功    
        text("评价成功，感谢您！").findOne();
    }

    // 评价成功    text = 评价成功，感谢您！
}

function rate_click(element) {
    if (element != null) {
        if (!element.click()) {
            click(element.bounds().right - 1, element.bounds().centerY());
        }
        return true;
    }
    return false;
}

function path_date_string() {
    let save_path = "/sdcard/DCIM/screenshots/IMG_"
    if (device.brand == "HUAWEI") { save_path = "/sdcard/Pictures/Screenshots/Screenshot_" }
    else if (device.brand == "xiaomi") { save_path = "/sdcard/DCIM/screenshots/IMG_" }
    let dt, monthes, dates, hours, minutes, seconds;
    dt = new Date();
    monthes = dt.getMonth() + 1;
    dates = dt.getDate();
    hours = dt.getHours();
    minutes = dt.getMinutes();
    seconds = dt.getSeconds();
    if (monthes < 10) { monthes = "0" + monthes } else { monthes = monthes.toString(); }
    if (dates < 10) { dates = "0" + dates } else { dates = dates.toString(); }
    if (hours < 10) { hours = "0" + hours } else { hours = hours.toString(); }
    if (minutes < 10) { minutes = "0" + minutes } else { minutes = minutes.toString(); }
    if (seconds < 10) { seconds = "0" + seconds } else { seconds = seconds.toString(); }
    return (dt.getFullYear().toString() + monthes + dates + "-" + hours + minutes + seconds + ".png");
}

// while (!(text("评价").findOne().parent().click())) { sleep(1000); }
// child(3).child(0).click()
// log(className("ImageButton").depth(5).findOnce());
// while (!(text("默认排序").findOnce() != null && text("最新排序").findOnce() != null)) { sleep(1000); }
// while (text("评价").findOnce() == null) {
//     scrollDown();
//     sleep(2000);
// }
// func.to_scheme(cfg["url_scheme"]["京东金融"]["双签领取页"]);
// log(textContains("今日已领取").findOnce());
// 签到领金贴
function union_pay() {
    let appName = "沃钱包";
    func.to_app(appName);
    let paopao;
    while (textContains("第3天").textStartsWith("+").findOnce() == null) {
        paopao = idContains("wopay_mine_item_name_tv").text("泡泡").findOnce();
        if (paopao != null) { paopao.parent().click(); }
        func.sClick(text("每日签到得好礼").findOnce());
    }
    sleep(3000);
    if (textContains("今日已签到").findOnce() == null) {
        func.sClick(textContains("签到领奖励").findOne());
    }
    sleep(4000);
    toastLog(appName + ",已签到");
}

function 什么值得买() {
    let appName = "什么值得买";
    func.to_app(appName);
    let signBtn = null;
    while (signBtn == null) {
        signBtn = id("tv_login_sign").findOnce();
        func.sClick(id("tab_usercenter").text("我的").findOnce());
        sleep(800);
        func.sClick(idContains("close").findOnce());
        sleep(800);
        //func.passAd();
    }
    sleep(800);
    func.sClick(signBtn);
    sleep(1000);
    //textContains("已连续签到").findOne();
    toastLog(appName + "已签到");
    sleep(1200);
}

function 中信活动() {
    var appName = "动卡空间";
    var timeArea = "北京时间";
    var startTime, targetViewText;
    var actNames = ["10点-15点-9积分兑换", "周三六11点-5折必胜客百果园", "9积分捡漏"];
    var actName = func.dialogsWin(actNames);      // 设置查找的文本
    var couDes;    // 券描述列表
    var nowDate = new Date();
    var item_page_text = "价格: 1个权益+9个积分";
    switch (actName) {
        case "10点-15点-9积分兑换":
            toastLog("等待页面变化");
            // log(nowDate.getHours() <= 9);
            // 如果当前小时数 大于10，则是15点场
            if (nowDate.getHours() <= 9) {
                startTime = "09,59,52,000"
                couDes = ["App Store 充值卡20元", "迪士尼", "必胜客20元", "奈雪", "喜茶25元",
                    "苏宁支付券20元", "京东支付券20元", "天猫20元", "百果园20元", "滴滴出行20元", "美团外卖20元", "星巴克中杯饮品电子券"];
            } else {
                startTime = "14,59,53,000"
                couDes = ["【下午茶】喜茶25元抵用券（15点抢兑）"];
            }

            if (couDes.length == 1) {
                targetViewText = couDes[0];               // 设置查找的文本
            } else {
                targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            }

            func.to_app(appName);             // 启动APP
            var couClick = null;          // 找券
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
            var to_pay = null;
            while (to_pay == null) {
                func.sClick(text("去兑换").findOnce());
                func.sClick(text("未开始").findOnce());
                sleep(100);
                to_pay = text("去支付").findOnce();
            }
            func.sClick(to_pay);
            toastLog("已点击，等待验证码");
            sleep(3000);
            break;
        case "周三六11点-5折必胜客百果园":
            toastLog("到点点击");
            startTime = "10,59,59,850";             // 设置时间点
            couDes = ["必胜客100元代金券", "达美乐50元代金券", "肯德基50元"];             // 券名称
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.to_app(appName);             // 启动APP
            // 等待进入指定页面
            var couClick = textContains(targetViewText).findOnce();
            while (!couClick) {
                couClick = textContains(targetViewText).findOnce();
                toastLog("请跳转到券 列表 页面，直到提示  已到达等待页面");
            }
            toastLog("元素文本：" + couClick.text());
            func.getTimeDiff(timeArea, startTime);              // 等待时间
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
            appName = "动卡空间"
            var cnt = 0;
            couDes = ["App Store 充值卡20元", "迪士尼", "必胜客20元", "奈雪", "喜茶25元",
                "苏宁支付券20元", "京东支付券20元", "天猫20元", "百果园20元", "滴滴出行20元", "美团外卖20元"];
            targetViewText = func.dialogsWin(couDes);               // 设置查找的文本
            func.to_app(appName);             // 启动APP
            while (text(item_page_text).findOnce() == null) {
                sleep(100);
                cnt = cnt + 1;
                if (cnt >= 25) {
                    cnt = 0;
                    toastLog("请手动切换到要捡漏的商品页面");
                }
            }             // 等待进入指定页面
            nowDate = new Date();
            if (nowDate.getHours() <= 10) {
                startTime = "10,18,20,000"
            } else if (nowDate.getHours() >= 15) {
                startTime = "15,18,20,000"
            } else {
                startTime = "00,01,01,100"
            }
            func.getTimeDiff(timeArea, startTime);              // 等待时间
            sleep(300);
            var exWhile = false;
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
                var item = null;
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

function 招商() {
    this.饭票签到 = function () {
        func.to_autojs();
        var url_招商饭票签到 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=100856&cmb_app_trans_parms_start=here&param=v2&appflag=0"
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: url_招商饭票签到,
        });
        var today;
        today = text("今日").depth(12).findOne();
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
        func.to_autojs();
        var appName = "招商银行";
        var url_招商便民 = "cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=791166&cmb_app_trans_parms_start=here&channel=share&appflag=0";
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: url_招商便民,
        });
        // 等待手势密码加载
        id("vGestureContentView").findOne();
        sleep(500);
        func.gesture_pwd(appName);
        sleep(2000);
        var my_energy, get_energy;
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
        var plus30, plus_parent, plus_parent_childcount;
        var sign_btn, sign_text;

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

// func.sClick(idContains("radio_button5").findOnce());



// 浦发金豆签到
function 浦发银行() {
    this.ppf = function () {
        toastLog(123)
    }
    this.ppb = function () {
        toastLog(456)
    }
    return this;
}

// // 问题解决了，参照（http://www.cocoachina.com/bbs/read.php?tid-1689677.html ）用urlscheme跳转京东某个商品页面可行！
// //            String url = "https://item.jd.com/231023.html";
// 产品ID = "66144896261";
// // url = "openapp.jdMobile://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22" + 产品ID + "%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D";

// // url = "openapp.jdpingou://virtual?params=%7B%22sourceValue%22:%220_productDetail_97%22,%22des%22:%22productDetail%22,%22skuId%22:%22" + 产品ID + "%22,%22category%22:%22jump%22,%22sourceType%22:%22PCUBE_CHANNEL%22%7D";

// // 惊喜
// url = "openapp.jdpingou://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fitem.m.jd.com%2Fitem%2Fjxview%3Fsku%3D" + 产品ID + "%22%2C%22category%22%3A%22jump%22%7D"
// app.startActivity({
//     action: "android.intent.action.VIEW",
//     data: url,
// });

function 品牌墙() {
    var find_text, find_object, find_object_index, find_object_parent;	// 定义查找的变量
    find_text = "到底了，没有更多了～"
    var click_index;
    click_index = 0;
    while (1) {
        find_object == null
        while (find_object == null) {
            toastLog("等待 " + find_text + " 加载");
            sleep(2500);
            find_object = text(find_text).findOnce();
        }
        find_object_parent = find_object.parent();
        find_object_index = find_object.indexInParent();
        var brands;
        brands = find_object_parent.child(find_object_index - 1).child(1);
        // 如果点击成功，延迟8秒 后返回
        if (func.sClick(brands.child(click_index))) {
            toastLog("等待跳转，然后返回");
            sleep(2500);
            toastLog("等待跳转，然后返回");
            sleep(2500);
            toastLog("等待跳转，然后返回");
            sleep(2500);
            toastLog("等待跳转，然后返回");
            sleep(2500);
            back();
            click_index = click_index + 1;
            // 等待返回
            find_object = text(find_text).findOne();
            toastLog("已返回...");
            sleep(2500);
        }
        if (click_index >= 5) {
            break;
        }
        // 1. 等待品牌墙页面加载
        // 2. 查找品牌，索引1，2，3

        // 3. 完成后back
        // 4. 检测首页，如是，直接执行banna启动
    }
    click_index = 20;
    while (click_index--) {
        scrollUp();
        sleep(random_second(900, 100, 300));
    }
}


function 买单吧() {
    var appName = "买单吧";
    //closeApp(appName);
    func.to_app(appName);
    while (className("TextView").id("tv_title").text("我的").findOnce() == null) {
        func.passAd();
        func.sClick(id("ivADClose").findOnce());
    }
    // func.sClick(text("我的").findOne().parent().parent().parent().parent().child(2));
    func.cClick(id("iv_icon").desc("买单吧").findOne());      // id-iv_icon
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
    sleep(1000);
}

function random_second(second, st, ed) {
    /** *
    @param {int} second 延迟的时间: 
    @param {int} st 随机开始值
    @param {int} ed 随机结束值
    */
    if (st >= ed) {
        return second;
    } else {
        return func.randomNum(st, ed) + second;
    }
}

function member_card() {
    //toastLog('会员卡');
    sleep(4000);
    if (textContains('邀请好友助力').findOnce() != null) {
        return 0;
    }
    sleep(1000);
    if (textContains('确认授权并加入').findOnce() == null) {
        return 0;
    }
    var authority, authorited;
    authorited = false;		// 表示是否勾选授权
    while (1) {
        log('加会员');
        authority = textContains('确认授权即同意').findOnce();
        if (authority != null) {
            if (func.cClick(authority.parent().child(0))) {
                authorited = true;
            }
        }
        sleep(2000);
        if (authorited) {
            if (text("姓名").findOnce() != null) {
                if (setText(1, "老陈")) {
                    sleep(1500);
                    back();
                }
            }
            if (text("邮箱").findOnce() != null) {
                if (setText(2, "273343029@qq.com")) {
                    sleep(1500);
                    back();
                }
            }
            if (text("生日").findOnce() != null) {
                func.sClick(className("android.widget.Spinner").findOne());
                sleep(1000);
                func.sClick(text("确定").findOnce());
                sleep(1000);
            }
            sleep(2000);
            if (func.cClick(textContains('确认授权并加入').findOnce())) {
                sleep(2000);
                break;
            }
        }
    }
    sleep(1500);
    back();
    sleep(1500);
}

// filePath = "/storage/emulated/0/脚本";
// var screenW;
// screenW = device.width;
// log("screenW: " + screenW);
// if (!requestScreenCapture()) {
//     alert("请求截图权限失败！");
//     exit();
// }
// sleep(800);
// // 查找拼图是否已加载
// var blockLine;
// blockLine = text("向右拖动滑块并拼合图片").findOnce();
// while (blockLine == null) {
//     sleep(800);
//     blockLine = text("向右拖动滑块拼合图片").findOnce();
// }
// // 获取滑块坐标
// var blockBounds, blockLeft, blockTop;
// blockBounds = blockLine.bounds();
// blockLeft = blockBounds.left;
// blockTop = blockBounds.top;

// // 查找图片，得到截图裁剪位置
// var dragImg, dragImgBounds;
// var blockLine, blockLineBounds;
// dragImg = idContains("wpcs_drag_img").findOnce();
// blockLine = idContains("wpcs_drag_block_line").findOnce();

// if (dragImg == null || blockLine == null) {
//     toastLog("未找到滑动的图片 退出");
//     exit();
// }

// dragImgBounds = dragImg.bounds();
// blockLineBounds = blockLine.bounds();

// // 定义截图坐标
// var img1X, img1Y, img1H, img1W, blockR;
// var img2X, img2Y, img2H, img2W;
// blockR = blockLineBounds.right;
// // 在img2 中查找img1
// //查找的图像35*44
// img1X = dragImgBounds.left;          // 设为滑块的右边
// img1Y = dragImgBounds.top;
// img1W = screenW - dragImgBounds.left * 2;        // 右边-左边
// img1H = dragImgBounds.bottom - dragImgBounds.top;        // 底部-顶部
// log(img1X, img1Y, img1W, img1H);

// img2X = dragImgBounds.right;          // 设为滑块的右边
// img2Y = dragImgBounds.top;
// img2H = dragImgBounds.bottom - dragImgBounds.top;        // 底部-顶部
// img2W = screenW - dragImgBounds.right;        // 右边-左边


// var img1;
// log("截图开始");
// img = captureScreen();      // 截图
// img = images.clip(img, img1X, img1Y, img1W, img1H); // 裁剪图片
// img = images.scale(img, 0.7, 0.7);
// superMan(images.toBytes(img));
// // img2 = images.clip(img, img2X, img2Y, img2W, img2H); // 裁剪图片
// img = images.cvtColor(img, "BGR2GRAY"); // 灰度
// superMan(images.toBytes(img));
// images.save(img, filePath + "/grey.png");


// toastLog("截图处理完成");

// var returnXY;
// // returnXY = superMan(images.toBytes(img));

// var targetX, targetY;
// 先还原比例，再加上截图的X,Y
// targetX = Math.floor(returnXY[0] / 0.7) + imgX;
// targetY = Math.floor(returnXY[1] / 0.7) + imgY;


/**
 * 
 * @param {输入bytes类型的图片} img
 */
function superMan(img) {
    //>>>>>>>>基础设置<<<<<<<<<
    var username = 'mw03251214_2'  //超人云帐号
    var password = '003451jj'  //超人云密码
    var softid = '76206' //软件ID，在作者帐号后台设置，为图片长度和作者分成凭证
    // var baseurl = 'http://api2.sz789.net:88/' //简单图片识别接口，如常见字母，数字
    var baseurl = 'http://apib.sz789.net:88/'  //复杂图片识别接口，如滑动题，坐标题，计算题
    // var imgid = '' //由识别接口返回，用于报告错误识别结果

    //>>>>>>>>查询余额<<<<<<<<<
    // console.show();
    // var url = baseurl + 'GetUserInfo.ashx'
    // var res = http.post(url, {
    //     "username": username,
    //     "password": password
    // });
    // if (res.statusCode == 200) {
    //     var rjson = res.body.json();
    //     log('剩余点数为：' + rjson.left);
    // }
    // else {
    //     log('接口请求失败')
    // }
    //>>>>>>>>上传图片等待识别结果<<<<<<<<<
    /*读取图片至16进制字符串*/
    log("requests start")
    var sb = new java.lang.StringBuilder();
    var hex;
    for (var i = 0; i < img.length; i++) {
        hex = ((img[i] & 0xF0) >> 4).toString(16) + (img[i] & 0x0F).toString(16);
        sb.append(hex);
    }
    var imgdata = sb.toString();
    var url = baseurl + 'RecvByte.ashx';
    var res = http.post(url, {
        "username": username,
        "password": password,
        "softId": softid,
        "imgdata": imgdata
    })

    if (res.statusCode == 200) {
        var rjson = res.body.json();
        // log(rjson);
        log("识别结果:", rjson.result);
        // imgid = rjson.imgId
        // log(imgid);
    }
    else {
        log('接口请求失败');
    }
    toastLog("requests end");

    //>>>>>>>>报告错误(识别结果错误时调用)<<<<<<<<<
    /*** 
    var url = baseurl + 'ReportError.ashx'
    http.post(url,{"username":username,"password":password,"imgid":imgid})
    ***/
}

function 云闪付锦鲤活动() {
    var startTime, targetViewText, clickText;
    var appName = "云闪付";
    var timeArea = "北京时间";
    toastLog("到点点击");

    var currentWeekday = new Date().getDay();
    var counponText;
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

    targetViewText = func.dialogsWin(["每日券", "周五六日10点", "周五六日15点"]);
    var targetText, everyText;
    targetText = "线下指定商户";
    switch (targetViewText) {
        case "每日券":
            targetText = func.dialogsWin(["线下指定商户", "线上指定商户"]);
            startTime = "08,59,59,600";
            counponText = "满10可用"
            break;
        case "周五六日10点":
            startTime = "09,59,59,600";
            break;
        case "周五六日15点":
            startTime = "14,59,59,600";
            break;
    }
    func.to_app(appName);
    while (text("激励金提现").findOnce() == null) {
        // 如果能点击按钮，就等待设置文本
        if (func.sClick(id("rl_search_coupon").findOnce()) == true) {
            if (textContains("跳过").findOnce() == null) {
                text("历史记录").findOne();
                setText(0, "奖励中心");
                func.sClick(text("奖励中心").depth(16).findOne());
                func.sClick(text("奖励中心").depth(17).findOne());
            } else {
                sleep(600);
                continue;
            }
        }
    }

    var exWhile, clickItems, clickItem, itemParent, itemIndex, upItemText;
    exWhile = false;
    // 等待进入指定页面
    while (text("奖励中心").findOnce() == null) {
        toastLog("请跳转到 \" 奖励中心 \"，直到提示  已到达等待页面");
        sleep(800);
    }
    while (1) {
        try {
            clickItems = text(counponText).find();
            if (clickItems.nonEmpty()) {
                for (var i = 0; i < clickItems.length; i++) {
                    clickItem = clickItems[i];
                    itemIndex = clickItem.indexInParent();
                    itemParent = clickItem.parent();
                    upItemText = (itemParent.child(itemIndex + 1)).text();
                    log(upItemText);
                    if (upItemText == targetText) {
                        exWhile = true;
                        break;
                    }
                }
            }
            if (exWhile) {
                break;
            }
        }
        catch (e) {
            log("123");
        }
    }

    toastLog("已到达指定页面，等待");
    //  等待倒计时
    func.getTimeDiff(timeArea, startTime);
    // 点击进入 等待
    func.sClick(clickItem);
    text("优惠券到账后24小时内有效").findOne();
    func.sClick(text("立即领取").findOne());
    toastLog("已完成");
}

function 铃声通知(播放时长, 音量) {
    var 音量 = 音量 || 13;
    var 播放时长 = 播放时长 || 1000;
    var 铃声 = android.media.RingtoneManager.TYPE_NOTIFICATION;
    var mp = new android.media.MediaPlayer();
    device.setMusicVolume(音量)
    mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声));
    mp.prepare();
    mp.start();
}