import { ScrapingProgress } from "../types/scrapingProgress";
import apiClient from "./apiClient";

const scrape = {
  scrapeBySku: async (
    sku: string,
    store_id: string,
    category_id: string,
    defaultWeight?: number,
    defaultDimensions?: string
  ) => {
    const response = await apiClient.post(
      "/scrape",
      {
        sku,
        category_id,
        defaultWeight,
        defaultDimensions,
        target_store_id: store_id,
        post: true,
      },
      { timeout: 200000 }
    );

    return response.data;
  },
  async initializeScraping(data: any) {
    const response = await apiClient.post("/scrape/initialize", data);
    return response.data;
  },

  async updateTasks(links: any) {
    const response = await apiClient.post("/scrape/update-tasks", links);
    return response.data;
  },

  async getScrapingProgress(store_id?: string) {
    const response = await apiClient.get(
      `/scrape/tasks${store_id ? `?store_id=${store_id}` : ""}`
    );
    const responseData: {
      queueInfo: any;
      scrapingProgress: ScrapingProgress;
    } = response.data;
    return responseData;
  },

  async runTasks(store_id: string) {
    const response = await apiClient.put("/scrape/tasks/run", { store_id });
    return response.data;
  },

  async pauseTasks() {
    const response = await apiClient.put("/scrape/tasks/pause");
    return response.data;
  },
};

export default scrape;
