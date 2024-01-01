import Vue from 'vue';
import Vuetify from 'vuetify';

import { mount, createLocalVue } from '@vue/test-utils';
import Greeting from '@/components/Greeting.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('Greeting.vue', () => {
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders h1', () => {
    const wrapper = mount(Greeting, {
      localVue,
      vuetify,
      propsData: {
        greeting: 'Hello',
      },
    });
    expect(wrapper.find('h1').text()).toMatch('Hello');
  });
});
