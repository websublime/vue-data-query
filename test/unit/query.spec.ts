import { VueConstructor } from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { useQuery } from '@/query';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueCommon: VueConstructor = require('vue/dist/vue.common');

VueCommon.use(VueCompositionApi);

describe('> Query', () => {
  it('...', () => {
    const vm = new VueCommon<{ data: any }>({
      template: `<div>hello, {{ data }}</div>`,
      setup() {
        return useQuery('cache-key-not-a-promise');
      },
    }).$mount();

    console.log(vm.data);

    expect(true).toBeTruthy();

    //done();
  });
});
