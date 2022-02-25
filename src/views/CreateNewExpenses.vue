<template>
  <div class="expenses-form grid scale">
    <form
      class="p-relative save-expenses"
      method="POST"
      @submit.prevent="saveExpenses"
    >
      <div class="flex f-space-between sticky-bar">
        <h2>Create New Expenses</h2>

        <router-link :to="{ name: 'expenses' }" class="close">
          <i class="fas fa-arrow-left toggle-expenses-form"></i>
        </router-link>
      </div>
  <CreateByVoice />
      <div>
        <Cards @choosenwallet="getChoosenWallet"></Cards>
        <div class="expenses-options flex f-space-evenly">
          <!-- <div class="form-group">
            <div class="cntr">
              <label class="cntrLabel">Approved</label>
              <label for="approved" class="custom-label">
                <input
                  type="checkbox"
                  class="invisible"
                  name="approved"
                  placeholder="approved"
                  id="approved"
                  v-model="approved"
                />
                <div class="checkbox">
                  <svg width="20px" height="20px" viewBox="0 0 20 20">
                    <path
                      d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
                    />
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </div>
              </label>
            </div>
          </div>
          <div class="form-group">
            <div class="cntr">
              <label class="cntrLabel">Paid</label>
              <label for="paid" class="custom-label">
                <input
                  type="checkbox"
                  class="invisible"
                  name="paid"
                  placeholder="paid"
                  id="paid"
                  v-model="paid"
                />
                <div class="checkbox">
                  <svg width="20px" height="20px" viewBox="0 0 20 20">
                    <path
                      d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
                    />
                    <polyline points="4 11 8 15 16 6" />
                  </svg>
                </div>
              </label>
            </div>
          </div> -->
        </div>
      </div>
      <div class="parent-card bg-lightgray">
        <div class="form-group">
          <label for="category">Category</label>
          <div class="flex f-space-between">
            <select
              class="form-control"
              name="category"
              id="category"
              v-model="category"
            >
              <option selected value="null">Choose Bill Category</option>
              <option
                class="bg-lightgray c-g"
                v-for="t in customTypes"
                :key="t"
              >
                {{ t }}
              </option>
              <option value="rent">Rent</option>
              <option value="wages">Wages</option>
              <option value="utilities">Utilities</option>
              <option value="advertising">Advertising</option>
            </select>
            <i
              class="fas fa-plus btn-small c-g i-bg i-bg-large font-m new-expenses-type bg-lightgray"
            ></i>
          </div>
        </div>
     
        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <v-calendar is-double-paned></v-calendar>
          <v-date-picker mode="single" v-model="duo"></v-date-picker>
        </div>
        <div class="form-group">
          <label for="expensesDate">Release Date</label>
          <v-calendar is-double-paned></v-calendar>
          <v-date-picker mode="single" v-model="date"></v-date-picker>
        </div>

        <div class="form-group">
          <label for="expensesAmount">Amount</label>
          <input
            class="form-control"
            type="number"
            min="0"
            value="0"
            name="expensesAmount"
            placeholder="Expenses Amount"
            id="expensesAmount"
            v-model="amount"
          />
        </div>

        <div class="form-group">
          <label for="notes">notes</label>
          <input
            class="form-control"
            type="text"
            placeholder="Add Notes."
            id="notes"
            v-model="notes"
          />
        </div>
      </div>
      <button v-if="!loading" type="submit" class="btn ">Save</button>
      <button v-if="loading" class="btn opacity-5">Loading</button>
    </form>
  </div>
</template>

<script>
import Cards from "@/components/expenses/createItemComponents/Cards.vue";
import CreateByVoice from "@/components/expenses/createItemComponents/CreateByVoice.vue";
import itemHelpers from "@/components/expenses/helpers/main";
import VCalendar from "v-calendar";

import { mapState } from "vuex";
export default {
  name: "CreateNewItem",
  data() {
    return {
      fetching: false,
      loading: false,
      wallet: null,
      duo: new Date(),
      date: new Date(),
      category: null,
      amount: 0,
      approved: false,
      paid: false,
      notes: null,
      customTypes: []
    };
  },
  computed: {
    // ...mapState("inventory", ["inventoryObj"]),
    ...mapState(["isAuth"])
  },
  components: {
    VCalendar,
    Cards,
    CreateByVoice
  },
  async created() {
    const res = await this.$store.dispatch({
      type: "expenses/fetchCategories"
    });
    this.customTypes = res;
  },
  methods: {
    getChoosenWallet: function(id) {
      this.wallet = id;
    },
    saveExpenses: async function() {
      const expenses = await itemHelpers.createObj({
        card: this.wallet,
        category: this.category,
        amount: this.amount,
        approved: this.approved,
        paid: this.paid,
        duo: this.duo,
        date: this.date,
        notes: this.notes
      });

      const validate = await itemHelpers.validate(expenses);
      if (!validate.state) {
        return this.$store.commit("msg", { type: "info", msg: validate.msg });
      }
      this.loading = true;
      const res = await this.$store.dispatch({
        type: "expenses/createBill",
        data: { expenses: expenses }
      });
      if (res != false) {
        this.$store.commit("cards/updateBalance", res);
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.cntr {
  justify-content: center !important;
}

.cntrLabel {
  text-align: left;
  width: auto;
  line-height: 1.2;
}

.progressbar_from {
  position: absolute;
  top: -3px;
  left: 0;
  height: 5px;
  width: 0;
  background-color: #e6e6e6;
  z-index: 1;
}

.progressbar_to {
  position: absolute;
  top: -3px;
  right: 0;
  height: 5px;
  width: 0;
  background-color: #e6e6e6;
  z-index: 1;
}
</style>
