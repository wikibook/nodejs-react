import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
// 사용자 정보
const users = [
  {id: 1, name: '윤인성', info: '웹 개발 부서 개발자'},
  {id: 2, name: '연하진', info: '웹 개발 부서 기획자'},
  {id: 3, name: '윤명월', info: '웹 개발 부서 디자이너'}
]
// 메인 컴포넌트 정의 --- (※1)
const CustomerApp = () => (
  <Router>
    <div style={{margin: 20}}>
      <div>
        <Switch>
          <Route path='/user/:id' component={UserCard} />
          <Route component={UserList} />
        </Switch>
      </div>
    </div>
  </Router>
)
// 사용자 목록을 출력하는 컴포넌트 --- (※2)
class UserList extends React.Component {
  render () {
    const ulist = users.map(e => (
      <li key={e.id}>
        <Link to={'/user/' + e.id}>{e.name}</Link>
      </li>
    ))
    return (<ul>{ulist}</ul>)
  }
}
// 사용자 상세 정보를 출력하는 컴포넌트 --- (※3)
class UserCard extends React.Component {
  render () {
    const {params} = this.props.match
    const id = parseInt(params.id, 10)
    const user = users.filter(e => e.id === id)[0]
    return (
      <div>
        <div>{id}: {user.name} - {user.info}</div>
        <div><Link to='/'>→뒤로가기</Link></div>
      </div>
    )
  }
}
export default CustomerApp