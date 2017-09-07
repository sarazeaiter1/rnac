import All from '../';

test('Package exports correctly', () => {
  expect(All).toMatchSnapshot();
});
