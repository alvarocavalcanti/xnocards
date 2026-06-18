import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PluginGate from "./components/PluginGate";
import Homepage from "./components/Homepage";

export const ID = "com.alvarocavalcanti.xnocards";
export const BROADCAST_CHANNEL = `${ID}/card`;

const isPlugin = new URLSearchParams(window.location.search).has("obrref");

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    {isPlugin ? <PluginGate /> : <Homepage />}
  </React.StrictMode>
);
