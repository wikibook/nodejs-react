import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import fs from 'fs'
import path from 'path'
import Mastodon from 'mastodon-api'
import {styles} from './styles.js'
// 컴포넌트를 정의합니다. --- (※1)
export default class App extends Component {
  constructor (props) {
    super(props)
    this.apiUri = 'https://pawoo.net/api/v1/'
    this.loadInfo()
    this.state = {
      tootdata: '',
      timelines: []
    }
  }
  // 컴포넌트 마운트 때의 처리 --- (※2)
  componentWillMount () {
    this.loadTimelines()
    setInterval(() => {
      this.loadTimelines()
    }, 1000 * 30) // 30초에 1회 다시 불러옵니다.
  }
  // API 클라이언트를 생성합니다. --- (※3)
  loadInfo () {
    // 접근 토큰을 추출합니다.
    const f = path.join('token.json')
    try {
      fs.statSync(f)
    } catch (err) {
      window.alert('접근 토큰을 등록해주세요.')
      window.close()
      return
    }
    this.token = fs.readFileSync(f)
    // API 클라이언트를 생성합니다.
    this.mstdn = new Mastodon({
      access_token: this.token,
      timeout_ms: 60 * 1000,
      api_url: this.apiUri
    })
  }
  // 타임라인을 읽어 들입니다. --- (※4)
  loadTimelines () {
    this.mstdn.get('timelines/home', {})
      .then(res => {
        this.setState({timelines: res.data})
      })
  }
  // 텍스트박스가 변경됐을 때의 처리
  handleText (e) {
    this.setState({tootdata: e.target.value})
  }
  // 전송 처리 --- (※5)
  toot (e) {
    this.mstdn.post(
      'statuses',
      {status: this.state.tootdata},
      (err, data, res) => {
        if (err) {
          console.error(err)
        }
        this.setState({tootdata: ''})
        this.loadTimelines()
      }
    )
  }
  // 렌더링 --- (※6)
  render () {
    return (<div>
      <div style={styles.editorPad}>
        <h1 style={styles.title}>마스토돈 클라이언트</h1>
        <textarea
          style={styles.editor}
          value={this.state.tootdata}
          onChange={e => this.handleText(e)} />
        <div>
          <button onClick={e => this.toot(e)}>Toot</button>
        </div>
      </div>
      <div style={{marginTop: 120}} />
      {this.renderTimelines()}
    </div>)
  }
  // 타임라인 부분을 생성합니다.--- (※7)
  renderTimelines () {
    const lines = this.state.timelines.map(e => {
      console.log(e)
      // 부스트가 있을 때의 처리 --- (※8)
      let memo = null
      if (e.reblog) {
        memo = (<p style={styles.reblog}>
          {e.account.display_name}님이 부스트했습니다.
          </p>)
        e = e.reblog
      }
      // Toot 렌더링 내용 --- (※9)
      return (<div key={e.id} style={styles.content}>
        <img style={styles.avatar}
          src={e.account.avatar} />
        <div style={styles.ctext}>
          {memo}{e.account.display_name}
          <span dangerouslySetInnerHTML={{
            __html: e.content}} />
        </div>
        <div style={{clear: 'both'}} />
      </div>)
    })
    return (<div>
      <h2 style={styles.title}>타임라인</h2>
      {lines}</div>)
  }
}
// DOM의 내용을 변경합니다.
ReactDOM.render(<App />,
  document.getElementById('root'))