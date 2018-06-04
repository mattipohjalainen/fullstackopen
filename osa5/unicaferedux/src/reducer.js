const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    const changedState = { ...state }
    switch (action.type) {
      case 'GOOD':
      changedState.good = state.good + 1 
        return changedState
      case 'OK':
      changedState.ok = state.ok + 1
      return changedState
      case 'BAD':
      changedState.bad = state.bad + 1
      return changedState
      case 'ZERO':
        return initialState
    }
    return state
  }
  
  export default counterReducer