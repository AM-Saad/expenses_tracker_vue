<template>
  <div id="wallet" class="" :class="{'loader-effect': loading}">
    <div class="wallet-content p-relative">
      <i class="fas fa-times close toggle-wallet"></i>
      <div class="wallet-addmoney external-box" :class="{'loader-effect':fetching}" v-if="addmoney">
        <label for="amount">Amount:</label>
        <input type="number" name="amount" v-model="addedmoney" id="amount" class="form-control" />
        <a class="addmoney btn grid btn-success" @click="deposit(wallet._id)">Add</a>
      </div>
      <div
        class="wallet-withdraw external-box"
        v-if="withdrawmoney"
        :class="{'loader-effect':fetching}"
      >
        <label for="amount">Amount:</label>
        <input
          type="withdrawamount"
          name="withdrawamount"
          v-model="withdrawed"
          id="withdrawamount"
          class="form-control"
        />
        <a class="withdraw btn btn-info" @click="withdraw(wallet._id)">withdraw</a>
      </div>
      <div class="p-relative " v-if="!loading">
        <div class="wallet-actions flex f-space-between p-3 card-actions">
          <div class="c-w flex">
            <p class="m-medium">Card Name:{{wallet.name}}</p>
            <p class="m-medium">Card Limit:{{wallet.limit}}</p>
          </div>
        </div>
        <div class="current-balance">
          Current Balance:
          <b class="wallet-amount c-g">${{wallet.balance}}</b>
        </div>
        <div class="flex f-space-around">
          <a class="btn toggle-addmoney" @click="addmoney=  !addmoney">Add To Wallet</a>
          <a class="btn toggle-withdraw" @click="withdrawmoney=  !withdrawmoney">Withdraw</a>
        </div>
        <div class="wallet-transaction">
          <h3>transaction</h3>
          <div class="grid" v-for="(p,idx) in  wallet.transaction" :key="idx">
            <div
              class="flex f-space-between transaction"
              :class="[{'out': p.transactionType === 'Withdraw'},{'in': p.transactionType === 'Deposit'}]"
            >
              <div class="flex w-75 f-start">
                <div class="flex">
                  <span class="i-bg i-bg-large font-l m-r-3">{{(idx + 1)}}</span>
                  <!-- <p class="m-l-3 m-r-3 c-g amount font-m">${{p.amount}}</p> -->
                </div>
                <p class="m-l-3 m-r-3 font-m" v-html="p.description"></p>
              </div>
              <div class="flex p-relative">
                <p class="date font-xs">{{p.date}}</p>
                <!-- <img :src="require(`@/assets/images/${p.transactionType}.png`)" alt /> -->
              </div>
            </div>
          </div>
          <div class="contentFallBack" v-if="wallet.transaction.length == 0">
            <h3>No Result To Display</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      wallet: null,
      addmoney: false,
      withdrawmoney: false,
      addedmoney: null,
      withdrawed: null
    };
  },
  computed: {
    // ...mapGetters("wallets", ["findById"]),
    ...mapState("cards", ["fetching", "allCards"]),
    ...mapGetters("cards", ["findById"])
  },
  created() {
    if (this.allCards.length == 0) {
      return this.getWallet(this.$route.params.id);
    } else {
      this.wallet = this.findById(this.$route.params.id);
    }
  },
  methods: {
    async getWallet(id) {
      this.wallet = await this.$store.dispatch({
        type: "cards/getOne",
        data: { id: id }
      });
    },
    async deposit(id) {
      const res = await this.$store.dispatch({
        type: "cards/deposit",
        data: { id: id, amount: this.addedmoney }
      });
      res.state && (this.wallet = res.json.card);
    },
    async withdraw(id) {
      const res = await this.$store.dispatch({
        type: "cards/withdraw",
        data: { id: id, amount: this.withdrawed }
      });
      res.state && (this.wallet = res.json.card);
    }
  },
  watch: {
    wallet(val) {
      if (val) {
        this.loading = false;
      } else {
        this.$store.commit("msg", {
          type: "info",
          msg: "Cannot find matched card. You'll be redirected"
        });
        setTimeout(() => {
          this.$router.push({ name: "Panel" });
        }, 3000);
      }
    }
  }
};
</script>

<style scoped>
/* Start Wallet */
#wallet {
  /* display: none; */
  height: 100%;
}
.card-actions {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.wallet-content {
  width: 80%;
  min-height: 89vh;
  border-radius: var(--main-radius);
  margin: auto;
  background-color: var(--second-color);
}
.current-balance {
  height: 120px;
  text-align: center;
  font-size: 38px;
  margin: 30px 0;
  color: #fff;
}
.current-balance b {
  display: block;
}
.wallet-transaction {
  min-height: 65vh;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  text-align: center;
  border: 1px solid;
  background-color: #fff;
  padding: var(--main-padding);
}
.wallet-transaction h3 {
  margin: var(--main-margin);
  text-align: left;
  color: #333;
}
.amount {
  font-size: 21px;
}

.wallet-transaction .date {
  font-size: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  /* background: red; */
  width: 129px;
  font-size: 9px;
}
.wallet-transaction .transaction {
  background-color: #eee;
  margin-bottom: var(--main-margin);
  padding: var(--scnd-padding);
  border-radius: var(--main-radius);
}
.wallet-transaction .in {
  background-color: rgb(159, 255, 159);
}
.wallet-transaction .out {
  background-color: rgb(255, 159, 159);
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .wallet-content {
    width: 100%;
    height: 70vh;
    overflow: scroll;
  }
}
</style>