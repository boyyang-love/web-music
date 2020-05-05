<template>
  <div id="nav">
    <ul>
      <router-link to="/findMusic" tag="li">
        <div><i class="iconfont icon-shouye-faxianyinle"></i> 发现音乐</div>
      </router-link>
      <router-link to="/playLists" tag="li">
        <div><i class="iconfont icon-yinlegedan-"></i> 推荐歌单</div>
      </router-link>
      <router-link to="/songs" tag="li">
        <div><i class="iconfont icon-B"></i> 最新音乐</div>
      </router-link>
      <router-link to="/mvs" tag="li">
        <div><i class="iconfont icon-mv1"></i> 最新MV</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style scoped>
#nav {
  width: 200px;
  height: 505px;
  background-color: #ededed;
}
#nav ul {
  width: 200px;
  list-style: none;
  margin: 0;
  padding: 0;
}
#nav ul li{
    width: 100%;
    height: 60px;
    display: flex;
    justify-self: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
}
#nav ul li:hover{
  background-color: #999797;
}
#nav ul li div{
    width: 100%;
    height: 25px;
    font-size: 18px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 
    'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.iconfont{
    font-size: 20px;
}

.active{
    color: red;
    animation: active .5s ease-in-out;
}
@keyframes active {
    0%{
        color: blue;
    }
    50%{
        color: black;
    }
    100%{
        color: red;
    }
}
</style>