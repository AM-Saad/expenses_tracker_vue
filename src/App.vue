<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Cairo:200,300,400,600,700,900&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
    <MessageComponent v-if="msg" :msg="msg"></MessageComponent>
    <NavbarComponent></NavbarComponent>
    <!-- <div class="wrapper"> -->
    <div class="router-view">
      <div class="reload" v-if="!networkconnections">
        <h1>Hmmm...</h1>
        <p>Looks like you lost your connection, please check it and try again.</p>
        <button class="btn" @click="this.checkconnection">Try Again</button>
      </div>
      <transition
        name="fade"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
        v-if="networkconnections"
      >
        <router-view></router-view>
      </transition>
    </div>
    <!-- </div> -->
  </div>
</template>



<script>
import { bus } from "./main.js";

import * as io from "socket.io-client";
window.$ = require("jquery");
window.JQuery = require("jquery");

import { mapState, mapActions } from "vuex";
import NavbarComponent from "@/components/general/NavbarComponent.vue";
import MessageComponent from "@/components/general/Message.vue";
export default {
  name: "app",
  data() {
    return {
      loading: true,
      transitionName: "",
      prevHeight: 0
    };
  },
  components: {
    NavbarComponent: NavbarComponent,
    MessageComponent: MessageComponent
  },
  props: {
    currentComp: {
      type: String
    }
  },
  computed: {
    ...mapState(["networkconnections", "isAuth", "msg"]),
    ...mapActions(["logout"])
  },
  mounted() {
    $("body").on("click", ".sub-menu_btn", this.openmenu);
    this.checkconnection()
  },
  methods: {
    openmenu: function(e) {
      e.stopPropagation();
      e.preventDefault();
      $(".sub-menu")
        .not(
          $(e.target)
            .parent()
            .find(".sub-menu")
        )
        .removeClass("activeMenu");
      $(e.target)
        .parent()
        .find(".sub-menu")
        .toggleClass("activeMenu");
      $("body").on("click", function() {
        $(".sub-menu").removeClass("activeMenu");
      });
    },
    checkconnection: function() {
      this.$store.dispatch("checkConnection");
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      element.style.height = this.prevHeight || 100;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    }
  },
  created() {
    this.$store.commit("checkauthintecated");
  },
  watch: {
    //Use watch to monitor changes in $router
    // $route(to, from) {
    //   if (from.name && to.name) {
    //     if (to.meta.index > from.meta.index) {
    //       //If the to index is larger than the from index, it is judged to be in the forward state, and vice versa, in the backward state.
    //       //Setting Animation Name
    //       this.transitionName = "slide-left";
    //     } else {
    //       this.transitionName = "slide-right";
    //     }
    //   }
    // }
  },
  destroyed() {}
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

@import url(//cdn.rawgit.com/rtaibah/dubai-font-cdn/master/dubai-font.css);
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
