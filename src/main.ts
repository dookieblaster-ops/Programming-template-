import { startApp } from "./ui/app";
import "./ui/styles.css";

// Starts the app: finds the page's #app element and builds the screen in it.
const root = document.getElementById("app");
if (!root) throw new Error("Missing #app element");
startApp(root);
