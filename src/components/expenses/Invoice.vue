<template>
  <div class="invoice-wrapper">
    <div id="invoice">
      <router-link :to="{name:'item',params:{id:e._id}}">
        <i class="close close-invoice fas fa-times"></i>
      </router-link>
      <div class="toolbar hidden-print">
        <div class="text-right">
          <button id="printInvoice" class="btn btn-info">
            <i class="fa fa-print"></i> Print
          </button>
          <button class="btn btn-info">
            <i class="fa fa-file-pdf-o"></i> Export as PDF
          </button>
        </div>
        <hr />
      </div>
      <div class="invoice overflow-auto">
        <div style="min-width: 600px">
          <main>
            <div class="row contacts">
              <div class="col invoice-to">
                <div class="text-gray-light">INVOICE For:</div>
                <h2 class="to">{{e.type}}</h2>
              </div>
              <div class="col invoice-details">
                <h1 class="invoice-id">INVOICE {{e.serialNo}}</h1>
                <div class="date">Date of Invoice: {{e.date}}</div>
                <div
                  v-if="e.scheduled.state"
                  class="date"
                >Due Date: {{e.scheduled.date || '______________'}}</div>
              </div>
            </div>
            <table border="0" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th class="text-left">DESCRIPTION</th>
                  <th class="text-right">COST</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="no">01</td>
                  <td class="text-left">
                    <h3>
                      <a
                        target="_blank"
                        href="https://www.youtube.com/channel/UC_UMEcP_kF0z4E6KbxCpV1w"
                      >{{e.for}}</a>
                    </h3>
                    {{e.description}}
                  </td>
                  <td class="unit">${{e.amount}}</td>
                  <td class="qty">{{e.quantity}}</td>
                  <td class="total">${{e.total}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2"></td>
                  <td colspan="2">SUBTOTAL</td>
                  <td>$${{e.total}}</td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td colspan="2">TAX 0%</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td colspan="2">GRAND TOTAL</td>
                  <td>${{e.total}}</td>
                </tr>
              </tfoot>
            </table>
            <div class="thanks">Thank you!</div>
            <div class="notices">
              <div>NOTICE:</div>
              <div
                class="notice"
              >A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
            </div>
          </main>
          <footer>Invoice was created on a computer and is valid without the signature and seal.</footer>
        </div>
        <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom-->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "Invoice",
  data() {
    return {
      e: null
    };
  },
  props: ["e"],
  computed: {
    ...mapState("expenses", ["allExpenses"])
  },
  methods: {
    getExpenses: async function(expensesId) {
      const expenses = await this.$store.dispatch({
        type: "expenses/getOne",
        data: { id: expensesId }
      });
      if (expenses) {
        this.e = expenses;
        // this.fetching = false;
      }
    }
  },
  created() {
    const expensesId = this.$route.params.id;
    if (!this.e) {
      this.getExpenses(expensesId);
    }
  },
  watch: {
    // fetching: function(val) {
    //   !this.fetching && this.getExpenses(this.$route.params.id);
    // }
  }
};
</script>

<style>
.invoice-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  max-width: 100%;
  max-height: 100%;
  z-index: 999999999;
  overflow: scroll;
}
#invoice {
  padding: 30px;
}

.invoice {
  position: relative;
  background-color: #fff;
  min-height: 680px;
  padding: 15px;
}

.invoice header {
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #3989c6;
}

.invoice .company-details {
  text-align: right;
}

.invoice .company-details .name {
  margin-top: 0;
  margin-bottom: 0;
}

.invoice .contacts {
  margin-bottom: 20px;
}

.invoice .invoice-to {
  text-align: left;
}

.invoice .invoice-to .to {
  margin-top: 0;
  margin-bottom: 0;
}

.invoice .invoice-details {
  text-align: right;
}

.invoice .invoice-details .invoice-id {
  margin-top: 0;
  color: #3989c6;
}

.invoice main {
  padding-bottom: 50px;
}

.invoice main .thanks {
  margin-top: -100px;
  font-size: 2em;
  margin-bottom: 50px;
}

.invoice main .notices {
  padding-left: 6px;
  border-left: 6px solid #3989c6;
}

.invoice main .notices .notice {
  font-size: 1.2em;
}

.invoice table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}

.invoice table td,
.invoice table th {
  padding: 15px;
  background: #eee;
  border-bottom: 1px solid #fff;
}

.invoice table th {
  white-space: nowrap;
  font-weight: 400;
  font-size: 16px;
}

.invoice table td h3 {
  margin: 0;
  font-weight: 400;
  color: #3989c6;
  font-size: 1.2em;
}

.invoice table .qty,
.invoice table .total,
.invoice table .unit {
  text-align: right;
  font-size: 1.2em;
}

.invoice table .no {
  color: #fff;
  font-size: 1.6em;
  background: #3989c6;
}

.invoice table .unit {
  background: #ddd;
}

.invoice table .total {
  background: #3989c6;
  color: #fff;
}

.invoice table tbody tr:last-child td {
  border: none;
}

.invoice table tfoot td {
  background: 0 0;
  border-bottom: none;
  white-space: nowrap;
  text-align: right;
  padding: 10px 20px;
  font-size: 1.2em;
  border-top: 1px solid #aaa;
}

.invoice table tfoot tr:first-child td {
  border-top: none;
}

.invoice table tfoot tr:last-child td {
  color: #3989c6;
  font-size: 1.4em;
  border-top: 1px solid #3989c6;
}

.invoice table tfoot tr td:first-child {
  border: none;
}

.invoice footer {
  width: 100%;
  text-align: center;
  color: #777;
  border-top: 1px solid #aaa;
  padding: 8px 0;
}

@media print {
  .invoice {
    font-size: 11px !important;
    overflow: hidden !important;
  }

  .invoice footer {
    position: absolute;
    bottom: 10px;
    page-break-after: always;
  }

  .invoice > div:last-child {
    page-break-before: always;
  }
}
</style>