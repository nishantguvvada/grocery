import { AddProduct } from "grocery/components/AddProduct";
import { Shopping } from "grocery/components/Shopping";
import { ProductProvider } from "grocery/utils/product-context";
import { CartProvider } from "grocery/utils/cart-context";
import { Toaster } from 'react-hot-toast';
import { Hero } from "grocery/components/Hero";

export default function Home() {
  return (
    <>
    <CartProvider>
      <ProductProvider>
        <Hero/>
        <div className="w-full h-full flex flex-col gap-4 md:flex-row justify-center items-center md:items-start">
          <AddProduct/>
          <Shopping/>
        </div>
      </ProductProvider>
    </CartProvider>
    <Toaster/>
    </>
  );
}
