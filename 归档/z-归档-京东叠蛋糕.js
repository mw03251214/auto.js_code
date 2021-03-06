auto.waitFor();

main();

function main() {
    run_app('京东');
    jd_sign();
    cakes();
    alert('已完成！');
}

// ======================签到代码==================================
function jd_sign() {
    //等待首页加载
    while (className('TextView').text('首页').findOnce() == null) {
        center_click(id('xk').findOnce());
        toastLog('等待首页...');
        sleep(4500);
    }
    sleep(1000);
    center_click(className('TextView').text('领京豆').findOne());
    //等待进店领豆加载
    className('TextView').text('进店领豆').findOne();
    if (className('TextView').text('已连续签到').findOnce()) {
        toastLog('今日已签到');
    }
    else {
        center_click(className('TextView').text('签到领京豆').findOnce());
        while (className('TextView').text('签到提醒').findOnce() == null && text('全民抢京豆').findOnce() == null) {
            sleep(1000);
        }
        toastLog('签到成功');
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back_way();
        sleep(4000);
    }
    center_click(className('TextView').text('领券').findOnce());
    className('ImageView').desc('领券中心').findOne();

    if (className('TextView').text('立即签到').findOnce() == null) {
        toastLog('今日已领券');
    }
    else {
        className('TextView').text('立即签到').findOnce().click();
        className('ImageView').desc('关闭弹窗').findOne();
        className('ImageView').desc('关闭弹窗').findOne().click();
    }
    while (className('TextView').text('首页').findOnce() == null) {
        back_way();
        sleep(4000);
    }
}

// ======================叠蛋糕代码==================================
function cakes() {
    // 等待蛋糕界面加载
    while (className('android.view.View').text('当前蛋糕：').findOnce() == null) {
        var cake_view = className('ImageView').desc('浮层活动').findOnce();
        center_click(cake_view, false);
        sleep(2000);
    }
    sleep(4500);
    // 检测弹窗是否有立即签到
    sign_immediately = text('立即签到').findOnce();
    if (sign_immediately != null) {
        center_click(sign_immediately);
    }
    // 点击任务
    var mission = className('android.view.View').text('做任务领金币').findOne();
    center_click(mission);
    var idx = 1;
    var idxText, unComplete, textStr;
    while (true) {
        textStr = '';
        // 等待任务界面出现
        className('android.view.View').textContains('签到').findOne();
        sleep(4500);
        unComplete = text('去完成').find();
        if (unComplete.nonEmpty()) {
            if (unComplete.length <= 1 || idx >= unComplete.length) { break; }
            idxText = unComplete[idx].parent().parent().parent().child(0).child(1).text();
            if (idxText.indexOf('去玩AR吃') == -1) {
                // 如果有战队相关则+1
                if (idxText.indexOf('战队') != -1) {
                    idx = idx + 1;
                    continue;
                }

                if (idx >= unComplete.length) { break; }
                sleep(1500);
                if (textContains('继续领红包').findOnce() != null) {
                    textContains('继续领红包').findOnce().click();
                    sleep(1500);
                }
                while (text('去完成').findOnce() != null) {
                    unComplete[idx].click();
                    sleep(1000);
                }
                if (idxText.indexOf('浏览可得') != -1) { textStr = '直接返回' }
                else if (idxText.indexOf('秒可得') != -1) { textStr = '等待返回' }
                else if (idxText.indexOf('成功开通得') != -1) { textStr = '会员' }
                else if (idxText.indexOf('浏览5个商品可得') != -1) { textStr = '浏览' }
                else if (idxText.indexOf('加购5个商品可得') != -1) { textStr = '加购' }
            } else {
                break;
            }
            toastLog(textStr);
            after_click(textStr);
        } else {
            break;
        }
    }
}


function after_click(textStr) {
    sleep(4500);
    var city_player = className('android.webkit.WebView').text('京喜城市玩家').findOnce();
    //var viewList = text('浏览以下5个商品').depth(17).findOnce(); //恭喜完成
    //var addCart = textContains('点击加购以下').findOnce();  //idContains(str)

    if (textStr == '加购') {
        add_cart();
    }
    else if (textStr == '浏览') {
        view_list();
    }
    else if (city_player != null) {
        sleep(1000);
        var join_imd = text('确认定位 立即参与').findOnce();
        if (join_imd != null) {
            join_imd.click()
            sleep(1000);
            var happy_get = className('android.view.View').text('开心收下').findOnce();
            if (happy_get != null) { happy_get.click() }
        }
        wait_complete();
    }
    else if (textStr == '直接返回') {
        sleep(1000);
        back_way();
    }
    else if (textStr == '等待返回') {
        wait_complete();
    }
    else if (textStr == '会员') {
        member_card();
    }
    else {
        wait_complete();
    }

}

function add_cart() {
    var carts
    i = 0;
    while (text('已完成').findOnce() == null) {
        //点击商品加购物车按钮
        if (idContains('cart_').findOnce() != null) {
            carts = idContains('cart_').find()[i].click();
            //if (carts.child(0).text() != '已加购') {
            //}
            sleep(2000);
        }                   //加购等待已完成 
        i = i + 1;
    }
    while (className('android.view.View').textContains('签到').findOnce() == null) {
        back_way();
        sleep(2000);
    }
}


function view_list() {
    i = 0;
    while (text('已完成').findOnce() == null) {
        idContains('view_').findOne();
        //点击商品加购物车按钮
        if (idContains('view_').findOnce() != null) {
            idContains('view_').find()[i].click();
            textContains('购物车').findOne();
            sleep(1500);
            back_way();
            sleep(2500);
        }
        i = i + 1;
    }
    while (className('android.view.View').textContains('签到').findOnce() == null) {
        back_way();
        sleep(2000);
    }
}

function member_card() {
    var count = 0;
    //toastLog('会员卡');
    sleep(3000);
    while (text('去完成').findOnce() == null) {
        if (count >= 4) {
            back_way();
            sleep(4000);
        }
        if (center_click(textContains('确认授权并加入').findOnce())) {
            sleep(3000);
            center_click(text('我知道了').findOnce())
        }
        count = count + 1;
        sleep(3000);
    }
}

function wait_complete() {
    //等待恭喜完成
    textContains('恭喜完成').findOne();
    back_way();
}

// -------------通用部分--------------------
function run_app(act_name) {
    var act_pkg = app.getPackageName(act_name);
    if (currentPackage() == act_pkg) {
        home();
        sleep(1000);
    }
    app.launch(act_pkg);
}

function back_way() {
    sleep(800);
    var backBtn = desc('返回').findOnce();
    if (backBtn == null) {
        back();
    } else {
        var closeBtn = className('ImageView').id('com.jd.lib.jshop:id/asj').findOnce();
        if (closeBtn != null) {
            closeBtn.click();
            sleep(1000);
        }
        if (backBtn.clickable()) {
            backBtn.click();
        } else {
            center_click(backBtn);
        }
    }
    sleep(800);
    center_click(textContains('离开').findOnce());
    center_click(textContains('知道了').findOnce());
}



function center_click(element, centerClick) {
    if (element != null) {
        if (centerClick == null) {
            if (element.clickable()) {
                element.click();
                return true;
            } else {
                click(element.bounds().centerX(), element.bounds().centerY());
                sleep(800);
                return true;
            }
        } else {
            click(element.bounds().centerX(), element.bounds().centerY());
            sleep(800);
            return true;
        }
    } else { return false; }
}