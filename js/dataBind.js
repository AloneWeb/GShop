function DataBinder (objectId) {
    // 使用jQuery空对象作为监听对象
    var pubSub = jQuery({});
    
    var dataAttr = 'bind-' + objectId;
    var message = objectId + ':change';
    // 监听dom中所有元素的 data-binding 属性变化。并由pubSub来处理。
    $(document).on('input change', '[data-' + dataAttr + ']', function (event) {
        var $ele = $(this);
        console.log('$ele', $ele);
        pubSub.trigger(message, [$ele.data(dataAttr), $ele.val()]);
    });
    // pubSub把数据变化推送给所有与之绑定的页面元素
    pubSub.on(message, function (event, proName, newValue) {
        $('[data-' + dataAttr + '=' + proName + ']').each(function () {
            var $ele = $(this);
            if($ele.is('input, textarea, select')) {
                $ele.val(newValue);
            } else {
                $ele.html(newValue);
            }
        });
    });
    return pubSub;
}

// function GoodList(glid){
//     var binder = new DataBinder(glid);
//     var goodlist = {
//         attributes: {},
//         set: function (attrName, val) {
//           this.attributes[attrName] = val;
//           binder.trigger(glid + ':change', [attrName, val, this]);
//         },
//         get: function (attrName) {
//           return this.attributes[attrName];
//         },
//         _binder: binder
//     }
//     return goodlist;
// }

function createBind(objName,id){
  var binder = new DataBinder(id);
  var objName = {
    attributes:{},
    set: function (attrName, val) {
      this.attributes[attrName] = val;
      binder.trigger(glid + ':change', [attrName, val, this]);
    },
    get: function (attrName) {
      return this.attributes[attrName];
    },
    _binder: binder
  }
  return objName;
}