import { createGa } from './utils';
import parse from 'url-parse';

describe('pageview', () => {
  it('info', () => {
    const ga = createGa();

    const location = 'https://test.com/a/b/c';
    const host = 'test.com';
    const page = '/a/b/c';
    const title = 'test-title';

    const url = ga.pageview({
      location, host, page, title 
    });

    const { query } = parse(url, true);

    expect(query.dl)
      .toBe(location);
    
    expect(query.dh)
      .toBe(host);

    expect(query.dp)
      .toBe(page);
    
    expect(query.dt)
      .toBe(title);
  });

  it('default', () => {
    const originTitle = document.title;

    const title = global.document.title = 'pageview-default';

    const ga = createGa();

    const url = ga.pageview();

    const { query } = parse(url, true);

    expect(query.dt)
      .toBe(title);

    // reset
    global.document.title = originTitle;
  });

  
});