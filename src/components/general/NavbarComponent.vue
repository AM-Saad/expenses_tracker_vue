<template>
  <div>
    <div class="backdrop"></div>
    <!-- <button id="side-menu-toggle">Menu</button> -->
    <nav class="main-nav">
      <ul class="main-nav__item-list main">
        <router-link v-if="!isAuth" :to="{name:'Home'}">
          <li class="main-nav__item">
            <a href="/">MANGEX</a>
          </li>
        </router-link>
        <router-link v-if="isAuth" :to="{name:'Panel'}">
          <li class="main-nav__item">
            <a href="/">MANGEX</a>
          </li>
        </router-link>
      </ul>
      <ul class="main-nav__item-list auth">
        <router-link v-if="isAuth" :to="{name:'newexpenses'}">
          <li class="main-nav__item">
            <a href="/">
              <img src="@/assets/images/Plus.svg" alt />
            </a>
          </li>
        </router-link>

        <router-link v-if="isAuth" :to="{name:'expenses'}">
          <li class="main-nav__item">
            <a>
              <img src="@/assets/images/Expenses.svg" alt />
            </a>
          </li>
        </router-link>

        <li v-if="!isAuth" class="main-nav__item">
          <a class="<%= path === '/login' ? 'active' : '' %>" href="/auth">
            <img src="@/assets/images/loginIcon.svg" alt />
          </a>
        </li>
        <div v-if="isAuth" class="flex">
          <li class="main-nav__item">
            <router-link v-if="isAuth" :to="{name:'cards'}">
              <img src="@/assets/images/Cards.svg" alt />
            </router-link>
          </li>
          <li v-if="isAuth" class="main-nav__item" @click="logout()">
            <a>
              <img src="@/assets/images/Logout.svg" alt />
            </a>
          </li>
        </div>
      </ul>
    </nav>
    <nav class="mobile-nav">
      <ul class="mobile-nav__item-list">
        <router-link v-if="isAuth" :to="{name:'Panel'}">
          <li class="mobile-nav__item">
            <a href="/">
              <img src="@/assets/images/Home.svg" alt />
            </a>
          </li>
        </router-link>
        <router-link v-if="!isAuth" :to="{name:'Home'}">
          <li class="mobile-nav__item">
            <a href="/">
              <img src="@/assets/images/Home.svg" alt />
            </a>
          </li>
        </router-link>

        <router-link v-if="isAuth" :to="{name:'expenses'}">
          <li class="mobile-nav__item">
            <a>
              <img src="@/assets/images/Expenses.svg" alt />
            </a>
          </li>
        </router-link>
        <router-link v-if="isAuth" :to="{name:'newexpenses'}">
          <li class="mobile-nav__item">
            <a href="/products">
              <img src="@/assets/images/Plus.svg" alt />
            </a>
          </li>
        </router-link>
        <router-link v-if="!isAuth" :to="{name:'auth'}">
          <li v-if="!isAuth" class="mobile-nav__item">
            <a>
              <img src="@/assets/images/loginIcon.svg" alt />
            </a>
          </li>
        </router-link>

        <li v-if="isAuth" class="mobile-nav__item">

            <router-link v-if="isAuth" :to="{name:'cards'}">

            <img src="@/assets/images/Cards.svg" alt />
            </router-link>
        </li>
        <li v-if="isAuth" class="mobile-nav__item" @click="logout()">
          <a class="<%= path === '/orders' ? 'active' : '' %>">
            <img src="@/assets/images/Logout.svg" alt />
          </a>
        </li>
        <!-- <li v-if="isAuth">
          <a class="wallet none c-g toggle-wallet m-r-3">
            Wallet:
            <b class="wallet-amount">00.00$</b>
          </a>
        </li> -->
      </ul>
    </nav>
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "NavbarComponent",
  data() {
    return {};
  },

  computed: { ...mapState(["isAuth"]) },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth");
    }
  },
  created() {
    // this.message = res.data.message;
  }
};
</script>


<style scoped>
.main-nav {
  height: 100%;
  width: 80%;
  margin: auto;
  color: #eee;
  height: 4rem;
  display: flex;
  align-items: center;
  margin-bottom: var(--scnd-margin);

  background: #fff;
  border: 1px solid #ccc;
  border-bottom-right-radius: var(--main-radius);
  border-bottom-left-radius: var(--main-radius);
}
.main-nav__item-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
.main {
  width: 50%;
}
.main-nav__item-list.auth {
  width: 50%;
  justify-content: flex-end;
  margin-right: 30px;
  align-items: center;
}
.main-nav__item-list.auth .user-name {
  color: #222;
}
.main-nav__item {
  margin: 0 0.5rem;
  padding: 0;
  float: left;

  height: 30px;
}
.main-nav__item a {
  color: #333;
  font-size: 18px;
  text-decoration: none;
}
.main-nav__item img {
  height: 100%;
}
.mobile-nav__item img {
  height: 100%;
}
.mobile-nav {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999999;
  transition: transform 0.3s ease-out;
  box-shadow: var(--shadow);
  display: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
}
.mobile-nav.open {
  transform: translateX(0);
}
.mobile-nav__item-list {
  height: 60px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ccc;
  overflow: scroll;
}
.mobile-nav__item {
  padding: 0;
  border-radius: var(--radius);
  text-align: center;
  transition: all 0.2s ease-out;
  align-items: center;
  height: 30px;
}
.mobile-nav__item a,
.mobile-nav__item a i {
  text-decoration: none;
  color: #222;
  font-size: 14px;
}
.mobile-nav__item i:active,
.mobile-nav__item i:hover,
.mobile-nav__item.active {
  color: var(--main-color);
  border-radius: var(--radius);
}
.mobile-nav button {
  background-color: transparent;
  border: 0;
}
#side-menu-toggle {
  border: 1px solid #333;
  font: inherit;
  padding: 0.5rem;
  display: block;
  background: transparent;
  color: #000;
  cursor: pointer;
}
#side-menu-toggle:focus {
  outline: none;
}
#side-menu-toggle:active,
#side-menu-toggle:hover {
  color: var(--scnd-color);
  border-color: var(--scnd-color);
}

@media only screen and (min-width: 320px) and (max-width: 1024px) {
  .main-nav {
    display: none;
  }
  .mobile-nav {
    display: block;
  }
}
</style>