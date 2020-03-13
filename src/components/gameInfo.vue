<template>
    <div class="game-info">
        <div class="game-info__left">
            <span>level {{ level + 1}} </span>
            <span>points {{ points }} </span>
            <span :key="index" v-for="index in allLife" class="life" >
                <fa-icon v-if="index <= life" icon="heart" class="heart-live"/>
                <fa-icon v-else icon="heart" class="heart-broken" />
            </span>
        </div>
        <div class="game-info__right time" :class="{'active':isActive}">
             {{currentTime}} 
        </div>        
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data(){
        return{
            currentTime: 0,
            isActive: false,
            allLife: 0,
        }
    },
    methods:{
        startTimer(){
            this.isActive = true;
            this.currentTime = this.getCurrentTime;
            this.timer = setInterval(() => {
                this.currentTime--
            }, 1000)
        },
        stopTimer() {
            clearTimeout(this.timer);
            this.isActive = false;
        },
    },    
    computed:{
        ...mapState([
            'level',
            'points',
            'preTime',
            'status',
            'life'
        ]),
        getCurrentTime(){
            return this.preTime/1000;
        }
    },
    watch:{
        currentTime(time) {
            if (time === 0) this.stopTimer();
        },
        status(){
            if(this.status === 'ingame') this.startTimer();
        }
    },
    mounted(){
        this.allLife = this.life;
    }
}
</script>
<style lang="sass" scoped>
.game-info
    display: flex
    padding: 0 15px
    justify-content: space-between
    align-items: center
    padding-bottom: 8px
    border-bottom: 1px solid $lineColor
    .heart-live
        color: $accent
    .heart-broken
        color: $lineColor
    .life
        margin: 0 2px
    span
        margin-right: 25px
    
    .time
        background-color: $lineColor
        width: 40px
        height: 40px
        border-radius: 50%
        display: flex
        justify-content: center
        align-items: center
        font-size: 20px
        color: #fff
        &.active
            background-color: $accent
            box-shadow: 4px 4px 5px -3px rgba(0, 0, 0, .3) 

</style>