export const healthService = {
  getRootMessage: () => ({ message: "API backend online" }),
  getHealthStatus: () => ({ status: "ok", service: "backend" }),
  echo: (message: string) => ({ message })
};
