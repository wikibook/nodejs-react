import React, {Component} from 'react'
// 숫자 입력 컴포넌트
export default class ValueInput extends Component {
  constructor (props) {
    super(props)
    // 프로퍼티로 초깃값을 설정합니다. --- (※5)
    this.state = {
      value: this.props.value
    }
  }
  // 값이 사용자에 의해 변경됐을 때 --- (※6)
  handleChange (e) {
    const v = e.target.value
    // 숫자 이외의 값을 제거합니다.
    const newValue = v.replace(/[^0-9.]+/g, '')
    // 상태에 설정합니다. --- (※7)
    this.setState({value: newValue})
    // 이벤트를 실행합니다. --- (※8)
    if (this.props.onChange) {
      this.props.onChange({
        target: this,
        value: newValue
      })
    }
  }
  // 프로퍼티가 변경됐을 때 --- (※9)
  componentWillReceiveProps (nextProps) {
    this.setState({value: nextProps.value})
  }
  // 렌더링 --- (※10)
  render () {
    return (<div>
      <label>{this.props.title}: <br />
        <input type='text'
          value={this.state.value}
          onChange={e => this.handleChange(e)} />
      </label>
    </div>)
  }
}