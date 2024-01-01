import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        neutral: {
          lighten5: '#FAFBFC',
          lighten4: '#FAFAFA',
          lighten3: '#F2F4F5',
          lighten2: '#E6E9EB',
          lighten1: '#CDD1D4',
          base: '#A3ADB5',
          darken1: '#7D8C97',
          darken2: '#607280',
          darken3: '#3D505E',
          darken4: '#2A3740',
        },
        primary: {
          lighten4: '#EDF5FF',
          lighten3: '#DBECFF',
          lighten2: '#B7D9FF',
          lighten1: '#80BCFF',
          base: '#4A9FFF',
          darken1: '#438FE6',
          darken2: '#346FB3',
          darken3: '#1D4066',
          darken4: '#0F2033',
        },
        yellow: {
          lighten4: '#FFFAE8',
          lighten3: '#FFF5D1',
          lighten2: '#FFEAA2',
          lighten1: '#FFE074',
          base: '#FFCB17',
          darken1: '#E6B715',
        },
        danger: {
          base: '#FF504A',
        },
        correct: '#00B176',
        correctEventually: '#F8951D',
        incorrect: '#B91E60',
      },
    },
  },
});
