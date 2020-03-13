import Vue from 'vue'
import Vuex from 'vuex'
import {gameLvlData, gameImgData} from './gameDate'

Vue.use(Vuex)


const generateCards = function(numCards){
    let cards = [];
    for (let i = 0; i < numCards; i++) {
        cards.push({    
          id: 'first-'+i,    
          couple: 'couple-'+i, 
          img: gameImgData[i],   
          open: false,
          openCouple: false,    
        });
        cards.push({    
            id: 'second-'+i,    
            couple: 'couple-'+i, 
            img: gameImgData[i],   
            open: false,
            openCouple: false,    
          });        
    }
    return cards
}
export default new Vuex.Store({
    state:{
        cardDate: [],
        shirt: require('../assets/up.png'),
        status: 'init',
        life: 5,
        level: -1,
        isShowCoverScreen: false,
        uniqueCards: 0,
        preTime: 0,
        points: 0,
    },
    mutations:{
        setGameMode(state, mode){
            if(mode === 'new'){
                state.level = 0;
                state.points = 0;
                state.life = 5;
                state.status = 'ready'; 
                console.log('ready')               
            } 
            else if(mode === 'continue'){
                state.status = 'ready'; 
                state.level++               
            }
        },
        initRoundData(state){
            const {
                uniqueCards, 
                preTime,     
              } = gameLvlData[state.level];
            state.status = 'ingame';
            state.uniqueCards = uniqueCards;
            state.preTime = preTime;
            state.cardDate = generateCards(uniqueCards);
            console.log('ingame')
        },        
        lessLife(state){
            state.life --
        },
        openCard(state, id){
            const item = state.cardDate.find(item => item.id === id);
            item.open = true;
        },
        openCards(state){
            state.cardDate.forEach(card => {
                card.open = true;
            })
        },
        closeCards(state){
            state.cardDate.forEach(card => {
                card.open = false;
            })
        },
        closeCard(state, id){
            const item = state.cardDate.find(item => item.id === id);
            item.open = false;
        },
        openCouple(state, couple){
            const pair = state.cardDate.filter(item => item.couple === couple);
                       
            pair.forEach(card => {
                card.openCouple = true;
                card.open = true;
            })
        },
        upPoints(state){
            state.points++
        },
        
        failGame(state){
            state.status = 'fail'
        },
        completeLevelGame(state){
            state.status = 'completeLevel'
            console.log('completeLevel')
        },
        completeGame(state){
            state.status = 'complete'
            console.log('complete')
        },
        showCoverScreen(state){
            state.isShowCoverScreen = true;
        },
        hideCoverScreen(state){
            state.isShowCoverScreen = false;
        },

    },


    getters: {
        getCardById: (state) => (id) => {
            return state.cardDate.find(card => card.id === id)
        },
        isEndGame: function (state) {
            return !gameLvlData[state.level+1];      
        }
    },



    actions:{

    },
    modules: {

    }
})

