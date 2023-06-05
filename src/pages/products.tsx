/*
 * @Author: raponly@sina.cn
 * @Date: 2023-06-05 20:02:41
 * @LastEditors: raponly@sina.cn raponly@sina.cn
 * @LastEditTime: 2023-06-05 23:48:29
 * @FilePath: \myapp-umi\src\pages\products.tsx
 * @Description:产品页面组件
 */
import ProductList from '@/components/ProductList'
import axios from 'axios'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'umi'
import styles from './products.less'

export default function Page() {
  const queryClient = useQueryClient()
  const productsQuery = useQuery(['products'], {
    queryFn() {
      return axios.get('/api/products').then((res) => res.data)
    },
  })
  const productsDeleteMutation = useMutation({
    mutationFn(id: string) {
      return axios.delete(`/api/products/${id}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
  if (productsQuery.isLoading) return null
  return (
    <div>
      <h1 className="style.title">Page products</h1>
      <ProductList
        products={productsQuery.data.data}
        onDelete={(id) => {
          productsDeleteMutation.mutate(id)
        }}
      />
    </div>
  )
}
