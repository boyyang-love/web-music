<template>
  <div id="mvs">
    <div class="mvs">
        <Amvs/>
    </div>
  </div>
</template>

<script>
import Amvs from "@/components/Amvs"
export default {
  name: "Mvs",
  components:{
    Amvs
  }
};
</script>

<style scoped>
#mvs {
  width: 100%;
    padding: 10px 20px;
    height: 485px;
    overflow-y: scroll;
}
</style>