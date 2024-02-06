

// 图片路径的公用部分
const imgSrc = "/static";

const imgUrl = "https://dev5.huayingtenghui.com/images/fronted";
const fontUrl = "https://dev5.huayingtenghui.com/public/fonts/din/";

module.exports = {
    // --------------------变量--------------------
    // 图片路径的公用部分
    imgUrl,
    imgSrc,
    returnImg(url){
        return url + '?x-oss-process=video/snapshot,t_1,f_jpg,h_500,w_500'
    },
    // ----------------------校验----------------------
    // 处理时间
    dealTimeLength(value){
        let num = Number(value)
        let str = num < 10 ? '0' + num : num
        // let str = value.toString()
        return str
    },
    // 非空验证(包含数字)
    isEmpty(value,isnumber = false){
        if(isnumber){
            if(value <= 0){
                return false
            }
        }
        if(value == '' || value == null || value == 'undefined'){
            return false
        }
        return true
    },
    // 手机号验证
    isPhone(phone) {
        // 是否正确(默认不正确)
        let br = false;
        if (/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-9]|18[0-9]|19[8-9])[0-9]{8}$/.test(phone)) {
            br = true;
        }
        return br;
    },
    // 邮箱验证
    isEmail(email) {
        // 是否正确(默认不正确)
        let br = false;
        if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email)) {
            br = true;
        }
        return br;
    },
    // 身份证验证
    isPersonID(code) {
        //身份证号合法性验证
        //支持15位和18位身份证号
        //支持地址编码、出生日期、校验位验证
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var br = true;
        var msg = "验证成功";

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
            br = false;
            msg = "被保人身份证号格式错误";
        } else if (!city[code.substr(0, 2)]) {
            br = false;
            msg = "被保人身份证号地址编码错误";
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != code[17].toUpperCase()) {
                    br = false;
                    msg = "被保人身份证号校验位错误";
                }
            }
        }
        return {
            br,
            msg
        };
    },
    // 是否是正整数
    isNum(num){
        if (!(/(^[1-9]\d*$)/.test(num))) {
            return false;
        }
        return true
    },
    // 是否有小数点
    isDot(num) {
        var result = (num.toString()).indexOf(".");
        if(result != -1) {
            return false
            alert("含有小数点");
        }
        return true
    },

    // ----------------------原生----------------------
    // 图片预览
    previewImg(current, urls) {
        uni.previewImage({
            current: current, // 当前显示图片的https链接
            urls: urls // 需要预览的图片https链接列表
        })
    },
    // 显示加载动画
    showLoading(title = "加载中...", mask = true) {
        uni.showLoading({
            title: title,
            mask: mask,
        })
    },
    // 关闭加载动画
    hideLoading() {
        uni.hideLoading();
    },
    // 提示框
    toast(title, time = 1500, mask = true, icon = "none") {
        uni.showToast({
            // 提示的内容
            title: title,
            // 提示的时间
            duration: time,
            // 是否显示透明蒙层，防止触摸穿透(false)
            mask: mask,
            // 图标(success)
            icon: icon,
        })
    },
    // 对话框
    dialogBox(obj) {
        let showCancel = true;
        if (obj.l_show == false) {
            showCancel = false;
        }
        uni.showModal({
            // 对话框的标题(选填)
            title: obj.title || "",
            // 对话框的内容(选填)
            content: obj.content || "",
            // 是否显示左边的按钮(选填，默认显示)
            showCancel: showCancel,
            // 左边按钮的文字内容(选填，默认取消)
            cancelText: obj.l_text || "取消",
            // 左边按钮的文字颜色(选填，默认#000000)
            cancelColor: obj.l_color || "#000000",
            // 右边按钮的文字内容(选填，默认确定)
            confirmText: obj.r_text || "确定",
            // 右边按钮的文字颜色(选填，默认#3cc51f)
            confirmColor: obj.r_color || "#3cc51f",
            success: (res) => {
                if (res.confirm) { // 点击了确定按钮
                    if (obj.r_fun) {
                        obj.r_fun();
                    }
                } else { // 点击了取消按钮
                    if (obj.l_fun) {
                        obj.l_fun();
                    }
                }
            }
        })
    },
    // 打开一个新页面
    open(url) {
        uni.navigateTo({
            url: url
        })
    },
    // 关闭所有页面，然后打开一个新页面
    openNew(url) {
        uni.reLaunch({
            url: url
        });
    },
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
    openTab(url) {
        uni.switchTab({
            url: url
        });
    },
    // 当前页打开新页面
    href(url) {
        uni.redirectTo({
            url: url
        })
    },
    // 页面返回
    back(delta = 1) {
        // #ifdef H5
        const pages = getCurrentPages()
        if (pages.length > 1) {
            uni.navigateBack(1)
            return;
        }
//使用vue-router返回上一级
        if (typeof(this.$router) == 'undefined') {
//重新定向跳转页面
            uni.reLaunch({
                url: "/pages/index/index"
            })
        }else{
            this.$router.go(-1)
        }
        return;
// #endif
//     uni.navigateBack(1)
        uni.navigateBack({
            delta: delta
        })
    },
    // 获取之前页面的数据
    backGetData(index = 1) {
        // 往上一级页面传参
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - index - 1]; // 上index级页面
        return prevPage;
    },
    // 将数据存到本地
    setData(key, data) {
        uni.setStorageSync(key, data);
    },
    // 从本地获取数据
    getData(key) {
        return uni.getStorageSync(key);
    },
    // 同步删除本地数据
    removeData(key) {
        uni.removeStorageSync(key);
    },
    // 同步清除本地数据
    clearData() {
        uni.clearStorage();
    },
    // 设置底部导航
    setBar(index,text){
        uni.setTabBarItem({
            index:index,
            text:text
        })
    },
    // 打开地图选择地址
    chooseAddress(success) {
        uni.chooseLocation({
            success: function(res) {
                success({
                    // 地点名称
                    name: res.name,
                    // 详细地址
                    address: res.address,
                    // 经纬度
                    lng: res.longitude,
                    lat: res.latitude
                });
            },
        });
    },
    // 打开地图
    openMap(lng, lat, name) {
        uni.openLocation({
            longitude: lng - 0,
            latitude: lat - 0,
            name: name,
        })
    },
    // 复制
    copy(text,toasttext = '复制成功') {
        // #ifdef APP-PLUS
        uni.setClipboardData({
            data: text,
            success: () => {
                uni.showToast({
                    // 提示的内容
                    title: toasttext,
                    // 提示的时间
                    duration: 1500,
                    // 是否显示透明蒙层，防止触摸穿透(false)
                    mask: true,
                    // 图标(success)
                    icon: 'none',
                })
            }
        });
        // #endif
        // #ifdef H5
        // 如果是H5，获取设备信息
        uni.getSystemInfo({
            success: function(res) {
                let input = document.createElement('input');
                input.type = 'text';
                input.value = text;
                input.style.position = 'fixed';
                input.style.top = "-100vh";
                input.style.left = "-100vw";
                input.style.opacity = 0;
                window.document.body.appendChild(input);
                input.select();
                if (res.platform == "ios") {
                    input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
                } else {
                    document.execCommand("Copy");
                }
                document.body.removeChild(input);
                uni.showToast({
                    // 提示的内容
                    title: toasttext,
                    // 提示的时间
                    duration: 1500,
                    // 是否显示透明蒙层，防止触摸穿透(false)
                    mask: true,
                    // 图标(success)
                    icon: 'none',
                })
            }
        });
        // #endif
    },
    // 拨打电话
    callNumber(phone) {
        uni.makePhoneCall({
            phoneNumber: phone,
        })
    },
    // 设置顶部导航
    setTopNavName(text){
        uni.setNavigationBarTitle({
            title:text
        })
    },

    // ----------------------自封方法----------------------
    IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    // 获取语言列表
    getLanguage(){
        return [
            {id:'cn',name:'CN',type:1},
            // {id:'en',name:'English',type:2}
        ]
    },
    // 检测url是否有某key，并获取值
    urlIsHaveKey(key){
        let urlAll = window.location.href
        let urls = urlAll.replace('?','&')
        let urlArr = urls.split('&')
        // console.log(urlArr)
        for(let a = 0; a < urlArr.length;a++){
            let urlA = urlArr[a].split('=')
            if(urlA[0] == key){
                return urlA[1]
            }
        }
        return ''
    },
    // 计算精度
    getPoint(num){
        let number = 1
        for(let a = 0; a < num;a++){
            number = number + '0'
        }
        return Number(number)
    },
    // 判断对象中是否有某key值，如果有该值，直接返回该对象
    checkObjKeyIsValue(arrs,key,value){
        let items = ''
        arrs.forEach((item,k) => {
            if(item[key] == value){
                items = item
            }
        })
        if(items){
            return items
        }
        return false
    },
    // 数字转换小数点任意位
    changeNumberPoint(number,length = 2){
        let nums = '1'
        for(let a = 0; a < length; a++){
            nums = nums + '0'
        }
        let num = Number(number) / nums // 金额转换小数点后六位
        let result = num.toFixed(length) // 截取6位
        return result
    },
    // 检测密码只能是英文大小写加数字
    checkPswEN(psw){
        let check_big = /[A-Z]/g
        // console.log(check_big.test(psw))
        let check_small = /[a-z]/g
        // console.log(check_small.test(psw))
        let check_num = /[0-9]/g
        // console.log(check_num.test(psw))
        if(check_big.test(psw) && check_small.test(psw) && check_num.test(psw)){
            return true
        }
        return false
    },
    // 生成uuid
    createUUID() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },


    // ----------------------时间转换----------------------
    // 获取当前时间-精确到时分秒
    time_StampToHMS(){
        var now = new Date();
        var hour = now.getHours();//得到小时
        var minu = now.getMinutes();//得到分钟
        var sec = now.getSeconds();//得到秒
        if(hour < 10){
            hour = '0' + hour
        }
        if(minu < 10){
            minu = '0' + minu
        }
        if(sec < 10){
            sec = '0' + sec
        }
        return hour + ':' + minu + ':' + sec
    },
    // 时分秒转换成秒数
    time_HMSToS(time){
        var s = '';
        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];

        s = Number(hour*3600) + Number(min*60) + Number(sec);

        return s;
    },
    // 根据时间戳获取年月日时分秒
    time_StampToYMDHMS(sjc) {
        let datetime = new Date(sjc);
        // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
        var year = datetime.getFullYear(),
            month = ("0" + (datetime.getMonth() + 1)).slice(-2),
            date = ("0" + datetime.getDate()).slice(-2),
            hour = ("0" + datetime.getHours()).slice(-2),
            minute = ("0" + datetime.getMinutes()).slice(-2),
            second = ("0" + datetime.getSeconds()).slice(-2);
        // 拼接
        var result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        // 返回
        return result;
    },
    // 毫秒转换时分秒
    time_MsecToHMS(value) {
        var theTime = parseInt(value);// 秒
        var middle= 0;// 分
        var hour= 0;// 小时

        if(theTime > 60) {
            middle= parseInt(theTime/60);
            theTime = parseInt(theTime%60);
            if(middle> 60) {
                hour= parseInt(middle/60);
                middle= parseInt(middle%60);
            }
        }
        var result = parseInt(theTime);
        if(theTime < 10){
            result = "0"+theTime;
        }
        if(middle > 0) {
            if(middle < 10){
                result = "0"+parseInt(middle)+":"+result;
            }else{
                result = parseInt(middle)+":"+result;
            }
        }
        if(hour> 0) {
            if(hour < 10){
                result = "0"+parseInt(hour)+":"+result;
            }else{
                result = parseInt(hour)+":"+result;
            }
        }
        return result;
    },
    // 毫秒转换成天时分秒
    time_MsecToDHMS(time){
        var days = parseInt(time / (1000 * 60 * 60 * 24));
        var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (time % (1000 * 60)) / 1000;
        return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
    },
    // 秒数转换成时分秒
    time_SToHMS(s){
        var t
        if(s > -1){
            var hour = Math.floor(s/3600)
            var min = Math.floor(s/60) % 60
            var sec = s % 60
            if(hour < 10) {
                t = '0'+ hour + ":"
            } else {
                t = hour + ":"
            }
            if(min < 10){
                t += "0"
            }
            t += min + ":"
            if(sec < 10){
                t += "0"
            }
            t += sec.toFixed(2)
        }
        return t
    },

}
