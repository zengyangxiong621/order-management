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
        prop="desc"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        prop="dishType"
        label="类型"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="170px"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="margin-right: 20px">编辑
          </el-button>
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="danger"-->
          <!--            @click="handleDelete(scope.$index, scope.row)">删除-->
          <!--          </el-button>-->
          <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='不用了'
            icon="el-icon-info"
            icon-color="red"
            title="您确定要删除该菜品吗"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button type="danger" size="mini" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    <el-button type="primary" style="margin-top: 10px" @click="addDishClick">-->
    <!--      新增<i class="el-icon-plus el-icon&#45;&#45;right"></i>-->
    <!--    </el-button>-->
  </div>

</template>

<script>
import { getDishList, delDish } from '@/api/menu'
import axios from 'axios'
import imgBase from '@/utils/imgBase'

export default {
  name: 'Dish',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index)
      this.$router.push(`dish/update_dish/${row._id}`)
    },
    async handleDelete(index, row) {
      console.log('row', row)
      delDish(row._id).then(() => {
        this.getList()
      })
    },
    async getList() {
      // const res = await axios.get('https://www.fastmock.site/mock/04a15af9d901ff038b44ce4c04ee3d22/menu/api/order-menu')
      const res = await getDishList()
      this.tableData = res.data
      console.log('this.tableData', this.tableData)
    },
    addDishClick() {
      this.$router.push('dish/update_dish/ ')
    }
  },
  mounted() {
    this.getList()
    getDishList().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
