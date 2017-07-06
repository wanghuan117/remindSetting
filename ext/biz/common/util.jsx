
var util = {
  //***************************************对象相关***************************************
  /*通过children给tab标签的数组添加component属性*/
  /*@data:数组常量
   * @children:子页面*/
  tabsAddComponent:(data,children)=> {
    data.map((item) => {
      if (children !== null && item.key.substr(1) == children.type.name.substr(1)) {
        item.component = children;
      } else {
        item.component = null;
      }
    });
  },
  /*根据数组中指定属性的值，获取所在的对象*/
  /*@array:数组，多个对象 如[{"a":"123","b":"234"},{"a":"111","b":"222"}]
   @param:指定的属性 如:a
   @value:指定的值 如:123
   @return:如果没有任何有一个对象的param的值为key，则返回null*/
  getObjectByParamAndValue:(array,param,value)=>{
    let keyInfo=null;
    for(var i =0;i<array.length;i++){
      if(array[i][param] && array[i][param] == value){
        keyInfo=array[i];
        break;
      }
    }
    return keyInfo;
  },
  //合并对象source有的替换掉target里的，target没有的，source赋值给target。
  extend:(target,...sources)=>{
    if(!target && typeof target !="object" ){
      return target;
    }
    for(var i=0;i<sources.length;i++){
      let source=sources[i];
      if(source && typeof source =="object"){
        for(var p in source){
          if(source.hasOwnProperty(p)){
            target[p]=source[p];
          }
        }
      }
    }
    return target;
  },
  /*组装常见请求参数。将state中的变量，1.去掉多余的，2.将数组转成字符串3.将日期转成固定格式*/
  /* @obj:原对象
   *   replace:{del:待删除或自己个性化处理的集合，
   *         arr:待转换属性的集合，
   *         date:待转换日期的集合,每个对象为moment
   *         ...}
   *   rule:{
   *         separator：数组转字符串的分隔符;
   *         dateFormat:日期转字符串的格式
   *         ...}
   * */
  fitParams(obj,replace,rule){
    let newObj=null;
    if(obj &&  typeof obj == "object") {
      newObj=Object.assign({},obj);
      //删除属性
      if (replace.del && replace.del instanceof Array) {
        replace.del.map((item)=> {
          delete newObj[item]
        })
      }//将数组转为字符串
      if (replace.arr && replace.arr instanceof Array) {
        if (!rule.separator) {
          alert("待转化的数组，没有传入分隔符规则");
          return;
        }
        replace.arr.map((item)=> {
          newObj[item] = obj[item].join(rule.separator);
        })
      }//将日期的moment对象转为字符串
      if (replace.date && replace.date instanceof Array) {
        if (!rule.dateFormat) {
          alert("待转化的日期，没有传入format规则");
          return;
        }
        replace.date.map((item)=> {
          if(obj[item]._d){//Moment对象
            newObj[item] = obj[item].format(rule.dateFormat);
          }else{
            newObj[item]="";
          }
        })
      }
    }
    return newObj;
  },
  //*****************************************数组相关****************************************
  /*检查值是否在数组中*/
  /* @param:arr:数组
   * @param:key:要查找的值
   * @return :-1 不存在，其它：该值所在的下标*/
  array_checkValue:(arr,key)=> {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == key)return i;
    }
    return -1;
  },
  /*根据传入的值，删除该值*/
  /* @param:oldArray:原数组
   * @param:key:要切换的值
   * @return :返回处理后的数组，如果有：删除，如果没有，数组不变*/
  array_removeByValue:(oldArray,key)=>{
    let arr=Object.assign([],oldArray);
    let index=this.array_checkValue(arr,key);
    if(index !=-1){
      arr.splice(index,1)
    }
    return arr;
  },
  /*切换数组中的值：如果在，则删除，如果不在，则添加*/
  /* @param:oldArray:原数组
   * @param:key:要切换的值
   * @return :-1 不存在，其它：该值所在的下标*/
  array_toggleValue:(oldArray,key)=>{
    let arr=Object.assign([],oldArray);
    let index=util.array_checkValue(arr,key);
    index != -1?arr.splice(index,1):arr.push(key);
    return arr;
  },
  //********************************************提示框****************************************
  alert:(text,callBack)=>{
    if(window.mockDebug){
      alert(text);
    }else{

      window.CUBE.showAlert(text);
    }
  },
  confirm:(text,sureCallBack,cancelCallBack)=>{

  },
  //****************************************字符串相关*****************************************
  //获取字母、数字、标点符号的，宽度减半
  getRelativeStrLength:(str)=>{
  let numAndLetter=str.match(/[0-9a-zA-Z#$%_,-\/\\\.]/g);
  return str.length-(numAndLetter ? (numAndLetter.length/3):0);
  },
  //********************************************缓存相关***************************************
  //存入缓存
  storageSet:(storage,componentName,flag,data)=>{
    let item=componentName+"_"+flag;
    window[storage].setItem(item,JSON.stringify({itemData:data}));
  },//获取
  storageGet:(storage,componentName,flag)=>{
    let res=window[storage].getItem(componentName+"_"+flag);
    return res?JSON.parse(res).itemData:null;
  },//删除
  storageRemove:(storage,componentName,flag)=>{
    window[storage].removeItem(componentName+"_"+flag);
  },
  // 设置临时缓存（缓存名字、值）
  ssSet:(componentName,flag,data)=>{
    util.storageSet("sessionStorage",componentName,flag,data);
  },
  ssGet:(componentName,flag)=>{
    return util.storageGet("sessionStorage",componentName,flag);
  },
  ssRemove:(componentName,flag)=>{
    util.storageRemove("sessionStorage",componentName,flag);
  },
  //设置永久缓存
  lsSet:(componentName,flag,data)=>{
    util.storageSet("localStorage",componentName,flag,data);
  },
  lsGet:(componentName,flag)=>{
    return util.storageGet("localStorage",componentName,flag);
  },
  lsRemove:(componentName,flag)=>{
    util.storageRemove("sessionStorage",componentName,flag);
  },
  //给Tloader组件的data属性中数组添加key值
  tableDataAddKey:(res)=>{
    res.map((item,index)=>{
      item.key=index;
    });
    return res;
  },

  // 设置保存数据到本地 sessionStorage
  setSessionStorage: (name, state, data)=> {
    let dataObj = {
      state: state,
      data:data
    }
    // 存到本地
    window.sessionStorage.setItem(name, JSON.stringify(dataObj));
  },
  // 清除本地缓存
  removeSession: (type)=>{
    for(var key in sessionStorage){
      // 判断这个属性是否在这个对象中
      if(sessionStorage.hasOwnProperty(key)){
        if(key.indexOf(type)!=-1){
          // obj.setSessionStorage(key,null,null);
          window.sessionStorage.removeItem(key)
        }
      }
    }
  },
  //匹配字符串
  index: (value, arr)=> {
    let index = null;
    arr.map((val, i)=>{
      if (value == val) {
        index = i;
      }
    });
    return index;
  },
  //普通左侧返回按钮：清空传入各个页面集合的state缓存，
  // 根据入口不同，跳转不同页面
  commonLeftTap:(router,...componentNames)=>{
    componentNames.map((item)=>{
      console.log(componentNames)
      console.log(item)
      util.ssRemove(item,"state");//返回，清空缓存
    });
    let homeEnter=util.ssGet("global","homeEnter");
    if(homeEnter =="shortcut"){//快捷入口，返回搜索界面
      router.push('/analysisTool');
    }else if(homeEnter=="search" || homeEnter == "hot"){//其它入口:返回全量工具界面
      router.push("/particulars");
    }else{//外部链接，直接进入

    }
  },
  //日期，格式化，data:为js的Date对象，fmt，为格式化字符串,如"yyyy-MM-dd"
  dateFormat:(date,fmt)=>{
      var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
      }
      for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
      }
      return fmt;
  },
  // data: 数组数据集合, xName: 日期字段, yName:['avg_price_alu', 'factory_avg_price'], 要获取的对象的属性址的对应的属性
  // 返回值是一个对象obj， obj.xArr 是x轴去重后的日期，以数组形式返回  obj.yArrs 是y轴所有的数据集合，多数组形式
  get_array: (data, xName, yName)=> {
    let obj = {};
    let xArr=[];//所有日期的集合
    data.map((item,index)=>{    // 这里会把相同的日期去重
      if(xArr.indexOf(item[xName])==-1){
        xArr.push(item[xName]);
      }
    })
    xArr.sort((a,b)=>{return a.replace(/-/g,"")<b.replace(/-/g,"")?-1:1})  // 正则匹配进行排序
    let yArrs={};//每一个参数key为一个类型，参数值为对应的数组
    yName.map((type)=> {
      yArrs[type]=[];
    })
    data.map((obj)=>{
      yName.map((type)=> {
        yArrs[type].push(obj[type]);
      })
    })
    obj.xArr = xArr;      // 时间集合
    obj.yArrs = yArrs;    // 数据集合
    return obj;
  },
  // data: 数组数据集合, year:日期年字段, month:日期月字段, countryName:国家名 countryType: 国家名字段,
  // typeName: index_type 类型字段, yName: 要获取的对象的属性值对应的属性,
  //  types:['over','new','hander'],要获取数据的行业类型

  // 返回值是一个对象obj， obj.xArr 是x轴去重后的日期，以数组形式返回  obj.yArrs 是y轴所有的数据集合，多数组形式

  // 造船解析数据方法
  getArray_contry: (data,year,month,countryName,countryType,typeName,yName,types)=>{
    let obj = {};
    let xArr=[];//所有日期的集合
    data.map((item,index)=>{    // 这里会把相同的日期去重
      if(xArr.indexOf(item[year]+'-'+item[month])==-1){
        xArr.push(item[year]+'-'+item[month]);
      }
    })
    xArr.sort((a,b)=>{return a.replace(/-/g,"")<b.replace(/-/g,"")?-1:1})  // 正则匹配进行升序排序
    let yArrs={};                 //每一个参数key为一个类型，参数值为对应的数组
    types.map((type)=>{
      yArrs[type]=[];
      for(var i=0;i<xArr.length;i++){
        yArrs[type].push("");
      }
    });
    data.map((obj)=>{
      if (obj[countryType]==countryName) {
        //按指定位置替换y轴的轴，如果遍历一遍所有xArr还是没找到，则还是原来的空值；见缝插针
        if(types.join(",").indexOf(obj[typeName])!=-1){
          (yArrs[obj[typeName]])[util.array_checkValue(xArr,obj[year]+'-'+obj[month])]=obj[yName];
        }
      }
    })
    obj.xArr = xArr;      // 时间集合
    obj.yArrs = yArrs;    // 数据集合
    return obj;
  },
  // data: 数组数据集合, xName:日期字段, typeName: 行业类型字段,
  // yName: 要获取的对象的属性值对应的属性,types:['01','02','03'],要获取数据的行业类型
  // 返回值是一个对象obj， obj.xArr 是x轴去重后的日期，以数组形式返回  obj.yArrs 是y轴所有的数据集合，多数组形式
  getArray: (data,xName,typeName,yName,types)=>{
    let obj = {};
    let xArr=[];//所有日期的集合
    data.map((item,index)=>{    // 这里会把相同的日期去重
      if(xArr.indexOf(item[xName])==-1){
        xArr.push(item[xName]);
      }
    })
    xArr.sort((a,b)=>{return a.replace(/-/g,"")<b.replace(/-/g,"")?-1:1})  // 正则匹配进行排序
    let yArrs={};//每一个参数key为一个类型，参数值为对应的数组
    types.map((type)=>{
      yArrs[type]=[];
      for(var i=0;i<xArr.length;i++){
        yArrs[type].push("");
      }
    });
    data.map((obj)=>{
      //按指定位置替换y轴的轴，如果遍历一遍所有xArr还是没找到，则还是原来的空值；见缝插针
      if(types.join(",").indexOf(obj[typeName])!=-1){
        (yArrs[obj[typeName]])[util.array_checkValue(xArr,obj[xName])]=obj[yName];
      }
    })
    obj.xArr = xArr;      // 时间集合
    obj.yArrs = yArrs;    // 数据集合
    return obj;
  }
};


export {util};
