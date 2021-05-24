<template>
  <div>
    <div class="parent-card">
      <div class="flex f-space-between p-3 border-r-m">
        <h2>New Expenses</h2>
        <router-link :to="{name:`expenses`}" class="btn border-r-l ">See all</router-link>
      </div>
      <div>
        <div v-for="e in thisMonth" :key="e._id">
          <router-link :to="{name:`item`, params:{id:e._id}}" :expensesId="e._id">
            <div class="list-item">
              <div class="flex">
                <img src="@/assets/images/ExpensesDesign.svg" class="expenses-icon" />
                <div class="grid">
                  <span class>{{e.category }}</span>
                  <span class="c-g">$ {{e.amount }}</span>
                </div>
              </div>
              <span
                v-if="e.approved"
                class="alert-success font-s p-3 border-r-m state"
              >Approved</span>
              <span
                v-if="!e.approved"
                class="alert-warning font-s p-3 border-r-m state"
              >Not Approved</span>
            </div>
          </router-link>
        </div>
        <h5 v-if="thisMonth.length == 0" class="p-3">No Result To Display</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../../main.js";
import { mapGetters, mapActions, mapState } from "vuex";
import Schaduled from "@/components/panel/Schaduled.vue";

import { setInterval } from "timers";
import router from "@/routerRepo/router.js";
import * as moment from "moment";
export default {
  name: "Recent",
  data() {
    return {
      loading: false,
      message: null,
      expenses: []
    };
  },
  components: {},
  computed: { ...mapState("expenses", ["isAuth", "fetching", "allExpenses"]) },
  props: ["thisMonth"],
  methods: {},
  async created() {
    // this.$emit("overview", {
    //   // sales: this.sales.length,
    //   // customers: this.customers.length
    // });
  },
  watch: {
    thisMonth(val) {}
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
  text-align: center;
  border-radius: var(--radius);
  border: 0;
  background: #e8f0fe;
  box-shadow: var(--shadow);
}

.parent-card {
  max-height: 400px;
  overflow: scroll;
}
</style>
