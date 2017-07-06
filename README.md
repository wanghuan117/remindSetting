# antd-demo

## Environment

```
node >= 4
```

## Code Style

https://github.com/airbnb/javascript

## Develop

没有热替换, 用于ie8
```
npm run dev
```

有热替换
```
npm run start
```

访问 http://127.0.0.1:8989 

## Build

```
npm run build
```

##dumpdev 打不压缩的包
```
npm run dumpdev
```
##
npm run installCordova   安装cordova
npm run start            启动开发调试
npm run build            输出生产版本到dist
npm run dumpdev          输出dev版本到dist



##如果要提交前使用lint检查,请在package.json里面加上
```
 "pre-commit": [
    "lint"
  ],
```

##裁剪responsive 图片
原图放入assets/images/resp/origin
gulp images


## 需要测试加入各个组件到container

## 在线组件文档 http://197.3.187.1:7000/#/components

##apollo build tool
atool-build , 基础的webpack配置
可以支持修改下面参数
"entry": {
    "index": "./demo/web/index.js"
  },
  "template": "./demo/web/index.html",
  "theme": {
    "primary-color": "#1074c2"
  },
  "client": "./demo/",

dora插件  --  hmr , livereload , webpack

babel插件 --  apollo插件按需加载



##note
1. babel-cli, dora copy node_modules不行,需要uninstall 之后重新安装
开发环境拷贝的容易出问题, 部署环境应该没问题
2. 加入svg inline 支持, TODO：加入svg post css 支持 css backgroud svg 
3. less里面引用webpack 需要使用~来引入, ~对应路径是resolve里面用root指定的绝对路径和moduleDirectories指定的文件夹名字
4. 配置gulp responsive 需要安装sharp  ,参考 http://sharp.readthedocs.io/en/stable/install/
5. 如果需要使用on demand 加载components , 需要使用babel antd插件
6. 组件规则必须满足-> 文件夹名字是组件名的驼峰形式转换成的中杠形式, 例如SecEdit 组件, 文件夹名字必须是sec-edit , 
 同时组件样式必须放到子目录style, 必须有入口文件index.js , 组件也得有入口文件index.jsx
7.若要自动生成模块模板,请在根目录下使用 ./generate --name XXXX 命令。最后生成的XXXX模块会放置在src/containers/XXXX下。若想去除./generate,直接执行npm link即可
8. 要修改theme对应的变量,需要在package.json里面的theme配置里面修改

##功能==>路由==>页面路径
```