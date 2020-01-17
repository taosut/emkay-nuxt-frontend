// import { set, assign } from '@/utility/vuex'

// const getDefaultState = () => ({
//   error: null,
//   loading: false,
//   driver_info: {},
//   sale_info: {},
//   transport_status: [],
//   vehicle_info: {},

//   accident_error: null,
//   accident_history: [],
//   accident_loading: false,

//   fuel_error: null,
//   fuel_history: [],
//   fuel_loading: false,

//   maintenance_error: null,
//   maintenance_history: [],
//   maintenance_loading: false,

//   order_status_error: null,
//   order_status: {},
//   order_status_loading: false,

//   toll_error: null,
//   toll_history: [],
//   toll_loading: false,

//   violation_error: null,
//   violation_history: [],
//   violation_loading: false
// })

// export const state = () => getDefaultState()

// export const actions = {
//   async init ({ commit, dispatch }, vehicle) {
//     debugger
//     commit('setLoading', true)
//     try {
//       const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
//       const filters = {
//         // command: '?',
//         customer: 'EM102',
//         vehicle_number: vehicle
//       }
//       debugger
//       await dispatch('fetchVehicleAndDriver', { url, filters })
//       await dispatch('fetchOrderStatus', { url, filters })
//     } catch (error) {
//       commit('setError', error)
//     } finally {
//       commit('setLoading', false)
//     }
//   },
//   async fetchVehicleAndDriver ({ commit }, { url, filters }) {
//     commit('setLoading', true)
//     try {
//       filters = { ...filters, command: 'WEBVEHICLE' }
//       debugger
//       const { data: { success, message, data } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setVehicleInfo', data.vehicle_info)
//       commit('setDriverInfo', data.driver_info)
//     } catch (error) {
//       debugger
//       commit('setError', error)
//     } finally {
//       commit('setLoading', false)
//     }
//   },
//   // async fetchVehicleDashboardSummary ({ commit, dispatch }, url, filters) {
//   //   commit('setLoading', true)
//   //   try {
//   //     filters = { ...filters, ...{ command: 'WEBVEHICLE' } }
//   //     const { data: { success, message, data } } = await this.$axios.post(url, filters)
//   //     debugger
//   //     if (!success) {
//   //       throw new Error(message)
//   //     }
//   //     commit('setVehicleInfo', data.vehicle_info)
//   //     commit('setDriverInfo', data.driver_info)
//   //     // commit('setOrderStatus', data.order_status_info)
//   //   } catch (error) {
//   //     // console.error(error)
//   //     commit('setError', error)
//   //     commit('setVehicleInfo', {})
//   //     commit('setDriverInfo', {})
//   //   } finally {
//   //     commit('setLoading', false)
//   //   }
//   // },
//   async fetchOrderStatus ({ commit }, url, filters) {
//     commit('setOrderStatusError', null)
//     commit('setOrderStatusLoading', true)
//     try {
//       filters = { ...filters, ...{ command: 'VEHICLEORDERSTATUS' } }
//       const { data: { success, message, data } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setOrderStatus', data)
//     } catch (error) {
//       commit('setOrderStatusError', error)
//       commit('setOrderStatus', {})
//     } finally {
//       commit('setOrderStatusLoading', false)
//     }
//   },
//   async fetchAccidentHistory ({ commit }, filters) {
//     commit('setAccidentError', null)
//     commit('setAccidentLoading', true)
//     try {
//       const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
//       const { data: { data, success, message } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setAccidentHistory', data)
//     } catch (error) {
//       // console.error(error)
//       commit('setAccidentError', error.message)
//       commit('setAccidentHistory', [])
//     } finally {
//       commit('setAccidentLoading', false)
//     }
//   },
//   async fetchFuelHistory ({ commit }, filters) {
//     commit('setFuelError', null)
//     commit('setFuelLoading', true)
//     try {
//       const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
//       const { data: { data, success, message } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setFuelHistory', data)
//     } catch (error) {
//       // console.error(error)
//       commit('setFuelError', error.message)
//       commit('setFuelHistory', [])
//     } finally {
//       commit('setFuelLoading', false)
//     }
//   },
//   async fetchMaintenanceHistory ({ commit }, filters) {
//     commit('setMaintenanceError', null)
//     commit('setMaintenanceLoading', true)
//     try {
//       const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
//       const { data: { data, success, message } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setMaintenanceHistory', data)
//     } catch (error) {
//       commit('setMaintenanceError', error.message)
//       commit('setMaintenanceHistory', [])
//     } finally {
//       commit('setMaintenanceLoading', false)
//     }
//   },
//   async fetchTollHistory ({ commit }, filters) {
//     commit('setTollError', null)
//     commit('setTollLoading', true)
//     try {
//       const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
//       const { data: { data, success, message } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setTollHistory', data)
//     } catch (error) {
//       commit('setTollError', error.message)
//       commit('setTollHistory', [])
//     } finally {
//       commit('setTollLoading', false)
//     }
//   },
//   async fetchTransportStatus ({ commit }, filters) {
//     try {
//       const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
//       const { data: { data, success, message } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setTransportStatus', data)
//     } catch (error) {
//       console.error(error)
//     }
//   },
//   async fetchViolationHistory ({ commit }, filters) {
//     commit('setViolationError', null)
//     commit('setViolationLoading', true)
//     try {
//       const url = `${process.env.EMKAY_API}/rest-test/webcom-generic-json`
//       const { data: { data, success, message } } = await this.$axios.post(url, filters)
//       if (!success) {
//         throw new Error(message)
//       }
//       commit('setViolationHistory', data)
//     } catch (error) {
//       commit('setViolationError', error.message)
//       commit('setViolationHistory', [])
//     } finally {
//       commit('setViolationLoading', false)
//     }
//   },
//   reset ({ commit }) {
//     commit('reset')
//   }
// }

// export const mutations = {
//   reset: assign(getDefaultState()),
//   setError: set('error'),
//   setLoading: set('loading'),

//   setAccidentError: set('accident_error'),
//   setAccidentHistory: set('accident_history'),
//   setAccidentLoading: set('accident_loading'),

//   setFuelError: set('fuel_error'),
//   setFuelHistory: set('fuel_history'),
//   setFuelLoading: set('fuel_loading'),

//   setMaintenanceError: set('maintenance_error'),
//   setMaintenanceHistory: set('maintenance_history'),
//   setMaintenanceLoading: set('maintenance_loading'),

//   setOrderStatus: set('order_status'),
//   setOrderStatusError: set('order_status_error'),
//   setOrderStatusLoading: set('order_status_loading'),

//   setTollError: set('toll_error'),
//   setTollHistory: set('toll_history'),
//   setTollLoading: set('toll_loading'),

//   setViolationError: set('violation_error'),
//   setViolationHistory: set('violation_history'),
//   setViolationLoading: set('violation_loading'),

//   setDriverInfo: set('driver_info'),
//   setSaleInfo: set('sale_info'),
//   setTransportStatus: set('transport_status'),
//   setVehicleInfo: set('vehicle_info')
// }

// export const getters = {
//   getError: state => state.error,
//   getLoading: state => state.loading,

//   getDriverInfo: state => state.driver_info,

//   getAccidentError: state => state.accident_error,
//   getAccidentHistory: state => state.accident_history,
//   getAccidentLoading: state => state.accident_loading,

//   getFuelError: state => state.fuel_error,
//   getFuelHistory: state => state.fuel_history,
//   getFuelLoading: state => state.fuel_loading,

//   getMaintenanceError: state => state.maintenance_error,
//   getMaintenanceHistory: state => state.maintenance_history,
//   getMaintenanceLoading: state => state.maintenance_loading,

//   getOrderStatus: state => state.order_status,
//   getOrderStatusError: state => state.order_status_error,
//   getOrderStatusLoading: state => state.order_status_loading,

//   getTollError: state => state.toll_error,
//   getTollHistory: state => state.toll_history,
//   getTollLoading: state => state.toll_loading,

//   getViolationError: state => state.violation_error,
//   getViolationHistory: state => state.violation_history,
//   getViolationLoading: state => state.violation_loading,

//   getSaleInfo: state => state.sale_info,

//   getTransportStatus: state => state.transport_status,

//   getVehicleInfo: state => state.vehicle_info,
//   getVehicleNumber: state => state.vehicle_info.vehicle_number
// }
