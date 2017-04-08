<style scoped>
  .page {
    background: white;
    display: block;
    margin: 0 auto;
    margin-bottom: 0.5cm;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
  }
  .page[size="A4"] {
    width: 21cm;
    height: 29.7cm;
  }
  .component {
    position: absolute;
  }
</style>
<template>
  <div class="page" size="A4">
    <div class="component" style="left: 100mm; top: 200mm; font-size: 80px;">aaa {{ page.id }}</div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>
