<template>
  <div id="mv">
    <h3>推荐MV</h3>
    <div class="mv">
      <div class="content">
        <div class="body" v-for="(item,i) in mv" :key="i">
          <div class="play">
            <img :src="item.picUrl" alt />
            <i class="iconfont icon-bofang2" @click="play(item.id)"></i>
          </div>
          <div class="info">
            <div class="mes">{{item.copywriter}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mv",
  data() {
    return {
      mv: []
    };
  },
  methods: {
    play(id){
      // console.log(id)
      this.$router.push('/mvdetail?id=' + id)
    }
  },
  created() {
    // 推荐mv https://autumnfish.cn/personalized/mv
    let MV = window.localStorage.getItem('MV');
    if(MV){
      this.mv =JSON.parse(MV) ;
      console.log("mv已经加载");
    }else{
      this.$axios({
      url: "https://autumnfish.cn/personalized/mv",
      method: "get"
    }).then(res => {
      // console.log(res);
      let MV = res.data.result;
      this.mv = res.data.result;
      window.localStorage.setItem('MV', JSON.stringify(MV));
    });
    }
    
  }
};
</script>

<style scoped>
.body{
  flex: 1;
  margin: 2px;
  border-radius: 5px;
}
.body .play {
  height: 140px;
  width: 100%;
  background-color: blue;
  margin-left: 5px;
  position: relative;
}
.content {
  width: 100%;
  display: flex;
}
.play img {
  width: 100%;
  height: 140px;
}
.play:hover :last-child {
  opacity: 1;
  transition: opacity 1s ease;
}
div .info {
  width: 100%;
  height: 65px;
  overflow-wrap: break-word;
  margin-left: 5px;
}
.info .mes,
.info .singer {
  width: 100%;
  font-size: 15px;
}
.info .singer {
  font-size: 14px;
  color: #c5c5c5;
}
.iconfont {
  color: red;
  font-size: 50px;
  position: absolute;
  left: calc(50% - 25px);
  top: calc(50% - 25px);
  z-index: 3;
  opacity: 0;
  cursor: pointer;
}
</style>