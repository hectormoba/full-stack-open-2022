import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const handleClickUpdate = (feedback) => {
    if(feedback !== 'reset') {
      store.dispatch({
        type: feedback.toUpperCase()
      })
      return
    }

    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={() => handleClickUpdate('good')}>good</button>
      <button onClick={() => handleClickUpdate('ok')}>ok</button>
      <button onClick={() => handleClickUpdate('bad')}>bad</button>
      <button onClick={() => handleClickUpdate('reset')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
