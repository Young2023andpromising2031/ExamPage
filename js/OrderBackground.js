// 订单页面
// 分页查询order
var orderPage = 1
var orderPageSize = 5
var WebOrderContent = document.getElementById("WebOrderContent");
getOrderPage(orderPage,orderPageSize)
function getOrderPage(ordernum, ordernums) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/getInfoByPage_order",
        data: {
            page: ordernum,
            per_page: ordernums
        },
        success: function (result) {
            console.log(result, 'result')
            // 清除WebDish中的li内容
            WebOrderContent.innerHTML = ""
            for (var i = 0; i < result.data.length; i++) {
                WebOrderContent.innerHTML += "<ul class='ulSty'>"
                    + "<li>" + result.data[i].us + "</li>" +
                    "<li>" + result.data[i].amount+ "</li>" +
                    "<li>" + result.data[i].phone + "</li>" +
                    "<li>" + (result.data[i].pay ===0 ? "已支付":"未支付") + "</li>" +
                    // "<li>" + result.data[i].id + "</li>" +
                    "<li>" +
                    "<button class='orderChange' onclick='orderChangeE(" + JSON.stringify(result.data[i]) + ")'>修改</button>" +
                    "<button class='orderDel'>删除</button>" +
                    "</li>" +
                    "<li style='display:none'>" + JSON.stringify(result.data[i]) + "</li>"
                "</ul>"
            }
            // 删除
            var orderDel = document.getElementsByClassName('orderDel');
            for (var i = 0; i < orderDel.length; i++) {
                orderDel[i].onclick = function () {
                    console.log('删除功能', orderDel);
                    // 找到id所在位置
                    var obj = JSON.parse(this.parentElement.parentElement.lastElementChild.innerHTML)
                    // 获取id
                    var id = obj._id
                    console.log(id);
                    // 确定是否删除
                    if (confirm('确定要删除吗')) {
                        delUser(id);
                    }
                }
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
// 修改功能
var orderChange = document.getElementsByClassName('orderChange');
console.log(orderChange);
var modifyPopOrder = document.getElementsByClassName('modifyPopOrder');
console.log(modifyPopOrder);
var UsValue = document.getElementById('inputUs');
var AmountValue = document.getElementById('inputAmount');
var PhoneValue = document.getElementById('inputPhone');
var PayValue = document.getElementById('inputPay');
console.log(PayValue);
function orderChangeE(obj) {
    console.log(obj, '1111');
    console.log("修改功能");
    modifyPopOrder[0].style.display = "flex";
    UsValue.value = obj.us,
    AmountValue.value = obj.amount,
    PhoneValue.value = obj.phone,
    PayValue.value = obj.pay
    // JSON.stringify(e.data[1])  加双引号
}
getOrderPage(orderPage, orderPageSize);
// 增加
var addOrderBtn = document.getElementsByClassName('addOrderBtn');
var certain = document.getElementsByClassName('certain')[0];
console.log(certain)
for (var i = 0; i < addOrderBtn.length; i++) {
    addOrderBtn[i].onclick = function () {
        console.log("增加功能");
        modifyPopOrder[0].style.display = "flex";
        // 如果点击确定按钮，添加成功；点击取消，恢复页面
    }
}
// 查询用户总数
var len = document.getElementById('len');
function getOrdersum() {
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/order/allpage_order",
        success: function (result) {
            console.log(result, 'result')
            len = result.pages
        },
        error: function (err) {
            console.log(err)
        }
    })
}
getOrdersum()
// 删除功能
var del = document.getElementsByClassName('del')[0];
function delOrder(id) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/del_order",
        data: {
            _id: id,
        },
        success: function (result) {
            console.log(result, 'result')
            getOrderPage(2, 5);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
//添加订单
var addOrder = document.getElementsByClassName('addOrder');
function addOrder(aUs, aMount, aPhone, aPay) {
    $ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/add_order",
        data: {
            _us: aUs,
            _amount: aMount,
            _phone: aPhone,
            _pay:aPay
        },
        success: function (result) {
            console.log(result, 'result');
            getOrderPage(orderPage,orderPageSize)
            getOrderPage(1, 3);
        },
        error: function (err) {
            console.log("增加失败！")
        }
    })
}
// 修改功能
var modify = document.getElementsByClassName('modify');
function modifyOrder(aUs, aMount, aPhone, aPay) {
    $ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/update_order",
        data: {
            _us: aUs,
            _amount: aMount,
            _phone: aPhone,
            _pay:aPay
        },
        success: function (result) {
            console.log(result, 'result')
            getOrderPage(1, 3);
        },
        error: function (err) {
            console.log("修改失败！")
        }
    })
}
// 确定按钮
var certain = document.getElementsByClassName('certain')[0];
certain.onclick = function () {
    console.log("确定");
    modifyPopOrder[0].style.display = "none";
}
// 取消按钮
var cancel = document.getElementsByClassName('cancel')[0];
cancel.onclick = function () {
    console.log("取消");
    modifyPopOrder[0].style.display = "none";
}
//弹框的关闭按钮
var stopIt = document.getElementById('stopIt');
stopIt.onclick = function () {
    modifyPopOrder[0].style.display = "none";
}
// 翻页部分
var prevbtnOrder = document.getElementById('prevBtnOrder');
var nextbtnOrder = document.getElementById('nextBtnOrder');
var pagenumOrder = document.getElementById('nowpageOrder');
// 上一页按钮实现
prevbtnOrder.onclick = function () {
    console.log('上一页');
    if (pagenumOrder.innerHTML <= 1) {
        alert("当前页数已至顶！")
    } else {
        orderPage--;
        pagenumOrder.innerHTML--;
        getOrderPage(orderPage, orderPageSize);
    }
}
// 下一页按纽实现
nextbtnOrder.onclick = function () {
    console.log('下一页');
    // Math.ceil():四舍五入并返回大于等于给定数字的最小整数
    if (orderPage >= Math.ceil(len / 5)) {
        alert("当前是最后一页！");
    } else {
        pagenumOrder.innerHTML++;
        orderPage++;
        getOrderPage(orderPage, orderPageSize);
    }
}
