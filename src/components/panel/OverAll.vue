<template>
  <section v-if="!loading" class="overall-info flex f-space-around p-medium m-4 border-r-l">
    <div
      v-for="(val, prop) in types"
      :key="val"
      class="grid gradient-blue w-25 p-large border-r-l shadow-l f-center"
    >
      <p>{{prop}}</p>
      <b>{{val}}$</b>
    </div>

    <!-- <div class="grid gradient-yellow w-25 p-large c-w border-r-l shadow-l f-center">
      <p>Overall Expenses</p>
      <b>{{salesNo}}</b>
    </div>-->
  </section>
</template>

<script>
export default {
  name: "OverAll",
  data() {
    return {
      loading: true,
      types: {}
    };
  },
  props: ["thisMonth"],
  watch: {
    thisMonth(expenses) {
      const expensesPerDay = {};
      //get excat number of day in month
      function myDate(date) {
        const newDate = new Date(date);
        return newDate.getDate();
      }
      expenses.forEach(e => {
        console.log(e);
        // expensesPerDay[e.createdAt] =
        //   (expensesPerDay[e.createdAt] || e.total) + e.total;
        this.types[e.category] = (this.types[e.category] || e.amount) + e.amount;
      });
      this.loading = false;

      //   return { expensesPerDay, sources };
    }
  }
};
</script>

<style>

</style>