import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const reset = () => {
  console.log("resetnappia painettu")
  store.dispatch({ type: "ZERO"})

}

const Statistiikka = () => {
  console.log("state:", store.getState())
  const { good, ok, bad } = store.getState()

  if (good === 0 && ok === 0 && bad === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{ good }</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ ok }</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{ bad }</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{ (good - bad) / (good + ok + bad) }</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td> { good } / { good + ok + bad }</td>
          </tr>
        </tbody>
      </table>

      <button onClick={ reset }>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    console.log("nappia painettu", nappi)
    store.dispatch({ type: nappi})

  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
//ReactDOM.render(<App />, document.getElementById('root'));

export default App;
