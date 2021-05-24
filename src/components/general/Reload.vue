<template>
      <div class="reload">
      <h1>Hmmm...</h1>
      <p>Looks like you lost your connection, please check it and try again.</p>
      <button class="btn" @click="method()">Try Again</button>
    </div>
</template>

<script>
export default {
    props:['active','method']
}
</script>

<style>

</style>