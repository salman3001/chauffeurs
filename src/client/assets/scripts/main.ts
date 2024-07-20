import Alpine from "alpinejs";
import { homePageScript } from "./pages/home";
import "bootstrap";
// @ts-ignore
import persist from "@alpinejs/persist";
import { addThemeStore } from "./pages/themeStore";

document.addEventListener("DOMContentLoaded", () => {
  Alpine.plugin(persist);
  document.addEventListener("alpine:init", () => {
    homePageScript(Alpine);
    addThemeStore(Alpine);
  });
  Alpine.start();
});
