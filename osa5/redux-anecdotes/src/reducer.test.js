import reducer from './reducer'
import deepFreeze from 'deep-freeze'

describe('redux anecdotes tests', () => {
    const state = []
    const noAction = {
        type: 'DO_NOTHING'
      }

    it('should return a proper initial state when called with undefined state', () => {
    
        const newState = reducer(undefined, noAction)
        expect(newState.length).toBe(6)
      })
    
    it('updates votes', () => {        
      deepFreeze(state)
      const oldState = reducer(undefined, noAction)

      console.log("old state:", oldState)

      const action = {
        type: 'VOTE',
        id: oldState[0].id
      }
      const newState = reducer(oldState, action)
  
      expect(newState[0].votes).toBe(1)
    })

    it("creates new anecdote", () => {
        deepFreeze(state)
        const oldState = reducer(undefined, noAction)
        console.log("old state:", oldState)
        const action = {
            type: 'NEW',
            content: "mikään ei onnistu kerralla"
          } 
          const newState = reducer(oldState, action)

          expect(newState.length).toBe(7)  
    })
  })