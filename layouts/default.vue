<template>
  <v-app>
    <emkay-navigation />
    <v-content>
      <!-- main router view -->
      <nuxt />
    </v-content>
    <emkay-footer />
    <client-only>
      <vue-snotify />
    </client-only>
  </v-app>
</template>

<script>
import EmkayFooter from '@/components/EmkayFooter'
import EmkayNavigation from '@/components/EmkayNavigation'
export default {
  components: {
    EmkayFooter,
    EmkayNavigation
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale || 'en'
      }
    }
  },
  mounted () {
    // debugger
    this.$meta().setOptions({ debounceWait: 50 })
  }
}
</script>
