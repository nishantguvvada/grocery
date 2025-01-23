import { AddProduct } from "grocery/components/AddProduct";
import { Shopping } from "grocery/components/Shopping";

export default function Home() {
  return (
    <>
    <div className="flex flex-row justify-center items-center">
      <AddProduct/>
      <Shopping/>

    </div>
    </>
  );
}
