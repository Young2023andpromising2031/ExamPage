// 用户登录
var signin = document.getElementById('signin')
var put = document.getElementById('put')
var pas = document.getElementById('pas')

signin.onclick = function () {
	console.log(236);
	$.ajax({
		type: "POST",
		url: 'http://118.195.129.130:3000/user/login',
		data: {
			us: put.value,
			ps: pas.value
		},
		success: function (result) {
			console.log(result, 'result');
			
			alert("登陆成功！")
				window.location.href = "../html/WebBackground.html"
		},
		error:function (err){
			console.log(err);
		}
	})
}
signup.onclick = function(){
	console.log("369")	
	// 页面跳转
	window.location.href = "../html/register.html"
}
