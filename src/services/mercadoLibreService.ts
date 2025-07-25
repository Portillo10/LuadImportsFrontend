import apiClient from "./apiClient";

const prefix = "/api";

const mercadoLibreService = {
  async getCategories() {
    const response = await apiClient.get("/api/categories");
    return response.data;
  },

  async predictCategory(
    store_id: string,
    q?: string,
    sku?: string,
    limit: number = 1
  ) {
    const queryParams = `${sku ? `sku=${sku}` : q ? `q=${q}` : ""}`;

    const response = await apiClient.get(
      `/api/stores/${store_id}/predict?${queryParams}&limit=${limit}`
    );
    return response.data;
  },

  async transferProducts(data: any) {
    const response = await apiClient.post(
      "/api/stores/transfer-products",
      data
    );
    return response.data;
  },

  async postProducts(store_id: string, status: string = "pending") {
    const response = await apiClient.post(
      `/api/stores/${store_id}/posting?status=${status}`
    );

    return response.data;
  },

  async getPostingProgressByStore(store_id: string) {
    const response = await apiClient.get(`/api/stores/${store_id}/posting`);
    return response.data;
  },

  async syncStore(store_id: string) {
    const response = await apiClient.put(`/api/stores/${store_id}/sincronize`);
    return response.data;
  },

  async getSyncStoreProgress(store_id: string) {
    const response = await apiClient.get(`/api/stores/${store_id}/sincronize`);
    return response.data;
  },

  async deleteForbbidenProducts(store_id: string) {
    const response = await apiClient.post(
      `/api/stores/${store_id}/delete-forbbiden`
    );
    return response.data;
  },

  async calculateSummary(store_id: string, to: string, from: string) {
    const response = await apiClient.get(
      `${prefix}/stores/${store_id}/calculate-summary`,
      {
        params: { to, from },
      }
    );
    const { data, status } = response;
    return { data, status };
  },

  async postBySku(
    sku: string,
    store_id: string,
    ignoreFilters: boolean = false
  ) {
    const response = await apiClient.post(
      `/api/stores/${store_id}/post?sku=${sku}&ignoreFilters=${ignoreFilters}`
    );
    return response.data;
  },

  async postItem(sku: string, store_id: string, item: any, pricing: any) {
    const response = await apiClient.post(
      `/api/posting/item`,
      { item, pricing },
      { params: { sku, store_id } }
    );
    const { data, status } = response;
    return { data, status };
  },
};

export default mercadoLibreService;
