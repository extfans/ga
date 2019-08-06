function getSystemInfo() {
  return {
    sr: screen.width + 'x' + window.screen.height,
    sd: screen.colorDepth + '-bits',
    ul: navigator.language
  }
}

function genClientId() {
  let d = Date.now() + performance.now();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(
      /[xy]/g,
      c => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    }
  );
}

let t = new Date().valueOf();

function genNonce() {
  return t++;
}

var storage = {
  get(key) {
    return localStorage.getItem(key);
  },
  set(key, val) {
    localStorage.setItem(key, val);
  }
};

function assembleParams(paramMap) {
  const paramArr = [];
  for (let key in paramMap) {
    let val = paramMap[key];

    if (val == null || val === false) {
      continue;
    }

    if (val === true) {
      val = 1;
    }

    paramArr.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(val)
    );
  }
  return paramArr.join('&');
}

class Ga {
  constructor(info) {
    const me = this;

    // base
    const baseInfo = me.baseInfo = {
      v: 1,
      tid: info.trackingId,
      uid: info.userId,
    };

    let clientId = storage.get('ga:clientId');
    if (!clientId) {
      clientId = genClientId();
      storage.set('ga:clientId', clientId);
    }
    baseInfo.cid = clientId;

    // system
    me.systemInfo = getSystemInfo();

    // extra
    me.extraInfo = {
      dl: (location.href.split('#'))[0]
    };
  }

  event(info) {
    const me = this;

    return me.send(
      'event',
      {
        ec: info.category,
        ea: info.action,
        el: info.label,
        ev: info.value,
        ni: info.nonInteraction === true
      }
    );
  }

  pageview(info={}) {
    const me = this;

    return me.send(
      'pageview',
      {
        dl: info.location,
        dh: info.host,
        dp: info.page,
        dt: info.title || document.title
      }
    );
  }

  send(type, sendInfo) {
    const me = this;

    const info = {
      _t: genNonce(),
      t: type,
      ...me.baseInfo,
      ...me.systemInfo,
      ...sendInfo
    };

    const extraInfo = me.extraInfo;
    for (let key in extraInfo) {
      if (info[key] == null) {
        info[key] = extraInfo[key];
      }
    }

    const xhr = new XMLHttpRequest();

    const url = 'https://www.google-analytics.com/collect?' + assembleParams(info);

    xhr.open(
      'GET',
      url,
      true
    );

    xhr.send(null);

    return url;
  }
}

Ga.version = "1.0.0";

export default Ga;
