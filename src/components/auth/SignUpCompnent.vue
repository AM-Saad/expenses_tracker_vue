<template>
  <div class="auth-form_inputs">
    <form
      id="signup"
      action="/signup"
      method="POST"
      @submit.prevent="signUp()"
      :class="{'loader-effect':loading}"
    >
      <h1>Sign Up</h1>
      <p class="msg msg-success" v-if="message">{{ message }}</p>
      <div class="form">
        <input type="text" v-model="name" name="name" id="name" placeholder="Your name.." />
        <input type="email" v-model="email" name="email" id="email" placeholder="Your email.." />
        <input
          type="password"
          v-model="password"
          name="password"
          id="passowrd"
          placeholder="Write Strong Password."
        />

        <input
          type="password"
          v-model="confirmPassword"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="confirm password."
        />

        <!-- <div class="upload-controller">
          <img style="max-width:25%;" class="upload-controller-Preview" :src="imagePreview" />
          <input type="file" id="imageUrl" ref="file" @change="getFile" placeholder="Post image" />
        </div>-->
        <button>Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import { error, log } from "util";
import { async } from "q";
export default {
  name: "SignUpCompnent",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      message: "",
      loading: false
    };
  },
  methods: {
    getFile(e) {
      let reader;
      reader = new FileReader();
      reader.onload = e => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.imgFile = e.target.files[0];
    },
    async signUp() {
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "signup",
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmpassword: this.confirmPassword
        }
      });
      this.loading = false;

      if (res.code == 200) {
        this.$store.commit("msg", {
          msg: "Registred successfully. login now",
          type: "success"
        });
        this.$emit("switch", "LoginComponent");
      }
    }
  }
};
</script>

<style scoped>
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
  background: #e8f0fe;
  box-shadow: var(--shadow);
  padding:0 var(--m-padding);

  border: 0;
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
