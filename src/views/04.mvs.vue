<template>
  <!-- 最新mv模块 -->
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title"
                  :class="{active:area=='全部'}"
                  @click="area='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='内地'}"
                  @click="area='内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='港台'}"
                  @click="area='港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='欧美'}"
                  @click="area='欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='日本'}"
                  @click="area='日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:area=='韩国'}"
                  @click="area='韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title"
                  :class="{active:type=='全部'}"
                  @click="type='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='官方版'}"
                  @click="type='官方版'">官方版</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='原声'}"
                  @click="type='原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='现场版'}"
                  @click="type='现场版'">现场版</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:type=='网易出品'}"
                  @click="type='网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title"
                  :class="{active:order=='上升最快'}"
                  @click="order='上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:order=='最热'}"
                  @click="order='最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title"
                  :class="{active:order=='最新'}"
                  @click="order='最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item"
             v-for="(item,index) in list"
             :key="index"
             @click="toMv(item.id)">
          <div class="img-wrap">
            <img :src="item.cover"
                 alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>

      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange"
                     background
                     layout="prev, pager, next"
                     :total="total"
                     :current-page="page"
                     :page-size="8"
                     :limit="limit">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mvLists } from '../api/api'
export default {
  name: 'mvs',
  data () {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 8,
      //地区
      area: '全部',
      //类型
      type: '全部',
      //排序
      order: '上升最快',
      //mv数组
      list: []
    }
  },
  //侦听器
  watch: {
    area () {
      this.page = 1;
      this.getMvList();
    },
    type () {
      this.page = 1;
      this.getMvList();
    },
    order () {
      this.page = 1;
      this.getMvList();
    }
  },
  created () {
    this.getMvList();
  },
  methods: {
    // 获取mv数据
    getMvList () {
      mvLists(this.type, this.area, this.order, this.limit, (this.page - 1) * 8
      ).then(res => {
        // console.log(this.area, this.type, this.order);
        // console.log(res);
        this.list = res.data.data
        //整理mv播放次数，转为w单位
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].playCount > 100000) {
            this.list[i].playCount = parseInt(this.list[i].playCount / 10000) + "万"
          }
        }
        //获取总条数
        if (res.data.count) {
          this.total = res.data.count
        }
      })
    },

    //去mv详情
    toMv (id) {
      this.$router.push(`/mv?id=${id}`)
    },
    //跳转到选择的页面
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getMvList();
    }
  }
}
</script>

<style >
.mvs-container {
  padding-top: 20px;
}

.mvs-container .filter-wrap > div {
  margin-bottom: 30px;
  vertical-align: baseline;
  display: flex;
  align-items: center;
}

.mvs-container .filter-wrap > div span {
  font-size: 14px;
  height: 100%;
}

.mvs-container .filter-wrap > div span.title {
  margin: 20px;
  color: gray;
  cursor: pointer;
  padding: 5px 20px;
}

.mvs-container .filter-wrap > div span.title.active {
  color: #dd6d60;
  background-color: #fcf6f5;
  border-radius: 20px;
}

.mvs-container .filter-wrap > div span.title::before {
  content: "", pos;
}

.mvs-container .filter-wrap > div ul {
  display: flex;
}

.mvs-container .filter-wrap > div ul li:not(:last-child) {
  border-right: 1px solid #f2f2f1;
}

.mvs-container .mvs .items {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.mvs-container .mvs .items .item {
  width: 250px;
  cursor: pointer;
  margin-right: 25px;
  margin-bottom: 30px;
}

.mvs-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.mvs-container .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.mvs-container .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.mvs-container .mvs .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.mvs-container .mvs .items .item .info-wrap .name {
  font-size: 15px;
}

.mvs-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>
