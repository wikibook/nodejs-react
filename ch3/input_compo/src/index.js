import React from 'react'
import ReactDOM from 'react-dom'
import FormInput from './FormInput'
class CustomForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      tel: '',
      allok: false
    }
    this.oks = {}
  }
  handleChange (e) {
    // 모든 항목이 OK인지 확인합니다.
    this.oks[e.name] = e.isOK
    this.setState({
      [e.name]: e.value,
      allok: (this.oks['email'] && this.oks['tel'])
    })
  }
  handleSubmit (e) {
    window.alert(JSON.stringify(this.state))
    e.preventDefault()
  }
  render () {
    const doChange = e => this.handleChange(e)
    const doSubmit = e => this.handleSubmit(e)
    // 이메일 패턴
    const emailPat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // ASCII 문자 이외 전부
    const asciiFilter = /[^\u0020-\u007e]+/g
    return (
      <form onSubmit={doSubmit}>
        <FormInput name='email' label='메일 주소'
          value={this.state.email}
          filter={asciiFilter}
          pattern={emailPat}
          onChange={doChange} />
        <FormInput name='tel' label='전화 번호'
          value={this.state.tel}
          filter={/[^0-9-()+]/g}
          pattern={/^[0-9-()+]+$/}
          onChange={doChange} />
        <input type='submit' value='전송'
          disabled={!this.state.allok} />
      </form>
    )
  }
}
// DOM을 변경합니다.
ReactDOM.render(
  <CustomForm />,
  document.getElementById('root')
)