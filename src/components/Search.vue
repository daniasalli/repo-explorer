<template>
  <div class="d-flex justify-content-center">
    <div class="px-2 search-bar ">
      <i class="fa fa-search"></i>
      <input class="search-input" placeholder="Organization name" v-model.trim="organization" />
    </div>
    <div>
      <button class="btn-primary" @click="$emit('search-list', organization)">Find
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      organization: ''
    }
  }
}
</script>

<style lang="scss">
  .search-bar {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    background: #E8E8F1;
    transition: all .3s ease 0s;
    color: #CECEE1;
    align-items: center;
    input {
      vertical-align: middle;
      background: transparent;
      border: none;
      width: auto;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #CECEE1;
      }
    }
  }
</style>
