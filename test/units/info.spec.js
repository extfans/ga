import { createGa } from './utils';
import parse from 'url-parse';
import { TRACKING_ID, USER_ID } from './consts';

function createLocation() {
  const ga = createGa();

  return parse(ga.send(), true);
}

describe('info', () => {
  it('base', () => {
    const location = createLocation();

    expect(location.protocol)
      .toBe('https:');

    expect(location.host)
      .toBe('www.google-analytics.com');

    expect(location.pathname)
      .toBe('/collect');

    const query = location.query;

    expect(query.v)
      .toBe('1');

    expect(query.tid)
      .toBe(TRACKING_ID);

    expect(query.uid)
      .toBe(USER_ID);
  });

  it('client id', () => {
    const location1 = createLocation();

    const location2 = createLocation();

    expect(location1.query.cid)
      .toBe(location2.query.cid);
  });

  it('system', () => {
    const { query } = createLocation();

    expect(query.sr)
      .toMatch(/^\d+x\d+$/);

    expect(query.sd)
      .toMatch(/^\d+-bits$/);

    expect(query.ul)
      .toBeDefined();
  });

  it('extra', () => {
    const { query } = createLocation();

    expect(query.dl)
      .toBe(
        global.location.href.split('#')[0]
      );
  })
});