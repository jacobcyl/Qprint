<style scoped>
  canvas {
    transform-origin: 0 0;
  }
</style>
<template>
  <div style="position: fixed">
    <canvas width=23 :height="vRulerSize.height" ref="vruler" :style="{position: 'fixed', 'margin-top': '24px', 'border-right': '1px solid rgb(153, 153, 153)', 'z-index': 9999, transform: 'scale(1,' + scale + ')'}"></canvas>
    <canvas :width="hRulerSize.width" height="23" ref="hruler" :style="{position: 'fixed', 'margin-left': '24px', 'border-bottom': '1px solid rgb(153, 153, 153)', 'z-index': 9999, transform: 'scale(' + scale + ', 1)'}"></canvas>
    <span style="position: absolute; width: 23px; height: 23px; border-bottom: 1px solid rgb(153, 153, 153); border-right: 1px solid rgb(153, 153, 153); z-index: 9999; background-color: white;"></span>
    <div ref="measure" id="measure" style="width: 100000mm; height: 1mm"></div>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.$nextTick(function () {
        this.ratio = this.$refs.measure.clientWidth / 100000
        this.init()
      })
    },
    watch: {
      screenWidth: function (v) {
        console.log('screenWidth change:' + v)
        this.$nextTick(function () {
          this.ratio = this.$refs.measure.clientWidth / 100000
          this.init()
        })
      },
      screenHeight: function (v) {
        console.log('screenHeight change:' + v)
        this.$nextTick(function () {
          this.ratio = this.$refs.measure.clientWidth / 100000
          this.init()
        })
      },
      scale: function (v) {
        console.log('scale change:' + v)
        this.$nextTick(function () {
          this.ratio = this.$refs.measure.clientWidth / 100000
          this.init()
        })
      }
    },
    data () {
      return {
        rulerConfig: {
          ratio: 1,
          bgColor: 'white',
          fgColor: 'rgb(153, 153, 153)',
          shadowColor: 'rgba(0, 0, 0, 0.06)',
          horLineValue: [100, 200],
          verLineValue: [100, 200],
          startX: 0,
          startY: 0,
          perWidth: 1, // 1mm
          scale: 1,
          fontScale: 1,
          fontColor: 'black',
          lineColor: 'red',
          shadow: {
            x: 200,
            y: 100,
            width: 200,
            height: 400
          }
        },
        hctx: null,
        vctx: null
      }
    },
    props: {
      screenWidth: {
        type: Number,
        required: true
      },
      screenHeight: {
        type: Number,
        required: true
      },
      scale: {
        required: true
      }
    },
    computed: {
      vRulerSize: function () {
        return {
          width: 23,
          height: (this.screenHeight - 23) / this.scale
        }
      },
      hRulerSize: function () {
        return {
          width: (this.screenWidth - 23) / this.scale,
          height: 23
        }
      }
    },
    methods: {
      init: function () {
        // if (!this.hctx) {
        this.hctx = this.$refs.hruler.getContext('2d')
        this.hctx.font = `12px -apple-system, ".SFNSText-Regular", "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
        this.hctx.lineWidth = 1
        this.hctx.strokeStyle = this.fgColor
        this.hctx.textBaseline = 'middle'
        // }
        // if (!this.vctx) {
        this.vctx = this.$refs.vruler.getContext('2d')
        this.vctx.font = `12px -apple-system, ".SFNSText-Regular", "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
        this.vctx.lineWidth = 1
        this.vctx.strokeStyle = this.fgColor
        this.vctx.textBaseline = 'middle'
        // }
        this.drawVRuler()
        this.drawHRuler()
      },
      drawVRuler: function () {
        // console.log('draw')
        const shadow = null
        const {vctx, ratio} = this
        const {width, height} = this.vRulerSize
        // console.log(vctx)
        const start = 0
        const {
          fontColor, shadowColor, bgColor, fontScale, perWidth, scale, fgColor
        } = this.rulerConfig
        // 1. 画标尺底色
        vctx.fillStyle = bgColor
        vctx.fillRect(0, 0, width, height)

        // 2. 画阴影
        if (shadow) {
          // 阴影起点坐标
          const posY = (shadow.y * scale - start) * ratio
          // 阴影高度
          const shadowHeight = shadow.height * ratio * scale
          vctx.fillStyle = shadowColor
          vctx.fillRect(0, posY, width, shadowHeight)
        }

        // 3. 画刻度和文字(因为刻度遮住了阴影)
        // vctx.translate(0, -start * ratio) // 移动画布原点,方便绘制
        vctx.beginPath()
        vctx.fillStyle = fontColor
        vctx.strokeStyle = fgColor
        const perHeight = perWidth
        const startY = start - start % perHeight
        for (let i = startY; i < startY + height / ratio; i += perHeight) {
          var tempY = Math.floor(i * ratio) + 0.5
          vctx.moveTo(width, tempY)
          // 绘制长刻度
          if (i % (perHeight * 10) === 0) {
            // 这里先保存一下状态
            vctx.save()
            // 将原点转移到当前画笔所在点
            vctx.translate(width, Math.floor(i * ratio) + 0.5)
            // 旋转 -90 度
            vctx.rotate(-Math.PI / 2)
            // 画文字
            vctx.scale(fontScale, fontScale)
            vctx.fillText(i / scale, 2 * ratio, -width / 3 * 2)
            // 回复刚刚保存的状态
            vctx.restore()
            vctx.lineTo(0, tempY)
          } else { // 绘制短刻度
            vctx.lineTo(width * 2 / 3, tempY)
          }
          vctx.stroke()
        }
        vctx.closePath()
        vctx.translate(0, start * ratio)
      },
      drawHRuler: function () {
        // console.log('draw')
        const shadow = null
        const {hctx, ratio} = this
        const {width, height} = this.hRulerSize
        // console.log(hctx)
        const start = 0
        const {
          fontColor, shadowColor, bgColor, fontScale, perWidth, scale, fgColor
        } = this.rulerConfig
        // 1. 画标尺底色
        hctx.fillStyle = bgColor
        hctx.fillRect(0, 0, width, height)

        // 2. 画阴影
        if (shadow) {
          // 阴影起点坐标
          const posY = (shadow.y * scale - start) * ratio
          // 阴影高度
          const shadowHeight = shadow.height * ratio * scale
          hctx.fillStyle = shadowColor
          hctx.fillRect(0, posY, width, shadowHeight)
        }

        // 3. 画刻度和文字(因为刻度遮住了阴影)
        // hctx.translate(0, -start * ratio) // 移动画布原点,方便绘制
        hctx.beginPath()
        hctx.fillStyle = fontColor
        hctx.strokeStyle = fgColor
        const startX = start - start % perWidth
        for (let i = startX; i < startX + width / ratio; i += perWidth) {
          var tempX = Math.floor(i * ratio) + 0.5
          hctx.moveTo(tempX, height)
          // 绘制长刻度
          if (i % (perWidth * 10) === 0) {
            // 这里先保存一下状态
            hctx.save()
            // 将原点转移到当前画笔所在点
            hctx.translate(Math.floor(i * ratio) + 0.5, height)
            // 旋转 -90 度
            // hctx.rotate(-Math.PI / 2)
            // 画文字
            hctx.scale(fontScale, fontScale)
            hctx.fillText(i / scale, 1 * ratio, -height / 3 * 2)
            // 回复刚刚保存的状态
            hctx.restore()
            hctx.lineTo(tempX, 0)
          } else { // 绘制短刻度
            hctx.lineTo(tempX, height * 2 / 3)
          }
          hctx.stroke()
        }
        hctx.closePath()
        hctx.translate(0, start * ratio)
      }
    }
  }
</script>
