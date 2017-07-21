jQuery(function($){
  //总价计算
  function calTotal(){
    var unitPri;
    var arrTotal=[];
    $('.order-list-total').each(function(index, el) {
     arrTotal[index] = 0; 
     unitPri = $(this).parents('.g-table-header')
     .nextAll('.g-table-list')
     .find('.order-list-pri');
     unitPri.each(function(i, e) {
       arrTotal[index] = arrTotal[index]+parseInt($(this).text());
     });
     $(this).text(arrTotal[index]);
    });  
  }
  calTotal();
});