import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from './styles'
export default class SNSUsers extends Component {
  constructor (props) {
    super(props)
    this.state = { users: [], jump: '', friends: [] }
  }
  componentWillMount () {
    this.loadUsers()
  }
  // 사용자 목록과 친구 목록 추출하기 -- (※1)
  loadUsers () {
    request
      .get('/api/get_allusers')
      .end((err, res) => {
        if (err) return
        this.setState({users: res.body.users})
      })
    request
      .get('/api/get_user')
      .query({userid: window.localStorage.sns_id})
      .end((err, res) => {
        console.log(err, res)
        if (err) return
        this.setState({friends: res.body.friends})
      })
  }
  // 친구 추가 버튼을 클릭했을 때 --- (※2)
  addFriend (friendid) {
    if (!window.localStorage.sns_auth_token) {
      window.alert('로그인 해주세요.')
      this.setState({jump: '/login'})
      return
    }
    request
      .get('/api/add_friend')
      .query({
        userid: window.localStorage.sns_id,
        token: window.localStorage.sns_auth_token,
        friendid: friendid
      })
      .end((err, res) => {
        if (err) return
        if (!res.body.status) {
          window.alert(res.body.msg)
          return
        }
        this.loadUsers()
      })
  }
  render () {
    if (this.state.jump) {
      return <Redirect to={this.state.jump} />
    }
    const friends = this.state.friends ? this.state.friends : {}
    const ulist = this.state.users.map(id => {
      const btn = (friends[id])
        ? `${id}은/는 친구입니다.`
        : (<button onClick={eve => this.addFriend(id)}>
          {id}을/를 친구로 추가합니다.</button>)
      return (<div key={'fid_' + id} style={styles.friend}>
        <img src={'user.png'} width={80} /> {btn}
      </div>)
    })
    return (
      <div>
        <h1>사용자 목록</h1>
        <div>{ulist}</div>
        <div><br /><a href={'/timeline'}>→타임라인 보기</a></div>
      </div>
    )
  }
}