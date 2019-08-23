// The reducer toggleHistory is based on the same principle as toggleFavorite

const initialState = { filmHistory: [] }

function toggleHistory(state = initialState, action) {
    let nextState
    switch (action.type) {
        case "TOGGLE_HISTORY":
            const historyFilmIndex = state.filmHistory.findIndex(item => item.id === action.value.id)
            if (historyFilmIndex !== -1) {
                nextState = {
                    ...state,
                    filmHistory: state.filmHistory.filter((item, index) => index !== historyFilmIndex)
                }
            }
            else {
                nextState = {
                    ...state,
                    filmHistory: [...state.filmHistory, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleHistory