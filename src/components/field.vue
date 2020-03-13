<template>
    <div class="field" :class="setGridField" v-if="progress" >
        <card 
            v-for="(item, index) in cards" 
            :pathImg="item.img"
            :open="item.open"
            :couple="item.couple"
            :openCouple="item.openCouple"
            :id="item.id"
            @tapped="tapCard"
            :key="index">
        </card>
    </div>  
</template>

<script>
import { mapState, mapMutations, mapGetters} from 'vuex'

import card from './../components/card'
export default {
    data() {
        return{
            checkCouple: [],
            check: false,
            numOpenCards: 0,
            openCouples: 0
        }
    },
    methods:{
        ...mapMutations([
            'initRoundData',
            'openCard',
            'completeLevelGame',
            'completeGame',
            'openCard',
            'openCards',
            'closeCard',
            'closeCards',
            'openCouple',
            'upPoints',
            'lessLife',
            'failGame',
        ]),
        
        tapCard(id){         
            let card = this.$store.getters.getCardById(id);
            this.checkCouple.push(card);
            if(!card.openCouple && !this.check ){                
                this.openCard(card.id);       
                if(!card.open) return ;
                
                this.numOpenCards ++;
                if(this.numOpenCards ===2 ){
                    this.check = true;
                    this.checkMatch();                                        
                }
            }      
        },
        checkMatch(){
            setTimeout(() => {
                this.numOpenCards = 0;
                const item1 = this.checkCouple[0];
                const item2 = this.checkCouple[1];

                if(item1.couple === item2.couple && item1.id != item2.id){  
                    this.openCouple(item1.couple);
                    this.upPoints();
                    this.openCouples++ ;
                    this.isEnd();
                }
                else{ 
                    this.closeCard(item1.id);
                    this.closeCard(item2.id) ;
                    this.lessLife();             
                };      
                this.check = false;          
                this.checkCouple=[];
            }, 900)
        },
        isEnd(){
            if(this.openCouples === this.uniqueCards ){                
                (this.$store.getters.isEndGame) ? this.completeGame() : this.completeLevelGame();                 
                this.openCouples = 0;                       
            }                
        },
        preShow(){
            this.openCards();
            setTimeout(()=>{
                this.closeCards();                
            }, this.preTime);
        },
        
    },
    computed:{
        ...mapState([
            'status',
            'cardDate',
            'uniqueCards',
            'points',
            'preTime',
            'life',
        ]),
        cards(){
            let cards = this.cardDate;
            cards.sort(() => Math.random() - 0.5);
            return cards;
        },
        progress () {
            return this.status === 'ready' || this.status === 'ingame'|| this.status === 'preshow' ; 
        },   
        setGridField(){
                if (this.uniqueCards < 7) return 'grid25';
                else if (this.uniqueCards < 13) return 'grid15';
                else  return 'grid10';
        }     
    },
    watch: {
        status() {
            if (this.status === 'ready') {
                this.initRoundData();
            } 
            else if (this.status === 'ingame'){
                this.preShow();
            }
        },
        uniqueCards(){
            this.setGridField;
        },
        life(){            
            if(this.life < 1)this.failGame();            
        }
    },
    components:{
        card,
    }
}
</script>

<style scoped lang="sass">
.field    
    height: 100%
    min-height: 300px
    display: flex
    flex-wrap: wrap
    align-items: center
.grid25 .flipcard
    width: 23%
    margin: 1%
.grid15 .flipcard
    width: 15%
    margin: 0.8%
.grid10 .flipcard
    width: 12%
    margin: 0.25%

</style>