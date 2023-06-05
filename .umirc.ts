/*
 * @Author: raponly@sina.cn raponly@sina.cn
 * @Date: 2023-06-05 19:33:35
 * @LastEditors: raponly@sina.cn raponly@sina.cn
 * @LastEditTime: 2023-06-05 22:58:29
 * @FilePath: \myapp-umi\.umirc.ts
 * @Description:
 */
import { defineConfig } from 'umi'

export default defineConfig({
  plugins: ['@umijs/plugins/dist/react-query'],
  reactQuery: {},
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
    { path: '/products', component: 'products' },
  ],
  npmClient: 'pnpm',
})
