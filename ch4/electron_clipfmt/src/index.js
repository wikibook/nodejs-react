import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const {clipboard} = require('electron')
// 컴포넌트를 정의합니다.
export default class App extends Component {
  constructor (props) {
    super(props)
    // 상태를 초기화합니다. --- (※1)
    this.state = {
      text: '',
      isActive: false,
      low2up: true
    }
    // 클립보드 감시 전용 타이머를 설정합니다. --- (※2)
    setInterval(e => this.tick(), 1000)
  }
  // 소문자를 대문자로 변환 --- (※3)
  convToUpper (str) {
    return str.toUpperCase()
  }
  tick () {
    if (!this.state.isActive) return
    const clip = clipboard.readText()
    let clip2 = clip
    if (this.state.low2up) {
      clip2 = this.convToUpper(clip) // --- (※4)
    }
    if (clip !== clip2) {
      clipboard.writeText(clip2)
    }
    this.setState({text: clip})
  }
  changeState (e) {
    const name = e.target.name
    this.setState({[name]: !this.state[name]}) // --- (※5)
  }
  render () {
    const taStyle = {
      width: '100%',
      height: '300px',
      backgroundColor: '#F4F4F4'
    }
    return (<div className='window'>
      <div className='window-content'>
        <div className='pane-group'>
          <div className='pane-sm sidebar'>
            <div>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <label>
                    <input type='checkbox'
                      checked={this.state.isActive}
                      name='isActive'
                      onChange={e => this.changeState(e)} />
                      감시 활성화
                  </label>
                </li>
                <li className='list-group-item'>
                  <label>
                    <input type='checkbox'
                      checked={this.state.low2up}
                      name='low2up'
                      onChange={e => this.changeState(e)} />
                    소문자를 대문자로 변환
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className='pane'>
            <div className='padded-more'>
              클립보드:<br />
              <textarea style={taStyle} value={this.state.text} />
            </div>
          </div>
        </div>
        </div>
    </div>)
  }
}
// DOM의 내용을 변경합니다.
ReactDOM.render(
  <App />,
  document.getElementById('root'))