<template>
  <div class="external-box expenses-type-box none f-space-between">
    <h4>New Expenses Type</h4>
    <i class="fas fa-times font-s close new-expenses-type"></i>
    <div class="m-b-3">
      <input
        type="text"
        class="form-control"
        name="expenses-type"
        placeholder="Expenses type name..."
      />
    </div>
    <a class="save-expenses-type btn btn-info p-1 m-t-3">save</a>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Units",
  data() {
    return {
      choosenUnits: [],
      newUnit: false,
      unitname: null
    };
  },
  props: ["units"],
  created() {
    this.choosenUnits.push({
      name: this.units[0].name,
      percentage: this.units[0].percentage
    });
  },
  methods: {
    addUnit: function() {
      if (this.unitname == null) {
        return this.$store.dispatch({
          type: "displayMsg",
          data: { type: "info", msg: "Choose unit" }
        });
      }
      const unit = this.units.find(u => u.name == this.unitname);
      const exsitUnit = this.choosenUnits.filter(u => u.name == this.unitname);
      if (exsitUnit.length > 0) {
        return this.$store.dispatch({
          type: "displayMsg",
          data: { type: "warning", msg: "Unit Already choosen" }
        });
      }
      this.choosenUnits.push({
        name: unit.name,
        percentage: unit.percentage
      });
    },
    removeUnit: function(u) {
      this.choosenUnits = this.choosenUnits.filter(unit => unit.name != u);
    }
  },
  watch: {
    unitname: function(val, val2) {
      const unitname = JSON.parse(JSON.stringify(val));
      const unit = this.units.find(u => u.name == unitname);
      document.getElementById("unitPercentage").value = unit.percentage;
    },
    choosenUnits: function(val, val2) {
      this.$emit("itemUnits", val);
    },
    destroyed() {
      this.choosenUnits = [];
      this.$emit("itemUnits", []);
    }
  }
};
</script>

<style>
</style>