<template>
  <div class="wrapper">
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
        </div>-->

        <Filters
          v-on:filtered="getFiltred"
          v-on:insights="getinsights"
          v-on:layout="changeLayout"
          v-on:groupeditems="getgroupitems"
          :expenses="allexpenses"
          :group="groupData"
        ></Filters>
      </section>

      <div class="expenses-box">
        <div id="operations-summary"></div>
      </div>

      <div class="main-content">
        <form class="filter-type parent-card">
          <div class="form-check btn filter-type-item">
            <label class="form-check-label" for="all">All</label>
            <input
              class="form-check-input"
              type="radio"
              v-model="type"
              id="all"
              value="all"
              checked
            />
          </div>
          <!-- TYPES -->
          <div class="filter-type_custom">
            <img
              src="/images/loading(3).svg"
              class="loading loading-small none"
            />
            <div
              class="form-check btn filter-type-item"
              v-for="t in customTypes"
              :key="t"
            >
              <label class="form-check-label" :for="t">{{ t }}</label>
              <input
                class="form-check-input"
                type="radio"
                v-model="type"
                :id="t"
                :value="t"
              />
            </div>
          </div>
          <!-- TYPE -->
          <div class="form-check btn filter-type-item">
            <label class="form-check-label" for="rent">Rent</label>
            <input
              class="form-check-input"
              type="radio"
              v-model="type"
              id="rent"
              value="rent"
            />
          </div>
          <div class="form-check btn filter-type-item">
            <label class="form-check-label" for="wages">Wages</label>
            <input
              class="form-check-input"
              type="radio"
              v-model="type"
              id="wages"
              value="wages"
            />
          </div>
          <div class="form-check btn filter-type-item">
            <label class="form-check-label" for="utilities">Utilities</label>
            <input
              class="form-check-input"
              type="radio"
              v-model="type"
              id="utilities"
              value="utilities"
            />
          </div>
          <div class="form-check btn filter-type-item">
            <label class="form-check-label" for="advertising"
              >Advertising</label
            >
            <input
              class="form-check-input"
              type="radio"
              v-model="type"
              id="advertising"
              value="advertising"
            />
          </div>
        </form>
        <div>
          <div
            class="content parent-card grid"
            v-if="!groupData"
            :class="[
              { 'loader-effect': fetching },
              { 'g-three': layout == 'grid' },
            ]"
          >
            <Listitem v-for="e in allexpenses" :key="e._id" :e="e"></Listitem>
            <div class="contentFallBack" v-if="allexpenses.length == 0">
              <h2>No Result To Display</h2>
            </div>
          </div>
          <GroupItems :groupData="groupData"></GroupItems>
        </div>
      </div>
      <!-- <transition name="slither"> -->
      <router-view></router-view>
      <!-- </transition> -->
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
import GroupItems from "@/components/expenses/Grouped-Items.vue";
import Filters from "@/components/expenses/Filter.vue";
import Insights from "@/components/expenses/Insights.vue";
import * as io from "socket.io-client";
import * as moment from "moment";

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "Expenses",
  data() {
    return {
      InsightsState: false,
      allexpenses: [],
      groupData: null,
      type: null,
      layout: "grid",
      from: moment().startOf("month").format("YYYY-MM-DD"),
      to: moment().endOf("month").format("YYYY-MM-DD"),
    };
  },
  components: {
    Listitem,
    Filters,
    Loading,
    GroupItems,
    Insights,
  },
  computed: {
    ...mapState(["isAuth"]),
    ...mapGetters("expenses", ["findByType"]),
    ...mapState("expenses", [
      "fetching",
      "allExpenses",
      "filters",
      "dateRange",
      "customTypes",
    ]),
  },
  async created() {
    if (this.filters.items.length == 0) {
      this.findByDate(this.dateRange);
    } else {
      if (this.filtered.length > 0) {
        this.filters.items = this.filtered;
      } else {
        this.filters.items = this.filters.items;
      }
    }

    if (this.customTypes.length == 0) {
      const res = await this.$store.dispatch({
        type: "expenses/getypes",
      });
    }
  },
  methods: {
    changeLayout: function (layout) {
      this.layout = layout;
    },
    getgroupitems: function (data) {
      this.groupData = null;

      this.groupData = data;
    },
    getinsights(val) {
      this.InsightsState = val;
    },
    async findByDate(val) {
      const from = moment(val.start).format("YYYY-MM-DD");
      const to = moment(val.end).format("YYYY-MM-DD");
      this.allexpenses = await this.$store.dispatch({
        type: "expenses/findByDate",
        data: {
          from: from,
          to: to,
          update: true,
        },
      });
    },
    getFiltred: function (e) {
      this.allexpenses = e;
    },
  },
  watch: {
    dateRange(val) {
      this.findByDate(val);
    },
    type(val) {
      this.groupData = null;
      val == "all"
        ? (this.allexpenses = this.allExpenses)
        : (this.allexpenses = JSON.parse(JSON.stringify(this.findByType(val))));
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: grid;
}
.main-content {
  display: grid;
  grid-template-columns: 1fr 8fr;
}
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
  .main-content {
    grid-template-columns: 1fr 3fr;
  }
  .content {
    width: 100%;
  }
}
</style>
