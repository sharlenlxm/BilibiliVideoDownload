const parser = require('fast-xml-parser');
const hashToId = require('./hashToUid');
const utils = require('./utils-es6');

const options = {
  attributeNamePrefix : "",
  attrNodeName: false,
  textNodeName : "text",
  ignoreAttributes : false,
  ignoreNameSpace : false,
  allowBooleanAttributes : false,
  parseNodeValue : true,
  parseAttributeValue : false,
  trimValues: true,
  cdataTagName: "__cdata",
  cdataPositionChar: "\\c",
  localeRange: "",
  parseTrueNumberOnly: false
};

const parserDanmu = xml => {
  let xmlData = parser.parse(xml,options);
  let danmuArray = xmlData.i.d;
  let arr = [];
  danmuArray.forEach((item,index) => {
    let obj = {};
    obj.danmu = item.text;
    obj.time = utils.formatTimestamp({
      rules: "YYYY-MM-DD hh:mm:ss",
      timestamp: parseInt(((item.p).split(','))[4])
    });
    obj.uid = 'https://space.bilibili.com/' + hashToId.hashToUid(((item.p).split(','))[6]);
    arr.push(obj);
  });
  return arr;
};

module.exports = {
  parserDanmu
};