<template>
    <Navbar></Navbar>
<div class="app">
    <router-view />
</div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {Navbar}
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    width: 1200px;
    padding: 20px;
    margin: 10px auto;
}
</style>