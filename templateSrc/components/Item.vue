<template>
  <div>{{ item.title }}</div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>