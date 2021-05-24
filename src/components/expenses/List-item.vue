<template>
  <router-link :to="{name:`item`, params:{id:e._id}}" :expensesId="e._id">
    <div class="content-item">
      <div class="content-item_bar">
        <span class>{{e.date}}</span>
        <!-- <i class="fas fa-ellipsis-v sub-menu_btn"></i>
        <ul class="sub-menu">
          <li class="sub-menu_item getInvoice">
            Invoice
            <i class="fas fa-file"></i>
          </li>

          <li v-if="!e.status.paid">Paid</li>
          <li class="deleteExpenses">
            Remove
            <i class="fas fa-trash"></i>
          </li>
        </ul>-->
        <div class="expenses-group_item_body">
          <p class="paidState"></p>
          <div class="marked paidstatuse block">
            <span v-if="e.approved " class="c-g" tooltip="Approved" flow="left">
              <i class="far fa-check-circle"></i>
            </span>
            <span v-if="!e.approved " class="c-r" tooltip="Not approved" flow="left">
              <i class="far fa-times-circle"></i>
            </span>
          </div>

          <div class="marked" :style="{right:'70px'}" :class="{'block':e.scheduled.state}" v-if="!e.approved">
            <span
              :tooltip="'Duo to ' + e.duo"
              flow="left"
              :class="{ 'c-r': e.duo < today, 'c-y': e.duo == today,'c-g': e.duo > today}"
            >
              <i class="fa fa-calendar"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="content-item_body grid">
        <p class="t-p">
          Amount: $
          <b>{{e.amount}}</b>
        </p>
        <span>Notes: {{e.notes || 'No notes..'}}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import * as io from "socket.io-client";
import * as moment from "moment";

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "expenses",
  data() {
    return {
      today: [moment().format("YYYY-MM-DD")]
    };
  },
  props: ["e"],

  computed: { ...mapState(["isAuth"]) },
  components: {},
  watch: {
    i: (value, val2) => {}
  },
  async created() {},
  methods: {}
};
</script>

<style>

</style>
