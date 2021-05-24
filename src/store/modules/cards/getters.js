const findById = (state) => (id) => {
    
    const card = state.allCards.find(i => i._id.toString() == id.toString())
    return card
}

export default {
    findById,
    // sortItem
};