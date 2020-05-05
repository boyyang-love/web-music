<template>
  <div id="carousel">
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="(item,i) in banners" :key="i">
        <img :src="item.imageUrl" alt="" class="medium" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    name : "Carousel",
    data(){
      return{
        banners :''
      }
    },
    methods : {},
    created(){
      let BANNERS = window.localStorage.getItem('banner');
      if(BANNERS){
        this.banners = JSON.parse(BANNERS)
        console.log("banner已加载")
      }else{
        this.$axios({
        url : 'https://autumnfish.cn/banner',
        method : 'get',
        params : {}
      }).then(res=>{
        this.banners = res.data.banners;
        let banner = res.data.banners;
        window.localStorage.setItem('banner',JSON.stringify(banner))
        // console.log(res.data.banners);
      })
      }
      // https://autumnfish.cn/banner
      
    }
};
</script>

<style scoped>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
    width: 100%;
    height: 230px;
  }
</style>