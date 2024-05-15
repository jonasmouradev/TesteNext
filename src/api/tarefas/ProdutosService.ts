import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface IProduct {
  id: number;
  code: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  collab: string;
}

const getAll = async (): Promise<IProduct[] | ApiException> => {
  try {
    const { data } = await Api().get("/products");
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao buscar os registros.");
  }
};
const getById = async (id: number): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().get(`/products/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao buscar o registro.");
  }
};
const create = async (
  dataToCreate: Omit<IProduct, "id">
): Promise<IProduct[] | ApiException> => {
  try {
    const { data } = await Api().post<any>("/products", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao criar o registro.");
  }
};
const updateById = async (
  id: string,
  dataToUpdate: IProduct
): Promise<IProduct[] | ApiException> => {
  try {
    const { data } = await Api().put(`/products/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao atualizar o registro.");
  }
};
const deleteById = async (id: string): Promise<undefined | ApiException> => {
  try {
    const {} = await Api().get(`/tarefas/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao consultar a API.");
  }
};

export const ProdutosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
