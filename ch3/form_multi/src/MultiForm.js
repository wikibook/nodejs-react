import React, {Component} from 'react'
// 여러 개의 입력 항목을 가진 컴포넌트
export default class MultiForm extends Component {
  constructor (props) {
    super(props)
    // 입력 양식의 초깃값을 설정합니다. --- (※1)
    this.state = {
      name: '윤인성',
      age: 25,
      hobby: '독서'
    }
  }
  // 값이 변경됐을 때 --- (※2)
  doChange (e) {
    const userValue = e.target.value
    const key = e.target.name
    this.setState({[key]: userValue})
  }
  // 전송 버튼을 눌렀을 때
  doSubmit (e) {
    e.preventDefault()
    const j = JSON.stringify(this.state)
    window.alert(j)
  }
  // 화면 렌더링 --- (※3)
  render () {
    // 이벤트를 메서드에 바인딩합니다.
    const doSubmit = (e) => this.doSubmit(e)
    const doChange = (e) => this.doChange(e)
    return (
      <form onSubmit={doSubmit}>
        <div><label>
          이름: <br />
          <input name='name'
            type='text'
            value={this.state.name}
            onChange={doChange} />
        </label></div>
        <div><label>
          나이: <br />
          <input name='age'
            type='number'
            value={this.state.age}
            onChange={doChange} />
        </label></div>
        <div><label>
          취미: <br />
          <input name='hobby'
            type='text'
            value={this.state.hobby}
            onChange={doChange} />
        </label></div>
        <input type='submit' value='전송' />
      </form>
    )
  }
}