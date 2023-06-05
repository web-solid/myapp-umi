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



**使用命令一键创建路由，并且配置路由可自由化配置，非常方便**

## 实现 Product UI 组件

随着应用的发展，你会需要在多个页面分享 UI 元素 (或在一个页面使用多次)，在 Umi 里你可以把这部分抽成 component 。我们来编写一个 ProductList component，这样就能在不同的地方显示产品列表了。

新建 `src/components/ProductList.tsx` 文件，内容如下。

```tsx
import { Button, Popconfirm, Table } from 'antd';
import React from 'react';

const ProductList: React.FC<{ products: { name: string }[]; onDelete: (id: string) => void }> = ({
  onDelete,
  products,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text, record) {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table rowKey="id" dataSource={products} columns={columns} />;
};

export default ProductList;
```

**render函数编译器报错，需要指定text和record的类型，指定any即可**

## 准备 Mock 数据

假设我们已经和后端约定好了 API 接口，那现在就可以使用 Mock 数据来在本地模拟出 API 应该要返回的数据，这样一来前后端开发就可以同时进行，不会因为后端 API 还在开发而导致前端的工作被阻塞。Umi 提供了开箱即用的 [Mock 功能](https://umijs.org/docs/guides/mock)，能够用方便简单的方式来完成 Mock 数据的设置。

创建 `mock` 目录，并在此目录下新增 `products.ts` 文件，内容如下。



```ts
import { Button, Popconfirm, Table } from 'antd';
import React from 'react';

const ProductList: React.FC<{ products: { name: string }[]; onDelete: (id: string) => void }> = ({
  onDelete,
  products,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text, record) {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table rowKey="id" dataSource={products} columns={columns} />;
};

export default ProductList;
```

然后访问 http://localhost:8000/api/products ，就能看到接口响应结果了。

**~~直接在浏览器访问并不能看到接口响应结果~~**

**mock文件目录应该在根目录下，而不是在src目录下，在根目录下创建好后可成功访问**

## 完成 products 页

完成了 UI 组件和 Mock 数据，是时候把他们结合到一起了。这里需要用到请求方案，我们在这里的选择是 react-query（如果你想说 @tanstack/react-query，没错，他们是同一个库，@tanstack/react-query 是 react-query 改名后的包）。所以在开始之前，需要修改配置启用一键启用 [Umi 的 react-query 插件](https://umijs.org/docs/max/react-query)。

先编辑 `.umirc.ts`，由于有探测到不能热更的配置项变更，配置文件保存后 umi dev 的 server 会自动重启。

**按照文档添加好之后并没有自动重启，在重启过程中报错并中断了**

****

![image-20230605231414336](C:\Users\rapon\AppData\Roaming\Typora\typora-user-images\image-20230605231414336.png)

```diff
import { defineConfig } from "umi";

export default defineConfig({
+  plugins: ['@umijs/plugins/dist/react-query'],
+  reactQuery: {},
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/products", component: "products" },
  ],
  npmClient: 'pnpm',
});
```

再编辑 `src/pages/products.tsx`，内容如下。

```tsx
import ProductList from '@/components/ProductList';
import axios from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'umi';
import styles from './products.less';

export default function Page() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery(['products'], {
    queryFn() {
      return axios.get('/api/products').then((res) => res.data);
    },
  });
  const productsDeleteMutation = useMutation({
    mutationFn(id: string) {
      return axios.delete(`/api/products/${id}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
  if (productsQuery.isLoading) return null;
  return (
    <div>
      <h1 className={styles.title}>Page products</h1>
      <ProductList
        products={productsQuery.data.data}
        onDelete={(id) => {
          productsDeleteMutation.mutate(id);
        }}
      />
    </div>
  );
}
```

这里，我们通过 `useQuery()` 拉取来自 `/api/products` 的数据，然后在 `onDelete` 事件里通过 `useMutation()` 提交 DELETE 请求到 `/api/products/${id}` 进行删除操作。关于 react-query 的详细使用，可参考 [Umi 插件之 React Query](https://umijs.org/docs/max/react-query) 和 [React Query 官网](https://tanstack.com/query/)。

保存后，你应该会看到如下界面。

![img](https://img.alicdn.com/imgextra/i1/O1CN014Sq3Uq1IceoHSfGrR_!!6000000000914-1-tps-550-411.gif)

**照着代码写之后并没有出现该界面，react底层报错了，明天尝试解决该问题**

![image-20230605235416054](C:\Users\rapon\AppData\Roaming\Typora\typora-user-images\image-20230605235416054.png)