export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    console.log(`[API MOCK] GET ${url}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {} as T;
  },
  post: async <T>(url: string, data: any): Promise<T> => {
    console.log(`[API MOCK] POST ${url}`, data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {} as T;
  },
  put: async <T>(url: string, data: any): Promise<T> => {
    console.log(`[API MOCK] PUT ${url}`, data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {} as T;
  },
  delete: async <T>(url: string): Promise<T> => {
    console.log(`[API MOCK] DELETE ${url}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {} as T;
  }
};
