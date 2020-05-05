<template>
  <div id="playlists">
      <PlayListHead/>
  </div>
</template>

<script>
import PlayListHead from "@/components/PlayListHead"
export default {
    name : "PlayLists",
    components:{
        PlayListHead
    }
}
</script>

<style scoped>
#playlists{
    width: 100%;
    padding: 10px 20px;
    height: 485px;
    overflow-y: scroll;
}
</style>