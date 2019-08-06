import getSystemInfo from './utils/getSystemInfo';
import genClientId from './utils/genClientId';
import genNonce from './utils/genNonce';
import storage from './utils/storage';
import assembleParams from './utils/assembleParams';

class ExtfansGa {
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

ExtfansGa.version = process.env.VERSION;

export default ExtfansGa;