<template>
  <div id="app">
    <!-- <top /> -->
    <index />
  </div>
</template>

<script>
// import top from './components/01.top.vue';
import index from './components/02.index.vue';
export default {
  name: 'app',
  provide () { // 注册一个方法
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted () {

  },
  methods: {

  },
  components: {
    // top,
    index
  },
};
</script>

<style >
#app {
  height: 100%;
}

#app .top-container {
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

#app .index-container {
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>
