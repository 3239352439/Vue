// login按钮事件
function cambiar_login() {
// 动画
document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
document.querySelector('.cont_form_login').style.display = "block";
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
setTimeout(function(){document.querySelector('.cont_form_login').style.opacity = "1"; },400);  
setTimeout(function(){    
document.querySelector('.cont_form_sign_up').style.display = "none";
},200); 
    var $email=$.trim($('.l_email').val());
    var $pwd=$.trim($('.l_pwd').val());
    if($email && $pwd){
       $.get('login',{email:$email,password:$pwd},function(res){
        if(res.data.length==1){
          console.log('Login success!');
          location.href="../barcode.html"
          // 登陆成功
        }
        else{
          $.alert('该账号不存在!请前往注册!');
          var inputs=$('.cont_form_login input');
          for(var i=0;i<inputs.length;i++){
            inputs.eq(i).val('');
            
          }
        }
      })
    }   
}

// 判断是否已存在email
$('.s_email').change(function(){
    $.get('newemail',{email:$.trim($('.s_email').val())},function(res){
      if(res.data.length==1){     
        $.alert('该email已存在!'); 
         $('.s_email').val('');
         $('.s_email').focus();
      }
      else{
        // 判断email为不存在，即可注册
      }
    })
})

// sign up按钮事件
function cambiar_sign_up() {
// 动画
document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0"; 
setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},100);  

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},400);
var pwd=$('.s_pwd').val();
if(pwd!=$('.sdb_pwd').val()){
  $.alert('密码不一致!!!');
} else{
  if($('.s_email').val()&&$('.s_user').val()){
  $.post('signup',{email:$.trim($('.s_email').val()),user:$.trim($('.s_user').val()),password:$.trim($('.s_pwd').val())},function(res){
    if(res.status){
      $.alert('保存成功!请前往登陆!');
      var inputs=$('.cont_form_sign_up input');
      for(var i=0;i<inputs.length;i++){
        inputs.eq(i).val('');
        
      }
  } else {
      $.alert('保存失败!!!');
  }
  }) 
}
}
}    
// 返回箭头点击事件
function ocultar_login_sign_up() {

document.querySelector('.cont_forms').className = "cont_forms";  
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
document.querySelector('.cont_form_login').style.opacity = "0"; 

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},500);  
  
  }



