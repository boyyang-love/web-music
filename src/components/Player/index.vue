<template>
  <div id="player">
      <audio :src="url" autoplay controls></audio>
  </div>
</template>

<script>
export default {
    name : "Player",
    data(){
      return{
       
      }
    },
    computed :{
      url(){
        return this.$store.state.player.url;
      }
    }
}
</script>

<style scoped>
  #player audio{
    width: 100%;
    height: 55px;
  }
</style>