<template>
  <div>
    <aside class="section-filters grid g-two parent-card">
      <div class="flex">
        <div class="form-group">
          <select
            class="form-control"
            name="datetype"
            id="datetype"
            v-model="datetype"
          >
            <option value="date" selected>date</option>
            <option value="duo">Duo</option>
            <option value="release_date">Release Date</option>
          </select>
        </div>
        <div class="section-filters_date">
          <h5>Date Range:</h5>
          <v-calendar is-double-paned v-model="date"></v-calendar>
          <v-date-picker
            mode="range"
            color="red"
            is-dark
            v-model="date"
          ></v-date-picker>
        </div>
      </div>
      <section class>
        <h5>Filter</h5>
        <div class="flex">
          <div class="types-btn">
            <a class="btn p-relative sub-menu_btn sort-menu_btn">
              <i class="fas fa-sort"></i> Type
            </a>
          </div>
          <div v-if="!group">
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
          <div>
            <a class="btn sub-menu_btn group-menu_btn p-relative">
              <i class="far fa-object-group"></i>
              Group by
              <ul class="sub-menu">
                <li @click="groupItems('approved')">Approved</li>
                <li
                  class="btn bg-w group schedule-expenses"
                  @click="groupItems('scheduled')"
                >
                  Scheduled
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
    </aside>
  </div>
</template>
  
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import VCalendar from "v-calendar";

export default {
  name: "Filter",
  data() {
    return {
      insights: false,
      openfilter: false,
      datetype: "date",
      date: null,
    };
  },
  components: {
    VCalendar,
  },
  computed: {
    ...mapState("expenses", ["dateRange"]),
    ...mapGetters("expenses", [
      "sortheigest",
      "sortlowest",
      "groupApprovedExpenses",
    ]),
  },
  props: ["expenses", "group"],
  created() {
    this.date = this.dateRange;
  },
  methods: {
    changeLayout: function (layout) {
      this.$emit("layout", layout);
    },
    sortItems: function (type, event) {
      event.stopPropagation();
      let expenses;
      if (type == "lowest") {
        expenses = JSON.parse(JSON.stringify(this.sortlowest(this.expenses)));
      } else {
        expenses = JSON.parse(JSON.stringify(this.sortheigest(this.expenses)));
      }
      this.$emit("filtered", expenses);
    },
    groupItems: function (type) {
      const data = this.groupApprovedExpenses(this.expenses);
      this.$emit("groupeditems", { state: "approved", data });
    },
    getQueryUrl: (query, searchType) => {
      switch (searchType) {
        case "date":
          return `?from=${query.from}&&to=${query.to}&&type=${query.type}`;
        case "serial":
          return `?no=${query.no}`;
        case "category":
          return `?category=${query.category}`;
        case "id":
          return `?id=${query.id}`;
        case "status":
          return `?status=${query.status}`;
        default:
          return ``;
      }
    },
    findByDate: async (val) => {
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
  },
  watch: {
    date(date) {
      this.findByDate(date);
      // this.$store.dispatch({ type: "expenses/updatesearchdate", date });
    },

    insights(val) {
      this.$emit("insights", this.insights);
    },
  },
};
</script>

<style scoped>
h5 {
  color: var(--main-color);
}
.section-filters_date /deep/ input {
  color: #fff !important;
  background-color: var(--second-color) !important;
  background-clip: padding-box !important;
  border: 1.1 px solid var(--main-color) !important;
  line-height: 1.5 !important;
  border-radius: var(--main-radius) !important;
  padding: 3px var(--scnd-padding);
  font-size: 14px;
  width: 180px;
  margin-right: var(--scnd-margin);
}
.types-btn {
  display: none;
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .g-two {
    grid-template-columns: 1fr;
  }
}
</style>