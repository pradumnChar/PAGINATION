import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/product?limit=100");
    const data = await res.json();
    setProduct(data.products);
  };
  console.log(product);
  useEffect(() => {
    fetchProducts();
  }, []);
  const pageHandle = (page) => {
    if (page >= 1 && page <= product.length / 10) setPage(page);
  };

  return (
    <div>
      {product.length > 0 && (
        <div className="product">
          {product.slice(page * 10 - 10, page * 10).map((item) => {
            return (
              <span className="product-single" key={item}>
                <img src={item.thumbnail} alt="picture" />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {product.length > 0 && (
        <div className="page">
          <span
            onClick={() => {
              pageHandle(page - 1);
            }}
          >
            ⬅️
          </span>
          {[...Array(product.length / 10)].map((_, i) => {
            return (
              <span
                onClick={() => {
                  pageHandle(i + 1);
                }}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => {
              pageHandle(page + 1);
            }}
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
}
