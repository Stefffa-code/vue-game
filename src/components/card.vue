<template>
  <div class="flipcard" 
    :class="{'turn-out':open, 'shadow':isShadow}"
    @click="tap"
     >
    <div class="front"
      key="front"> 
      <img :src="shirt" alt="image">     
    </div>

    <div class="back"
      key="back">
      <img :src="pathImg" alt="image">
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:['id','pathImg','openCouple','open','couple'],
  data(){
    return{
      isShadow: false 
    }
  },
  methods:{
    tap() {
      this.$emit('tapped', this.id);
    },
  },
  computed:{
    ...mapState([
        'shirt',
    ]),
  },
  watch:{
    openCouple(){
      if(this.openCouple) this.isShadow = false
    },
    open(){
      this.open ? this.isShadow = true : this.isShadow = false
    }
  }
}
</script>


<style scoped lang="sass">
img
  display: block
  width: 100%
.flipcard
  position: relative
  & .front,
  & .back
    top: 0
    position: absolute
    width: 100%
    height: auto
    box-sizing: border-box
    transition: all 0.4s ease-in
    outline: 1px solid #000
    backface-visibility: hidden
  & .back
    transform: rotateY(-180deg)
    position: relative       
  & .front
    padding: 0px
  &.turn-out .front,
  &.flip .front
    transform: rotateY(180deg)
  &.turn-out .back,
  &.flip .back
    transform: rotateY(0deg) 
  &.shadow
    box-shadow: 8px 8px 6px -5px rgba(0, 0, 0, .3) 
  

</style>
