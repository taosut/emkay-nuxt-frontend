<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn :to="vehicleRoute" exact nuxt text>
          <v-icon v-text="'mdi-chevron-left'" class="mr-2" />
          {{ $t('to_vehicle_dashboard') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="report">
          <v-card-title>
            {{ $t('rental_history') }}
            <v-spacer />
            <v-text-field
              v-model="search"
              :label="$t('search')"
              prepend-inner-icon="mdi-magnify"
              clearable
              dense
              flat
              hide-details
              outlined
              rounded
              single-line
              solo
            />
          </v-card-title>
          <v-card-text class="pa-0">
            <v-skeleton-loader :loading="loading" type="table">
              <v-data-table
                :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
                :headers="headers"
                :items="items"
                :items-per-page="25"
                :loading="loading"
                :mobile-breakpoint="0"
                :search="search"
                :sort-by="['date']"
                :sort-desc="[true]"
                class="striped"
                dense
              />
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery, vehicleRoute } from '@/mixins/routing'
export default {
  name: 'Rentals',
  mixins: [downloadFields, vehicleRoute, updateQuery],
  data () {
    return {
      end_menu: false,
      start_menu: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      items: 'vehicle/getRentalHistory',
      loading: 'vehicle/getRentalLoading',
      vehicle_number: 'vehicle/getVehicleNumber'
    }),
    columns () {
      return []
    },
    headers () {
      return []
    },
    query () {
      return { start: this.start, end: this.end }
    }
  },
  async asyncData ({ $moment, params, query, store }) {
    const vehicle = store.getters['vehicle/getVehicleNumber']
    const report_length = 30
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    await store.dispatch('vehicle/fetchRentalHistory', { start, end, vehicle })
    return { start, end }
  },
  head () {
    const title = `${this.vehicle_number} - ${this.$t('rental_history')}`
    return {
      title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: title }
      ]
    }
  },
  watchQuery: ['start', 'end']
}
</script>