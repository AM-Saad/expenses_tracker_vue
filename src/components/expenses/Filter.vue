<template>
  <div>
    <aside class="section-filters grid g-two parent-card">
      <div>
     
      <div class="flex section-filters_date_wrapper">
        <div class="flex">

        
        <div class="form-group">
          <select
            class="border-none"
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
          <v-calendar is-double-paned v-model="date"></v-calendar>
          <v-date-picker
            mode="range"
            color="red"
            is-dark
            v-model="date"
          ></v-date-picker>
        </div>
        </div>
        <div class="p-relative">
            <a class="btn sub-menu_btn">Filter<i class="fa fa-caret-down m-r-3 m-l-3"></i></a>
            <ul class="sub-menu">
                <li class=" p-relative">
                    <a class="sub-menu_btn second-level">Category<i
                            class="fa fa-caret-left m-r-3 m-l-3"></i></a>
                    <ul class="sub-menu">
                        <li v-for="t in combinedcategories"  @click="startFiltering(t,'category', true)"  :key="t" class="filter-shipments" data-filter="category" :data-sku="t" :data-val="t">
                            {{t}}
                        </li>
                    </ul>
                </li>

            </ul>
          </div>
      </div>
       <div class="options-filters flex">
  <div v-for="t in filters.types" :key="t.filterVal" class="options-filters_tag" @click="removeFilter(t.filterVal, t.filterType)" :data-filter="t.filterType" :data-sku="t.filterVal" :data-val="t.filterVal">
            <i class="fas fa-times remove-filter"></i>
            <span>{{t.filterVal}}</span>
        </div>
                    </div>
      </div>
     
    </aside>
  </div>
</template>
  
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import VCalendar from "v-calendar";
import * as moment from "moment";
import { exists } from "fs";

export default {
  name: "Filter",
  data() {
    return {
      insights: false,
      openfilter: false,
      datetype: "date",
      date: null
    };
  },
  components: {
    VCalendar
  },
  computed: {
    ...mapState("expenses", ["dateRange", "categories", "filters"]),
    combinedcategories() {
      return [
        ...this.categories,
        ...["advertising", "wages", "utilities", "rent"]
      ];
    }
  },
  async created() {
    const res = await this.$store.dispatch({
      type: "expenses/getCategories"
    });
  },
  methods: {
    changeLayout: function(layout) {
      this.$emit("layout", layout);
    },

    groupItems: function(type) {
      const data = this.groupApprovedExpenses(this.expenses);
      this.$emit("groupeditems", { state: "approved", data });
    },
    startFiltering: async function(filterVal, filterType, update) {
      let url = "";

      if (filterType === "category") {
        url = this.getQueryUrl({ category: filterVal }, filterType);
      } else if (filterType == "date") {
        url = this.getQueryUrl(
          {
            from: moment(filterVal.start).format("YYYY-MM-DD"),
            to: moment(filterVal.end).format("YYYY-MM-DD"),
            type: this.datetype
          },
          filterType
        );
        filterVal =
          moment(filterVal.start).format("YYYY-MM-DD") +
          "-" +
          moment(filterVal.end).format("YYYY-MM-DD");
      } else {
      }
      this.$emit("search", url, { filterType, filterVal }, update);
    },

    removeFilter: function(filterVal, filterType) {
      this.$store.dispatch("expenses/removeFilter", { filterVal, filterType });
    },

    getQueryUrl: (query, searchType) => {
      switch (searchType) {
        case "date":
          return `/admin/api/bills?from=${query.from}&&to=${query.to}&&type=${
            query.type
          }`;
        case "serial":
          return `/admin/api/bills?no=${query.no}`;
        case "category":
          return `/admin/api/bills?category=${query.category}`;
        case "id":
          return `/admin/api/bills?id=${query.id}`;
        case "zone":
          return `/admin/api/bills?zone=${query.zone}`;
        default:
          return `/admin/api/bills`;
      }
    }
  },
  watch: {
    date(date) {
      this.startFiltering(date, "date", true);
    },
    insights(val) {
      this.$emit("insights", this.insights);
    }
  }
};
</script>

<style scoped>
h5 {
  color: var(--main-color);
}
.section-filters_date_wrapper {
  justify-self: baseline;
  align-self: center;
}
.section-filters_date /deep/ input {
  background-clip: padding-box !important;
  border: 1.1 px solid var(--main-color) !important;
  line-height: 1.5 !important;
  border-radius: var(--main-radius) !important;
  padding: 3px var(--s-padding);
  font-size: 14px;
  width: 180px;
  margin-right: var(--s-margin);
}
.types-btn {
  display: none;
}
.options-filters {
  max-width: 100%;
  overflow-x: scroll;
  background: #f9f9f9;
  padding: var(--s-padding) 0;
}

.options-filters_tag {
  background-color: #ccc;
  height: 29px;
  min-width: 100px;
  line-height: 28px;
  padding: 0 var(--s-padding);
  border: 1px solid #777;
  border-radius: var(--s-radius);
  font-size: 13px;
  margin: 0 var(--s-margin);
  text-align: center;
}
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .g-two {
    grid-template-columns: 1fr;
  }
}
</style>