<template>
  <div id="findmusic">
    <div class="carousel">
      <Carousel/>
      <Recommend/>
      <NewMusic/>
      <Mv/>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import Recommend from "@/components/Recommend";
import NewMusic from "@/components/NewMusic";
import Mv from "@/components/Mv"
export default {
  name: "FindMusic",
  components : {
    Carousel,
    Recommend,
    NewMusic,
    Mv
  },
  data(){
    return{
      url : ''
    }
  }
};
</script>

<style scoped>
#findmusic {
  width: 100%;
  height: 485px;
  padding: 10px 20px;
  overflow-y: scroll;
}
</style>