<template>
  <div class="parent-card" :class="{ 'loader-effect': loading }">
    <h2>Scheduled:</h2>
    <div>
      <h5>Today</h5>
      <div v-for="e in today" :key="e._id">
        <router-link
          :to="{ name: `item`, params: { id: e._id } }"
          :expensesId="e._id"
        >
          <div class="list-item">
            <div class="grid">
              <span class>{{ e.type }}</span>
              <span class="c-g">$ {{ e.total }}</span>
            </div>
            <span
              v-if="e.approved"
              class="alert-success font-s p-3 border-r-m state"
              >Approved</span
            >
            <span
              v-if="!e.approved"
              class="alert-warning font-s p-3 border-r-m state"
              >Not Approved</span
            >
          </div>
        </router-link>
      </div>
      <span v-if="today.length == 0" class="p-medium c-gray"
        >No Scheduled today</span
      >
      <h5>Tomorrow</h5>

      <div v-for="e in tomorrow" :key="e._id">
        <router-link
          :to="{ name: `item`, params: { id: e._id } }"
          :expensesId="e._id"
        >
          <div class="list-item">
            <div class="grid">
              <span class>{{ e.category }}</span>
              <span class="c-g">$ {{ e.amount }}</span>
            </div>
            <span
              v-if="e.approved"
              class="alert-success font-s p-3 border-r-m state"
              >Approved</span
            >
            <span
              v-if="!e.approved"
              class="alert-warning font-s p-3 border-r-m state"
              >Not Approved</span
            >
          </div>
        </router-link>
      </div>
      <span v-if="tomorrow.length == 0" class="p-medium c-gray"
        >No Scheduled tomorrow</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import * as moment from "moment";

export default {
  name: "Schaduled",
  data() {
    return {
      loading: true,
      today: [],
      tomorrow: [],
    };
  },
  computed: {
    ...mapState("expeenses", ["allCards"]),
  },

  async created() {
    this.today = await this.$store.dispatch({
      type: "expenses/findByDate",
      data: {
        from: moment().format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
        datetype: "duo",
      },
    });
    this.tomorrow = await this.$store.dispatch({
      type: "expenses/findByDate",
      data: {
        from: moment().add(1, "days").format("YYYY-MM-DD"),
        to: moment().add(1, "days").format("YYYY-MM-DD"),
        datetype: "duo",
      },
    });
    this.loading = false;
  },
  watch: {
    tomorrow(val) {
      this.loading = false;
    },
  },
};
</script>

<style>
@media only screen and (min-width: 320px) and (max-width: 767px) {
}
</style>