<template>
  <div class="container">
    <input 
      v-model="title" 
      class="form-control"
      type="text" 
      placeholder="Search for Movie, Series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option 
          v-if="filter.name === 'year'" 
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.item"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button 
      class="btn btn-primary" 
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title: '',
      type : 'movie',
      number : 10,
      year : '',
      filters : [
        {
          name : 'type',
          item : ['movie', 'series', 'episode']
        },
        {
          name : 'number',
          item : [10, 20, 30]
        },
        {
          name: 'year',
          item : (() => {
            const years = []
            const thisyear = new Date().getFullYear()
            for(let i=thisyear; i>=1985; i-= 1){
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods :{
    apply(){
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container{
  display: flex;
  >*{
    margin-right: 10px;
    font-size: 15px;
    &:last-child{
      margin-right: 0px;
    }
  }
  .selects{
    display: flex;
    select{
      width: 120px;
      margin-right: 10px;
      &:last-child{
        margin-right: 10px;
      }
    }
  }
  .btn{
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
  @include media-breakpoint-down(lg){
    display: block;
    input{
      margin-top: 0;
      margin-bottom: 10px;
    }
    .selects{
      margin-right: 0;
      margin-bottom: 10px;
      select{
        width: 100%;
      }
    }
    .btn{
      width: 100%;
    }
  }
}
</style>