<template>
  <nuxt-child />
</template>

<script>

export default {
  name: 'Reporting',
  layout: 'reporting',
  // middleware: ['check-auth'],
  head () {
    const title = this.$t('reporting')
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  /**
   * The scrollToTop property lets you tell Nuxt.js to scroll to the top before rendering the page.
   * https://nuxtjs.org/api/pages-scrolltotop
   * Since the each specific report page 're-renders' on every query change (if using watchQuery), disable scrollToTop for reports
   */
  scrollToTop: false
}
</script>
