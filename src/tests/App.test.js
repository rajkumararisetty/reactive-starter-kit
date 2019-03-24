import React from 'react';
import { shallow } from 'enzyme';
import { fetchMock } from 'fetch-mock';

// Components
import App from '../App';

function setup() {
  const props = {};
  const wrapper = shallow(<App />);
  return { wrapper, props };
}

describe('WelcomeMessage Test Suite', () => {
  it('Should have an image', () => {
    fetchMock.post('http://stapi.co/api/v1/rest/character/search', {
      characters: [['React is great']],
    });

    const { wrapper } = setup();
    expect(wrapper.find('img').exists()).toBe(true);
  });
});
