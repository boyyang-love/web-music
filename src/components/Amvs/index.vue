<template>
  <div id="amvs">
    <div class="amvs">
      <div class="filter">
        <div class="area">
          <span style="cursor:text">地区:</span>
          <span :class="{active:area=='全部'}" @click="area='全部'">全部</span>
          <span :class="{active:area=='内地'}" @click="area='内地'">内地</span>
          <span :class="{active:area=='港台'}" @click="area='港台'">港台</span>
          <span :class="{active:area=='欧美'}" @click="area='欧美'">欧美</span>
          <span :class="{active:area=='日本'}" @click="area='日本'">日本</span>
          <span :class="{active:area=='韩国'}" @click="area='韩国'">韩国</span>
        </div>
        <div class="type">
          <span style="cursor:text">类型:</span>
          <span @click="type='全部'" :class="{active:type=='全部'}">全部</span>
          <span @click="type='官方版'" :class="{active:type=='官方版'}">官方版</span>
          <span @click="type='原声'" :class="{active:type=='原声'}">原声</span>
          <span @click="type='现场版'" :class="{active:type=='现场版'}">现场版</span>
          <span @click="type='网易出品'" :class="{active:type=='网易出品'}">网易出品</span>
        </div>
        <div class="order">
          <span style="cursor:text">排序:</span>
          <span :class="{active:order=='上升最快'}" @click="order='上升最快'">上升最快</span>
          <span :class="{active:order=='最热'}" @click="order='最热'">最热</span>
          <span :class="{active:order=='最新'}" @click="order='最新'">最新</span>
        </div>
      </div>
      <div class="mv-content">
        <div class="mvs" v-for="(item,i) in mvs" :key="i">
          <div class="img-wrapper">
            <img :src="item.cover" alt />
            <div class="play">
                <i class="el-icon-caret-right" @click="play(item.id)"></i>
                <span class="playCount">{{item.playCount}}</span>
            </div>
          </div>
          <div class="name-wrapper">{{item.name}}</div>
        </div>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          :current-page= "page" 
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Amvs",
  tag: "",
  data() {
    return {
      total: 20,
      page: 1,
      limit: 12,
      area: "全部",
      type: "全部",
      order: "上升最快",
      mvs: []
    };
  },
  watch: {
    area() {
      this.getMv();
      this.page = 1;
    },
    type() {
      this.getMv();
      this.page = 1;
    },
    order() {
      this.getMv();
      this.page = 1;
    }
  },
  methods: {
    getMv() {
      // https://autumnfish.cn/mv/all
      this.$axios({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.page - 1) * this.limit
        }
      }).then(res => {
        // console.log(res);
        this.mvs = res.data.data;
        let len = this.mvs.length;
        for(let i=0; i<len; i++){
            if(this.mvs[i].playCount>10000){
                this.mvs[i].playCount = parseInt(this.mvs[i].playCount/10000) + "W"
            }
        }
        if(res.data.count){
            this.total = res.data.count;
        }
        
      });
    },
    handleCurrentChange(val){
        this.page = val;
        this.getMv();
    },
    play(id){
        console.log(id)
    }
  },
  created() {
    this.getMv();
  }
};
</script>

<style scoped>
.filter {
  height: 117px;
  width: 100%;
  background-color: #fff;
}
.filter div {
  width: 100%;
  display: flex;
}
.filter div > span {
  margin: 10px 15px 10px 10px;
  display: block;
  cursor: pointer;
  /* cursor:default; */
  /* cursor: none; */
  
}
.active {
  color: red;
}
div .mv-content {
  display: flex;
  flex-wrap: wrap;
}
div .img-wrapper{
    position: relative;
}
div .mvs,
div .img-wrapper img {
  width: 250px;
  height: 185px;
}
div .img-wrapper img {
  height: 144px;
  border-radius: 7px;
}
div.mvs {
  margin: 0px 25px 30px 0px;
}
div .page {
  width: 100%;
  height: 40px;
  text-align: center;
}
div .play{
    position: absolute;
    top: 10px;
    right: 5px;
    color: cornsilk;
}
div .play i{
    font-size: 24px;
    color: whitesmoke;
    cursor: pointer;
}
div .play i:hover{
    color: red;

}
div .playCount:hover{
    color: red;
}
div .playCount{
    padding-left: 6px;
    color: white;
}
</style>