<template>
  <div id="app">
    <h1 class="title">Memory game</h1>

      <div class="game-field">
        <gameInfo/>
        <field/>
      </div>      
      <coverScreen/>

  </div>
</template>

<script>
import field from './components/field.vue'
import coverScreen from './components/coverScreen.vue'
import gameInfo from './components/gameInfo.vue'

export default {
  name: 'App',
  components: {
    gameInfo,
    field,
    coverScreen,    
  }
}
</script>

<style lang="sass">
html,
body
  height: 100%
  position: relative
div 
  box-sizing: border-box
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  text-align: center
  color: #2c3e50
  height: 100%
  margin: 0 auto
  .title
    margin: 0
    font-size: 20px
    text-transform: uppercase
    font-weight: bold
  .game-field
    display: inline-block
    background-color: #fff
    margin: 15px auto 0
    width: 100%
    max-width: 750px 
    padding: 10px
    border: 2px solid #eee

</style>
