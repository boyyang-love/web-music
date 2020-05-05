<template>
  <div id="result">
    <div class="result">
      <div class="star">
        <div class="name">
          <h1>{{$route.query.q}}</h1>
          <span>找到{{num}}个结果</span>
        </div>
        <div class="type">
          <el-tabs v-model="activeIndex">
            <el-tab-pane label="歌曲" name="songs">
              <div class="songs">
                <table class="el-table playlit-table">
                  <thead>
                    <th></th>
                    <th>音乐标题</th>
                    <th>歌手</th>
                    <th>专辑</th>
                    <th>时长</th>
                  </thead>
                  <tbody>
                    <tr
                      class="el-table__row"
                      v-for="(item,i) in songList"
                      :key="i"
                      @dblclick="playmusic(item.id)"
                    >
                      <td>{{i+1}}</td>
                      <td>
                        <div class="song-wrap">
                          <span>{{item.name}}</span>
                          <span class="mvPlay" v-if="item.mvid!=0">
                            <i class="iconfont icon-MV" @click="playMv(item.mvid)"></i>
                          </span>
                        </div>
                        <span class="about">{{item.alias[0]}}</span>
                      </td>
                      <td>{{item.artists[0].name}}</td>
                      <td>{{item.album.name}}</td>
                      <td>{{item.duration}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="num"
                    :page-size="10"
                  ></el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="歌单" name="lists">
              <div class="musiclist">
                <div class="item-musiclist" v-for="(item,i) in playlists" :key="i">
                  <div class="img">
                    <img :src="item.coverImgUrl" alt />
                    <div class="playcount">播放量:{{item.playCount}}</div>
                    <div class="play">
                      <i class="iconfont icon-bofang2"></i>
                    </div>
                  </div>
                  <div class="name">
                    <p>{{item.name}}</p>
                  </div>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="num"
                    :page-size="10"
                    @current-change="handleCurrentChange"
                  ></el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="MV" name="mv">
              <div class="mvs">
                <div class="mv">
                  <div class="mv-wraper" v-for="(item,i) in mvlists" :key="i">
                    <div class="mv-img">
                      <img :src="item.cover" alt />
                      <div class="mv-playcount">
                        <i class="el-icon-caret-right"></i>
                        {{item.playCount}}
                      </div>
                      <div class="mv-play-icon">
                        <i class="iconfont icon-bofang2" @click="playMv(item.id)"></i>
                      </div>
                      <div class="mv-time">5:20</div>
                    </div>
                    <div class="mv-name">{{item.name}}</div>
                    <div class="singer">{{item.artistName}}</div>
                  </div>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="num"
                    :page-size="8"
                    @current-change="handleCurrentChange"
                  ></el-pagination>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
      songList: [],
      num: 0,
      activeIndex: "songs",
      page: 1,
      playlists: [],
      mvlists: [],
      limit: 10
    };
  },
  watch: {
    activeIndex() {
      this.getall();
    }
  },
  methods: {
    playMv(id){
      console.log(id)
    },
    playmusic(id) {
      this.$axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id
        }
      }).then(res => {
        let songUrl = res.data.data[0].url;
        this.$store.state.player.url = songUrl;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getall();
    },
    getall() {
      let type = 1;
      switch (this.activeIndex) {
        case "songs":
          type = 1;
          this.limit = 10;
          break;
        case "lists":
          type = 1000;
          this.limit = 10;
          break;
        case "mv":
          type = 1004;
          this.limit = 8;
          break;
        default:
          break;
      }
      this.$axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          type,
          limit: this.limit,
          offset: (this.page - 1) * this.limit
        }
      }).then(res => {
        // console.log(res);
        if (type == 1) {
          this.songList = res.data.result.songs;
          this.num = res.data.result.songCount;
          let len = this.songList.length;
          for (let i = 0; i < len; i++) {
            //   分
            let min = parseInt(this.songList[i].duration / 1000 / 60);
            let sec = parseInt((this.songList[i].duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.songList[i].duration = min + ":" + sec;
          }
        } else if (type == 1000) {
          this.playlists = res.data.result.playlists;
          this.num = res.data.result.playlistCount;
          let len = this.playlists.length;
          for (let i = 0; i < len; i++) {
            if (this.playlists[i].playCount > 10000) {
              this.playlists[i].playCount =
                parseInt(this.playlists[i].playCount / 10000) + "W";
            }
          }
        } else {
          // console.log(res);
          this.num = res.data.result.mvCount;
          this.mvlists = res.data.result.mvs;
          let len = this.mvlists.length;
          for (let i = 0; i < len; i++) {
            if (this.mvlists[i].playCount > 10000) {
              this.mvlists[i].playCount =
                parseInt(this.mvlists[i].playCount / 10000) + "w";
            }
          }
        }
      });
    }
  },
  created() {
    this.getall();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* 歌曲 */
#result {
  width: 100%;
  height: 485px;
  padding: 10px 20px;
  overflow-y: scroll;
}
div .songs {
  width: 100%;
}
div .song-wrap {
  margin-bottom: 5px;
}
div .name {
  margin-bottom: 25px;
}
tr .el-table__row {
  background-color: blue;
}
.type ul {
  list-style: none;
  display: flex;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid grey;
}
.type ul li {
  text-align: center;
  margin: 10px;
}
.mvPlay i {
  color: red;
  font-size: 18px;
  padding-left: 5px;
}
.el-table__row {
  cursor: pointer;
}
.active {
  color: red;
}
/* 歌单 */
.musiclist {
  display: flex;
  flex-wrap: wrap;
}
.item-musiclist {
  width: 200px;
  height: 244px;
  position: relative;
  margin: 10px;
}
.item-musiclist .playcount {
  position: absolute;
  top: 5px;
  right: 5px;
  color: aliceblue;
}
.item-musiclist .play:hover :first-child {
  opacity: 1;
  transition: opacity 1s ease;
}
.item-musiclist .play {
  position: absolute;
  margin: 0 auto;
}
div .img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.play .iconfont {
  opacity: 0;
  font-size: 40px;
  color: red;
  cursor: pointer;
}
.item-musiclist img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}
.item-musiclist .name {
  width: 200px;
  height: 20px;
  text-overflow: ellipsis;
}
/* MV */
div .mv {
  display: flex;
  flex-wrap: wrap;
}
.mv-wraper {
  width: 250px;
  height: 180px;
  margin: 10px;
}
.mv-img {
  width: 250px;
  height: 140px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mv-img img {
  width: 250px;
  height: 140px;
  border-radius: 6px;
}
.mv-img .mv-playcount {
  position: absolute;
  top: 15px;
  right: 10px;
  color: aliceblue;
}
.mv-img .mv-play-icon {
  position: absolute;
}
div .mv-play-icon:hover :first-child {
  opacity: 1;
  transition: opacity 1s ease;
}
.mv-img .mv-play-icon .iconfont {
  color: red;
  font-size: 40px;
  opacity: 0;
  cursor: pointer;
}
.mv-img .mv-time {
  position: absolute;
  bottom: 5px;
  right: 10px;
}
div .mv-name {
  font-size: 15px;
}
div .singer {
  font-size: 14px;
  color: #c5c5c5;
}

/* 分页 */
.page {
  width: 100%;
  height: 30px;
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
</style>