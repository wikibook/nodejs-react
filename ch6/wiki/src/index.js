import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import WikiEdit from './wiki_edit'
import WikiShow from './wiki_show'
const WikiApp = () => (
  <Router>
    <div>
      <Route path='/wiki/:name' component={WikiShow} />
      <Route path='/edit/:name' component={WikiEdit} />
    </div>
  </Router>
)
// DOM의 내용을 메인 컴포넌트로 변경합니다.
ReactDOM.render(
  <WikiApp />,
  document.getElementById('root'))