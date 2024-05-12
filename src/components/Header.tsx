import nextIcon from "../../public/image.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-row p-10 items-center">
      <div className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-lg">
        <div className="flex w-10 h-3.21">
          <Image src={nextIcon} alt="Next Icon" />
        </div>
      </div>
      <div className="pl-10 font-sans text-white text-xl">
        <h1>Produtos</h1>
      </div>
    </div>
  );
}
