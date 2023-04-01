// 用户注册
var put = document.getElementById('put');
var pas =document.getElementById('pas');
var mail =document.getElementById('mail');
var code =document.getElementById('code');

registerBtn.onclick = function(){
    $.ajax({
        type:"POST",
        url:'http://118.195.129.130:3000/user/reg',
        data:{
            us:put.value,
            ps:pas.value,
            mail:mail.value,
            code:code.value
        },
        success:function(result){
            console.log(result,'result');
            // alert("注册成功！")

        },
        error:function(err){
            console.log(err);
        }
    })
}