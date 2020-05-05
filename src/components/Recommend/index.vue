<template>
  <div id="recommend">
    <h3>推荐歌单</h3>
    <div class="items">
      <ul>
        <li v-for="(item,i) in mes" :key="i">
          <div class="item">
            <div class="desc">{{item.copywriter}}</div>
            <img :src="item.picUrl" alt="图片" />
            <i class="iconfont icon-bofang1" @click="play(item.id)"></i>
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data() {
    return {
      mes: ""
    };
  },
  methods: {
    play(id) {
      // console.log(id);
      this.$router.push("/playlistdetail?id=" + id);
    }
  },
  created() {
    // 推荐歌单https://autumnfish.cn/personalized
    let MES = window.localStorage.getItem("MES");
    if (MES) {
      this.mes = JSON.parse(MES);
      console.log("推荐歌单已加载");
    } else {
      this.$axios({
        url: "https://autumnfish.cn/personalized",
        method: "get",
        params: {
          limit: 10
        }
      }).then(res => {
        this.mes = res.data.result;
        let mes = res.data.result;
        window.localStorage.setItem("MES", JSON.stringify(mes));
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
h3 {
  margin-bottom: 20px;
}
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

.item .iconfont {
  z-index: 3;
  position: absolute;
  right: 0px;
  bottom: 0px;
  font-size: 50px;
  color: #bbcdc5;
  opacity: 0;
  cursor: pointer;
}
</style>