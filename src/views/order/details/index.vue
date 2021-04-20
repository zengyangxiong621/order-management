<template>
  <div style="padding: 30px;height: calc(100vh - 100px)">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="100%">
      <el-table-column
        label="图片"
        min-width="120px"
      >
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" width="100px" height="100px">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜名"
        fixed
      >
      </el-table-column>
      <el-table-column
        label="价格"
      >
        <template slot-scope="scope">
          <span>{{ '¥' + scope.row.price + '/' + scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="nums"
        label="数量"
      >
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: space-between" v-show="tableData.length > 0">
      <el-tag style="font-size: 20px; margin-top: 20px">总价：{{ priceSum }}</el-tag>
      <br/>
      <el-button type="primary" style="margin-top: 10px" @click="$router.back()">
        确定
      </el-button>
    </div>

  </div>

</template>

<script>
import { getOrder } from '@/api/menu'

export default {
  name: 'Details',
  data() {
    return {
      tableData: [],
      id: '',
      priceSum: 0
    }
  },
  methods: {},
  mounted() {
    this.id = this.$route.params.id
    getOrder(this.id)
      .then(res => {
        this.tableData = res.data.orderList
        console.log(res)
        this.tableData.forEach(item => {
          this.priceSum = this.priceSum + item.price * item.nums
        })
        console.log(this.tableData)
      })
  }
}
</script>

<style scoped>

</style>
