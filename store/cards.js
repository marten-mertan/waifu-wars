import {sha256} from 'js-sha256';

export const state = () => ({
    fetchedCards: [],
    playerCards: [],
    playerTeam: [],
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
    },
    setHint({commit}, [hintHead, hintBody]) {
        commit('setHint', [hintHead, hintBody]);
    }
};

export const mutations = {
    setFetchedCards(state, data) {
        state.fetchedCards = data;
    },
    setPlayerCards(state, data) {
        state.playerCards = data;
    },
    setHint(state, [head, body]) {
        state.hint.head = head;
        state.hint.body = body;
    }
    
};
