import Html, { Component } from "@kitajs/html";
import { Head } from "../components/shared/Head";
import { Navbar } from "../components/shared/NavBar";

export const MainLayout: Component = ({ children }) => (
  <>
    <Head />
    <body x-data x-bind:data-bs-theme="$store.themeStore.theme">
      <Navbar />
    </body>
  </>
);
