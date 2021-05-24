<template>
  <div class="wrapper">
    <div class="auth-form_inputs parent-card  w-50 m-auto">
      <h1>New Card</h1>

      <div class="card-perview">
        <div class="wallet-card h-100 p-large border-r-xl shadow-l f-center">
          <div>
            <p class="name">NAME:{{cardname}}</p>
            <p class="c-w balance">
              BALANCE:
              <b class="c-g">{{balance}}</b>$
            </p>
            <p class="font-s f-right date">{{date}}</p>
            <p class="font-s f-right date c-w">Card Holder:{{user}}</p>
          </div>
        </div>
      </div>
      <form class="auth-form " action="/create-wallet" method="POST" @submit.prevent="create()">
        <div class="form">
          <div>
            <label for="name">Card Name:</label>
            <input type="text" v-model="cardname" name="name" placeholder="Your Name..." />
          </div>
          <div>
            <label for="name">Start Balance:</label>
            <input type="number" v-model="balance" name="balance" placeholder="Start Balance..." />
          </div>
          <div>
            <label for="name">Card Limit:</label>
            <input type="number" v-model="limit" name="limit" placeholder="Set Alert Limit..." />
          </div>
          <!-- <div class="upload-controller">
          <img style="max-width:25%;" class="upload-controller-Preview" :src="imagePreview" />
          <input type="file" id="imageUrl" ref="file" @change="getFile" placeholder="Post image" />
          </div>-->
          <button type="submit" class="btn">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import * as moment from "moment";

export default {
  name: "CreateWallet",
  data() {
    return {
      cardname: "",
      limit: 0,
      image: "",
      balance: 0,
      date: moment(new Date()).format("YYYY-MM-DD")
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    getFile(e) {
      let reader;
      reader = new FileReader();
      reader.onload = e => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.image = e.target.files[0];
    },
    isEmptyOrSpaces(str) {
      return str === null || str.match(/^ *$/) !== null;
    },
    async create() {
      if (this.isEmptyOrSpaces(this.cardname)) {
        return this.$store.commit("msg", {
          msg: "Add Card Name",
          type: "warning"
        });
      } else {
        const res = await this.$store.dispatch({
          type: "cards/createNew",
          data: {
            name: this.cardname,
            balance: this.balance,
            limit: this.limit,
            image: this.image
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.auth-form_inputs {
  grid-gap: 8px;
}
.form {
  margin: auto;
  padding: 10px 0;
}
/* .form input {
  display: block;
  width: 100%;
  height: 40px;
  margin: auto;
  margin-bottom: 10px;
  text-align: center;
  border-radius: var(--radius);
  background: #fff;
  box-shadow: var(--shadow);
  border: 0;
} */
.card-perview {
  background-image: url("~@/assets/images/map.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 200px;
}
.wallet-card {
  background-color: rgba(2, 9, 81, 0.75);
  text-align: left;
}
.wallet-card .name {
  font-size: 30px;
  color: #fff;
}
.wallet-card .balance {
  font-size: 24px;
}
.wallet-card .date {
  font-size: 14px;
  text-shadow: 1px 1px 3px;
}

@media only screen and (min-width: 320px) and (max-width: 767px) {
  .auth-form_inputs {
    grid-template-columns: 1fr;
  }
}
</style>
