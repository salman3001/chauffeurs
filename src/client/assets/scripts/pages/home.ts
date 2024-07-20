import { Alpine } from "alpinejs";

export const homePageScript = (alpine: Alpine) => {
  alpine.data("temp", () => ({
    state: "false",

    toggle() {
      this.state = "true";
    },
  }));
};
