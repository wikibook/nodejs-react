import React, {Component} from 'react'
// 우편 번호 입력 컴포넌트
export default class ZipInput extends Component {
  constructor (props) {
    super(props)
    const v = (this.props.value)
      ? this.props.value : ''
    // 상태를 초기화합니다. --- (※1)
    this.state = {
      value: v,
      isOK: this.checkValue(v)
    }
  }
  // 패턴에 맞는지 확인하기--- (※2)
  checkValue (s) {
    const zipPattern = /^\d{5}$/
    return zipPattern.test(s)
  }
  // 값이 사용자에 의해 변경됐을 때 --- (※3)
  handleChange (e) {
    const v = e.target.value
    // 숫자 이외의 값을 제거합니다.
    const newValue = v.replace(/[^0-9]+/g, '')
    const newIsOK = this.checkValue(newValue)
    // 상태에 설정합니다.
    this.setState({
      value: newValue,
      isOK: newIsOK
    })
    // 이벤트를 실행합니다. --- (※4)
    if (this.props.onChange) {
      this.props.onChange({
        target: this,
        value: newValue,
        isOK: newIsOK
      })
    }
  }
  // 프로퍼티가 변경됐을 때 --- (※5)
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value,
      isOK: this.checkValue(nextProps.value)
    })
  }
  // 렌더링 --- (※6)
  render () {
    const msg = this.renderStatusMessage()
    return (<div>
      <label>우편 번호: <br />
        <input type='text'
          placeholder='우편 번호를 입력해주세요.'
          value={this.state.value}
          onChange={e => this.handleChange(e)} />
        {msg}
      </label>
    </div>)
  }
  // 입력이 제대로 됐는지 출력하는 메시지 --- (※7)
  renderStatusMessage () {
    // 메시지에 적용할 스타일
    const so = {
      margin: '8px',
      padding: '8px',
      color: 'white'
    }
    let msg = null
    if (this.state.isOK) { // OK 때
      so.backgroundColor = 'green'
      msg = <span style={so}>OK</span>
    } else { // NG 때(빈 문자열이라면 출력하지 않습니다)
      if (this.state.value !== '') {
        so.backgroundColor = 'red'
        msg = <span style={so}>NG</span>
      }
    }
    return msg
  }
}