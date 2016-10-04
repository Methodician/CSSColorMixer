import { CSSColorMixerPage } from './app.po';

describe('css-color-mixer App', function() {
  let page: CSSColorMixerPage;

  beforeEach(() => {
    page = new CSSColorMixerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
