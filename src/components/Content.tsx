import Header from "./Header";
import Table from "./Table";

export default function Content() {
  return (
    <>
      <div className="overflow-x-auto flex flex-grow flex-col">
        <Header />
        <Table />
      </div>
    </>
  );
}
