import { useState } from "react";
import { IProduct } from "../types/product";
import { isAxiosError } from "axios";
import productService from "../services/productService";

export const useProduct = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const updateProduct = async (data: Partial<IProduct>, sku: string) => {
    try {
      setLoading(true);
      const response = await productService.update(data, sku);
      return response;
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        setErrorMsg(error.response.data.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getItems = async (filter: any) => {
    try {
      const response = await productService.getItems(filter);
      return response;
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        setErrorMsg(error.response.data.message);
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      }
      return null;
    }
  };

  return { updateProduct, setProduct, getItems, product, errorMsg, loading };
};
