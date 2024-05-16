import Header from "./Header";
import Table from "./Table";

export default function Content() {
  return (
    <>
      <div className="overflow-x-auto flex flex-grow flex-col max-h-vh">
        <Header />
        <Table />
      </div>
    </>
  );
}
