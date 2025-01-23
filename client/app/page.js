import { AddProduct } from "grocery/components/AddProduct";
import { Shopping } from "grocery/components/Shopping";
import { ProductProvider } from "grocery/utils/context";

export default function Home() {
  return (
    <>
    <ProductProvider>
      <div className="w-full h-full flex flex-row justify-center items-center">
        <AddProduct/>
        <Shopping/>
      </div>
    </ProductProvider>
    </>
  );
}
