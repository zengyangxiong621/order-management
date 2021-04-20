<template>
  <div style="overflow: auto;height: calc(100vh - 50px);padding:20px 30px 30px 30px">
    <el-table
      :data="tableData">
      <el-table-column
        label="菜品类型"
      >
        <template slot-scope="scope">
          <el-input
            placeholder="请输入菜品类型"
            v-model="scope.row.name"
            :disabled="scope.row.edit ? true : false">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <div v-show="scope.row.edit">
            <el-button @click="editClick(scope.row)" size="small" style="margin-right: 20px">编辑</el-button>
            <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="您确定要删除该菜品类型吗"
              @onConfirm="deleteClick(scope.$index, scope.row)"
            >
              <el-button type="danger" size="small" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
          <div v-show="!scope.row.edit">
            <el-button @click="saveClick(scope.row)" type="primary" size="small" style="margin-right: 10px">保存
            </el-button>
            <el-button @click="cancelClick(scope.$index, scope.row)" size="small">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" style="margin: 10px" @click="tableData.push({'edit': 0})">
      新增<i class="el-icon-plus el-icon--right"></i>
    </el-button>

  </div>

</template>

<script>
import { getDishType, addDishType, delDishType, updateDishType } from '@/api/menu'

export default {
  name: 'User',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    editClick(row) {
      row.edit = 0
    },
    cancelClick(index, row) {
      if (row._id) {
        row.edit = 1
      } else {
        this.tableData.splice(index, 1)
      }

    },
    async deleteClick(index, row) {
      await delDishType(row._id)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.tableData.splice(index, 1)

      // await this.fetchList()
    },
    async saveClick(row) {
      if (row.name) {
        if (!row._id) {
          try {
            const res = await addDishType({ name: row.name })
            row.edit = 1
            console.log(res)
          } catch (err) {
            this.$message({
              message: '该菜品类型已经存在',
              type: 'error'
            })
          }
        } else {
          try {
            const res = await updateDishType(row._id, {
              name: row.name
            })
            row.edit = 1

            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } catch (err) {
            this.$message({
              message: '该菜品类型已经存在',
              type: 'error'
            })
          }
        }
        // this.fetchList()
      } else {
        this.$message({
          message: '输入不能为空',
          type: 'error'
        })
      }
      // console.log(res)
    },
    async fetchList() {
      const res = await getDishType()
      this.tableData = res.data.map(item => {
        return {
          edit: 1,
          ...item
        }
      })
      console.log(res)
    }
  },
  created() {

  },
  mounted() {
    this.fetchList()
  },
  components: {}
}
</script>
