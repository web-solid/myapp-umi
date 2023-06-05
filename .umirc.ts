/*
 * @Author: raponly@sina.cn raponly@sina.cn
 * @Date: 2023-06-05 19:33:35
 * @LastEditors: raponly@sina.cn raponly@sina.cn
 * @LastEditTime: 2023-06-05 20:10:51
 * @FilePath: \myapp-umi\.umirc.ts
 * @Description:
 */
import { defineConfig } from 'umi'

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
    { path: '/products', component: 'products' },
  ],
  npmClient: 'pnpm',
})
