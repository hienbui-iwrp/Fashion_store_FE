import React, { useEffect, useState } from 'react';
import { Avatar, Empty, List } from 'antd';
import { ProductDetailDataProps, formatRouteImage } from '@/utils';
import Link from 'next/link';

export interface IProductsSearchProps {
  productsSearch: ProductDetailDataProps[]
}

export default function ProductsSearch(props: IProductsSearchProps) {
  return (
    <div className="absolute w-3/4 bg-white">
      {
        props.productsSearch.length ?
          <List
            itemLayout="horizontal"
            dataSource={props.productsSearch}
            renderItem={(item, index) => (
              <List.Item>
                <Link href={`/products/${item.goodsId}`} className="w-full" >
                  <List.Item.Meta
                    avatar={<Avatar src={(item.images[0])} />}
                    title={<p>{item.name}</p>}
                  />
                </Link>
              </List.Item>
            )}
          />
          : <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='Không có sản phẩm nào được tìm thấy'
          />
      }

    </div>
  );
}
