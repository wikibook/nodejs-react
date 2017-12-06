import React from 'react'
import ReactDOM from 'react-dom'
class CBoxForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { check: true }
  }
  render () {
    // 입력 양식에 체크 상태를 지정합니다.
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        <label>
          <input type='checkbox'
            onChange={e => this.doChange(e)}
            checked={this.state.check}
            />먹기
        </label><br />
        <input type='submit' value='결정' />
      </form>
    </div>)
  }
  // 체크박스를 클릭했을 때
  doChange (e) {
    this.setState({ check: !this.state.check })
  }
  // 입력 양식을 전송했을 때
  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.check ? '먹기' : '먹지 않기')
  }
}
ReactDOM.render(
  <CBoxForm />,
  document.getElementById('root')
)