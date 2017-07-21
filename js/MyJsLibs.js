/**
 * 一些常用的函数：数值校验、精确度修复
 * @Author    AloneWeb
 * @DateTime  2017-06-28
 * @copyright [AloneWeb]
 * @license   [MIT]
 * @version   [1.0.0]
 */

var tool=(function($){

  function tips(text,ms){
    $('#tips').hide();
    $('#tipsText').text(text);
    $('#tips').show('fast');
    setTimeout(function(){
      $('#tips').hide('fast');
    },ms);
  }

  return{
    tips:tips
  }

})($)

/**
 * 一些字符、数值等验证函数，用于前端字符校验
 */
var ver=(function($){
	
	/*
	 * 判断是否为空
	 */
	function checkNull(val){
		if($.trim(val).length===0){
			return true;
		}else{
			return false;
		}
	}

	/*
	 * 判断长度是否在限制范围内 
	 */
	function limitLength(val,start,end){
    var len=$.trim(val).length;
		if(len>=start&&len<=end){
			return true;
		}else{
			return false;
		}
	}

	/*
	 * 判断是否为字符和数值组成（字符和数值都必须有一个存在）
	 */
	function isCharAndNum(val){
		var reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
		if(reg.test(val)){
			return true;
		}else{
			return false;
		}
	}
  /*
   * 判断是否为中文或字符
   */
  function isZhAndChar(val){
   var reg = /^([\u4E00-\u9FA5]{2,7})|([a-zA-Z]{3,16})$/;
   if(reg.test(val)){
      return true;
    }else{
      return false;
    }
  }
  /*
   *判断是否为手机号码
   */
  function isTel(val){
    var telReg=/^1[3|4|5|8][0-9]\d{8}$/;
    if(telReg.test(val)){
      return true;
    }else{
      return false;
    }
  }
	/*
	 * 判断是否为Email
	 */
	function isEmail(email){
		var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
		if(emailReg.test(email)){
			return true;
		}else{
			return false;
		}
	}

	/*
	 * 比较两个数是否完全相等
	 */
	function comparNum(a,b){
		if(a===b){
			return true;
		}else{
			return false;
		}
	}
	//exports 暴露接口
	return {
		checkNull:checkNull,
		limitLength:limitLength,
		isCharAndNum:isCharAndNum,
    isZhAndChar:isZhAndChar,
    isTel:isTel,
		isEmail:isEmail,
		comparNum:comparNum
	}
})($);

/**
 * floatTool 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 */
var floatTool = function() {

    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
        return Math.floor(obj) === obj;
    }
    
    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
        var ret = {times: 1, num: 0};
        if (isInteger(floatNum)) {
            ret.num = floatNum;
            return ret;
        }
        var strfi  = floatNum + '';
        var dotPos = strfi.indexOf('.');
        var len    = strfi.substr(dotPos+1).length;
        var times  = Math.pow(10, len);
        var intNum = parseInt(floatNum * times + 0.5, 10);
        ret.times  = times;
        ret.num    = intNum;
        return ret;
    }
    
    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, op) {
        var o1 = toInteger(a);
        var o2 = toInteger(b);
        var n1 = o1.num;
        var n2 = o2.num;
        var t1 = o1.times;
        var t2 = o2.times;
        var max = t1 > t2 ? t1 : t2;
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2;
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2);
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2;
                }
                return result / max;
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2;
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2);
                } else {
                    result = n1 * (t2 / t1) - n2;
                }
                return result / max;
            case 'multiply':
                result = (n1 * n2) / (t1 * t2);
                return result;
            case 'divide':
                return result = function() {
                    var r1 = n1 / n2;
                    var r2 = t2 / t1;
                    return operation(r1, r2, 'multiply');
                }();
        }
    }
    
    // 加减乘除的四个接口
    function add(a, b) {
        return operation(a, b, 'add');
    }
    function subtract(a, b) {
        return operation(a, b, 'subtract');
    }
    function multiply(a, b) {
        return operation(a, b, 'multiply');
    }
    function divide(a, b) {
        return operation(a, b, 'divide');
    }
    
    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}();

/**
 * 一些有用的方法重写
 */

//toFixed(四舍五入) 重写修复
Number.prototype.toFixed=function(num,s){
  var times = Math.pow(10, s);
  var des = num * times + 0.5;
  des = parseInt(des, 10) / times;
  return des + '';
}