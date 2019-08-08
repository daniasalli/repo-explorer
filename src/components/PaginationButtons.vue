<template>
  <div class="pagination-controls">
    <div class="btn-group">
      <button title="Previous page" class="btn btn-pagination"
              type="button" v-if="hasPrevious"
              @click.prevent="$emit('load-page', pagination.prev.page)"><i
        class="fa fa-chevron-left"></i></button>
      <button title="Next page" class="btn btn-pagination"
              type="button" v-if="hasNext"
              @click.prevent="$emit('load-page', pagination.next.page)"><i
        class="fa fa-chevron-right"></i></button>
    </div>
    <span class="pagination-text small">Page {{ current }} <span v-if="hasLast">of {{ pagination.last.page }}</span></span>
  </div>
</template>
<script>
export default {
  name: 'PaginationButtons',
  props: {
    pagination: Object,
    current: [String, Number]
  },
  computed: {
    hasPrevious () {
      return Object.prototype.hasOwnProperty.call(this.pagination, 'prev')
    },
    hasNext () {
      return Object.prototype.hasOwnProperty.call(this.pagination, 'next')
    },
    hasLast () {
      return Object.prototype.hasOwnProperty.call(this.pagination, 'last')
    }
  }
}
</script>
<style lang="scss" scoped>
  .pagination-controls {
  /*.btn-pagination {*/
  /*border: 1px solid rgba(150,160,180,.5);*/
  /*}*/

  .pagination-text {
    margin: 8px 0 10px 10px;
    display: inline-block;
  }
  }
</style>
