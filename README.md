# umi体验

## 初始化项目

推荐使用 [pnpm](https://pnpm.io/) 创建 Umi 脚手架，执行以下命令。

```bash
$ mkdir myapp && cd myapp
$ pnpm create umi
```

这里选「Simple App」，因为我们要从 “0” 开始。



```bash
? Pick Umi App Template › - Use arrow-keys. Return to submit.

❯   Simple App
    Ant Design Pro
    Vue Simple App
```

这里建议选「pnpm」，pnpm 在速度以及处理幽灵依赖方面都更有优势。



```bash
? Pick Npm Client › - Use arrow-keys. Return to submit.

    npm
    cnpm
    tnpm
    yarn
❯   pnpm
```

这里国内的朋友建议选「taobao」，否则选「npm」。选择 npm taobao 源在安装依赖时通常会更快一些。

**可能存在的风险：umi在安装基础依赖时，存在低版本依赖或者依赖要改名的警告，对于已开发的项目，依然需要自己主动更新依赖，否则会存在兼容性问题或安全风险**

![image-20230605194011216](C:\Users\rapon\AppData\Roaming\Typora\typora-user-images\image-20230605194011216.png)

```bash
? Pick Npm Registry › - Use arrow-keys. Return to submit.
    npm
❯   taobao
```

然后工具会自动安装依赖，并执行 umi 的初始化脚本。



在启动项目之前，我们再安装一些本教程会用到的依赖。

```bash
$ pnpm i @umijs/plugins -D
$ pnpm i antd axios @ant-design/pro-layout -S
```

其中 `@umijs/plugins` 是 Umi 的官方插件集，包含了 valtio、react-query、styled-components、locale、access、qiankun 等大量插件，可让用户通过配置的方式一键开启和使用；`antd` 就不用介绍了；`axios` 是请求库；`@ant-design/pro-layout` 是用于生成中后台布局的组件。（这里将运行时依赖和编译时依赖分别保存到 dependencies 和 devDependencies，是目前社区推荐的方式）

**集成了大多数需要使用到的依赖，如果需要使用到会非常方便，如果用不到会导致项目比较臃肿**

完成后，执行以下命令启动项目。

```bash
$ npm run dev
umi dev
info  - Umi v4.0.46
        ╔════════════════════════════════════════════════════╗

        ║ App listening at:                                  ║

        ║  >   Local: http://localhost:8000                  ║

ready - ║  > Network: http://*********:8000                  ║

        ║                                                    ║

        ║ Now you can open browser with the above addresses↑ ║

        ╚════════════════════════════════════════════════════╝
```

跟着提示点击命令行里的 Url，会自动打开浏览器。如果顺利，你会看到如下界面。

![img](https://img.alicdn.com/imgextra/i2/O1CN01hWo9eO1ji9BZ1YHju_!!6000000004581-2-tps-774-928.png)

## 新建路由

我们要写个应用来先显示产品列表。首先第一步是创建路由，路由可以想象成是组成应用的不同页面。Umi 用户通常不需要关心 Umi 背后的实现，但如果你想知道，Umi 的路由是基于 react-router@6.3 实现（注：不是最新的 6.4，6.4 包含的 loader 和 action 功能并不是 Umi 所需要的）。

我们通过命令即可创建路由。

**使用命令一键创建路由，非常方便**

```bash
$ npx umi g page products
Write: src/pages/products.tsx
Write: src/pages/products.less
```

然后修改配置文件 `.umirc.ts` 加上新增的路由声明。



```diff
import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
+    { path: "/products", component: "products" },
  ],
  npmClient: "pnpm",
});
```

脚手架默认使用的是配置式路由，顾名思义，就是路由是自己一行行配出来的，虽然繁琐，但灵活性更高，这种方式需要在配置里加上 routes 字段

然后我们编辑下 `src/layouts/index.tsx` 文件，在全局布局路由里加上到 `/products` 路径的导航。

```diff
<li>
  <Link to="/docs">Docs</Link>
</li>
+ <li>
+   <Link to="/products">Products</Link>
+ </li>
```

打开 http://localhost:8000/products ，如果顺利，你会看到如下页面。

![img](https://img.alicdn.com/imgextra/i2/O1CN01aNdyVG1bEMV7WEmBv_!!6000000003433-2-tps-712-276.png)

## 