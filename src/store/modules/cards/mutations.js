const addnew = (state, card) => {
  state.allCards.push(card)
}
const updateCards = (state, cards) => {
  state.allCards = cards
};

const updateOne = (state, card) => {
  const cards = JSON.parse(JSON.stringify(state.allCards))
  const existcard = cards.findIndex(i => i._id.toString() == card._id)
  
  state.allCards[existcard] = card

};

const deleteone = (state, id) => {
  state.allCards = state.allCards.filter(i => i._id.toString() != id.toString())
};

export default {
  addnew, updateCards, updateOne, deleteone
};