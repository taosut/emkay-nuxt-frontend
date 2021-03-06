<template>
  <v-card outlined class="report">
    <v-toolbar flat color="transparent">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        background-color="transparent"
        class="mr-2"
        clearable
        dense
        flat
        hide-details
        outlined
        rounded
        single-line
        solo
      />

      <!-- Download as XLS button -->
      <client-only>
        <v-divider vertical inset class="mx-3" />
        <download-excel :fields="downloadFields" :data="items" :name="exportName">
          <v-btn :title="`${$t('save')} .xls`" color="primary" large icon>
            <v-icon v-text="'mdi-cloud-download'" />
          </v-btn>
        </download-excel>
      </client-only>
    </v-toolbar>
    <v-divider />

    <!-- Report Filters -->
    <v-expansion-panels
      v-model="panels_expanded"
      accordion
      flat
      hover
      multiple
      tile
    >
      <v-expansion-panel class="transparent">
        <v-expansion-panel-header class="overline">
          {{ $t('report_filters') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container class="pb-0">
            <v-row>
              <v-col cols="12" sm="6" lg="3">
                <v-dialog
                  ref="start_dialog"
                  v-model="start_dialog"
                  :return-value.sync="start"
                  @keydown.esc="start_dialog = false"
                  persistent
                  width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(start).format('L')"
                      :label="$t('start_date')"
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                      dense
                      outlined
                      readonly
                      rounded
                    />
                  </template>
                  <v-date-picker
                    v-model="start"
                    :locale="$moment.locale()"
                    color="primary"
                    header-color="primary"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="start_dialog = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.start_dialog.save(start), updateQuery()" text />
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-dialog
                  ref="end_dialog"
                  v-model="end_dialog"
                  :return-value.sync="end"
                  @keydown.esc="end_dialog = false"
                  persistent
                  width="290px"
                >
                  <template #activator="{ on }">
                    <v-text-field
                      :value="$moment(end).format('L')"
                      :label="$t('end_date')"
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                      dense
                      outlined
                      readonly
                      rounded
                    />
                  </template>
                  <v-date-picker
                    v-model="end"
                    :locale="$moment.locale()"
                    color="primary"
                    header-color="primary"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn v-text="$t('cancel')" @click="end_dialog = false" text />
                    <v-btn v-text="$t('ok')" @click="$refs.end_dialog.save(end), updateQuery()" text />
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-dialog
                  ref="centers_dialog"
                  v-model="centers_dialog"
                  max-width="650"
                  scrollable
                >
                  <template #activator="{ on }">
                    <v-btn v-on="on" color="primary" width="100%" depressed rounded>
                      {{ $tc('centers_filtered', centers_selected.length) }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-sheet class="pa-0 primary" dark>
                      <v-toolbar flat color="transparent">
                        <v-toolbar-title>{{ $t('centers') }}</v-toolbar-title>
                        <v-spacer />
                        <v-btn @click="centers_dialog = false" icon>
                          <v-icon v-text="'mdi-close'" />
                        </v-btn>
                      </v-toolbar>
                      <v-sheet class="primary lighten-1 flex-column pa-4" dark>
                        <v-text-field
                          v-model="search_centers"
                          :label="$t('search_centers')"
                          dark
                          flat
                          solo-inverted
                          hide-details
                          clearable
                          clear-icon="mdi-close-circle-outline"
                          autocomplete="off"
                        />
                      </v-sheet>
                    </v-sheet>
                    <v-card-text>
                      <center-picker v-model="centers_selected" :return-value.sync="centers_selected" :search="search_centers" />
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                      {{ $tc('centers_selected', centers_selected.length) }}
                      <v-spacer />
                      <v-btn @click="centers_selected = [], search_centers = ''" color="error" text>
                        {{ $t('reset') }}
                      </v-btn>
                      <v-btn @click="centers_dialog = false" color="primary">
                        {{ $t('ok') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider />

    <!-- Report Content -->
    <v-skeleton-loader :loading="loading" type="table">
      <v-data-table
        :dense="items && !!items.length"
        :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100, -1] }"
        :headers="headers"
        :items="items"
        :items-per-page="25"
        :loading="loading"
        :mobile-breakpoint="0"
        :search="search"
        :sort-by="[0]"
        :sort-desc="[true]"
        class="striped"
      >
        <!-- Configure the #no-data message (no data from server) -->
        <template #no-data>
          <div class="text-left">
            {{ $t('no_data_found', { 'message': error }) }}
          </div>
        </template>

        <!-- Configure the #no-results message (no rows in filtered search) -->
        <template #no-results>
          <div class="text-left">
            {{ $t('no_search_results', { 'query': search }) }}
          </div>
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { downloadFields } from '@/mixins/datatables'
import { updateQuery } from '@/mixins/routing'
/**
 * Replacement Analysis Report
 */
export default {
  name: 'ReplacementAnalysisReport',
  components: {
    'center-picker': () => import(/* webpackChunkName: "CenterPicker" */ `@/components/core/CenterPicker`)
  },
  mixins: [downloadFields, updateQuery],
  /**
   * Computed Properties
   * https://vuejs.org/v2/api/#computed
   */
  computed: {
    ...mapGetters({
      items: 'reports/getData',
      error: 'reports/getError',
      loading: 'reports/getLoading'
    }),
    /**
     * Implement a computed columns property that returns an array of strings that represent the datatable columns
     */
    columns () {
      return [
        'vehicle_number',
        'client_vehicle_number',
        'center_code',
        'center_name',
        'level_01',
        'level_02',
        'level_03',
        'level_04',
        'level_05',
        'level_06',
        'level_07',
        'level_08',
        'level_09',
        'level_10',
        'project',
        'lease_type',
        'driver_last_name',
        'driver_first_name',
        'year_make_model',
        'mileage',
        'as_of_date',
        'average_per_month',
        'projected_mileage',
        'estimate',
        'months_in_service',
        'in_service_date',
        'next_vehicle_number',
        'driver_state_province',
        'comments',
        'policy',
        'team_t',
        'team_#',
        'lease_termination_date',
        'c_lease',
        'min_term',
        'max_term',
        'term',
        'rent',
        'miles_allow',
        'excess_charge'
      ]
    },
    headers () {
      return [
        {
          text: this.$i18n.t('vehicle_number'),
          value: 'vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('client_vehicle_number'),
          value: 'client_vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('center_code'),
          value: 'center_code',
          class: 'report-column',
          divider: true,
          filter: (value) => {
            if (!this.centers_selected || this.centers_selected.length === 0) {
              // no centers selected, don't filter anything
              return true
            }
            return this.centers_selected.find(center => center.center_code === value)
          }
        },
        {
          text: this.$i18n.t('center_name'),
          value: 'center_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('project'),
          value: 'project',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('lease_type'),
          value: 'lease_type',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_last_name'),
          value: 'driver_last_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_first_name'),
          value: 'driver_first_name',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('year_make_model'),
          value: 'year_make_model',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('mileage'),
          value: 'mileage',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('as_of_date'),
          value: 'as_of_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('average_per_month'),
          value: 'average_per_month',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('projected_mileage'),
          value: 'projected_mileage',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('estimate'),
          value: 'estimate',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('months_in_service'),
          value: 'months_in_service',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('in_service_date'),
          value: 'in_service_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('next_vehicle_number'),
          value: 'next_vehicle_number',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('driver_state_province'),
          value: 'driver_state_province',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('comments'),
          value: 'comments',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('policy'),
          value: 'policy',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('team_t'),
          value: 'team_t',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('team_#'),
          value: 'team_#',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('lease_termination_date'),
          value: 'lease_termination_date',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('c_lease'),
          value: 'c_lease',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('min_term'),
          value: 'min_term',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('max_term'),
          value: 'max_term',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('term'),
          value: 'term',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('rent'),
          value: 'rent',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('miles_allow'),
          value: 'miles_allow',
          class: 'report-column',
          divider: true
        },
        {
          text: this.$i18n.t('excess_charge'),
          value: 'excess_charge',
          class: 'report-column'
        }
      ]
    },
    query () {
      return {
        start: this.start,
        end: this.end
      }
    },
    title: vm => vm.$i18n.t('replacement_analysis_report')
  },

  /**
   * asyncData is called every time before loading the page component and is only available for such.
   * The result from asyncData will be merged with data.
   * https://nuxtjs.org/guide/async-data
   */
  async asyncData ({ $moment, query, store }) {
    const report_length = 365
    const start = query.start || $moment().subtract(report_length, 'days').format('YYYY-MM-DD')
    const end = query.end || $moment().format('YYYY-MM-DD')
    await store.dispatch('reports/fetchReplacementAnalysisReport', { start, end })
    return {
      centers_dialog: false,
      centers_selected: [],
      start_dialog: false,
      start,
      end_dialog: false,
      end,
      panels_expanded: [0],
      search: '',
      search_centers: ''
    }
  },

  /**
   * Set specific <meta> tags for the current page.
   * Nuxt.js uses vue-meta to update the headers and html attributes of your application.
   * https://nuxtjs.org/api/pages-head */
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'og:description', property: 'og:description', content: this.title }
      ]
    }
  },

  /**
   * Watch query strings and execute component methods on change (asyncData, fetch, validate, layout, ...)
   * https://nuxtjs.org/api/pages-watchquery
   */
  watchQuery: ['start', 'end']
}
</script>
