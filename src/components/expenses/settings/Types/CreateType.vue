<template>
  <form
    method="post"
    @submit.prevent="createType()"
    class="create-unit-box external-box"
    :class="{ 'loader-effect' : loading}"
  >
    <router-link :to="{name: 'expenses'}">
      <i class="fas fa-times close font-s toggle-create-unit"></i>
    </router-link>
    <div class="flex f-space-around form-actions">
      <h3>New Type</h3>
      <button id="saveunit" type="submit" class="btn-small btn-success">Save</button>
    </div>
    <div class="form-group">
      <label for="newunitname">Name</label>
      <input class="form-control" type="text" placeholder="Type Name" v-model="name" />
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import helpers from "@/components/expenses/helpers/main";

export default {
  name: "CreateType",
  data() {
    return {
      loading: false,
      name: null
    };
  },
  computed: {
    ...mapState("expenses", ["fetching"])
  },
  created(){
    console.log('created');
    
  },
  methods: {
    createType: async function() {
      this.loading = true;
      const valid = helpers.validateType(this.name);
      if (valid.state) {
        const res = await this.$store.dispatch({
          type: "expenses/createType",
          data: {
            name: this.name
          }
        });
      } else {
        this.$store.commit("msg", { msg: valid.msg, type: "info" });
      }
      this.loading = false;
    }
  }
};
</script>

<style>
</style>