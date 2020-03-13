<template>
    <div id="cover-screen">

        <div class="cover-screen init"
            :class="initClass">
            <div class="desc">
                Откройте одинаковые пары картинок.
            </div>
            <div class="button" @click="newGame">Играть</div>
        </div>

        <div class="cover-screen fail"
            :class="failClass">
            <div class="desc">Игра окончена!</div>
            <div class="button" @click="newGame">Новая игра</div>
        </div>

        <div class="cover-screen completeLevel"
            :class="completeLevelClass">
            <div class="desc">Уровень пройден!</div>
            <div class="button" @click="continueGame">Продолжить</div>
        </div>

        <div class="cover-screen complete"
            :class="completeClass">
            <div class="desc">У вас отличная память! Вы прошли все уровни!</div>
            <div class="button" @click="newGame">Начать заново</div>
        </div>


    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'coverScreen',
    methods:{
        ...mapMutations([
            'showCoverScreen',
            'hideCoverScreen',
            'setGameMode',
        ]),
        newGame(){
            this.hideCoverScreen;
            this.setGameMode('new');
        },
        continueGame(){
            this.hideCoverScreen;
            this.setGameMode('continue');
        }
    },
    computed:{
        ...mapState([
            'status',
            'isShowCoverScreen',
        ]),
        initClass(){
            return { show: this.status === 'init' };
        },
        failClass(){
            return { show: this.status === 'fail' };
        },
        completeLevelClass(){
            return { show: this.status === 'completeLevel' };
        },
        completeClass(){
            return { show: this.status === 'complete'};
        }
    }
    
}
</script>



<style lang="sass" >
.cover-screen 
    display: none
    position: absolute
    padding: 40px 30px
    top: 50%
    left: 50%
    // color: #fff
    transform: translate(-50%, -50%)
    background: $accent
    transition: all .3s ease
    z-index: 10
    opacity: 0
    max-width: 400px
    width: 100%
    box-shadow: 0 10px 20px rgba(0,0,0,0.25), 0 5px 10px rgba(0,0,0,0.22)
    .button
        display: inline-block
        background-color: #fff
        font-size: 13px
        font-weight: bold
        text-transform: uppercase
        padding: 10px 20px
        border: none 1px solid #fff
        margin: 3px
        color: $txt
        font-weight: bold
        cursor: pointer
    .button:hover
        color: $txt
        outline: 1px solid #fff
        outline-offset: 3px
        // box-shadow: 0 10px 20px rgba(0,0,0,0.25)
.desc
    font-size: 20px
    margin-bottom: 20px
.cover-screen.show
    opacity: 1 
    display: block

  
</style>