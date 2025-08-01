import { isAxiosError } from "axios";
import storeService from "../services/storeService";
import { useUserStore } from "../store/UserStore";
import { useState } from "react";
import { IStore } from "../types/store";
import { useShopStore } from "../store/ShopStore";
import { getStoresLength, setStoresLength } from "../utils/cacheHelper";

export const useStores = () => {
  const { user, pushStore } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const { setStores, stores, toggleAllowUpdate } = useShopStore();

  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | null>(
    "success"
  );
  const [activeToast, setActiveToast] = useState<boolean>(false);

  const setError = (error: unknown) => {
    if (isAxiosError(error) && error.response?.data) {
      const {
        response: { data },
      } = error;
      if (data.message) setToastMsg(data.message);
      else setToastMsg("Error desconocido");
    } else if (error instanceof Error) {
      setToastMsg(error.message);
    }
    setToastType("error");
    setActiveToast(true);
  };

  const closeToast = () => {
    setActiveToast(false);
    setToastMsg("");
    setToastType(null);
  };

  const handleLinkStore = async (data: any) => {
    try {
      setLoading(true);

      if (user) {
        const requestBody = {
          ...data,
          seller_id: user._id,
        };
        const response = await storeService.linkStore(requestBody);
        localStorage.setItem("linkData", JSON.stringify(requestBody));
        window.open(response.redirectUrl, "_blank");
      } else {
        console.error("No hay una sesión iniciada");
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleSuccessLinkStore = async (code: string) => {
    try {
      const dataString = localStorage.getItem("linkData");
      if (dataString) {
        const data = JSON.parse(dataString);
        const response = await storeService.linkStoreSuccess(code, data);
        return response;
      } else {
        throw new Error(
          "Los datos de vinculación no se cargaron correctamente"
        );
      }
    } catch (error) {
      setError(error);
    }
  };

  const endLinkStore = (store: IStore) => {
    pushStore(store);
    setLoading(false);
  };

  const getAllStores = async () => {
    try {
      if (stores.length == 0) {
        setLoading(true);
        const data = (await storeService.getStores()).filter(
          (store: any) => !store.suspended
        );
        setStoresLength(data.length);
        setStores(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const renderSkeletons = () => {
    const lengthString = getStoresLength();
    let items = [0, 1, 2, 3];
    if (lengthString) {
      items = [];
      const length = parseInt(lengthString);
      for (let i = 0; i < length; i++) {
        items.push(i);
      }
    }
    return items;
  };

  const getStoresByUser = async (
    user_id: string
  ): Promise<IStore[] | undefined> => {
    try {
      const stores = await storeService.getStoresByUser(user_id);
      return stores;
    } catch (error) {
      setError(error);
    }
  };

  const sincronizeStore = async (store_id: string) => {
    try {
      const response = await storeService.sincronizeStore(store_id);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const deleteAllProducts = async (store_id: string) => {
    try {
      const response = await storeService.deleteAllItems(store_id);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const transferProducts = async (
    target_store_id: string,
    origin_store_id: string
  ) => {
    try {
      const response = await storeService.transferProducts(
        origin_store_id,
        target_store_id
      );

      return response;
    } catch (error) {
      setError(error);
    }
  };

  const getPendingPublications = async () => {
    try {
      return await storeService.getPendingPublications();
    } catch (error) {
      setError(error);
    }
  };

  const getPostingProgress = async () => {
    try {
      return await storeService.getPostingProgress();
    } catch (error) {
      setError(error);
    }
  };

  const getOmitedPubs = async () => {
    try {
      return await storeService.getOmitedPubs();
    } catch (error) {
      setError(error);
    }
  };

  const savePricing = async (data: any) => {
    try {
      return await storeService.savePricing(data);
    } catch (error) {
      setError(error);
    }
  };

  const getPricing = async (user_id: string) => {
    try {
      return await storeService.getPricing(user_id);
    } catch (error) {
      setError(error);
    }
  };

  const searchItems = async (store_id: string, filters: any, params: any) => {
    try {
      const response = await storeService.searchItems(
        store_id,
        filters,
        params
      );

      return response;
    } catch (error) {
      setError(error);
    }
  };

  return {
    handleSuccessLinkStore,
    getPendingPublications,
    getPostingProgress,
    toggleAllowUpdate,
    deleteAllProducts,
    transferProducts,
    sincronizeStore,
    getStoresByUser,
    handleLinkStore,
    renderSkeletons,
    getOmitedPubs,
    endLinkStore,
    getAllStores,
    savePricing,
    searchItems,
    getPricing,
    closeToast,
    activeToast,
    toastType,
    toastMsg,
    loading,
    stores,
  };
};
