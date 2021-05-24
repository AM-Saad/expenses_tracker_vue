

<script>
import Chart from "chart.js";
import { Line } from "vue-chartjs";
import expenses from "../../store/modules/expenses";

export default {
  extends: Line,
  name: "Chart",
  data() {
    return {
      allExpenses: [],
      choosenDate: null
    };
  },
  props: ["chartData"],
  mounted() {},

  methods: {
    makeChart: function(perDayData, perDayLabels) {
      this.renderChart({
        labels: perDayLabels,
        datasets: [
          {
            label: "Total",
            borderColor: "#fff",
            pointBorderColor: "#46caad",
            pointBackgroundColor: "#46caad",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#46caad",
            // pointBorderWidth: 10,
            // pointHoverRadius: 10,
            // pointHoverBorderWidth: 1,
            pointRadius: 3,
            borderWidth: 1,
            data: perDayData
          },
          // { responsive: true, maintainAspectRatio: false }
        ],
        options: {
          color: [
            "red", // color for data at index 0
            "blue", // color for data at index 1
            "green", // color for data at index 2
            "yellow" // color for data at index 3
          ],

          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      });

      //   new Chart(document.getElementById("canvas"), {
      //     type: "Line",
      //     data: {
      //       labels: chartData.expensesPerDayLabels,
      //       datasets: [
      //         {
      //           label: "Expense",
      //           data: chartData.expensesPerDayData
      //         }
      //       ]
      //     }
      //   });
    }
  },
  watch: {
    chartData(val) {
      if (val) {
        this.makeChart(val.perDayData, val.perDayLabels);
      }
    },
    allExpenses(val) {
      if (val) {
        this.makeChart(val);
      }
    }
  }
};
</script>

<style>
</style>