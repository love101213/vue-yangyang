<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!--  按钮-->
        <el-row class="elbutton">
             <el-button type="info">新增试题</el-button>
          <el-button type="info">批量导入</el-button>
         
        </el-row>
        <el-row>
          <el-col>
            <!-- <el-autocomplete
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect"
></el-autocomplete> -->
          </el-col>
        </el-row>
     
          <!-- 多选 -->
          <el-row :gutter="20" >
       <el-col :span="4">
<el-input placeholder="请输入内容" >
    <template slot="prepend"> 关键字</template>
  </el-input>
          </el-col>
         <el-col :span="4">
<el-input placeholder="请输入内容" >
    <template slot="prepend">  题目备注</template>
  </el-input>
          </el-col>
           <el-col :span="4">
<el-input placeholder="请输入内容" >
    <template slot="prepend">  企业简称</template>
  </el-input>
          </el-col>
           <el-col :span="4">
<el-input placeholder="请输入内容" >
    <template slot="prepend">  企业简称</template>
  </el-input>
          </el-col>
          

          </el-row>
   <!-- 选择器 -->
   <el-row :gutter="20">
     <el-col :span="6">
  <span id="nameSel">学科</span>
        <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>

     </el-col>
     <el-col :span="6">
  <span id="nameSel">学科</span>
        <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>

     </el-col>
     <el-col :span="6">
  <span id="nameSel">学科</span>
        <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>

     </el-col>
     <el-col :span="6">
  <span id="nameSel">学科</span>
        <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>

     </el-col>
   </el-row>
   <!-- 表格部分 -->
   <el-table
      :data="hmmm.baseList"
      style="width:100%;">
      <el-table-column
       type="index"
        label="序号"
       >
      </el-table-column>
     
      <el-table-column
        prop="subject"
        label="学科"
       >
      </el-table-column>
      <el-table-column
        prop="questionType"
        label="试题难度"
       >
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="录入时间"
       >
      </el-table-column>
      <el-table-column
        prop="enterpriseID"
        label="使用次数"
       >
      </el-table-column>
      <el-table-column
       label="操作" class="sub-cell">
      <template slot-scope="scope">
<el-button type="text">预览</el-button>
        <el-button type="text">修改</el-button>
         <el-button type="text" @click="deleteItem(scope.id)">删除</el-button>
          <el-button type="text">加入精选</el-button>
      </template>
       
      </el-table-column>
   </el-table>
   <!-- 分页效果 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="hmmm.baseList.page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="hmmm.baseList.pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="hmmm.baseCount">
    </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState,mapActions} from 'vuex'
export default {
  name: 'QuestionsList',
  created () {
    this.$store.dispatch('getBaseList')
  },
  computed: {
    ...mapState(['hmmm'])
  },
  data() {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  },
  methods: {
    deleteItem(id) {
this.$store.commit('delListItem',id)
    },
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

.el-row {
  margin: 15px 0;
}
.nameSel{
  display:inline-block;
  background-color: #F3F3F3;
}

.el-button:hover{
 text-decoration: underline !important;
  cursor: pointer;
}
.el-pagination {
  margin: 15px;
}
</style>
