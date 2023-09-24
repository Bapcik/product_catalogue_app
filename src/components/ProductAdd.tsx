import { FC, useState } from "react";
import { Products } from "../types/type";

interface Props {
  dataProduct: Products[];
  setDataProduct: React.Dispatch<React.SetStateAction<Products[]>>;
}

export const ProductAdd: FC<Props> = ({ dataProduct, setDataProduct }) => {
  const [dataTitle, setDataTitle] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataStock, setDataStock] = useState("");

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const existingProduct = dataProduct.find(
      (element) => element.title.toLowerCase() === dataTitle.toLowerCase()
    );

    if (existingProduct) {
      const updatedProducts = dataProduct.map((product) => {
        if (product.id === existingProduct.id) {
          const updatedStock = parseInt(dataStock);
          const updatedPrice = parseFloat(dataPrice);
          const newStock = product.stock + updatedStock;
          return {
            ...product,
            stock: newStock,
            price: updatedPrice,
          };
        }
        return product;
      });
      setDataProduct(updatedProducts);
    } else {
      const id = dataProduct.length + 1;
      const price = parseFloat(dataPrice);
      const stock = parseFloat(dataStock);
      const newProduct: Products = {
        id,
        title: dataTitle,
        price,
        stock,
      };
      setDataProduct([...dataProduct, newProduct]);
    }

    setDataTitle("");
    setDataPrice("");
    setDataStock("");
  };

  return (
    <div>
      <h4>Добавить новый продукт</h4>
      <input
        className="typeInput"
        type="string"
        value={dataTitle}
        placeholder="Name"
        onChange={(e) => setDataTitle(e.target.value)}
      />
      <input
        className="typeInput"
        type="number"
        value={dataPrice}
        placeholder="Price"
        onChange={(e) => setDataPrice(e.target.value)}
      />
      <input
        className="typeInput"
        type="number"
        value={dataStock}
        placeholder="Stock"
        onChange={(e) => setDataStock(e.target.value)}
      />
      <button className="buttonAdd buttonRainbow" onClick={addProduct}>
        Добавить
      </button>
    </div>
  );
};
