

<script>
import Chart from "chart.js";
import { Bar } from "vue-chartjs";
import expenses from "../../store/modules/expenses";

export default {
  extends: Bar,
  name: "Chart",
  data() {
    return {
      allExpenses: [],
      choosenDate: null
    };
  },
  props: ["chartData"],
  mounted() {
       if (this.chartData) {
        this.makeChart(this.chartData.type, this.chartData.typeNo);
      }
  },
  methods: {
    makeChart: function(type, typeNo) {
      var color = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
      ];
      this.renderChart({
        labels: type,
        datasets: [
          {
            label: "Costs",
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0)",
            borderColor: color,
            borderWidth: 1,
            pointBackgroundColor: color,
            pointBorderColor: color,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: color,
            data: typeNo
          }

          // {
          //   label: "Linea B",
          //   backgroundColor: "transparent",
          //   borderColor: color[2],
          //   pointBackgroundColor: color[2],
          //   pointBorderColor: color[2],
          //   pointHoverBackgroundColor: color[2],
          //   pointHoverBorderColor: color[2],
          //   data: [62, 20, 20, 200, 150]
          // }
        ]
      });
    }
  },
  watch: {
    chartData(val) {
      if (val) {
        this.makeChart(val.type, val.typeNo);
      }
    }
    // allExpenses(val) {
    //   if (val) {
    //     this.makeChart(val);
    //   }
    // }
  }
};
</script>

<style>
</style>