<template>
  <div class="p-medium m-4 p-relative parent-card" :class="{'loader-effect':loading}">
    
    <div class="reload" v-if="reload">
      <h1>Hmmm...</h1>
      <p>Something went wrong, please try again.</p>
      <button class="btn" @click="getCards()">Reload</button>
    </div>

    <label v-if="route == 'newexpenses'">Choose Card:</label>
    <h2 class="p-3" v-if="route == 'Panel'">Your Cards:</h2>
    <div v-if="!loading">
      <section class="all-cards">
        <div v-for="c in allCards" :key="c.name" class="wallet-card gradient-blue p-large f-center">
          <router-link v-if="route != 'newexpenses'" :to="{name:'card', params:{id:c._id}}">
            <div>
              <p>NAME:{{c.name}}</p>
              <p class="c-w">
                BALANCE:
                <b class="c-g">{{c.balance}}</b> $
              </p>
              <p class="font-s f-right">{{c.date}}</p>
            </div>
          </router-link>
          <div v-if="route == 'newexpenses'" @click="chooseWallet(c._id, $event) ">
            <p>NAME:{{c.name}}</p>
            <p class="c-w">
              BALANCE:
              <b class="c-g">{{c.balance}}</b>$
            </p>
            <p class="font-s f-right">{{c.date}}</p>
          </div>
        </div>
        <router-link :to="{name:'newcard'}">
          <div class="wallet-card gradient-light p-large c-b f-center">
            <b>Add New Card</b>
            <p>Go</p>
          </div>
        </router-link>
      </section>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "Cards",
  data() {
    return {
      route: this.$router.currentRoute.name,
      reload: false,
      loading: true
    };
  },
  computed: {
    ...mapState("cards", ["allCards"])
  },

  created() {
    this.getCards();
  },
  methods: {
    async getCards() {
      if (this.allCards.length == 0) {
        this.loading = true;
        this.reload = false;
        const res = await this.$store.dispatch("cards/getAll");
        if (!res) {
          this.loading = false;
          this.reload = true;
        }
      } else {
        this.loading = false;
      }
    },
    chooseWallet(id, e) {
      e.preventDefault();
      this.$emit("choosenwallet", id);
    }
  },
  watch: {
    allCards(val) {
      this.loading = false;
    }
  }
};
</script>

<style>
.all-cards {
  height: 200px !important;
  width: 100%;
  overflow: scroll;
  display: -webkit-inline-box;
  font-size: 23px;
  padding: var(--scnd-pading);
}
.all-cards .wallet-card {
  height: 80%;
  margin: var(--main-margin);
  min-width: 330px;
  max-width: 100%;
  text-align: left;
  box-shadow: var(--shadow3);
  border-radius: var(--scnd-radius);
}
.all-cards .wallet-card a {
  color: #fff !important;
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .all-cards {
    font-size: 30px;
    height: 180px !important;
  }
  .all-cards .wallet-card {
    /* height: 100%; */
    width: 70%;
  }
}
</style>