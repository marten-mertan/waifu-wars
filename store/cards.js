export const state = () => ({
    cards: [],
});

export const getters = {
    getCards: state => state.cards,
};

export const actions = {
    async fetchCard({commit}, id, call, call2) {
        const response = await fetch(`https://api.jikan.moe/v3/character/${5}`);
        const data = await response.json();
        commit('setCards', data);
        console.log(id);
        console.log(call);
        console.log(call2);
        call();
    }
};

export const mutations = {
    setCards(state, data) {
        state.cards = data;
    },
    
};
