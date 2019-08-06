import { createGa } from './utils';
import parse from 'url-parse';

describe('event', () => {
  it('info', () => {
    const ga = createGa();

    const category = 'btn';
    const action = 'click';
    const label = 'setting';
    const value = 123;

    const url = ga.event({
      category, action, label, value,
      nonInteraction: true
    });

    const { query } = parse(url, true);

    expect(query.ec)
      .toBe(category);

    expect(query.ea)
      .toBe(action);

    expect(query.el)
      .toBe(label);

    expect(query.ev)
      .toBe(
        String(value)
      );

    expect(query.ni)
      .toBe('1');
  });
});