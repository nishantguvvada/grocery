import { AddProduct } from "grocery/components/AddProduct";
import { Shopping } from "grocery/components/Shopping";
import { ProductProvider } from "grocery/utils/product-context";
import { CartProvider } from "grocery/utils/cart-context";

export default function Home() {
  return (
    <>
    <CartProvider>
      <ProductProvider>
        <div className="w-full h-full flex flex-col gap-4 md:flex-row justify-center items-center md:items-start">
          <AddProduct/>
          <Shopping/>
        </div>
      </ProductProvider>
    </CartProvider>
    </>
  );
}
