import Vue from "vue";
import App from "./App.vue";
import router from "@/routerRepo/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/css/main.css"
import "@/assets/css/classes.css"
import "@/assets/css/components.css"
import store from "./store";
import * as moment from 'moment'
import VDragged from "v-dragged";
import VCalendar from 'v-calendar';
// import 'v-calendar/lib/v-calendar.min.css';
import ImageKit from "imagekitio-vue"

Vue.use(ImageKit, {
  urlEndpoint: "your_url_endpoint", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: "your_public_api_key", // optional
  authenticationEndpoint: "https://www.your-server.com/auth" // optional
  // transformationPosition: "path" // optional
})
// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar);

Vue.use(moment)
Vue.use(VDragged);


library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
export const bus = new Vue();


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
