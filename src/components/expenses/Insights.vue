<template>
  <div class="insight_content scaleable scale" v-if="!fetching">
    <div class="inside-wrapper grid g-two parent-card">
      <h2 class="f-center">Insights</h2>
      <i class="fas fa-times close close-insight" @click="close"></i>
      <div class="form-actions flex f-space-evenly">
        <span class="gradient-blue border-r-s c-w p-3">
          HIEGEST PAYING:
          <!-- <b>{{chartData.mostPaidFor}}</b> -->
        </span>
      </div>
      <InsightChart :class="{'loader-effect': loading}" :chartData="chartData"></InsightChart>
      <div class="grid p-medium">
        <div class="items-wrapper">
          <h4>Expenses by category</h4>
          <div class="insight-items revenue p-relative">
            <div
              class="insight-items_item"
              v-for="(k, propName) in chartData.types"
              :key="propName"
            >
              <h5>Category: {{propName}}</h5>
              <span>
                AMOUNT:
                <b>{{chartData.types[propName]}}$</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import InsightChart from "@/components/panel/ChartTwo.vue";

export default {
  name: "Insights",
  data() {
    return {
      insightsState: true,
      chartData: [],
      loading: true
    };
  },
  components: { InsightChart },
  computed: {
    ...mapState("expenses", ["allExpenses", "fetching"])
  },
  props: ["thisMonth"],

  created() {
    if (this.thisMonth) {
      const filteration = this.makeDailyExpensesFilterations(this.thisMonth);
      this.chartData = this.makeDailyExpensesChartData(filteration);
      this.loading = false;
    }
  },
  methods: {
    makeDailyExpensesFilterations: function(expenses) {
      const types = {};
      expenses.forEach(e => {
        types[e.type] = (types[e.type] || e.total) + e.total;
      });
      return { types };
    },
    makeDailyExpensesChartData: function(filter) {
      const type = Object.keys(filter.types);
      const typeNo = Object.values(filter.types);
      let arr1 = Object.values(filter.types);
      let max1 = Math.max(...arr1);
      function getMaxVal(item, max) {
        return Object.keys(item).find(key => item[key] === max);
      }
      const mostPaidFor = getMaxVal(filter.types, max1);
      return {
        types: filter.types,
        type,
        typeNo,
        mostPaidFor
      };
    },
    close: function() {
      this.$emit("close");
    }
  },
  watch: {
    thisMonth(val) {
      if (val) {
        const filteration = this.makeDailyExpensesFilterations(val);
        this.chartData = this.makeDailyExpensesChartData(filteration);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped >
.insight_content .items-wrapper {
  min-height: 100%;
  background: var(--main-color);
  overflow: scroll;
  -webkit-box-shadow: var(--shadow);
  box-shadow: var(--shadow);
  padding: var(--m-padding);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
.insight_content .insight-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--m-margin);
  align-items: flex-start;
}
.insight_content .insight-items_item {
  background-color: #fff;
  padding: var(--s-padding);
  border-radius: var(--main-radius);
  border: 1.1px solid #ccc;
  display: grid;
  color: var(--second-color);
}
.chartjs-size-monitor,
.chartjs-size-monitor-expand,
.chartjs-size-monitor-shrink {
  height: 200px;
}

canvas {
  /* height: 50% !important; */
  width: 80% !important;
  margin: auto;
  border-radius: var(--scnd-radius);
}
</style>