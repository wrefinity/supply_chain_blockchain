import React from 'react';


interface ProductLayoutProps {
  children: React.ReactNode;
//   product: ProductIF;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children}) => {
  return (
    <div>
      <h3 className='text-1xl font-bold'>Products</h3>
      {children}
    </div>
  )
}

export default ProductLayout