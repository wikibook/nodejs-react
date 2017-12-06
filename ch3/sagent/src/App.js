import React, { Component } from 'react'
import './App.css'
// SuperAgent 사용 선언 --- (※1)
import request from 'superagent'
class App extends Component {
  constructor (props) {
    super(props)
    // 상태를 초기화합니다.
    this.state = {
      items: null // 읽어 들인 데이터 저장 전용
    }
  }
  // 마운트됐을 때
  componentWillMount () {
    // JSON 데이터 읽어 들이기 --- (※2)
    request.get('./fruits.json')
      .accept('application/json')
      .end((err, res) => {
        this.loadedJSON(err, res)
      })
  }
  // 데이터를 읽어 들였을 때 --- (※3)
  loadedJSON (err, res) {
    if (err) {
      console.log('JSON을 읽어 들이는 동안 오류가 발생했습니다')
      return
    }
    // 상태를 변경합니다. --- (※4)
    this.setState({
      items: res.body
    })
  }
  render () {
    // JSON 데이터를 제대로 읽어 들였는지 확인 --- (※5)
    if (!this.state.items) {
      return <div className='App'>
        읽어 들이는 중입니다.</div>
    }
    // 읽어 들인 데이터를 기반으로 select 요소를 생성합니다. --- (※6)
    const options = this.state.items.map(e => {
      return <option value={e.price} key={e.name}>
        {e.name}
      </option>
    })
    return (
      <div className='App'>
        과일: <select>{options}</select>
        </div>
    )
  }
}
export default App