import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.js'
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
import socketio from 'socket.io-client'
const socket = socketio.connect('http://localhost:3001')
// 입력 양식 컴포넌트 --- (※2)
class ChatForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '', message: '' }
  }
  nameChanged (e) {
    this.setState({name: e.target.value})
  }
  messageChanged (e) {
    this.setState({message: e.target.value})
  }
  // 서버에 이름과 메시지 전송 --- (※3)
  send () {
    socket.emit('chat-msg', {
      name: this.state.name,
      message: this.state.message
    })
    this.setState({message: ''}) // 입력 양식을 비웁니다.
  }
  render () {
    return (
      <div style={styles.form}>
        이름:<br />
        <input value={this.state.name}
          onChange={e => this.nameChanged(e)} /><br />
        메시지:<br />
        <input value={this.state.message}
          onChange={e => this.messageChanged(e)} /><br />
        <button onClick={e => this.send()}>전송</button>
      </div>
    )
  }
}
// 채팅 애플리케이션의 메인 컴포넌트를 정의합니다. --- (※4)
class ChatApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: []
    }
  }
  // 컴포넌트가 마운트됐을 때 --- (※5)
  componentDidMount () {
    // 실시간으로 로그를 받게 설정
    socket.on('chat-msg', (obj) => {
      const logs2 = this.state.logs
      obj.key = 'key_' + (this.state.logs.length + 1)
      console.log(obj)
      logs2.unshift(obj) // 로그에 추가하기
      this.setState({logs: logs2})
    })
  }
  render () {
    // 로그를 사용해 HTML 요소 생성 --- (※6)
    const messages = this.state.logs.map(e => (
      <div key={e.key} style={styles.log}>
        <span style={styles.name}>{e.name}</span>
        <span style={styles.msg}>: {e.message}</span>
        <p style={{clear: 'both'}} />
      </div>
    ))
    return (
      <div>
        <h1 style={styles.h1}>실시간 채팅</h1>
        <ChatForm />
        <div>{messages}</div>
      </div>
    )
  }
}
// DOM의 내용을 메인 컴포넌트로 변경합니다.
ReactDOM.render(
  <ChatApp />,
  document.getElementById('root'))