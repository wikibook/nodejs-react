// 사용할 컴포넌트를 읽어 들입니다.
import {
  StyleSheet, Text, TextInput, View, Image,
  Button, WebView, FlatList
} from 'react-native'
import React, { Component } from 'react'
// 마스토돈 설정(토큰은 자신의 것을 입력해주세요.) --- (※1)
const mstdnToken = 'f65e1d0182f57b7b06d...2b9f42c24f5'
const apiUrl = 'https://pawoo.net/api/v1/'
// 마스토돈 API를 호출할 함수를 정의합니다. --- (※2)
function callAPI (uri, options, callback) {
  options.headers = {
    'Authorization': 'Bearer ' + mstdnToken,
    'Content-Type': 'application/json'
  }
  console.log(options)
  fetch(apiUrl + uri, options)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      callback(data)
    })
    .catch((error) => {
      console.error(error)
    })
}
// 마스토돈 클라이언트 애플리케이션의 메인 컴포넌트 --- (※3)
export default class MastodonClient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: mstdnToken,
      timelines: [],
      tootdata: ''
    }
    this.loadTimelines()
  }
  // API를 호출해서 타임라인을 읽어 들입니다. --- (※4)
  loadTimelines () {
    callAPI('timelines/home', {method: 'GET'}, e => {
      this.setState({timelines: e})
    })
  }
  // 메인 화면 렌더링 --- (※5)
  render () {
    return (
      <View style={styles.container}>
        {this.renderEditor()}
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.timelines}
          renderItem={e => this.renderTimelines(e)}
          />
      </View>
    )
  }
  // 에디터 부분 --- (※6)
  renderEditor () {
    return (
      <View style={styles.inputview}>
        <TextInput
          style={styles.input}
          value={this.state.tootdata}
          onChangeText={e =>
            this.setState({tootdata: e})}
          placeholder='지금 무슨 생각 하고 있어요?'
          />
        <Button title='Toot'
          style={styles.tootButton}
          onPress={e => this.toot(e)} />
      </View>
    )
  }
  // 타임라인 항목을 렌더링합니다. --- (※7)
  renderTimelines (item) {
    const e = item.item
    const src = {uri: e.account.avatar}
    // 이름 확인 --- (※8)
    let name = e.account.display_name
    if (!name) name = e.account.acct
    return (
      <View style={styles.item} key={e.id}>
        <View style={styles.avatar}>
          <Image source={src}
            style={styles.avatarImage} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.name}>{name}</Text>
          <WebView style={styles.body}
            automaticallyAdjustContentInsets={false}
            source={{html: e.content}}
          />
        </View>
      </View>
    )
  }
  // 전송 처리 --- (※9)
  toot (e) {
    const options = {
      'method': 'POST',
      'body': JSON.stringify({
        'status': String(this.state.tootdata)
      })
    }
    callAPI('statuses', options, e => {
      console.log(e)
      this.loadTimelines()
      this.setState({'tootdata': ''})
    })
  }
}
// 스타일을 지정합니다. --- (※10)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  inputview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 8,
    padding: 8,
    backgroundColor: '#fff0f0'
  },
  input: {
    width: 330,
    height: 40,
    backgroundColor: '#f0f0f0'
  },
  tootButton: {
    color: '#841584',
    padding: 4,
    margin: 4
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginBottom: 8
  },
  avatar: {
    height: 120,
    width: 100
  },
  itemText: {
    flexDirection: 'column',
    width: 250
  },
  avatarImage: {
    width: 100,
    height: 100
  },
  name: {
    padding: 4,
    margin: 4,
    fontSize: 14,
    backgroundColor: '#f0ffff'
  },
  body: {
    padding: 4,
    margin: 4,
    backgroundColor: 'transparent'
  }
})