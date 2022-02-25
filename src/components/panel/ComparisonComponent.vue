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
              style="font-size:16px; font-weight:lighter"
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

import { mapState } from "vuex";
export default {
  name: "ComparisonComponent",
  data() {
    return {
      loading: true,
      dateOfLastExpenses: null
    };
  },
  computed: {
    ...mapState("expenses", ["isAuth", "fetching"]),
    thisMonthTotalExpenses() {
      const expenses = JSON.parse(JSON.stringify(this.thisMonth));
      let total = 0;
      expenses.forEach(e => {
        total += e.amount;
      });
      return total;
    },
    lastMonthTotalExpenses() {
      const expenses = JSON.parse(JSON.stringify(this.lastMonth));
      let total = 0;
      if (expenses.length > 0) {
        const lastExpensesThisMonth = expenses.length - 1;
        const dateOfLastExpenses = this.getDateDate(
          expenses[lastExpensesThisMonth].createdAt
        );
        expenses.forEach(e => {
          if (this.getDateDate(e.createdAt) <= dateOfLastExpenses) {
            total += e.amount;
          }
        });
      }
      return total;
    },
    expensesPercentageFloor() {
      let percentageOfExpenses = 0;
      if (this.lastMonthTotalExpenses < this.thisMonthTotalExpenses) {
        percentageOfExpenses =
          100 - this.lastMonthTotalExpenses / this.thisMonthTotalExpenses * 100;
      } else {
        percentageOfExpenses =
          100 - this.thisMonthTotalExpenses / this.lastMonthTotalExpenses * 100;
      }
      return Math.floor(percentageOfExpenses);
    }
  },
  props: ["thisMonth", "lastMonth"],
  async created() {
    this.loading = false;
  },
  methods: {
    getMonthDate(date) {
      const newDate = new Date(date);
      return newDate.getMonth();
    },
    getDateDate(date) {
      const newDate = new Date(date);
      return newDate.getDate();
    }
  },
};
</script>

<style>
.item_percentage p {
  font-size: 22px;
  margin-left: var(--m-margin);
  font-weight: bold;
  padding: var(--s-padding);
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
