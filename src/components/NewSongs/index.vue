<template>
  <div id="newsongs">
    <div class="newsongs">
      <div class="tabBar">
        <ul>
          <li :class="{active:tag==0}" @click="tag = 0">全部</li>
          <li :class="{active:tag==7}" @click="tag = 7">华语</li>
          <li :class="{active:tag==96}" @click="tag = 96">欧美</li>
          <li :class="{active:tag==8}" @click="tag = 8">日本</li>
          <li :class="{active:tag==16}" @click="tag = 16">韩国</li>
        </ul>
      </div>
      <div class="content">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr v-for="(item,i) in list" :key="i" class="el-table__row">
              <td>{{i+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.album.picUrl" alt />
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <span>{{item.name}}</span>
                </div>
                <span><i class="el-icon-video-play play"  @click="play(item.id)" ></i></span>

              </td>
              <td>{{item.album.artists[0].name}}</td>
              <td>{{item.album.name}}</td>
              <td>{{item.duration}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewSongs",
  data() {
    return {
      tag: 0,
      list: [],
      
    };
  },
  watch: {
    tag(){
      this.getList()
    }
  },
  methods: {
    play(id) {
      // console.log(id);
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
    },
    getList() {
      let mList = window.localStorage.getItem("mList");
      if (mList) {
        this.list = JSON.parse(mList);
        let len = this.list.length;
        for (let i = 0; i < len; i++) {
          let duration = this.list[i].duration;
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt(duration % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.list[i].duration = `${min}分${sec}秒`;
        }
        console.log("数据已加载");
        console.log(this.tag);
      } else {
        this.$axios({
          url: "https://autumnfish.cn/top/song/",
          method: "get",
          params: {
            type: this.tag
          }
        }).then(res => {
          // console.log(res);
          this.list = res.data.data;
          let music = res.data.data;
          window.localStorage.setItem("mList", JSON.stringify(music));
          let len = this.list.length;
          for (let i = 0; i < len; i++) {
            let duration = this.list[i].duration;
            let min = parseInt(duration / 1000 / 60);
            if (min < 10) {
              min = "0" + min;
            }
            let sec = parseInt(duration % 60);
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.list[i].duration = `${min}分${sec}秒`;
          }
        });
      }
    }
   
  },
  // created(){
  //   this.play()
  // },
   created() {
    // 顶部精品歌单 https://autumnfish.cn/top/playlist/highquality
    this.getList()
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
div .tabBar ul {
  list-style: none;
  display: flex;
  justify-content: flex-end;
}
.tabBar ul li {
  margin: 5px;
  cursor: pointer;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
/* tr:hover{
 background-color: beige;
} */
.img-wrap img {
  width: 70px;
  height: 70px;
}
.play {
  padding-top: 10px;
  color: red;
  font-size: 25px;
  cursor: pointer;
}
i:hover{
  color: rgb(173, 85, 85);
}

</style>