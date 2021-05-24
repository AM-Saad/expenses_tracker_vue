<template>
  <main>
    <div class="single-item scale">
      <div class="inside-wrapper" :class="{ 'loader-effect': loading }">
        <router-link :to="{ name: 'expenses' }" class="close">
          <i class="fas fa-arrow-left close-single-item"></i>
        </router-link>
        <div v-if="!loading">
          <div class="p-3 flex f-start sticky-bar">
            <router-link :to="{ name: 'invoice' }">
              <a class="btn single-item_actions getInvoice">
                Invoice
                <i class="fas fa-file"></i>
              </a>
            </router-link>
            <a
              v-if="!e.approved"
              @click="approve(e._id)"
              class="btn single-item_actions changePaidState"
              >Approve</a
            >
            <a
              @click="removeExpenses(e._id)"
              class="btn single-item_actions deleteExpenses"
            >
              Remove
              <i class="fas fa-trash"></i>
            </a>
          </div>
          <div class="single-item_info flex f-end">
            <span>At:{{ e.date }}</span>
            <span>Due to: {{ e.duo }}</span>
          </div>

          <div class="single-item-core grid">
            <div>
              <p class="unit">Category: {{ e.category }}</p>
            </div>
            <div>
              <p class="unit">AMOUNT: {{ e.amount }}</p>
            </div>
            <p>Notes: {{ e.notes ? e.notes : "No Notes.." }}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "SingleItem",
  data() {
    return {
      loading: true,
      expensesId: null,
      e: null,
      uploadnewimg: false,
    };
  },
  computed: {
    ...mapState("expenses", ["allExpenses"]),
    ...mapGetters("expenses", ["findById"]),
  },

  components: {},
  async mounted() {
    const expensesId = this.$route.params.id;
    let expenses = await this.getExpenses(expensesId);
    if (expenses) {
      this.e = expenses;
      this.loading = false;
    } else {
      this.$store.commit("msg", {
        type: "info",
        msg: "Cannot find matched item. You'll be redirected",
      });
      setTimeout(() => {
        this.$router.push({ name: "Panel" });
      }, 5000);
    }
  },
  methods: {
    getExpenses: async function (expensesId) {
      let ex;
      ex = this.findById(expensesId);
      if (!ex) {
        ex = await this.$store.dispatch({
          type: "expenses/getOne",
          data: { id: expensesId },
        });
      }
      return ex;
    },
    goBack: function () {
      window.history.back();
    },
    removeExpenses: async function (expensesId) {
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "expenses/deleteOne",
        data: { expensesId },
      });

      res && this.$router.push({ name: "expenses" });
      this.loading = false;
    },
    approve: async function (expensesId) {
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "expenses/approve",
        data: { expensesId },
      });
      this.getExpenses(expensesId);
      this.loading = false;
    },
  },

  watch: {
    $route: function (to, from) {
      if (this.isAuth) this.getExpenses(to.params.id);
    },
    expenses: function (val) {},
  },
};
</script>

<style scoped>
.single-item_info {
  position: relative;
  padding: var(--scnd-padding);
}
.single-item_info span {
  text-align: left;
  text-shadow: 0.5px 0.5px 1.2px rgb(111, 111, 111);
  text-transform: capitalize;
  margin: var(--scnd-margin);
}

.single-item-core {
  padding: var(--scnd-margin);
  /* background: #c7ffc7; */
  position: relative;
  max-height: 61%;
  align-items: flex-start;
  overflow: scroll;
}
.single-item-core > div {
  margin-bottom: var(--scnd-margin);
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}
.single-item-core p {
  margin-bottom: var(--scnd-margin);
  font-size: 26px;
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .single-item_info span {
    font-size: 12px;
  }
}
</style>