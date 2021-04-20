<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="60px" style="max-width: 400px">
      <el-form-item label="菜品名">
        <el-input v-model="form.name" placeholder="请输入菜品名字"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.dishTypeId" placeholder="请选择菜品类型">
          <el-option v-for="item in dishType" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" placeholder="请输入单价"/>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.unit" placeholder="请输入单位；例如：份、个等"/>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3000/menu/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.avatar" :src="form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea" placeholder="请描述"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          {{ id.length > 4 ? '修改' : '新增' }}
        </el-button>
        <el-button @click="onCancel" v-if="id.length > 4">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDishType, addDish, updateDish, getDishList } from '@/api/menu'
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        name: '',
        dishTypeId: '',
        desc: '',
        price: '',
        unit: '',
        avatar: ''
      },
      dishType: '',
      id: ''

    }
  },
  mounted() {
    // console.log('url:', window.location)
    this.id = this.$route.params.id
    this.getTypeList()
    if (this.id.length > 4) {
      // 获取id获取一个菜
      const self = this
      // console.log(this.id)
      getDishList({ _id: self.id }).then(res => {
        this.form = res.data[0]
        // console.log(this.form)
      })
    }
  },
  methods: {
    async getTypeList() {
      const res = await getDishType()
      this.dishType = res.data
      // console.log(this.dishType)
    },
    async onSubmit() {
      // console.log(this.$route.params.id)
      if (this.form.name.trim() === '') {
        return this.$message({
          message: '菜品名不能为空',
          type: 'error'
        })
      }
      if (this.id === ':id') {
        // 新增
        const res = await addDish(this.form)
        this.$router.push('/nested/dish')
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        console.log(res)
      } else if (this.id.length > 4) {
        console.log(this.id)
        const res = await updateDish(this.id, this.form)
        console.log(res)
        this.$router.back()
        //
        // const res = await updateDish('this.id', this.form)
        // console.log(this.form)
      }

    },
    handleAvatarSuccess(res, file) {
      console.log(file)
      console.log('res', res)
      this.form.avatar = res.url
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M
      return isLt2M
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {

  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
