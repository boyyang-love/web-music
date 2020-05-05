<template>
  <div id="app">
    <Head/>
    <div class="content">
      <Nav/>
      <router-view/>
    </div>
    <Player/>
    
  </div>
</template>


<script>
import FindMusic from "./views/FindMusic";
import Head from "@/components/Head";
import Nav from "@/components/Nav";
import Player from "@/components/Player";
export default {
  components:{
    FindMusic,
    Head,
    Nav,
    Player
  }
}
</script>

<style scoped>
  .content{
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 60px;
  
  }
</style>
