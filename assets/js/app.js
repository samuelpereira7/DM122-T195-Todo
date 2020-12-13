import HtmlService from "./HtmlService.js";
import SupermarketService from "./SupermarketService.js";
class App {
  constructor() {
    this.registerServiceWorker();
    new HtmlService(new SupermarketService());
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      const onsuccess = () => console.log("[Service Worker] Registered");
      const onfailure = () => console.log("[Service Worker] Failed");

      navigator.serviceWorker
        .register("sw.js")
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new App();
