import * as JWT from 'jsonwebtoken'
import MockAdapter from 'axios-mock-adapter'
/* eslint-disable camelcase */
export default function ({ $axios, redirect }) {
  // debugger
  const mock = new MockAdapter($axios)
  mock
    .onPost('/auth/login').reply((config) => {
      const account = 'EM102'
      const username = 'JCK'
      // const valid = true
      const expiresIn = 15
      const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
      const accessToken = JWT.sign({ account, username }, 'dummy', { expiresIn })
      const token = {
        accessToken,
        refreshToken,
        expiresIn,
        clientId: account
      }
      return [200, token]
    })
    .onGet('/auth/logout').reply(200, { status: 'OK' })
    .onGet('/auth/user').reply((config) => {
      const user = {
        account: 'EM102',
        username: 'JCK'
      }
      console.log('Returning mocked user EM102-JCK')
      // return [200, { user: { account, username, token } }]
      return [200, { user }]
    })
    .onGet('/vehicles/search')
    .reply(function (config) {
      let query = config.params.query
      if (query) {
        query = query.toLowerCase()
      }
      const vehicles = [
        {
          vehicle_number: 'E22444',
          driver_name: 'Andrew Griffith',
          description: '2012 Jeep Compass'
        },
        {
          vehicle_number: '442545',
          driver_name: 'Monty Burns',
          description: '2019 TESLA Model X'
        },
        {
          vehicle_number: '0F016D',
          driver_name: 'Jim Klonowski',
          description: '1994 Ford Bronco'
        }
      ]
      const filtered = vehicles.filter(v => v.vehicle_number.toLowerCase().includes(query))

      return [200, filtered]
    })
    .onGet('/drivers/search')
    .reply(function (config) {
      let query = config.params.query
      if (query) {
        query = query.toLowerCase()
      }
      const vehicles = [
        {
          vehicle_number: 'E09490',
          driver_name: 'Andrew Griffith',
          description: '2012 Jeep Compass'
        },
        {
          vehicle_number: '666069',
          driver_name: 'Lucien Greaves',
          description: '2012 TESLA Model S'
        },
        {
          vehicle_number: '442545',
          driver_name: 'J. Klo Klonowski',
          description: '1990 Ford Crown Victoria'
        }
      ]
      const filtered = vehicles.filter(v => v.driver_name.toLowerCase().includes(query))
      return [200, filtered]
    })

    // Mock Fuel Headers
    .onGet('/fuel-detail/columns')
    .reply(function (config) {
      // debugger
      const headers = [
        'amount',
        'bill_date',
        'bill_sort',
        'card_number',
        'center_code',
        'center_name',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'client_vehicle_number',
        'driver_id',
        'driver_name',
        'emkay_invoice_date',
        'emkay_invoice_number',
        'engine_fuel_type',
        'exception',
        'fuel_card_vendor',
        'fuel_company_name',
        'fuel_company_number',
        'invoice_number',
        'level_01',
        'level_02',
        'level_03',
        'merchant_address',
        'merchant_city',
        'merchant_state',
        'merchant_zip',
        'model_year',
        'odometer',
        'premium',
        'product',
        'product_type',
        'quantity',
        'service_date',
        'service_time',
        'tank_capacity',
        'tax_exempt',
        'unit_price',
        'vehicle_make',
        'vehicle_model',
        'vehicle_number',
        'vin',
        'voucher'
      ]
      return [200, headers]
    })
    // Mock Maintenance Headers
    .onGet('/maintenance-detail/columns')
    .reply(function (config) {
      const headers = [
        'active',
        'amount',
        'ata_group',
        'ata_group_description',
        'bill_sort',
        'brake_manufacturer',
        'brake_thickness',
        'center_code',
        'center_name',
        'charge_code',
        'client_use_1',
        'client_use_2',
        'client_use_3',
        'client_use_4',
        'client_use_5',
        'client_vehicle_number',
        'customer_po',
        'description',
        'driver_name',
        // 'driver_first_name',
        // 'driver_last_name',
        'engine_hours',
        'expense_category',
        'front_left_brake',
        'front_left_drum',
        'front_left_rotor',
        'front_left_tire',
        'front_right_brake',
        'front_right_drum',
        'front_right_rotor',
        'front_right_tire',
        'gl_code',
        'invoice_number',
        'labor_or_part',
        'level_01',
        'level_02',
        'level_03',
        'maintenance_category',
        'maintenance_code',
        'model_year',
        'odometer',
        'quantity',
        'rear_left_brake',
        'rear_left_drum',
        'rear_left_rotor',
        'rear_left_tire',
        'rear_right_brake',
        'rear_right_drum',
        'rear_right_rotor',
        'rear_right_tire',
        'service_date',
        'tire_manufacturer',
        'tire_model',
        'tire_size',
        'vehicle_make',
        'vehicle_model',
        'vehicle_number',
        'vendor_factor',
        'vendor_name',
        'vendor_number',
        'voucher'
      ]
      return [200, headers]
    })
    // 12-12-2019 mock vehicle summary
    .onGet('/vehicle/summary')
    .reply(function (config) {
      const vehicle_info = {
        billing_sort: 'AABBCC',
        center_code: '001',
        center_name: 'Executive',
        client_vehicle_number: 'CV12345',
        vehicle_classification: 'Sport Utility - 4x4',
        vehicle_color: 'Black',
        vehicle_make: 'Jeep',
        vehicle_model: 'Compass',
        vehicle_year: '2019',
        vehicle_number: config.params.vehicle,
        vin: 'VIN1234567890'
      }
      const driver_info = {
        address_1: 'EMKAY, Inc.',
        address_2: '805 W THORNDALE AVE',
        city: 'ITASCA',
        county: 'DUPAGE',
        driver_misc_1: '',
        driver_misc_2: '',
        driver_misc_3: '',
        driver_misc_4: '',
        driver_number: '123456',
        email: 'jklo@emkay.com',
        employee_id: 'ID123456',
        first_name: 'Jimmy',
        last_name: 'Klonowski',
        license_number: '123456IL1234567883242',
        license_state_province: 'IL',
        phone: '630-250-9999',
        cell: '630-250-9999',
        pool: false,
        postal_code: '60143',
        selector_level: 'asdf',
        state_province: 'IL'
      }
      return [200, { vehicle_info, driver_info }]
    })
    .onGet('/account/account-info')
    .reply(function (config) {
      const center_hierarchy = {}
      const custom_labels = {
        client_use_1_label: 'My Custom Label 1',
        client_use_2_label: 'Our New Label 2',
        client_use_3_label: 'A Label 3',
        client_use_4_label: 'The Label 4',
        client_use_5_label: 'JCK 5'
      }
      // const custom_labels = ['Client Use 1 Label', 'Client Use 2 Label', 'Client Use 3 Label', 'Client Use 4 Label', 'Client Use 5 Label']
      return [200, { center_hierarchy, custom_labels }]
    })
    .onAny().passThrough()
  // debugger
  // $axios.onRequest((config) => {
  //   console.log(`Making request to ${config.url}`)
  // })

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     console.log('RECEIVED 400')
  //   }
  // })
}
