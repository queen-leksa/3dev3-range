import Range from "./components/Range/index.js";

if (!customElements.get("dream-range")) {
    customElements.define("dream-range", Range);
}