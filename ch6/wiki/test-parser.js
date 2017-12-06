// 파서 읽어 들이기
const WikiParser = require('./src/wiki_parser.js')
// 파싱해보기
const src = '*title\n\n-list1\n-list2\n\nfoo'
const nodes = WikiParser.parse(src)
console.log(nodes)