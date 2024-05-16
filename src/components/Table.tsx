"use client";

import React, { useState, useEffect } from "react";
import { IProduct } from "../api/tarefas/ProdutosService";
import { ApiException } from "../api/ApiException";
import { ProdutosService } from "../api/tarefas/ProdutosService";

const Table = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  // Filtra os produtos com base na pesquisa
  const productsSearch = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.collab.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    ProdutosService.getAll().then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setProducts(result);
      }
    });
  }, []);

  // Calcula o total de páginas com base nos produtos filtrados
  const totalPages = Math.ceil(productsSearch.length / itemsPerPage);
  // Adicionando um novo estado para rastrear os itens selecionados
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Lida com a mudança da checkbox
  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((product) => product !== id));
    }
  };

  // Calcula o indice dos itens para a página atual
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentProducts = productsSearch.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="overflow-x-auto pl-20">
      <div className="flex flex-row items-center pb-10">
        <h1 className="px-5 text-xl text-white">Products</h1>
        <label className="input input-bordered flex items-center gap-2 flex-auto max-w-80">
          <input
            type="text"
            className="grow"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="ml-auto mr-16">
          <button className="btn btn-neutral mr-6 bg-zinc-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            Filtrar
          </button>
          <button className="btn btn-neutral mr-6 bg-zinc-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
            Ordenar
          </button>
        </div>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="text-white">Código</th>
            <th className="text-white w-72">Produto</th>
            <th className="text-white w-72">Categoria</th>
            <th className="text-white w-72">Brand</th>
            <th className="text-white w-72">Collab</th>
            <th className="text-white"></th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {currentProducts.map((product: IProduct) => (
            <tr key={product.id}>
              <th>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={(e) =>
                    handleCheckboxChange(product.id, e.target.checked)
                  }
                />
              </th>
              <td className="font-bold flex items-center">{product.code}</td>
              <td>
                {product.name}
                <br />
                <span className="badge badge-sm">{product.description}</span>
              </td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <th>{product.collab}</th>
              <th>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-blue-500 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th colSpan={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span>
                    Exibindo {firstItemIndex + 1}-
                    {Math.min(lastItemIndex, products.length)} de{" "}
                    {products.length} itens
                  </span>
                </div>
                <div>
                  {" "}
                  <span className="pr-5">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage === totalPages ||
                      products.length <= itemsPerPage
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
