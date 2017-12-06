import React from 'react'
import ReactDOM from 'react-dom'
class RadioForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: props.items,
      value: ''
    }
  }
  render () {
    // 라디오버튼을 생성합니다.
    const radiolist = this.state.items.map(i => {
      return (<div key={i}>
        <label>
          <input type='radio'
            name='items' value={i}
            checked={this.state.value === i}
            onChange={e => this.doChange(e)} /> {i}
        </label>
      </div>)
    })
    // 입력 양식에 라디오버튼 목록을 지정합니다.
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        {radiolist}
        <input type='submit' />
      </form>
    </div>)
  }
  // 라디오버튼을 변경했을 때
  doChange (e) {
    this.setState({ value: e.target.value })
  }
  // 입력 양식을 전송했을 때
  doSubmit (e) {
    e.preventDefault()
    window.alert(this.state.value)
  }
}
ReactDOM.render(
  <RadioForm items={['초콜렛', '과자', '콜라']} />,
  document.getElementById('root'))