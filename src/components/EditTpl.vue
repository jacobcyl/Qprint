<template>
  <Row>
        <Col span="12">
            <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Col>
        <Col span="12">
            <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Col>
    </Row>
</template>
<script>
    export default {
      name: 'EditTpl'
    }
</script>
