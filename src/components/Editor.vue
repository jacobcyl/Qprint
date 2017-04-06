<template>
  <ToolBar></ToolBar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ToolBar from './ToolBar.vue'

export default {
  components: {
    ToolBar
  },
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: {
    ...mapActions([
      'addToCart'
    ]),
    ...mapActions([
      'getAllProducts'
    ])
  },
  created () {
    console.log(this)
    // this.$store.dispatch('getAllProducts')
    this.getAllProducts()
  }
}
</script>
