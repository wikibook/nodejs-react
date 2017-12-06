import React, { Component } from 'react'
import './Stopwatch.css'
// Stopwatch 컴포넌트를 정의합니다.
class Stopwatch extends Component {
  constructor (props) {
 super(props)
    this.state = { // 초깃값을 설정합니다. --- (※1)
      isLive: false,
      curTime: 0,
      startTime: 0
    }
    this.timerId = 0
  }
  // 마운트했을 때 --- (※2)
  componentWillMount () {
    this.timerId = setInterval(e => {
      this.tick()
    }, 1000)
  }
  // 언마운트했을 때 --- (※3)
  componentWillUnmount () {
    clearInterval(this.timerId)
  }
  // 매 초 실행됩니다. --- (※4)
  tick () {
    if (this.state.isLive) {
      const v = new Date().getTime()
      this.setState({curTime: v})
    }
  }
  // 시작/중지 버튼을 클릭했을 때 --- (※5)
  clickHandler (e) {
    // 중지할 때
    if (this.state.isLive) {
      this.setState({isLive: false})
      return
    }
    // 시작할 때
    const v = new Date().getTime()
    this.setState({
      curTime: v,
      startTime: v,
      isLive: true})
  };
  // 출력할 시계를 생성합니다. --- (※6)
  getDisp () {
    const s = this.state
    const delta = s.curTime - s.startTime
    const t = Math.floor(delta / 1000)
    const ss = t % 60
    const m = Math.floor(t / 60)
    const mm = m % 60
    const hh = Math.floor(mm / 60)
    const z = (num) => {
      const s = '00' + String(num)
      return s.substr(s.length - 2, 2)
    }
    return <span className='disp'>
      {z(hh)}:{z(mm)}:{z(ss)}
    </span>
  }
  // 화면 렌더링 --- (※7)
  render () {
    let label = 'START'
    if (this.state.isLive) {
      label = 'STOP'
    }
    const disp = this.getDisp()
    const fclick = (e) => this.clickHandler(e)
    return (<div className='Stopwatch'>
      <div>{disp}</div>
      <button onClick={fclick}>{label}</button>
    </div>)
  }
}
export default Stopwatch