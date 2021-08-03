import movieStore from '~/store/movie'
import _cloneDepp from 'lodash/cloneDeep'
import { expect } from '@jest/globals'
import axios from 'axios'

describe('store/movie.js', () => {
  let store

  beforeEach(() => {
    store = _cloneDepp(movieStore)
    store.state = store.state()
    store.commit = (name, payload) =>{
      store.mutations[name](store.state, payload)
    }
    store.dispath = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispath: store.dispath
      }
      return store.actions[name](context, payload)
    }
  })
  
  test('영화의 데이터를 초기화 합니다.', () => {
    store.commit('resetMovies', {
      movie : [{ imdbID: '1'}],
      meesage : 'Hello world',
      loading: true
    })
    store.commit('resetMovies')
    expect(store.state.movies).toEqual([])
    expect(store.state.message).toBe('Search for the movie title!')
    expect(store.state.loading).toBe(false)
  })

  test('영화 목록을 잘 가져온 경우 데이터를 확인합니다.', async()=> {
    const res = {
      data : {
        totalResults : '1',
        Search: [
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    axios.post = jest.fn().mockResolvedValue(res)
    await store.dispath('searchMovies')
    expect(store.state.movies).toEqual(res.data.Search)
  })

  test('영화 목록을 가져오지 못한 경우 에러를 메세지를 확인합니다.', async ()=> {
    const errorMessage = 'Network Error'
    axios.post = jest.fn().mockRejectedValue(new Error(errorMessage))
    await store.dispath('searchMovies')
    expect(store.state.message).toBe(errorMessage)
  })

  test('영화 아이템이 중복 된 경우 고유하게 처리합니다.', async() => {
    const res = {
      data : {
        totalResults : '1',
        Search: [
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    axios.post = jest.fn().mockResolvedValue(res)
    await store.dispath('searchMovies')
    expect(store.state.movies.length).toBe(1)
  })
  test('단일 영화의 상세 정보를 잘 가져온 경우 데이터를 확인합니다.', async () => {
    const res = {
      data:{
        imdbID : '1',
        Title : 'Frozen',
        Poster : 'frozen.jpg',
        Year : '2021'
      }
    }
    axios.post = jest.fn().mockResolvedValue(res)
    await store.dispath('searchMovieWithId')
    expect(store.state.theMovie).toEqual(res.data)
  })
})