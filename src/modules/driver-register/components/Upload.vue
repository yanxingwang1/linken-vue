<template>
  <div class="upload_wrapper">
     <!-- <form id="form"  method="POST" enctype="multipart/form-data"> -->
    <div class="upload_box"  v-for="(item, index) in imgList" :key="item+index">
      <div class="upload" @click="handleChangeImg(index)">
        <img class="" :src="item" >
      </div>
      <div class="cancel" @click="handleCancel(index)">
        <img src="../images/delete.png">
      </div>
    </div>
    <label ref="upload_dom" v-show="this.imgList.length<max" class="upload_btn" :style="{backgroundImage: 'url(' + uploadBg + ')'}" for="upInput"></label>
    <input id="upInput" name="upInput" style="display:none;" type="file"
    @change="handleUpload(++local)" accept="image/png,image/jpeg,image/gif">
     <!-- </form> -->
  </div>
</template>

<script>
export default {
  props: ['max'],
  data () {
    return {
      deleteImg: require('../images/delete.png'),
      uploadBg: require('../images/4_0003_uploadpic.png'),
      imgList: [],
      local: 0,
      add: true
    }
  },
  methods: {
    handleUpload (local) {
      this.local = local
      // console.log(event.target.files[0])
      if (!event.target.files[0]) {
        return false
      }
      let file = event.target.files[0]
      let reader = new FileReader()
      if (file.size > 18293270) {
        alert('图片太大啦！')
      } else {
        if (this.add) {
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            // console.log('成功读取....')
            // console.log(e.target.result)
            this.imgList.push(e.target.result)
          }
        } else {
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            // console.log('成功读取....')
            // console.log(e.target.result)
            this.imgList.splice(this.local, 1, e.target.result)
          }
        }
        this.add = true
        this.$emit('listenToUpload',file )
      }
    },
    handleCancel (local) {
      this.imgList.splice(local, 1)
      this.local = local
    },
    handleChangeImg (local) {
      this.local = local - 1
      this.add = false
      this.$refs.upload_dom.click()
    }
  }
}
</script>

<style scoped>
.upload_wrapper{
  display: flex;
}
.upload_box{
  width: 28%;
  display: inline-block;
  margin-right:20px;
}
.upload_box:last-child{
  margin-right: 0;
}
.upload{
  width: 100%;
  height:80px;
  border: 1px dotted #c9cdff;
}
.upload img{
  width: 100%;
  height: 100%;
}
.cancel{
  text-align: center;
  padding: 5px 0;
}
.cancel img{
  width:15%;
}
.upload_btn{
  display: inline-block;
  width: 30%;
  height:80px;
  border: 1px dotted #c9cdff;
  background-size: 75%;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
