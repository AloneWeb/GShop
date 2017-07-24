jQuery(function($) {
  // 商品排序
  function goodSort() {

    var arrEle = [];

    //得到每个物品元素数组
    $('.list-item').each(function(index, el) {
      arrEle[index] = $(this);
    });
    //记录原数组数据(推荐排序的顺序) 使用concat()进行深拷贝
    var arrEleOld = arrEle.concat();

    //元素对象根据里面的价格进行排序的排序函数
    // 升序
    function arrEleSortAsc(a, b) {
      var
        priA = parseInt(a.find('.price-num').text()),
        priB = parseInt(b.find('.price-num').text());
      return priA - priB;
    }
    //降序
    function arrEleSortDes(a, b) {
      var
        priA = parseInt(a.find('.price-num').text()),
        priB = parseInt(b.find('.price-num').text());
      return priB - priA;
    }
    //重新渲染列表
    function renderItem(Ele) {
      $('#goods-item').html('');
      for (var i = 0; i < Ele.length; i++) {
        $('#goods-item').append(Ele[i][0]);
      }
    }

    $('.goods-sort').on('click', '.sort-btn', function(event) {
      $('.sort-btn').removeClass('sort-active');
      if (!$(this).hasClass('sort-active')) {
        $(this).addClass('sort-active')
      }

      //价格排序
      if ($(this).attr('id') === 'sort-pri') {
        if ($('.icon-up-down').attr('data-sort') == 'up') { //切换到降序
          $('.icon-up-down').attr('data-sort', 'down');
          arrEle.sort(arrEleSortAsc);
          renderItem(arrEle);
        } else { //切换到升序
          $('.icon-up-down').attr('data-sort', 'up');
          arrEle.sort(arrEleSortDes);
          renderItem(arrEle);
        }
      } else {
        $('.icon-up-down').attr('data-sort', 'down');
        renderItem(arrEleOld);
      }
    });
  }
  goodSort();
});