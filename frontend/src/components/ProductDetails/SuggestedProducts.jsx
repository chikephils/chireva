import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuggestedProducts = ({ product }) => {
  const [products, setProducts] = useState(null);
  const allProducts = useSelector((state) => state?.products?.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (allProducts && product) {
      const d = allProducts.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setProducts(d);
    }
  }, [allProducts, product]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="mt-4 bg-gradient-to-r from-gray-300 to-blue-300 ...">
      {product ? (
        <div className={` ${styles.section} pt-3`}>
          <h2
            className={`${styles.heading} !text-[22px] md:text-[25px] font-[500] border-b mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-[20px] md:grid-cols-3 md:gap-[30px] lg:grid-cols-3 lg:gap-[40px] xl:grid-cols-4 xl:gap-[50px] 600px:grid-cols-3 600px:gap-[10px] 800px:grid-cols-4 800px:gap-[20px] pb-10 justify-items-center">
            {products &&
              products.map((product) => (
                <ProductCard
                  product={product}
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProducts;
