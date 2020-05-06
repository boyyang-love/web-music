<template>
  <div id="listDetail">
    <div class="playlist">
      <div class="top-wrap">
        <div class="img-wrap">
          <img :src="playlist.coverImgUrl" alt />
        </div>
        <div class="text-wrap">
          <p class="title">{{playlist.name}}</p>
          <div class="auther-wrap">
            <img :src="background" alt />
            <span>{{nickname}}</span>
            <span>{{time}} 创建</span>
          </div>
          <div class="tag-wrap">
            <ul style="listStyle:none; display:flex">
              <span style="marginTop:6px">标签:</span>
              <li v-for="(item,i) in playlist.tags" :key="i" style="margin:5px">{{item + '/'}}</li>
            </ul>
          </div>
          <div class="desc">{{playlist.description}}</div>
        </div>
      </div>
      <div class="main-wrap">
        <el-tabs v-model="activeIndex">
          <el-tab-pane label="歌曲列表" name="songslist">
            <div class="songlist-wrap">
              <table class="el-table playlit-table">
                <thead>
                  <th></th>
                  <th></th>
                  <th>音乐标题</th>
                  <th>歌手</th>
                  <th>专辑</th>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in musiclist" :key="i">
                    <td>{{i+1}}</td>
                    <td>
                      <div class="img-wrap">
                        <img :src="item.al.picUrl" alt />
                        <i class="iconfont icon-bofang2 play" @click="play(item.id)"></i>
                      </div>
                    </td>
                    <td>
                      <div class="song-wrap">
                        <span>{{item.name}}</span>
                      </div>
                      <span class="about"></span>
                    </td>
                    <td>{{item.ar[0].name}}</td>
                    <td>{{item.al.name}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评论 " name="comment">
            <!-- 热门评论 -->
            <div class="comment">
              <div class="title">
                <h3>热门评论({{commentNum}})</h3>
                <div class="hot-comment">
                  <ul>
                    <li v-for="(item,i) in comment" :key="i">
                      <div class="head-img">
                        <img :src="item.user.avatarUrl" alt />
                      </div>
                      <div class="comments">
                        <span style="color:#5192CB;font-size:14px">{{item.user.nickname}}:</span>
                        {{item.content}}
                        <div class="replied" v-if="item.beReplied.length!==0">
                          <div
                            style="color:#5192CB;font-size:14px"
                          >{{item.beReplied[0].user.nickname}}:</div>
                          <span>{{item.beReplied[0].content}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 更多评论 -->
            <div class="comment">
              <div class="title">
                <h3>更多评论({{newcommentNum}})</h3>
                <div class="hot-comment">
                  <ul>
                    <li v-for="(item,i) in newcomment" :key="i">
                      <div class="head-img">
                        <img :src="item.user.avatarUrl" alt />
                      </div>
                      <div class="comments">
                        <span style="color:#5192CB;font-size:14px">{{item.user.nickname}}:</span>
                        {{item.content}}
                        <div class="replied" v-if="item.beReplied.length!==0">
                          <div
                            style="color:#5192CB;font-size:14px"
                          >{{item.beReplied[0].user.nickname}}:</div>
                          <span>{{item.beReplied[0].content}}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="page">
              <el-pagination background layout="prev, pager, next" 
              @current-change="handleCurrenChange"
              :page-size="20"
              :current-page="page"
              :total="newcommentNum"></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayListDetail",
  data() {
    return {
      activeIndex: "songslist",
      total: 0,
      page: 1,
      playlist: {},
      nickname: "",
      time: "",
      background: "",
      musiclist: [],
      limit: 10,
      comment: [],
      commentNum: "",
      newcomment: [],
      newcommentNum: 0
    };
  },
  watch: {
    activeIndex() {
      let type = 0;
      switch (this.activeIndex) {
        case "songslist":
          type = 0;
          break;
        case "comment":
          type = 2;
          break;
        default:
          break;
      }
      if (type == 0) {
        //   歌曲
        this.getPlayList(type);
      } else {
        //   热评
        this.getComment(type);
      }
    }
  },
  created() {
    //   https://autumnfish.cn/playlist/detail/?id=4871231728
    // console.log(this.$route.query.id);
    this.getTitle();
    this.getPlayList();
    this.newComment();
  },
  methods: {
    getTitle() {
      this.$axios({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        //   console.log(res.data);
        this.playlist = res.data.playlist;
        this.nickname = res.data.playlist.creator.nickname;
        this.time = res.data.playlist.creator.createTime;
        this.background = res.data.playlist.creator.backgroundUrl;
      });
    },
    getPlayList(type) {
      this.$axios({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.id,
          type,
          limit: this.limit
        }
      }).then(res => {
        this.musiclist = res.data.playlist.tracks;
        // console.log(res.data.playlist);
      });
    },
    getComment(type) {
      this.$axios({
        url: "https://autumnfish.cn/comment/hot",
        method: "get",
        params: {
          id: this.$route.query.id,
          type
        }
      }).then(res => {
        this.comment = res.data.hotComments;
        this.commentNum = res.data.total;
      });
    },
    newComment() {
      // 最新评论 https://autumnfish.cn/comment/playlist
      this.$axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
          limit: 20,
          offset: (this.page - 1)*20,
          id: this.$route.query.id
        }
      }).then(res => {
        // console.log(res);
        this.newcomment = res.data.comments;
        this.newcommentNum = res.data.total;
        this.total = res.data.total;
      });
    },
    play(id) {
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
    handleCurrenChange(val){
      this.page = val;
      this.newComment();
    }
  }
};
</script>

<style scoped>
#listDetail {
  width: 100%;
  padding: 10px 20px;
  height: 485px;
  overflow-y: scroll;
}
.top-wrap {
  width: 100%;
  height: 234px;
  display: flex;
}
.img-wrap img {
  width: 230px;
  height: 230px;
}
.text-wrap {
  margin-left: 30px;
}
.text-wrap .auther-wrap {
  display: flex;
  width: 100%;
  height: 35px;
  margin-bottom: 25px;
  align-items: center;
  margin-left: 15px;
}
.text-wrap .tag-wrap {
  margin-bottom: 15px;
}
.auther-wrap img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 5px;
}

/* main-wrap */
.songlist-wrap {
  width: 100%;
}
.main-wrap {
  margin-top: 10px;
}
td .img-wrap {
  width: 70px;
  height: 70px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
td .img-wrap img {
  width: 70px;
  height: 70px;
}
.play {
  position: absolute;
  font-size: 20px;
  color: red;
  cursor: pointer;
}
/* 热门评论 */
.hot-comment ul {
  list-style: none;
  width: 100%;
}
.hot-comment ul li {
  width: 100%;
  display: flex;
  margin: 15px;
}
.head-img {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 10px;
}
.head-img img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comments {
  width: 100%;
}
.replied {
  width: 100%;
  background-color: #e6e5e6;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0px;
}
/* 更多评论 */
.page{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>