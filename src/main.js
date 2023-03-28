import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from "./routes.js";
import CKEditor from '@ckeditor/ckeditor5-vue';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).use(routes).use(CKEditor).mount('#app')
