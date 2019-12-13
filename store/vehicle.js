import { set } from '@/utility/vuex'

const getDefaultState = () => ({
  error: null,
  loading: false,
  driver_info: {},
  vehicle_info: {},

  fuel_error: null,
  fuel_history: [],
  fuel_loading: false,

  maintenance_error: null,
  maintenance_history: [],
  maintenance_loading: false
})

export const state = () => getDefaultState()

export const actions = {
  async fetchVehicleDashboardSummary ({ commit }, filters) {
    commit('setLoading', true)
    try {
      // const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const url = '/vehicle/summary' // mocked response
      const { data } = await this.$axios.get(url, { params: filters })
      commit('setVehicleInfo', data.vehicle_info)
      commit('setDriverInfo', data.driver_info)
    } catch (error) {
      console.error(error)
      commit('setError', error)
    } finally {
      commit('setLoading', false)
    }
  },
  async fetchFuelHistory ({ commit }, filters) {
    commit('setFuelLoading', true)
    try {
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { data } } = await this.$axios.post(url, filters)
      commit('setFuelHistory', data)
    } catch (error) {
      console.error(error)
      commit('setFuelError', error)
    } finally {
      commit('setFuelLoading', false)
    }
  },
  async fetchMaintenanceHistory ({ commit }, filters) {
    commit('setMaintenanceLoading', true)
    try {
      const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
      const { data: { data } } = await this.$axios.post(url, filters)
      commit('setMaintenanceHistory', data)
    } catch (error) {
      console.error(error)
      commit('setMaintenanceError', error)
    } finally {
      commit('setMaintenanceLoading', false)
    }
  }
}

export const mutations = {
  resetState (state) {
    Object.assign(state, getDefaultState())
    console.log('resetState clearning data')
  },
  setError: set('error'),
  setLoading: set('loading'),
  setDriverInfo: set('driver_info'),

  setFuelError: set('fuel_error'),
  setFuelHistory: set('fuel_history'),
  setFuelLoading: set('fuel_loading'),

  setMaintenanceError: set('maintenance_error'),
  setMaintenanceHistory: set('maintenance_history'),
  setMaintenanceLoading: set('maintenance_loading'),
  setVehicleInfo: set('vehicle_info')
}

export const getters = {
  getError: state => state.error,
  getLoading: state => state.loading,

  getDriverInfo: state => state.driver_info,

  getFuelError: state => state.fuel_error,
  getFuelHistory: state => state.fuel_history,
  getFuelLoading: state => state.fuel_loading,

  getMaintenanceError: state => state.maintenance_error,
  getMaintenanceHistory: state => state.maintenance_history,
  getMaintenanceLoading: state => state.maintenance_loading,

  getVehicleInfo: state => state.vehicle_info,
  getVehicleNumber: state => state.vehicle_info.vehicle_number
}
