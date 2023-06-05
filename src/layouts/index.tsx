/*
 * @Author: raponly@sina.cn raponly@sina.cn
 * @Date: 2023-06-05 19:33:35
 * @LastEditors: raponly@sina.cn raponly@sina.cn
 * @LastEditTime: 2023-06-05 21:48:32
 * @FilePath: \myapp-umi\src\layouts\index.tsx
 * @Description:
 */
import { Link, Outlet } from 'umi'
import styles from './index.less'

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
