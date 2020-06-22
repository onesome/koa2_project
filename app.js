//导入koa2，且导入的为一个class(类)，故用大写Koa表示：
const Koa = require('koa');

//创建一个Koa对象表示web app本身

const app = new Koa();

/*
对于任何请求，app将调用异步函数处理请求：
其中参数ctx是由koa传入的封装了request和response的变量，可以通过ctx访问request和response，参数next是koa传入的将要处理的下一个异步函数。

该异步函数中，我们用await next();处理下一个异步函数，然后设置response的Content-Type和内容。

每收到一个http请求，koa就会调用app.use()注册的async函数，并传入参数ctx和next。

为什么使用await next()?
由于koa把许多async函数组成一个处理链，那个async函数都可以做自己的事情，然后使用await next()来调用下一个async函数，并把那个async函数成为middleware。

这些middleware组合起来可以完成很多功能。app.use()的调用顺序就是middleware排列的顺序。若没有middleware中没有调用await next()则后面的middleware将不再执行。如：检测用户权限的middleware可以决定是否继续处理请求还是直接返回错误。

cxt的简写：
cxt.url相当于cxt.request.url,cxt.type相当于cxt.response.type。

由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数，其中async和await这两个关键字是es7中引入的。
*/
app.use(async (ctx, next) => { //koa middleware
    ctx.response.type = "text/html";
    ctx.response.body = "<h1>hello koa2!</h1>"
    await next();
})
app.use(async (ctx, next) => { 
   
    ctx.response.type = "text/html";
    ctx.response.body="<h1>hello koa2!</h1><h1>hello koa2-a!</h1>"
})
app.use(async (ctx, next) => { 
    await next();
    ctx.response.type = "text/html";
    ctx.response.body="<h1>hello koa2!</h1><h1>hello koa2-a!</h1><h1>hello koa2-b!</h1>"
})

//在端口3000监听：
app.listen(3000);
console.log('app started at port 3000...');

/**
 * 下一个问题，koa包怎么安装，该文件（app.js）怎么正常导入？
 * 方法一：
 * 使用npm命令直接安装koa，在该目录下执行命令 npm install koa
 * npm 会将koa2以及koa2依赖的所有包全部安装到当前目录的node_modules目录下。
 * 
 * 方法二：
 * 在该目录下创建一个package.json，这个文件描述了我们的项目会用到哪些包。完整内容如下：
 * {
 *  "name":"koa2-project",
 *  "version":"1.0.0",
 *  "description":"hello koa2",
 *  "main":"app.js",
 *  "scripts":{
 *      "start":"node app.js"
 *  },
 *  "keywords":{
 *      "koa",
 *      "async"
 *  },
 *  "author":"wh",
 *  "license":"Apache-2.0",
 *  "repository":{
 *      "type":"git",
 *      "url":"https://github.com/onesome/koa2_project.git"
 *  },
 *  "dependencies":{
 *      "koa":"2.0.0"
 *  }
 * }
 * 
 * 其中，dependencies描述了我们工程需要依赖的包以及版本号，其他字段为描述项目信息，可任意填写。
 * 
 * 然后，在该目录下执行npm install 就可以把所需包以及以来包一次性全部装好。
 * 
 * 注：任何时候都可以直接删除整个node_modules目录。因为npm install命令可以完整的重新下载所有以来，并且，这个目录不应该被放入版本控制中。
 * 
 * 工程结构如下：
 * koa2_project
 *  - .vscode/
 *      -launch.json //vscode 配置文件
 *  - app.js //使用koa的js
 *  - package.json //项目描述文件
 *  - node_modules/  //npm 安装的所有
 * 
 * 
 *  */ 
