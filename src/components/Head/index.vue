<template>
  <div id="head">
    <div class="head">
      <div class="btn">
        <i class="el-icon-success"></i>
        <i class="el-icon-success"></i>
        <i class="el-icon-error"></i>
      </div>
      <div class="next">
        <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
        <i class="el-icon-arrow-right" @click="$router.go(1)"></i>
      </div>
      <div class="search">
        <div class="sicon">
          <i class="el-icon-search" @click="toResult"></i>
        </div>
        <input type="text" placeholder="搜索" @keyup.enter="toResult" v-model="inputValue" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      inputValue: ""
    };
  },
  methods:{
    toResult(){
      if(this.inputValue == ''){
        this.$message.warning('请输入内容')
      }else{
        this.$router.push('/result?q='+this.inputValue)
      }
    },
    // goBack(){
    //   this.$router.back
    // },
    // goNext(){

    // }
  }
};
</script>

<style scoped>
#head {
  width: 100%;
  height: 60px;
  background-color: #f9f9f9;
  position: absolute;
  top: 0;
  left: 0;
}
#head .head {
  display: flex;
}
#head .head .btn {
  font-size: 24px;
  margin-left: 15px;
  margin-top: 5px;
  width: 160px;
}
#head .head .btn i {
  cursor: pointer;
}
#head .head .btn i:nth-child(1):hover {
  color: rgb(66, 66, 143);
}
#head .head .btn i:nth-child(2):hover {
  color: rgb(202, 60, 60);
}
#head .head .btn i:nth-child(3):hover {
  color: rgb(212, 148, 28);
}
#head .head .next {
  font-size: 28px;
  margin-top: 10px;
  cursor: pointer;
}
#head .head .next i {
  padding: 6px;
}
#head .head .next i:hover {
  background-color: #ededed;
  border-radius: 50%;
}
#head .head .search {
  box-sizing: border-box;
  border: 1px solid #f0f0f4;
  position: absolute;
  height: 32px;
  top: 10px;
  right: 30px;
  background-color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
#head .head .search:hover {
  border: 1px solid rgb(107, 105, 105);
}

.head .search input {
  border: none;
  outline: none;
  background-color: white;
  height: 28px;
  margin-left: 10px;
}
.sicon {
  margin-left: 10px;
}
.search .iconfont {
  font-size: 25px;
  color: red;
}
</style>