import { axiosInstance } from "../utils/axios";

const aiService = {
  chat: async (
    provider: string,
    messages: Array<{ role: string; content: string }>
  ) => {
    const response = await axiosInstance.post("/ai/chat", {
      provider,
      messages,
    });
    return response.data;
  },
  dashboardSuggest: async (dataset: any, description?: string) => {
    const response = await axiosInstance.post("/ai/dashboard-suggest", {
      dataset,
      description,
    });
    return response.data;
  },
};

export default aiService;
