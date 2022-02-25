<template>
  <div class="home-chart parent-card">
    <div class="flex">
      <div id="months" class="flex f-space-between">
        <button
          :class="{ active: m.val == choosenDate }"
          class="btn btn-small w-25"
          v-for="m in months"
          :key="m.val"
          @click="getChartExpenses(m.val)"
        >
          {{ m.name }}
        </button>
      </div>
      <select
        class="border-none"
        name="year"
        id
        v-model="year"
        @change="getChartExpenses(this.choosenDate)"
      >
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>

    <div class="charts grid g-two">
      <div class="p-relative" :class="{ 'loader-effect': loading }">
        <ChartComponent :chartData="chartData"></ChartComponent>
      </div>
      <div class="p-relative" :class="{ 'loader-effect': loading }">
        <ChartTwo
          :class="{ 'loader-effect': loading }"
          :chartData="chartData"
        ></ChartTwo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import * as moment from "moment";
import ChartComponent from "@/components/panel/Chart.vue";
import ChartTwo from "@/components/panel/ChartTwo.vue";
import Chart from "chart.js";
export default {
  name: "Charts",
  data() {
    return {
      loading: true,
      chartData: [],
      choosenDate: null,
      months: [
        { name: "Jan", val: "01" },
        { name: "Feb", val: "02" },
        { name: "Mar", val: "03" },
        { name: "Apr", val: "04" },
        { name: "May", val: "05" },
        { name: "Jun", val: "06" },
        { name: "Jul", val: "07" },
        { name: "Aug", val: "08" },
        { name: "Sep", val: "09" },
        { name: "Oct", val: "10" },
        { name: "Nov", val: "11" },
        { name: "Dec", val: "12" },
      ],
      year: "2022",
    };
  },
  components: {
    ChartComponent: ChartComponent,
    ChartTwo: ChartTwo,
  },
  computed: { ...mapState("expenses", ["isAuth", "fetching"]) },
  props: ["thisMonth"],
  async created() {
    var month = new Date().getMonth();
    this.choosenDate = "0" + (month + 1);
  },
  methods: {
    getChartExpenses: async function (date) {
      this.choosenDate = date;

      this.loading = true;
      const expenses = await this.$store.dispatch({
        type: "expenses/getExpenses",
        data: {
          url: `/admin/api/bills?from=${this.year}-${date}-01&&to=${this.year}-${date}-31&&type=date`
        },
      });
      const filteration = this.makeDailyExpensesFilterations(expenses);
      this.chartData = this.makeDailyExpensesChartData(filteration);
      this.loading = false;
    },
    makeDailyExpensesFilterations: function (expenses) {
      const perDay = {};
      const types = {};
      expenses.forEach((e) => {
        perDay[e.date] = (perDay[e.date] || e.amount) + e.amount;
        types[e.category] = (types[e.category] || e.amount) + e.amount;
      });
      return { perDay, types };
    },
    makeDailyExpensesChartData: function (filter) {
      const perDayLabels = Object.keys(filter.perDay);
      const perDayData = Object.values(filter.perDay);
      const type = Object.keys(filter.types);
      const typeNo = Object.values(filter.types);

      return {
        perDayLabels,
        perDayData,
        type,
        typeNo,
      };
    },
  },
  watch: {
    thisMonth(val) {
      if (val) {
        this.loading = false;
        const filteration = this.makeDailyExpensesFilterations(val);
        this.chartData = this.makeDailyExpensesChartData(filteration);
      }
    },
  },
};
</script>

<style  >
#months {
  width: 400px;
  margin: auto;
  overflow: scroll;
  border-radius: 5px;
}
#months button {
  background: var(--second-color);
  text-shadow: 1px 1px 3px #fff;
  color: #fff;
  border: 0 !important;
}
#months button.active {
  background-color: var(--main-color);
  color: #000;
}
.chartjs-size-monitor,
.chartjs-size-monitor-expand,
.chartjs-size-monitor-shrink {
  height: 200px;
}

canvas {
  height: 100% !important;
  width: 100% !important;
  border-radius: var(--scnd-radius);
}

@media only screen and (min-width: 320px) and (max-width: 767px) {
  #months {
    width: 260px;
  }
  aside {
    grid-template-columns: 1fr !important;
  }
  .charts {
    grid-template-columns: 1fr 1fr !important;
  }
}

@media only screen and (orientation: landscape) and (min-width: 768px) and (max-width: 1024px) {
  .charts {
    grid-template-columns: 1fr 1fr !important;
  }
  canvas {
    width: 80% !important;
    margin: auto;
  }
}
</style>