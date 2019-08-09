<script>
import axios from 'axios'
export default {
  name: 'async',
  props: {
    url: { type: String, default: '', required: true },
    params: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      pending: true,
      error: false,
      data: null,
      pagination: null
    }
  },
  watch: {
    url () {
      this.requestData()
    },
    params: {
      handler () {
        this.requestData()
      },
      deep: true
    }
  },
  mounted () {
    this.requestData()
  },
  methods: {
    async requestData () {
      this.pending = true
      try {
        const { data, headers } = await axios.get(this.url, { params: this.params })
        this.data = data
        this.error = false
        let parse = require('parse-link-header')
        this.pagination = parse(headers.link)
      } catch (e) {
        this.data = null
        this.error = e
      }
      this.pending = false
    }
  },
  render () {
    return this.$scopedSlots.default({
      pending: this.pending,
      error: this.error,
      data: this.data,
      pagination: this.pagination
    })
  }
}
</script>
