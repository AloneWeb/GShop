
jQuery(function($){

	function loginCheck(){
		var userName=null;
		var msgTextEle=$('#errmsg-text');
		var msgEle=$('#msg');
		var userNameEle=$('#userName');
		var userPassEle=$('#userPass');
		var loginBtn=$('#loginBtn');
		
		function printMsg(msgEle,msgTextEle,msg){
			msgEle.removeClass('msg-hidden').addClass('msg');
			msgTextEle.text(msg);
			return false;
		}

		loginBtn.on('click',function(){
			userName=userNameEle.val();
			userPass=userPassEle.val();
			if(ver.checkNull(userName)&&ver.checkNull(userPass)){
				return printMsg(msgEle,msgTextEle,"请输入用户名和密码");
			}else if(ver.checkNull(userName)){
				return printMsg(msgEle,msgTextEle,"请输入用户名");
			}else if(ver.checkNull(userPass)){
				return printMsg(msgEle,msgTextEle,"请输入密码");
			}else{
				return true;
			}
		});
	}
	loginCheck();
});