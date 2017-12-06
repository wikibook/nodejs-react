import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from './styles'
// 편집 화면 컴포넌트 --- (※1)
export default class WikiEdit extends Component {
  // 컴포넌트 초기화 --- (※2)
  constructor (props) {
    super(props)
    const {params} = this.props.match
    const name = params.name // --- (※3)
    this.state = {
      name, body: '', loaded: false, jump: ''
    }
  }
  // 위키 내용 읽어 들이기 --- (※4)
  componentWillMount () {
    request
      .get(`/api/get/${this.state.name}`)
      .end((err, res) => {
        if (err) return
        this.setState({
          body: res.body.data.body,
          loaded: true
        })
      })
  }
  // 본문을 서버에 전송 --- (※5)
  save () {
    const wikiname = this.state.name
    request
      .post('/api/put/' + wikiname)
      .type('form')
      .send({
        name: wikiname,
        body: this.state.body
      })
      .end((err, data) => {
        if (err) {
          console.log(err)
          return
        }
        this.setState({jump: '/wiki/' + wikiname})
      })
  }
  bodyChanged (e) {
    this.setState({body: e.target.value})
  }
  // 편집 화면 출력 --- (※6)
  render () {
    if (!this.state.loaded) { // --- (※7)
      return (<p>읽어 들이는 중</p>)
    }
    if (this.state.jump !== '') {
      // 메인 화면으로 리다이렉트 --- (※8)
      return <Redirect to={this.state.jump} />
    }
    const name = this.state.name
    return (
      <div style={styles.edit}>
        <h1><a href={`/wiki/${name}`}>{name}</a></h1>
        <textarea rows={12} cols={60}
          onChange={e => this.bodyChanged(e)}
          value={this.state.body} /><br />
        <button onClick={e => this.save()}>저장</button>
      </div>
    )
  }
}