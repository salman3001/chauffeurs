import Alpine, { Alpine as AlpineType } from "alpinejs";

export const addThemeStore = (alpine: AlpineType) => {
  const themeStore = {
    theme: (Alpine as any).$persist("light"),
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  };

  alpine.store("themeStore", themeStore);
};
