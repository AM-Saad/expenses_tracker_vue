<template>
  <p
    class="message"
    :class="{ 'alert-warning' : notifiy.type=='warning', 'alert-success':  notifiy.type=='success' ,'alert-info':  notifiy.type=='info', 'alert-danger':  notifiy.type=='danger'}"
  >{{notifiy.msg}}</p>
</template>

<script>
export default {
  props: ["notifiy"]
};
</script>

<style>
</style>