import Image from "next/image";
import { Inter } from "next/font/google";
import Index from "../src/index";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Index />
    </>
  );
}
