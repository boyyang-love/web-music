<template>
  <div id="mvdetail">
    <div class="mvdetail">
      <div class="mv">
        <div class="mv-play">
          <h3>MV详情</h3>
          <video :src="mvurl" controls autoplay></video>
          <div class="singer-info">
            <div class="head-img">
              <img :src="singsimg" alt />
              <div class="name">{{mvInfo.artistName}}</div>
            </div>
          </div>
          <div class="mv-ifo">
            <h2 class="title">{{mvInfo.name}}</h2>
            <div class="time">发布：2016-05-22 播放：{{mvInfo.playCount}}次</div>
            <div class="des">{{mvInfo.desc}}</div>
          </div>
          <div class="hot-recomment">
            <h3>热门评论</h3>
            <div class="item" v-for="(item,i) in hotComment" :key="i">
              <div class="user-img">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span style="color: #517eaf">{{item.user.nickname}}:</span>
                  {{item.content}}
                </div>
                <div class="recomment" v-if="item.beReplied.length!=0">
                  <span style="color: #517eaf">{{item.beReplied[0].user.nickname}}:</span>
                  <p>{{item.beReplied[0].content}}</p>
                </div>
                <div class="onload-time">
                  <span style="color:#bebebe">2017-03-21 06:33:15</span>
                </div>
              </div>
            </div>
          </div>
          <div class="new-recomment">
            <h3>最新评论</h3>
            <div class="item" v-for="(item,i) in comment" :key="i">
              <div class="user-img">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span style="color: #517eaf">{{item.user.nickname}}:</span>
                  {{item.content}}
                </div>
                <div class="recomment" v-if="item.beReplied.length!=0">
                  <span style="color: #517eaf">{{item.beReplied[0].user.nickname}}:</span>
                  <p>{{item.beReplied[0].content}}</p>
                </div>
                <div class="onload-time">
                  <span style="color:#bebebe">2017-03-21 06:33:15</span>
                </div>
              </div>
            </div>
            <div class="page">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="20"
                @current-change="handleCurrentChange"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="recomment-mv">
        <h3>相关推荐</h3>
        <div class="mv-item" v-for="(item,i) in simiMv" :key="i">
          <div class="mv-box">
            <img :src="item.cover" alt />
            <div class="play">
              <i class="iconfont icon-bofang1" @click="play(item.id)"></i>
            </div>
            <div class="play-conunt">
              <i class="el-icon-caret-right" @click="play(item.id)"></i>
              <span>{{item.playCount}}</span>
            </div>
          </div>
          <div class="name">
            <div class="mv-name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvDtail",
  data() {
    return {
      mvurl: "",
      simiMv: [],
      mvInfo: {},
      singsimg: "",
      comment: [],
      hotComment: [],
      total: 0,
      page: 1
    };
  },
  created() {
    this.getmv();
  },
  methods: {
    play(id) {
      this.$axios({
        url: "https://autumnfish.cn/mv/url",
        method: "get",
        params: {
          id
        }
      }).then(res => {
        // console.log(res)
        this.mvurl = res.data.data.url;
      });

      //获取相关mv
      this.$axios({
        url: "https://autumnfish.cn/simi/mv",
        method: "get",
        params: {
          mvid: id
        }
      }).then(res => {
        // console.log(res)
        this.simiMv = res.data.mvs;
      });

      //https://autumnfish.cn/mv/detail
      // 获取歌手信息
      this.$axios({
        url: "https://autumnfish.cn/mv/detail",
        method: "get",
        params: {
          mvid: id
        }
      }).then(res => {
        // console.log(res)
        this.mvInfo = res.data.data;
        // 获取歌手头像
        // https://autumnfish.cn/artists
        this.$axios({
          url: "https://autumnfish.cn/artists",
          method: "get",
          params: {
            id: this.mvInfo.artists[0].id
          }
        }).then(res => {
          // console.log(res)
          this.singsimg = res.data.artist.img1v1Url;
        });
      });
      // 获取评论
       this.$axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id,
          limit: 20,
          offset: 0
        }
      }).then(res => {
        // console.log(res);
        this.hotComment = res.data.hotComments;
        this.comment = res.data.comments;
        this.total = res.data.total;
      });
    },
    getmv() {
      // mv播放 https://autumnfish.cn/mv/url
      // mv相关推荐 https://autumnfish.cn/simi/mv
      this.$axios({
        url: "https://autumnfish.cn/mv/url",
        method: "get",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        // console.log(res)
        this.mvurl = res.data.data.url;
      });

      //获取相关mv
      this.$axios({
        url: "https://autumnfish.cn/simi/mv",
        method: "get",
        params: {
          mvid: this.$route.query.id
        }
      }).then(res => {
        // console.log(res)
        this.simiMv = res.data.mvs;
      });
      //https://autumnfish.cn/mv/detail
      // 获取歌手信息
      this.$axios({
        url: "https://autumnfish.cn/mv/detail",
        method: "get",
        params: {
          mvid: this.$route.query.id
        }
      }).then(res => {
        // console.log(res)
        this.mvInfo = res.data.data;
        // 获取歌手头像
        // https://autumnfish.cn/artists
        this.$axios({
          url: "https://autumnfish.cn/artists",
          method: "get",
          params: {
            id: this.mvInfo.artists[0].id
          }
        }).then(res => {
          // console.log(res)
          this.singsimg = res.data.artist.img1v1Url;
        });
      });
      // 获取mv评论
      // https://autumnfish.cn/comment/mv
      this.$axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.id,
          limit: 20,
          offset: 0
        }
      }).then(res => {
        // console.log(res);
        this.hotComment = res.data.hotComments;
        this.comment = res.data.comments;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.page = val;
      this.getallcomment();
    },
    getallcomment() {
      this.$axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.id,
          limit: 20,
          offset: (this.page-1)*20
        }
      }).then(res => {
        // console.log(res);
        // this.hotComment = res.data.hotComments;
        this.comment = res.data.comments;
        // this.total = res.data.total;
      });
    }
  }
};
</script>

<style scoped>
/* 左右两栏布局 */
#mvdetail {
  width: 100%;
  height: 485px;
  padding: 10px 20px;
  overflow-y: scroll;
}
.mvdetail {
  width: 100%;
  display: flex;
}
.mv {
  flex: 4;
  margin: 15px;
}
.mv-play video {
  width: 100%;
  height: 400px;
}
.recomment-mv {
  flex: 2;
  margin: 15px;
}
/* 头像及评论 */
.head-img {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.head-img div.name {
  margin-left: 15px;
}
.head-img img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.item {
  display: flex;
  margin: 10px;
}
.item .user-img img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.content {
  margin-left: 10px;
}
.onload-time {
  margin-left: 10px;
  margin-top: 20px;
}
.des {
  margin: 10px;
}
.recomment {
  width: 100%;
  margin: 15px;
  padding-bottom: 10px;
  background-color: #e6e5e6;
  border-radius: 8px;
}
.content-wrap {
  width: 100%;
}
.page {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
/* 相关推荐 */
.mv-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 15px;
}
.mv-box img {
  width: 180px;
  height: 101px;
  border-radius: 5px;
}
.mv-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mv-box:hover :last-child {
  opacity: 1;
  transition: opacity 1s ease;
}
.play {
  position: absolute;
  color: red;
}
.play .iconfont {
  font-size: 38px;
  opacity: 0;
  cursor: pointer;
}
.play-conunt {
  position: absolute;
  top: 3px;
  right: 5px;
  color: white;
  font-size: 18px;
}
</style>