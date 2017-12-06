// 필요한 모듈을 선언합니다.
import React, { Component } from 'react'
import {
  AppRegistry, StyleSheet, Text, View
} from 'react-native'
// 메인 컴포넌트 선언 --- (※1)
export default class TestNative extends Component {
  render () {
    // 배열 데이터를 정의합니다. --- (※2)
    const lines = [
      '태어난 때가 있으면', '죽을 때도 있다.', '---',
      '울 때가 있으면', '웃을 때도 있다.', '---',
      '침묵을 지켜야 할 때가 있고', '침묵을 깨야할 때가 있다'
    ]
    // 배열 데이터를 기반으로 컴포넌트를 생성합니다. --- (※3)
    const textLines = lines.map((e, i) => {
      return <Text
        style={styles.line}
        key={e + i} children={e} />
    })
    return (
      <View style={styles.container}>
        {textLines}
      </View>
    )
  }
}
// 스타일시트를 선언합니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  line: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
// 메인 컴포넌트를 등록합니다. --- (※4)
AppRegistry.registerComponent('TestNative', () => TestNative)