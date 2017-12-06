import React, { Component } from 'react'
import { SimpleForm } from './SimpleForm'
import './App.css'
// 메인 화면 컴포넌트입니다.
export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <SimpleForm />
      </div>
    )
  }
}
