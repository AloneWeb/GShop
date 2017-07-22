jQuery(function($){

  function shopcart(){

    //更新总价
    function viewPriceAll(){
      var sum=0;
      var priceAll=$('#priceAll');
      $('.checkbox-list:checked').each(function(index, el) {
        var unitPri=parseInt($(this).parent().nextAll('.price-total').children('span').text());
        sum = sum + unitPri;
      });
      priceAll.text(sum);
      sum=null;
      priceAll=null;
      unitPri=null;
    }
    viewPriceAll();
    //全选操作
    function checkbox(){
      var checkboxAllEles=$('.checkbox-all');
      var checkboxListEles=$('.checkbox-list');
      checkboxAllEles.each(function(index, el) {
        $(this).on('click', function(event) {
          if($(this).prop('checked')){
            checkboxAllEles.prop('checked', true);
            checkboxListEles.prop('checked',true);
            viewPriceAll();
          }else{
            checkboxAllEles.prop('checked', false);
            checkboxListEles.prop('checked',false);
            viewPriceAll();
          }
        });
      });
      var flag=null;
      checkboxListEles.each(function(index, el) {
        $(this).on('click', function(event) {
          viewPriceAll();
          flag=true;
          checkboxListEles.each(function(index, el) {
            if($(this).prop('checked')){
              flag=(true&&flag);
            }else{
              flag=false;
            }
          });
          checkboxAllEles.prop('checked',flag);
        });
      });
      //结算判断
      $('#settle-account').click(function(event) {
        if(parseInt($('#priceAll').text()) === 0){
          event.preventDefault();
          tool.tips("尚未选择商品！",1200);
        }
      });
    }
    //input中商品数量改变
    function inputChange(){
      var numLimit = 0;
      var inputVal = 0;
      var unitPriceEle = null;
      var totalPriceEle = null;
      //均用事件委托来处理事件
      //当用户输入来改变数量时，对输入值的限制（只允许输入整数并且只能是限制数量之内）
      $('.select-number').on('input propertychange', 'input', function(e) {

          numLimit = parseInt($(this).attr('data-limit'));
          $(this).val($(this).val().replace(/[^\d]/g,''));
          inputVal = $(this).val();
          unitPriceEle=$(this).parent().prev('.cart-body-cell').children('span');//单价
          totalPriceEle=$(this).parent().next('.cart-body-cell').children('span');//总价
          if(numLimit < inputVal){
            $(this).val(numLimit);
            totalPriceEle.text(numLimit*parseInt(unitPriceEle.text()));// 进行合计
            viewPriceAll();
            tool.tips("该商品已达最大限额!",1200);
          }else if(inputVal < 1){
            $(this).val(1);
            totalPriceEle.text(parseInt(unitPriceEle.text()));// 进行合计
            viewPriceAll();
            tool.tips("商品数量不能小于1!",1200);
          }else{
            totalPriceEle.text(inputVal*parseInt(unitPriceEle.text()));// 进行合计
            viewPriceAll();
          }
      });

      //单击加减时将数量限制在范围之内
      $('.select-number').on('click','button', function(event) {
        var NumVal = 0;
        unitPriceEle=$(this).parent().prev('.cart-body-cell').children('span');
        totalPriceEle=$(this).parent().next('.cart-body-cell').children('span');

        if($(this).hasClass('num-minus')){
          NumVal = parseInt($(this).next('input').val());
          if(NumVal>1){
            NumVal=NumVal-1;
            $(this).next('input').val(NumVal);
            totalPriceEle.text(parseInt($(this).next('input').val())*parseInt(unitPriceEle.text()));
            viewPriceAll();
          }else{
            tool.tips("商品数量不能小于1!",1200);
          }
          
        }else{
          numLimit = parseInt($(this).prev('input').attr('data-limit'));
          NumVal = parseInt($(this).prev('input').val());
          if(NumVal < numLimit){
            NumVal=NumVal+1;
            $(this).prev('input').val(NumVal);
            totalPriceEle.text(parseInt($(this).prev('input').val())*parseInt(unitPriceEle.text()));
            viewPriceAll();
          }else{
            tool.tips("该商品已达最大限额!",1200);
          }
        }
        NumVal = null;//垃圾回收
      });
    }

    checkbox();
    inputChange();
  }
  shopcart();
});