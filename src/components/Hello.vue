<template>
  <div class="index">
    <div class="banner">
      <div class="item">
        <img :src="bannerList[currentIndex].banner_pic" />
      </div>
      <div class="page" v-if="this.bannerList.length > 1">
        <ul>
          <li @click="gotoPage(prevIndex)">&lt;</li>
          <li
            v-for="(item, index) in bannerList"
            :key="index"
            @click="gotoPage(index)"
            :class="{ current: currentIndex == index }"
          >
            {{ index + 1 }}
          </li>
          <li @click="gotoPage(nextIndex)">&gt;</li>
        </ul>
      </div>
    </div>
    <div v-for="(item, key) in newsListShow" :key="key">
      <news-cell :newsDate="item" :key="key"></news-cell>
    </div>
  </div>
</template>

<script>
import api from "./../axios/api.js";
import NewsCell from "./NewsCell.vue";

export default {
  name: "index",
  data() {
    return {
      newsListShow: [],
      bannerList: [],
      currentIndex: 0, //默认显示图片
      timer: null, //定时器
    };
  },
  components: {
    NewsCell,
  },
  created() {
    this.setNewsApi();
  },
  methods: {
    gotoPage(index) {
      this.currentIndex = index;
    },
    setNewsApi: function () {
      api.JH_news("http://192.168.89.72:81/v1/mock/page", "").then((res) => {
        console.log(res, "列表数据");
        this.newsListShow = res.data.posts;
        this.bannerList = res.data.banner;
      });
    },
  },
  mounted() {},
  computed: {
    //上一张
    prevIndex() {
      if (this.currentIndex == 0) {
        return this.bannerList.length - 1;
      } else {
        return this.currentIndex - 1;
      }
    },
    //下一张
    nextIndex() {
      if (this.currentIndex == this.bannerList.length - 1) {
        return 0;
      } else {
        return this.currentIndex + 1;
      }
    },
  },
};
</script>
<style scoped>
.topNav {
  width: 100%;
  background: #ed4040;
  position: fixed;
  top: 0rem;
  left: 0;
  z-index: 10;
}
.simpleNav {
  width: 100%;
  line-height: 1rem;
  overflow: hidden;
  overflow-x: auto;
  text-align: center;
  font-size: 0;
  font-family: "微软雅黑";
  white-space: nowrap;
}
.simpleNav::-webkit-scrollbar {
  height: 0px;
}
.simpleNavBar {
  display: inline-block;
  width: 1.2rem;
  color: #fff;
  font-size: 0.3rem;
}
.navActive {
  color: #000;
  border-bottom: 0.05rem solid #000;
}
.placeholder {
  width: 100%;
  height: 1rem;
}

* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
  float: left;
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}
.banner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
.banner img {
  width: 100%;
  display: block;
}
.banner .page {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
.banner .page ul {
  float: right;
}
.current {
  color: #ff6700;
}
</style>
