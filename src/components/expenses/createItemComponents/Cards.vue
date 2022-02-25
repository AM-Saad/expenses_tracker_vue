<template>
  <div class="p-medium m-4 p-relative parent-card" :class="{'loader-effect':loading}">
    
    <div class="reload" v-if="reload">
      <h1>Hmmm...</h1>
      <p>Something went wrong, please try again.</p>
      <button class="btn" @click="getCards()">Reload</button>
    </div>

    <label>Choose Card:</label>
    <div v-if="!loading">
      <section class="all-cards">
        <div v-for="c in allCards" :key="c.name" class="wallet-card gradient-blue p-large f-center">
          
          <div  @click="chooseWallet(c._id, $event) ">
            <p>{{c.name}}</p>
            <p class="c-w">
              BALANCE:
              <b class="c-g">{{c.balance}}</b>$
            </p>
            <p class="font-s f-right">{{c.date}}</p>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>
<script>
import { mapState,  } from "vuex";
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
      const activeCards = document.getElementsByClassName("choosen");
      for (let index = 0; index < activeCards.length; index++) {
        const element = activeCards[index];
        element.classList.remove("choosen");
      }
      e.currentTarget.parentNode.classList.add("choosen");
      this.$emit("choosenwallet", id);
    }
  },
  watch: {
    allCards(val) {
      console.log('changed')
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.all-cards {
  height: 200px !important;
  width: 100%;
  overflow: scroll;
  display: -webkit-inline-box;
  font-size: 23px;
  padding: var(--s-pading);
}
.wallet-card {
  height: 80%;
  margin-right: var(--m-margin);
  min-width: 330px;
  max-width: 100%;
  text-align: left;
  box-shadow: var(--shadow2);
  border-radius: var(--main-radius);
  cursor: pointer;
}
.wallet-card.choosen {
  border: 2px solid #000;
}
.wallet-card a {
  color: #fff !important;
  height: 100%;
  display: block;
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .all-cards {
    height: 180px !important;
  }
  .wallet-card {
    width: 70%;
  }
}
</style>