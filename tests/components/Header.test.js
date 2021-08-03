import { shallowMount } from '@vue/test-utils'
import store from '~/store'
import router from '~/routes'
import Header from '~/components/Header'
import { expect, test } from '@jest/globals'

describe('components/Header.vue', () => {
  let wrapper
  beforeEach(async()=> { 
    window.scrollTo = jest.fn()
    router.push('/movie/tt1234567')
    await router.isReady()
    wrapper = shallowMount(Header, {
     global:{
        plugins:[
          router,
          store
        ]
      }
    })  
  })  

  test('경로 정규식표현이 없는 경우 일치하지 않습니다.', ()=> {
    const regExp = undefined
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })

  test('경로 정규표현식과 일치해야 합니다.', ()=>{
    const regExp = /^\/movie/
    expect(wrapper.vm.isMatch(regExp)).toBe(true)
  })

  test('경료 정규표현식과 일치하지 않아야 합니다.',()=>{
    const regExp = /^\/Jaeilit/
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })
  
})