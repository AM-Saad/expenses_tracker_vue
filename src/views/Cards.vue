<template>
  <div class="wrapper">
      <h1>Your Cards</h1>
    <Cards></Cards>
  </div>
</template>

    
<script>
import Cards from "@/components/card/Cards.vue";

import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "allCards",
  data() {
    return {};
  },
  components: {
    Cards: Cards
  },
  created() {
    console.log("here");
  }
};
</script>

<style scoped>
</style>
