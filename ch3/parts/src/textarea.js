import React from 'react'
import ReactDOM from 'react-dom'
class TextAreaForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 'Hello' }
  }
  render () {
    // 입력 양식으로 텍스트에리어를 지정합니다.
    return (<div>
      <form onSubmit={e => this.doSubmit(e)}>
        <textarea
          onChange={e => this.doChange(e)}
          value={this.state.value}
          /><br />
          <input type='submit' value='결정' />
        </form>
      </div>)
    }
    // 텍스트에리어를 변경했을 때
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
    <TextAreaForm />,
    document.getElementById('root')
  )