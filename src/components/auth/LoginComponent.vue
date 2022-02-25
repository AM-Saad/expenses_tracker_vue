<template>
  <div class="auth-form_inputs">
    <form
      id="login"
      action="/login"
      method="POST"
      @submit.prevent="submitLogin($event)"
      :class="{'loader-effect':loading}"
    >
      <h1>Login</h1>
      <p class="msg msg-err" v-if="message">{{ message }}</p>
      <div class="form">
        <input type="email" v-model="email" name="email" id="email" placeholder="Your Email Please" />
        <input
          type="password"
          v-model="password"
          name="password"
          id="passowrd"
          placeholder="Enter Your Password."
        />
        <button>
          login
          <img v-if="loading" id="loading" src="../../assets/loading2.gif" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { bus } from "../../main.js";
import { mapGetters, mapActions, mapState } from "vuex";

// import authService from "../../authService";
// import { log } from "util";
// import { setInterval } from "timers";
// import router from "../../router.js";
export default {
  name: "LoginComponent",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: "",
      loading: false,
      isEmp: false
    };
  },
  computed: { ...mapState(["url", "isAuth"]) },
  methods: {
    async submitLogin(e) {
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "login",
        data: {
          email: this.email,
          password: this.password
        }
      });
      this.loading = false;

      if (res.code == 200) this.$router.go({ name: "Panel" });
    }
  }
};
</script>

<style scoped>
#loading {
  position: absolute;
  right: 50%;
  top: 41%;
  transform: translate(-50%, -41%);
}
.form {
  margin: auto;
  padding: 10px 0;
}
.form input,
button {
  display: block;
  width: 100%;
  height: 40px;
  margin: auto;
  margin-bottom: 10px;
  border-radius: var(--radius);
  border: 0;
  background: #e8f0fe;
  box-shadow: var(--shadow);
  padding:0 var(--m-padding);

}
.message {
  color: #ccc;
  text-align: center;
  font-size: 18px;
  padding: 10px 20px;
  margin: 22px auto;
  width: 322px;
  border-radius: 25px;
  background-color: #00ff3b40;
}
</style>
