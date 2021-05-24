<template>
  <div class="parent-card">
    <div class="p-3 flex">
      <h2>Over All Reviews:</h2>
    </div>
    <!-- <img  v-if="loading" src="@/assets/spinner2.svg" alt class="loading block" /> -->

    <div class="parent-card_compare_percentage grid p-medium border-r-m">
      <div class="flex f-space-between p-medium border-1 border-r-m m-b-3">
        <div>
          <p>
            Total Expenses this month is: {{thisMonthTotalExpenses}}$
            <br />
            <span
              style="font-size:13px; font-weight:lighter"
            >Compared Last Month is: {{lastMonthTotalExpenses}}$</span>
          </p>
        </div>
        <div class="item_percentage">
          <p
            class="bg-w c-g"
            v-if="lastMonthTotalExpenses > thisMonthTotalExpenses"
          >{{expensesPercentageFloor || 0}} %</p>
          <p
            class="bg-w c-r"
            v-if=" lastMonthTotalExpenses < thisMonthTotalExpenses"
          >{{expensesPercentageFloor || 0}} %</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as io from "socket.io-client";
import * as moment from "moment";
import Chart from "chart.js";

import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "ComparisonComponent",
  data() {
    return {
      loading: true,
      thisMonthTotalExpenses: 0,
      lastMonthTotalExpenses: 0,
      dateOfLastExpenses: null,
      expensesPercentageFloor: 0
    };
  },
  computed: { ...mapState("expenses", ["isAuth", "fetching"]) },
  components: {
  },
  props: ["thisMonth", "lastMonth"],
  async created() {
    this.expensespercentages();
    this.loading = false;
  },
  methods: {
    expensespercentages() {
      let percentageOfExpenses;
      if (this.lastMonthTotalExpenses < this.thisMonthTotalExpenses) {
        percentageOfExpenses =
          100 -
          (this.lastMonthTotalExpenses / this.thisMonthTotalExpenses) * 100;
      } else {
        percentageOfExpenses =
          100 -
          (this.thisMonthTotalExpenses / this.lastMonthTotalExpenses) * 100;
      }
      this.expensesPercentageFloor = Math.floor(percentageOfExpenses);
    },
    getMonthDate(date) {
      const newDate = new Date(date);
      return newDate.getMonth();
    },
    getDateDate(date) {
      const newDate = new Date(date);
      return newDate.getDate();
    }
  },
  watch: {
    thisMonth(val) {
      const expenses = JSON.parse(JSON.stringify(val));
      expenses.forEach(e => {
        this.thisMonthTotalExpenses += e.total;
      });
      this.expensespercentages();
    },
    lastMonth: function(val, val2) {
      const expenses = JSON.parse(JSON.stringify(val));
      if (expenses.length > 0) {
        const lastExpensesThisMonth = expenses.length - 1;
        const dateOfLastExpenses = this.getDateDate(
          expenses[lastExpensesThisMonth].createdAt
        );
        expenses.forEach(e => {
          if (this.getDateDate(e.createdAt) <= dateOfLastExpenses) {
            this.lastMonthTotalExpenses += e.total;
          }
        });
      }
      this.expensespercentages();
    }
  }
};
</script>

<style>
.item_percentage p {
  font-size: 22px;
  margin-left: var(--main-margin);
  font-weight: bold;
  padding: var(--scnd-padding);
  border-radius: var(--main-radius);
  display: flex;
  align-items: center;
  border: 1.2px solid;
}


@media only screen and (min-width: 320px) and (max-width: 767px) {

  aside {
    grid-template-columns: 1fr !important;
  }
}
</style>
