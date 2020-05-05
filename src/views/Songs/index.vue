<template>
  <div id="songs">
    <NewSongs/>
  </div>
</template>

<script>
import NewSongs from "@/components/NewSongs";
export default {
  name: "Songs",
  components:{
    NewSongs
  }
};
</script>

<style scoped>
#songs {
  width: 100%;
  height: 485px;
  padding: 10px 20px;
  overflow-y: scroll;
}
</style>