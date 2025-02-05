import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import 'drag-drop-touch';

if ('navigator' in window && window.navigator.standalone === undefined) {
    const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    if (isIos && !window.navigator.standalone) {
        alert("Install this app: Tap the Share button, then 'Add to Home Screen'!");
    }
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
        console.log("Service Worker Registered");
    });
}
const app = createApp(App);
app.use(createPinia());
app.mount('#app');