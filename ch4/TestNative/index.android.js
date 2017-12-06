// 필요한 모듈을 읽어 들입니다. --- (※1)
import React, { Component } from 'react'
import {
  AppRegistry, StyleSheet, Text, View
} from 'react-native'
// 메인 컴포넌트 정의 --- (※2)
export default class TestNative extends Component {
  render() {
    const msg =
      'React Native를 사용해\n' +
      '애플리케이션 만들기'
    return (
      <View style={styles.base}>
        <Text style={styles.title}>{msg}</Text>
      </View>
    )
  }
}
// 스타일 설정 --- (※3)
const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0FF'
  },
  title: {
    fontSize: 46
  }
})
// 애플리케이션에 컴포넌트를 등록 --- (※4)
AppRegistry.registerComponent('TestNative', () => TestNative)