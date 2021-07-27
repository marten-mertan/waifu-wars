import {sha256} from 'js-sha256';

export const state = () => ({
    fetchedCards: [],
    playerCards: [],
    playerTeam: [],
    battle: {
        status: 'noBattle',
        enemyTeam: [],
        playerTeam: [],
        moveOrder: [],
        currentMove: 0
    },
    hint: {
        head: '',
        body: ''
    }
});

export const getters = {
    getState: state => state,
    getHint: state => state.hint,
};

export const actions = {
    async fetchCards({commit}, n) {
        const fetchedCards = [];
        const playerCards = [];
        for (let i=0; i<n; i++) {
            const response = await fetch(`https://api.jikan.moe/v3/character/${i+497}`);
            const data = await response.json();
            fetchedCards.push(data);

            const code = sha256.array(data.mal_id.toString());
            const item = {
                id: data.mal_id,
                name: data.name,
                image: data.image_url,
                anime: data.animeography[0]?.name || 'unknown',
                hp: code[0],
                attack: code[1],
                defence: code[2],
                initiative: code[3]
            };
            playerCards.push(item);
        }
        commit('setFetchedCards', fetchedCards);
        commit('setPlayerCards', playerCards);
        commit('setPlayerTeam', playerCards);
    },
    setHint({commit}, [hintHead, hintBody]) {
        commit('setHint', [hintHead, hintBody]);
    },
    async fetchBattleEnemyTeam({commit}, n) {
        const fetchedCards = [];
        const enemyCards = [];
        for (let i=0; i<n; i++) {
            const response = await fetch(`https://api.jikan.moe/v3/character/${i+397}`);
            const data = await response.json();
            fetchedCards.push(data);
            const code = sha256.array(data.mal_id.toString());
            const item = {
                id: data.mal_id,
                teamId: 201+i,
                name: data.name,
                image: data.image_url,
                anime: data.animeography[0]?.name || 'unknown',
                hp: code[0],
                currentHp: code[0],
                attack: code[1],
                currentAttack: code[1],
                defence: code[2],
                currentDefence: code[2],
                initiative: code[3],
                currentInitiative: code[3],
                statuses: []
            };
            enemyCards.push(item);
        }
        commit('setBattleEnemyTeam', enemyCards);
    },
    setBattlePlayerTeam({commit}, playerTeam) {
        const curPlayerTeam = playerTeam;
        const playerBattleTeam = [];
        for (let i=0; i < curPlayerTeam.length; i++) {
            const item = {
                id: curPlayerTeam[i].id,
                teamId: 101+i,
                name: curPlayerTeam[i].name,
                image: curPlayerTeam[i].image,
                anime: curPlayerTeam[i].anime,
                hp: curPlayerTeam[i].hp,
                currentHp: curPlayerTeam[i].hp,
                attack: curPlayerTeam[i].attack,
                currentAttack: curPlayerTeam[i].attack,
                defence: curPlayerTeam[i].defence,
                currentDefence: curPlayerTeam[i].defence,
                initiative: curPlayerTeam[i].initiative,
                currentInitiative: curPlayerTeam[i].initiative,
                statuses: []
            };
            playerBattleTeam.push(item);
        }
        commit('setBattlePlayerTeam', playerBattleTeam);
    },
    setBattleStatus({commit}, status) {
        commit('setBattleStatus', status);
    },
    setMoveOrder({commit}, [playerTeam, enemyTeam]) {
        const cards = [...playerTeam, ...enemyTeam].sort((a, b) => b.initiative - a.initiative);
        commit('setMoveOrder', cards);
    },
    setCurrentMove({commit}, move) {
        commit('setCurrentMove', move);
    },
    setPlayerHp({commit}, [playerCard, hp]) {
        const id = playerCard.teamId - 101;
        commit('setPlayerHp', [id, hp]);
    },
    setEnemyHp({commit}, [enemyCard, hp]) {
        const id = enemyCard.teamId - 201;
        commit('setEnemyHp', [id, hp]);
    },
    addPlayerStatus({commit}, [playerCard, status]) {
        const id = playerCard.teamId - 101;
        commit('addPlayerStatus', [id, status]);
    },
    addEnemyStatus({commit}, [enemyCard, status]) {
        const id = enemyCard.teamId - 201;
        console.log(enemyCard);
        commit('addEnemyStatus', [id, status]);
    },
};

export const mutations = {
    setFetchedCards(state, data) {
        state.fetchedCards = data;
    },
    setPlayerCards(state, data) {
        state.playerCards = data;
    },
    setPlayerTeam(state, data) {
        state.playerTeam = data;
    },
    setBattleEnemyTeam(state, data) {
        state.battle.enemyTeam = data;
    },
    setBattlePlayerTeam(state, data) {
        state.battle.playerTeam = data;
    },
    setBattleStatus(state, status) {
        state.battle.status = status;
    },
    setMoveOrder(state, moveOrder) {
        state.battle.moveOrder = moveOrder;
    },
    setCurrentMove(state, move) {
        state.battle.currentMove = move;
    },
    setPlayerHp(state, [i, hp]) {
        state.battle.playerTeam[i].currentHp = hp;
    },
    setEnemyHp(state, [i, hp]) {
        state.battle.enemyTeam[i].currentHp = hp;
    },
    addPlayerStatus(state, [i, status]) {
        state.battle.playerTeam[i].statuses.push(status);
    },
    addEnemyStatus(state, [i, status]) {
        state.battle.enemyTeam[i].statuses.push(status);
    },
    setHint(state, [head, body]) {
        state.hint.head = head;
        state.hint.body = body;
    }
    
};
