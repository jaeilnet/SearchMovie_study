import { shallowMount } from '@vue/test-utils'
import store from '~/store'
import router from '~/routes'
import Header from '~/components/Header'

describe('components/Header.vue', () => {
  test('경로 정규식표현이 없는 경우 일치하지 않습니다.', ()=> {
    const wrapper = shallowMount(Header, {
      global:{
        plugins:[
          router,
          store
        ]
      }
    })
    const regExp = undefined
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })
})