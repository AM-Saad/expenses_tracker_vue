<template>
  <div v-if="groupData">
    <div class="group-items grid bg-darkgray" v-for="(k, propName) in groupData.data" :key="propName">
      <h3 v-if="groupData.state == 'approved'">{{propName == 'true' ? 'Approved' : 'Not Approved'}}</h3>
      <h3 v-if="groupData.state == 'scheduled'">{{propName=='true'?'Scheduled':'Not Scheduled'}}</h3>
      <div class="items">
        <Listitem v-for="e in groupData.data[propName]" :key="e._id" :e="e"></Listitem>
      </div>
    </div>
  </div>
</template>

<script>
import Listitem from "@/components/expenses/List-item.vue";

export default {
  data() {
    return {};
  },
  props: ["groupData"],
  components: {
    Listitem
  },
  watch: {
    groupData(val) {
    }
  }
};
</script>

<style>
</style>