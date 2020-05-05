<template>
  <div id="playlisthead">
    <div class="mask">
      <div class="photo">
        <img :src="topList.coverImgUrl" alt />
      </div>
      <div class="item">
        <div class="tag">
          <p>精品歌单</p>
        </div>
        <div class="title">{{topList.name}}</div>
        <div class="info">{{topList.description}}</div>
      </div>
      <img :src="topList.coverImgUrl" alt class="bg-img" />
      <div class="bg-mask"></div>
    </div>
    <div class="tabBar">
      <ul>
        <li
          v-for="(item,i) in type"
          :key="i"
          :class="{active:tag == item}"
          @click="tag=item"
        >{{item}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="items">
        <ul>
          <li v-for="(ite,i) in list" :key="i">
            <div class="item">
              <div class="desc">播放数量：{{ite.playCount}}</div>
              <img :src="ite.coverImgUrl" alt="图片" />
              <i class="iconfont icon-bofang1" @click="play(ite.id)"></i>
            </div>
            <p>{{ite.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page">
      <el-pagination 
        @current-change="handleCurrentChange"
        background 
        layout="prev, pager, next" 
        :total= "total" 
        :current-page= "page" 
        :page-size="10">
        
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayListHead",
  data() {
    return {
      total: 0,
      page: 1,
      topList: {},
      list: [],
      tag: "全部",
      type: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行"
      ]
    };
  },
  watch: {
    tag() {
      this.topData();
      this.listData();
      this.page = 1;
    }
  },
  methods: {
    // 获取精品歌单 顶部精品歌单 https://autumnfish.cn/top/playlist/highquality
    topData() {
      this.$axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          offset: 0,
          cat: this.tag
        }
      }).then(res => {
        //   console.log(res.data.playlists[0]);
        this.topList = res.data.playlists[0];
      });
    },
    // 获取音乐列表
    listData() {
      this.$axios({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 10,
          cat: this.tag,
          offset: (this.page - 1)*10
        }
      }).then(res => {
        // console.log(res);
        this.total = res.data.total;
        this.list = res.data.playlists;
        // console.log(this.page)
      });
    },
    play(id) {
      this.$router.push('/playlistdetail?id='+id)
    },
    handleCurrentChange(val){
      // console.log(val);
      this.page = val;
      this.listData();
    }
  },
  created() {
    // 顶部精品歌单 https://autumnfish.cn/top/playlist/highquality
    this.topData();
    this.listData();
  }
};
</script>

<style scoped>
/* 精品歌单css */
* {
  margin: 0;
  padding: 0;
}

.mask {
  width: 100%;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.mask .photo {
  z-index: 1;
}
.bg-img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  filter: blur(20px);
}
.bg-mask {
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.mask .photo img {
  margin: 15px;
  width: 160px;
  height: 160px;
}

.mask .item {
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  background-image: url();
  z-index: 1;
}
.item .tag {
  text-align: center;
  height: 30px;
  width: 100px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #dfac67;
  font-size: 16px;
  line-height: 30px;
  align-items: center;
  cursor: pointer;
  color: #dfac67;
}

.item .title {
  padding-top: 10px;
  height: 31px;
  color: #fff;
}
.item .info {
  height: 81px;
  width: 880px;
  line-height: 16px;
  color: #888482;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 5px;
}

/* tabBar css */
.tabBar ul {
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: flex-end;
}
.tabBar ul li {
  margin: 10px;
  cursor: pointer;
}

/* content */

.items {
  width: 100%;
  display: flex;
  justify-content: center;
}
.items ul {
  margin-left: 35px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.items ul li {
  width: 200px;
  height: 233px;
  padding: 5px;
}
.items ul li img {
  border-radius: 5px;
  width: 200px;
  height: 200px;
}
.items ul li p {
  font-size: 14px;
  overflow: hidden;
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.items ul li .item {
  overflow: hidden;
  position: relative;
}
.items ul li .item:hover :first-child {
  top: 0;
  transition: top 0.5s ease-in-out;
}
.items ul li .item:hover :last-child {
  /* right: 0px;
        top: 140px; */
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
div .desc {
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  max-height: 50px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 16px;
  padding: 5px;
  position: absolute;
  top: -50px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.items .iconfont {
  z-index: 3;
  position: absolute;
  right: 0px;
  bottom: 0px;
  font-size: 50px;
  color: #bbcdc5;
  opacity: 0;
  cursor: pointer;
}

/* 高亮状态 */
.active {
  color: red;
}
/* 分页 */
.page {
  width: 100%;
  height: 25px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>