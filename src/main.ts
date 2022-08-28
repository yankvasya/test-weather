import { defineCustomElement } from "vue";
import App from "./App.ce.vue";

const weatherWidget = defineCustomElement(App);

customElements.define("weather-widget", weatherWidget);

document.body.appendChild(new weatherWidget());
