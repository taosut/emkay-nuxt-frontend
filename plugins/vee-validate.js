/* eslint-disable import/namespace */
import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import en from 'vee-validate/dist/locale/en.json'
import fr from 'vee-validate/dist/locale/fr.json'
// import moment from 'moment'
// import only the rules needed, then extend them
// import { required, email, max, min } from 'vee-validate/dist/rules'
// extend('required', required)
// ...
// OR import all rules and loop to extend
import * as rules from 'vee-validate/dist/rules'

export default ({ app }) => {
  // configure({
  //   defaultMessage: (_, values) => {
  //     console.log('default: ' + values)
  //     return app.i18n.t(`validations.${values._rule_}`, values)
  //   }
  // })

  // Default to passive mode - validates on submit.
  // https://logaretm.github.io/vee-validate/guide/interaction-and-ux.html#interaction-modes
  // configure({ mode: 'passive' })

  for (const rule in rules) {
    extend(rule, rules[rule])
  }

  extend('after', {
    params: ['other'],
    validate (value, { other }) {
      // debugger
      return app.$moment(value).isAfter(app.$moment(other), 'day')
    },
    message: (field, { other }) => {
      // debugger
      return app.i18n.t(`validations.after`, [field, other])
    }
  })

  extend('on_or_after', {
    params: ['other'],
    validate (value, { other }) {
      // debugger
      return app.$moment(value).isSameOrAfter(app.$moment(other), 'day')
    },
    message: (field, { other }) => {
      // debugger
      return app.i18n.t(`validations.on_or_after`, [field, other])
    }
  })

  extend('before', {
    params: ['other'],
    validate (value, { other }) {
      // debugger
      return app.$moment(value).isBefore(app.$moment(other), 'day')
    },
    message: (field, { other }) => {
      // debugger
      return app.i18n.t(`validations.before`, [field, other])
    }
  })

  extend('on_or_before', {
    params: ['other'],
    validate (value, { other }) {
      // debugger
      return app.$moment(value).isSameOrBefore(app.$moment(other), 'day')
    },
    message: (field, { other }) => {
      // debugger
      return app.i18n.t(`validations.on_or_before`, [field, other])
    }
  })

  extend('not_past', {
    validate (value) {
      // debugger
      return app.$moment(value).isSameOrAfter(app.$moment(), 'day')
    },
    message: field => app.i18n.t(`validations.not_past`, [field])
  })

  Vue.component('ValidationProvider', ValidationProvider)
  Vue.component('ValidationObserver', ValidationObserver)
  localize('en', en)
  localize('fr', fr)
  localize('ca', en)
}
