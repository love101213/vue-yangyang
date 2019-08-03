<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row :gutter="20"  class="clear">
            <el-button type="info">新增面试技巧</el-button>
        </el-row>
         <el-row :gutter="20"> 
           <el-col :span="6">
<el-input placeholder="请输入题目编号/题干"  >
    <template slot="prepend"> 关键字</template>
  </el-input>
  
          </el-col>
          <el-col :span="4">
            <el-button plain>清除</el-button>
          </el-col>
           
        </el-row>
        <!-- 列表 -->
         <el-table
      :data="articles.articleList"
      style="width: 100%">
      <el-table-column
       type="index"
        label="序号"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
       >
      </el-table-column>
       <el-table-column
        prop="visits"
        label="阅读数"
       >
      </el-table-column>
       <el-table-column
        prop="state"
        label="状态"
       >
       <template slot-scope="scope">
         {{scope.row.state == 1 ? '启用':'禁用'}}
       </template>
      </el-table-column>
      <el-table-column
        prop="creator"
        label="录入人"
       >
      </el-table-column>
       <el-table-column
    
        label="操作"
       >
       <template slot-scope="scope">
        <el-button type="text">预览</el-button>
        <el-button type="text">修改</el-button>
         <el-button type="text" @click="deleteItem(scope.id)">删除</el-button>
          <el-button type="text">
                {{scope.row.state == 1 ? '启用':'禁用'}}
          </el-button>
       </template>
      </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="articles.articleList.page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="articles.articleList.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="articles.articleCount">
    </el-pagination>
      </el-card>
      
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'ArticlesList',
  created () {
    this.$store.dispatch('getArticle')
  },
  computed: {
    ...mapState(['articles'])
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
}
</script>

<style scoped>
.el-button:hover{
 text-decoration: underline;
  cursor: pointer;
}
.clear {
 margin: 20px;
}
.el-table {
  margin: 15px;
}
.el-pagination {
  margin: 15px;
}

</style>
