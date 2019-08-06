# 简单的google analytics实现

## 功能

1. 使用localstorage读写clientId，clientId使用UUID (version 4)随机生成

2. 无法使用官方ga时，可考虑使用这个库来满足功能

## 使用方式

```
npm install --save extfans-ga
```

```
import ExtfansGa from 'extfans-ga';

const extfansGa = new ExtfansGa({
  // 必须
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid
  trackingId: 'UA-XXXXXXXXX-X',

  // 可选
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#uid
  userId: 'yyy'
});

```

## 功能

1. pageview

```
extfansGa.pageview({
  // 可选，默认为location.href去掉location.hash后的部分
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dl
  location: 'http://foo.com/home?a=b',

  // 可选
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dh
  host: 'foo.com',

  // 可选
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dp
  page: '/foo',

  // 可选，默认为document.title
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dt
  title: 'my-title'
});

// 可以不传参数直接调用
extfansGa.pageview();
```

2. event

```
extfansGa.event({
  // 必填
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ec
  category: 'btn',

  // 必填
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ea
  action: 'click',

  // 可选
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#el
  label: 'setting',

  // 可选
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ev
  value: 30,

  // 可选，默认为false
  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ni
  nonInteraction: false
});
```