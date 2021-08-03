import { shallowMount } from "@vue/test-utils";
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import Movie from '~/routes/Movie'
import { beforeEach, describe, expect } from "@jest/globals";

describe('routes/Movie.vue',()=>{
  let wrapper
  window.scrollTo =  jest.fn()
  
  beforeEach(async() => {
    router.push('/movie/tt1234567')
    await router.isReady()
    
    wrapper = shallowMount(Movie, {
      global: {
        plugins:[
          store,
          router,
          loadImage
        ]
      }
    })
  })

  test('최초 접속한 URL 파라미터를 확인합니다.', () => {
    expect(wrapper.vm.$route.params.id).toBe('tt1234567') 
  })

  test('지정한 이미지의 크기로 URL을 변경합니다.', ()=> {
    const url = 'https://google.com/sample_image_SX300.jpg'
    expect(wrapper.vm.requetDiffSizeImage(url)).toContain("SX700")
    expect(wrapper.vm.requetDiffSizeImage(url, 900)).toContain('SX900')
  })
  test('정상적인 이미지 주소가 아닌 경우 빈 문자열을 반환합니다.', () => {
    expect(wrapper.vm.requetDiffSizeImage()).toBe('')
    expect(wrapper.vm.requetDiffSizeImage('N/A')).toBe('')
  })  
})


