export const healthController = {
  root: () => ({ message: "API backend online" }),
  health: () => ({ status: "ok", service: "backend" }),
  echo: (message: string) => ({ message })
};
