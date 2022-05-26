<template>
  <div class="navbar">
<!--    <div @click="$router.push('/')">Vue 3</div>-->
    <my-button @click="$router.push('/')">Home</my-button>
    <div class="navbar__btns">
      <my-button @click="$router.push('/test')">Test</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/store')">StorePg</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/about')">О сайте</my-button>

    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: 'Navbar',
  components: {MyButton}
}
</script>

<style scoped>
.navbar {
  height: 50px;
  max-width: 1400px;
  background-color: bisque;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  margin: 0px auto;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>