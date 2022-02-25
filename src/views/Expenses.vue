<template>
  <div>
    <!-- <Loading v-if="fetching"></Loading> -->
    <main>
      <section class="options">
        <!-- <div class="flex f-space-between">
          <h2>Expenses</h2>
          <aside class="main-actions flex">
            <router-link :to="{name:'newexpenses'}">
              <div class="main-actions_action btn bg-w border-r-s toggle-expenses-form">
                <p>New</p>
              </div>
            </router-link>
            <a class="btn toggle-filters bg-w border-r-s">
              Filter
              <i class="fas fa-filter"></i>
            </a>
          </aside>
        </div> -->

        <Filters
          v-on:insights="getinsights"
          v-on:layout="changeLayout"
          v-on:search="getExpenses"
        ></Filters>
        
      </section>



      <div>
  
        <div
             class="content parent-card"
        >
           <section class>
        <div class="flex f-end m-medium">
          <div class="types-btn">
            <a class="btn p-relative sub-menu_btn sort-menu_btn">
              <i class="fas fa-sort"></i> Type
            </a>
          </div>
          <div>
            <a class="btn p-relative sub-menu_btn sort-menu_btn">
              <i class="fas fa-sort"></i>
              Sort
              <ul class="sub-menu">
                <li
                  class="btn bg-w sort heigest"
                  @click="sortItems('heigest', $event)"
                >
                  Heigest
                </li>
                <li class="btn bg-w sort" @click="sortItems('lowest', $event)">
                  Lowest
                </li>
              </ul>
            </a>
          </div>
          <a class="btn" @click="changeLayout('bar')">
            <i class="fas fa-bars change-layout bar-layout"></i>
          </a>
          <a class="btn" @click="changeLayout('grid')">
            <i class="fas fa-grip-horizontal change-layout grid-layout"></i>
          </a>
          <a class="btn" v-on:click="insights = !insights">
            <i class="fas fa-lightbulb c-y"></i>
          </a>
        </div>
      </section>
          <div
        class="grid"
            :class="[
              { 'loader-effect': fetching },
              { 'g-three': layout == 'grid' },
            ]"
          >
            <Listitem v-for="e in allExpenses" :key="e._id" :e="e"></Listitem>
            <div class="contentFallBack" v-if="this.allExpenses.length == 0">
              <h2>No Result To Display</h2>
            </div>
          </div>
        </div>
      </div>
      <!-- <transition name="slither">
      <router-view></router-view>
      </transition> -->
      <Insights
        v-if="InsightsState"
        :thisMonth="allexpenses"
        v-on:close="InsightsState = false"
      ></Insights>
    </main>
  </div>
</template>

    
<script>
import Loading from "@/components/general/Loading.vue";
import Listitem from "@/components/expenses/List-item.vue";
import Filters from "@/components/expenses/Filter.vue";
import Insights from "@/components/expenses/Insights.vue";
import * as moment from "moment";

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { exists } from "fs";
export default {
  name: "Expenses",
  data() {
    return {
      InsightsState: false,
      allexpenses: [],
      type: null,
      layout: "bar",

      from: moment()
        .startOf("month")
        .format("YYYY-MM-DD"),
      to: moment()
        .endOf("month")
        .format("YYYY-MM-DD")
    };
  },
  components: {
    Listitem,
    Filters,
    Loading,
    Insights
  },
  computed: {
    ...mapGetters("expenses", ["findByType", "sortheigest", "sortlowest"]),

    ...mapState("expenses", [
      "fetching",
      "allExpenses",
      "customTypes",
      "filters"
    ])
  },
  beforeDestory() {
    this.$store.dispatch({
      type: "expenses/resetFilter"
    });
  },
  created() {
    this.getExpenses(
      "/admin/api/bills?from=2022-02-01&&to=2022-02-28&&type=date",
      {
        filterType: "date",
        filterVal: "2022-02-01-2022-02-28"
      },
      true
    );
  },
  methods: {
    changeLayout: function(layout) {
      this.layout = layout;
    },
    getinsights(val) {
      this.InsightsState = val;
    },

    async getExpenses(url, filter, update) {
      const exist = this.checkFilter(filter.filterType, filter.filterVal);
      if (exist) return true;
      this.$store.dispatch({
        type: "expenses/updateFilter",
        data: { items: res, filter }
      });
      const res = await this.$store.dispatch({
        type: "expenses/fetchBills",
        data: { url: url, update }
      });
    },
    checkFilter: function(filterType, filterVal) {
      let exist = false;
      for (let item of this.filters.types) {
        if (item.filterType === filterType && item.filterVal === filterVal) {
          exist = true;
          break;
        }
      }
      return exist;
    },
    sortItems: function(type, event) {
      event.stopPropagation();
      let expenses;
      if (type == "lowest") {
        expenses = this.sortlowest(this.allExpenses);
      } else {
        expenses = this.sortheigest(this.allExpenses);
      }
      this.$store.dispatch("expenses/setBills", expenses);
    }
  },
  watch: {
    type(val) {
      this.groupData = null;
      val == "all"
        ? (this.allexpenses = this.allExpenses)
        : (this.allexpenses = JSON.parse(JSON.stringify(this.findByType(val))));
    }
  }
};
</script>

<style scoped>
.filter-type-item {
  background: var(--second-color);
  text-shadow: 1px 1px 3px #fff;
  color: #fff;
  border: 0 !important;
}
.filter-type {
  overflow: scroll;
}

@media only screen and (min-width: 320px) and (max-width: 767px) {
}
</style>
