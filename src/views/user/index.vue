<template>
  <div style="padding:20px 30px 30px 30px">
    <el-table
      :data="tableData">
      <el-table-column
        label="username">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入账号"
            v-model="scope.row.username"
            :disabled="scope.row.edit ? true : false">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="password"
        label="password">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入账号"
            v-model="scope.row.password"
            :disabled="scope.row.edit ? true : false">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">

          <div v-show="scope.row.edit">
            <el-button @click="editClick(scope.row)" size="small" style="margin-right: 20px">编辑</el-button>
            <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="您确定要删除该用户吗"
              @onConfirm="deleteClick(scope.row)"
            >
              <el-button type="danger" size="small" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
          <div v-show="!scope.row.edit">
            <el-button @click="saveClick(scope.row)" type="primary" size="small" style="margin-right: 10px">保存
            </el-button>
            <el-button @click="cancleClick(scope.$index, scope.row)" size="small">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" style="margin: 10px" @click="tableData.push({'edit': 0})">新增<i
      class="el-icon-plus el-icon--right"></i></el-button>

  </div>

</template>

<script>
import { getList, delManager, updateManager, registerManager } from '@/api/table'
import Cookies from 'js-cookie'

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
    saveClick(row) {
      // 更新
      if (!row.username || !row.password) {
        this.$message({
          message: '账号密码不能为空',
          type: 'error'
        })
        // this.getMangerList()
      } else if (row._id) {
        updateManager(row._id, {
          username: row.username,
          password: row.password
        }).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          row.edit = 1
        }).catch(err => {
          this.$message({
            message: '用户名已存在',
            type: 'error'
          })
        })
      } else {
        registerManager({
          username: row.username,
          password: row.password
        }).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          row.edit = 1
          // this.getMangerList()
        }).catch(err => {
          this.$message({
            message: '用户名已存在',
            type: 'error'
          })
        })
        // this.getMangerList()
      }

      // updateManager(row)
    },
    deleteClick(row) {
      delManager(row._id).then(res => {
        console.log(sessionStorage.username)
        if (row.username === sessionStorage.username) {
          sessionStorage.clear()
          Cookies.remove('vue_admin_template_token')
          this.$router.push('/login')
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getMangerList()
      })
    },
    getMangerList() {
      getList().then(res => {
        this.tableData = res.data.map(item => {
          return {
            edit: 1,
            ...item
          }
        })
      })
    },
    cancleClick(index, row) {
      console.log(row)
      if (row._id) {
        row.edit = 1
      } else {
        this.tableData.splice(index, 1)
      }
    }
  },
  created() {
    this.tableData = this.tableData.map(item => {
      return {
        edit: 1,
        ...item
      }
    })
  },
  mounted() {
    this.getMangerList()
  },
  components: {}
}
</script>
