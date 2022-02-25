<template>
  <div >
    <h3 class="greeting">
      Welcome,
      <b>{{ this.user }}.</b>
    </h3>
    <Cards></Cards>
    <main class="grid g-two m-t-3">
      <div>
        <RecentEvents :thisMonth="thisMonthExpenses"></RecentEvents>
        <Schaduled></Schaduled>
      </div>
      <div>
        <ComparisonComponent
          :thisMonth="thisMonthExpenses"
          :lastMonth="lastMonthExpenses"
        ></ComparisonComponent>
        <Charts :thisMonth="thisMonthExpenses"></Charts>
      </div>
      <!-- <OverAll :thisMonth="thisMonthExpenses"></OverAll> -->
    </main>
  </div>
</template>

<script>
import Cards from "@/components/card/Cards.vue";
import RecentEvents from "@/components/panel/RecentEvents.vue";
import ComparisonComponent from "@/components/panel/ComparisonComponent.vue";
import OverAll from "@/components/panel/OverAll.vue";
import Charts from "@/components/panel/Charts.vue";
import Schaduled from "@/components/panel/Schaduled.vue";

import * as moment from "moment";

import { mapState, mapActions } from "vuex";
export default {
  name: "Panel",
  data() {
    return {
      thisMonthExpenses: [],
      lastMonthExpenses: [],
      thisMonthFrom: moment()
        .startOf("month")
        .format("YYYY-MM-DD"),
      thisMonthTo: moment()
        .endOf("month")
        .format("YYYY-MM-DD"),

      lastMonthFrom: moment()
        .subtract(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD"),
      lastMonthTo: moment()
        .subtract(1, "month")
        .endOf("month")
        .format("YYYY-MM-DD")
    };
  },
  components: {
    RecentEvents,
    ComparisonComponent,
    OverAll,
    Cards: Cards,
    Charts,
    Schaduled
  },
  computed: {
    ...mapState("expenses", [("isAuth", "allExpenses")]),
    ...mapState(["networkconnections", "user", "isAuth"]),
    ...mapActions(["checkConnection"])
  },

  mounted() {},
  async created() {
    if (this.networkconnections) {
      this.getExpenses();
    }
  },
  methods: {
    getExpenses: async function() {
      if (this.thisMonthExpenses.length == 0) {
        this.thisMonthExpenses = await this.$store.dispatch({
          type: "expenses/fetchBills",
          data: {
            url: `/admin/api/bills?from=${this.thisMonthFrom}&&to=${
              this.thisMonthTo
            }&&type=date`,
            update:false

          }
        });
      }
      if (this.lastMonthExpenses.length == 0) {
        this.lastMonthExpenses = await this.$store.dispatch({
          type: "expenses/fetchBills",
          data: {
            url: `/admin/api/bills?from=${this.lastMonthFrom}&&to=${
              this.lastMonthTo
            }&&type=date`,
            update:false
          }
        });
      }
    }
  },
  watch: {
    networkconnections(val) {
      if (val) {
        this.getExpenses();
      }
    }
  }
};
</script>

<style>
.greeting {
  padding: 4px var(--m-padding);
  border-radius: var(--scnd-radius);
  font-weight: 600;
  color: var(--second-color);
}

.over-all-review_compare_percentage_item {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-items: center;
  justify-content: space-evenly;
  border: 1px solid #eee;
  background-color: #fff;
}
.over-all-review_compare_percentage_item p {
  font-size: 15px;
  color: #000;
}
.over-all-review_compare_percentage_item .item_percentage p {
  font-size: 22px;
  margin-left: var(--m-margin);
  font-weight: bold;
  background: #fff;
  padding: var(--s-padding);
  border-radius: var(--main-radius);
  display: flex;
  align-items: center;
  border: 1.2px solid;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--m-margin) 0;
  font-size: 17px;
  border-radius: var(--scnd-radius);
  padding: 0 var(--s-padding);
  text-transform: capitalize;
  color: var(--second-color);
  font-weight: bold;
  height: 65px;
  box-shadow: var(--shadow2);
  background-color: #fff;
}
.expenses-icon {
  height: 45px;
  width: 45px;
  border-radius: 5%;
  margin-right: var(--s-margin);
}
.list-item:hover {
  box-shadow: unset;
  box-shadow: var(--shadow3);
}
.list-item .state {
  width: 77px;
  text-align: center;
  color: #000;
  font-size: 10px;
  font-weight: bold;
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  main {
    grid-template-columns: 1fr !important;
  }
}
@media only screen and (orientation: portrait) and (min-width: 768px) and (max-width: 1024px) {
}
</style>
