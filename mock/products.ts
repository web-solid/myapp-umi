/*
 * @Author: raponly@sina.cn
 * @Date: 2023-06-05 22:40:11
 * @LastEditors: raponly@sina.cn raponly@sina.cn
 * @LastEditTime: 2023-06-05 22:56:43
 * @FilePath: \myapp-umi\src\mock\products.ts
 * @Description: 定义products数据接口
 */
import { defineMock } from 'umi'

type Product = {
  id: string
  name: string
}

let products: Product[] = [
  { id: '1', name: 'Umi' },
  { id: '2', name: 'Ant Design' },
  { id: '3', name: 'Ant Design Pro' },
  { id: '4', name: 'Dva' },
]

export default defineMock({
  'GET /api/products': (_, res) => {
    console.log(products)
    res.send({
      status: 'ok',
      data: products,
    })
  },
  'DELETE /api/products/:id': (req, res) => {
    products = products.filter((item) => item.id !== req.params.id)
    res.send({ status: 'ok' })
  },
})
