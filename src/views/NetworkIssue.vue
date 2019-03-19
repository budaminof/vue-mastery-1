<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>It looks like you are experiencing some network issues, please click the back botton and try again.</h3>
    <router-link :to="{name: 'event-list'}">OR GO BACK TO THE HOME PAGE</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>