<template>
  <div id="newmusic">
    <h3>最新音乐</h3>
    <div class="content">
      <div class="item" v-for="(item,i) in songs" :key="i">
        <div class="item-img">
            <img :src="item.picUrl" alt />
          <!-- <img src="../../assets/logo.png" alt /> -->
            <div class="play"><i class="iconfont icon-bofang1" @click="play(item.id)"></i></div>
        </div>
        <div class="item-songer">
          <p>{{item.name}}</p>
          <p>{{item.song.artists[0].name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMusic",
  data(){
      return{
          songs :[]
      }
  },
  methods:{
      play(id){
        //   播放音乐 https://autumnfish.cn/song/url
        //   console.log(id)
          this.$axios({
              url: 'https://autumnfish.cn/song/url',
              method: 'get',
              params :{
                  id
              }
          }).then(res=>{
              let songUrl = res.data.data[0].url;
              this.$store.state.player.url = songUrl;
          })
      }
  },
  created(){
    //   https://autumnfish.cn/personalized/newsong

    let SONGS = window.localStorage.getItem('SONGS');
    if(SONGS){
      this.songs = JSON.parse(SONGS);
      console.log("最新音乐已加载");
    }else{
      this.$axios({
        url:'https://autumnfish.cn/personalized/newsong',
        method: 'get'
    }).then(res=>{
        this.songs = res.data.result;
        let song = res.data.result;
        window.localStorage.setItem('SONGS',JSON.stringify(song));
        
    })
    }
    
  }

};
</script>

<style scoped>
#newmusic {
  width: 100%;
  
}
.content{
   display: flex;
   flex-wrap: wrap;
}
#newmusic .item {
  width: 45%;
  height: 100px;
  margin-left: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#newmusic .item:hover {
  background-color: #ededed;
}
.item .item-img {
  margin-left: 15px;
  position: relative;
}
.item .item-img img {
  width: 80px;
  height: 80px;
}
div.item-songer {
  margin-left: 15px;
}
div .play{
    width: 35px;
    height: 35px;
    z-index: 3;
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    text-align: center;
    
    
}
.item .item-img:hover :first-child{
    opacity: 1;
}
.iconfont {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    font-size: 35px;
    color: red;
    opacity: 0;
    cursor: pointer;
    
}
</style>