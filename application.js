angular.module('todo', [])
    .controller('page', ['$scope',

function ($s) {
    var uiCurrent = 1;
    $s.ui = {
        current: function (newUICurrent) {
            if (typeof newUICurrent != 'undefined') {
                uiCurrent = newUICurrent;
            }
            return uiCurrent;
        },
        isCurrent: function (c) {
            return (uiCurrent === c);
        }
    };
}])

    .controller('tabController', ['$scope','todoApi',

  function ($s,todoApi) {
    $s.cur = 0;
    $s.newData = todoApi.getTab( $s.cur);
    $s.Newtab = "NewTab";
    $s.NewItem = "new item";
    $s.Tab = todoApi.tab()[0];
    $s.tranfer1 = todoApi.tab()[0];


      $s.datas = {
        setDataTab:function(i){
          $s.newData = todoApi.getTab(i);
          $s.cur = i;
        },
        dataTab: function(){
          //newData = todoApi.getTab(i);
          return $s.newData;
      },
        complete: function(obj,i){
          if (obj.complete == true) {
            obj.complete = false;
          }else {
            obj.complete = true;
          }
          todoApi.update(i,obj);
      },Tranfer: function(i,obj){
        obj.data.list = $s.tranfer1.list;
        todoApi.update(i,obj.data);
        console.log("test");
        $s.tranfer1 = '';
      },getTab: function(){
          return todoApi.tab();
      },submitTab: function(){
        if ($s.Newtab) {
          var AddTab = {
            list: $s.Newtab
          }
          todoApi.createTab(AddTab);

          $s.Newtab = '';
        }
      },submitItem: function(){
        if ($s.NewItem && $s.Tab) {
          var newObj = {
              list: $s.Tab.list,
              name: $s.NewItem,
              complete: false
          };
          todoApi.create(newObj);
          // $s.newData = todoApi.getTab($s.cur);
          $s.NewItem = '';
          $s.Tab = '';
        }

      }
      };
}])
    .factory('todoApi', [function () {
    var tab = [{list : 'shopping'},{list : 'business'}];
    var data = [
        {
            list: 'shopping',
            name: 'buy eggs',
            complete: false
        },
        {
            list: 'shopping',
            name: 'buy milk',
            complete: true
        },
        {
            list: 'business',
            name: 'collect underpants',
            complete: false
        },
        {
            list: 'business',
            name: '...',
            complete: false
        },
        {
            list: 'business',
            name: 'profit',
            complete: false
        }
    ];
    return {
        createTab : function(obj){

          tab.push(obj);
        },
        tab : function(){
          return tab;
        },
        getTab: function(tabIndex){
            var newData = [];
            for (var i = 0; i < data.length; i++) {

              if (data[i].list === tab[tabIndex].list) {
                newData.push({data: data[i],index: i});

              }
            }

            return newData;
        },
        query: function () {
            return data;
        },
        get: function (id) {
            return data[id];
        },
        create: function(obj) {
            data.push(obj);
            console.log(data[data.length-1].list);
            return obj;
        },
        update: function(id, obj) {
            data[id] = obj;
            return obj;
        },
        destroy: function(id) {
            data.splice(id, 1);
            return data;
        }
    };
}]);
