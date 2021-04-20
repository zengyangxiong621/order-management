<template>
  <div style="padding:30px;height: calc(100vh - 100px);overflow: auto">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="100%"
      :default-sort = "{prop: 'createTime', order: 'descending'}"
    >
      <el-table-column
        label="订单创建时间"
        sortable
        prop="createTime"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="评价"
        prop="intro"
      >
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status ? 'success' : 'warning'" size="small">{{scope.row.status ? '已完成' : '未完成'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="170px"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleSearch(scope.$index, scope.row)">查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import dayjs from 'dayjs'

import { getOrderList } from '@/api/menu'
export default {
  name: 'Order',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getTime(value) {
      return dayjs(value).format("YYYY-MM-DD HH:mm:ss")
    },
    handleSearch(index, row) {
      // console.log(index)
      this.$router.push(`order/details/${row._id}`)
    },
    async getList() {
      // const res = await axios.get('https://www.fastmock.site/mock/04a15af9d901ff038b44ce4c04ee3d22/menu/api/order-menu')
      const res = await getOrderList()
      this.tableData = res.data
      console.log('this.tableData', this.tableData)
    }
    // addDishClick() {
    //   this.$router.push('dish/update_dish/ ')
    // }
  },
  mounted() {
    this.getList()
  }
}
</script>
