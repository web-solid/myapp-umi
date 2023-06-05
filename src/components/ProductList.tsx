/*
 * @Author: raponly@sina.cn
 * @Date: 2023-06-05 22:16:04
 * @LastEditors: raponly@sina.cn raponly@sina.cn
 * @LastEditTime: 2023-06-05 22:39:26
 * @FilePath: \myapp-umi\src\components\ProductList.tsx
 * @Description: 产品列表组件
 */
import { Button, Popconfirm, Table } from 'antd'
import React from 'react'

const ProductList: React.FC<{
  products: { name: string }[]
  onDelete: (id: string) => void
}> = ({ onDelete, products }) => {
  const colums = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text: any, record: any) {
        return (
          <Popconfirm
            title="Delete?"
            onConfirm={() => {
              onDelete(record.id)
            }}>
            <Button>Delete</Button>
          </Popconfirm>
        )
      },
    },
  ]
  return <Table rowKey="id" dataSource={products} columns={colums} />
}

export default ProductList
