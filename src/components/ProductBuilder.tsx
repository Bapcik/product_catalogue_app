import { FC, useState } from "react";
import { Products } from "../types/type";
import { ProductAdd } from "./ProductAdd";

export const ProductBuilder: FC = () => {
  const [dataProduct, setDataProduct] = useState<Products[]>([
    { id: 1, title: "burger", price: 100, stock: 1 },
    { id: 2, title: "milk", price: 50, stock: 2 },
    { id: 3, title: "chocolat", price: 10, stock: 3 },
  ]);

  const reductionStock = (id: number) => {
    const reduce = dataProduct.map((element) => {
      if (element.id === id && element.stock > 0) {
        const newStock = element.stock - 1;
        return {
          ...element,
          stock: newStock,
        };
      }
      return element;
    });
    setDataProduct(reduce);
  };
  const sortProduct = (value: keyof Products) => {
    const listProducts = [...dataProduct].sort((a, b) => {
      if (a[value] < b[value]) return -1;
      if (a[value] > b[value]) return 1;
      return 0;
    });
    setDataProduct(listProducts);
  };

  return (
    <>
      <div>
        {dataProduct.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => sortProduct("title")}>Title</th>
                <th onClick={() => sortProduct("price")}>Price</th>
                <th onClick={() => sortProduct("stock")}>Stock</th>
                <th>Reduce</th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((element) => (
                <tr key={element.id}>
                  <td>{element.title}</td>
                  <td>{element.price}</td>

                  <td>
                    {element.stock === 0 ? (
                      <p>Not available</p>
                    ) : (
                      <>{element.stock} </>
                    )}
                  </td>
                  <td>
                    {" "}
                    <button
                      className={
                        element.stock === 0 ? "buttonNull" : "buttonUser"
                      }
                      onClick={() => reductionStock(element.id)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <ProductAdd dataProduct={dataProduct} setDataProduct={setDataProduct} />
      </div>
    </>
  );
};
