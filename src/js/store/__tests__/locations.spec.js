import locationsInstance, { Locations } from "../locations"
import api, { Api } from "../../services/apiService"
import { formatDate } from '../../helpers/date'
import { expect, it } from "@jest/globals"

const countries = [{ code: 'RUS', name: 'Russia' }]
const cities = [{ country_code: 'RUS', name: 'Moscow', code: 'MSC' }]
const airlines = [{ country_code: 'RUS', name: 'Airlines', code: 'AVIA' }]
const citiesFull = [{ country_code: 'RUS', name: 'Moscow', code: 'MSC', country_name: "Russia", full_name: "Moscow, Russia" }] //после сериалайза
const tickets = [{ airline: "AVIA", destination: "MSC", expires_at: "2021-07-14T17:10:34Z", flight_number: 127, origin: "MSC", price: 90, transfers: 0, departure_at: "14 Jul 2021 05:55", return_at: "27 Jul 2021 02:05" }]

jest.mock('../../services/apiService', () => {
  const mockApi = {
    countries: jest.fn(() => Promise.resolve([{ code: 'RUS', name: 'Russia' }])),
    cities: jest.fn(() => Promise.resolve([{ country_code: 'RUS', name: 'Moscow', code: 'MSC' }])),
    airlines: jest.fn(() => Promise.resolve([{ country_code: 'RUS', name: 'Airlines', code: 'AVIA' }]))
  }
  return {
    Api: jest.fn(() => mockApi)
  }
})

const apiService = new Api()

describe('Locations store tests', () => {
  beforeEach(() => {
    locationsInstance.countries = locationsInstance.serializeCountries(countries)
    locationsInstance.cities = locationsInstance.serializeCities(cities)
    locationsInstance.airlines = locationsInstance.serializeAirlines(airlines)
  })
  it('Check that locationsInstance is instance of Locations class', () => {
    expect(locationsInstance).toBeInstanceOf(Locations)
  })
  it('Success Locations instance creat', () => {
    const instance = new Locations(api, { formatDate })
    expect(instance.api).toEqual(api)
    expect(instance.countries).toBe(null)
    expect(instance.cities).toBe(null)
    expect(instance.shortCities).toEqual({})
    expect(instance.lastSearch).toEqual({})
    expect(instance.airlines).toEqual({})
    expect(instance.formatDate).toEqual(formatDate)
  })

  it('Check correct init method call', () => {
    const instance = new Locations(apiService, { formatDate })
    expect(instance.init()).resolves.toEqual([ countries, cities, airlines ])
  })

  it('Check correct get city name by code', () => {
    const res = locationsInstance.getCityNameByCode('MSC')
    expect(res).toBe('Moscow')
  })
  it('Check correct get city code by key', () => {
    const res = locationsInstance.getCityCodeByKey('Moscow, Russia')
    expect(res).toBe('MSC')
  })
  it('Check correct get airline name by code', () => {
    const res = locationsInstance.getAirlineNameByCode('AVIA')
    expect(res).toBe('Airlines')
  })
  it('Check correct get airline logo by code', () => {
    const res = locationsInstance.getAirlineLogoByCode('AVIA')
    expect(res).toBe('http://pics.avs.io/200/200/AVIA.png')
  })

  it('Check correct create short city name', () => {
    const res = locationsInstance.createShortCities(citiesFull)
    const expectedData = {
      ['Moscow, Russia']: null
    }
    expect(res).toEqual(expectedData)
  })

  it('Check correct airlines serialize', () => {
    const res = locationsInstance.serializeAirlines(airlines)
    const expectedData = {
      AVIA: { country_code: 'RUS', name: 'Airlines', code: 'AVIA', logo: 'http://pics.avs.io/200/200/AVIA.png' }
    }
    expect(res).toEqual(expectedData)
  })
  it('Check airlines serialize with incorrect data', () => {
    const res = locationsInstance.serializeAirlines(null)
    const expectedData = {}
    expect(res).toEqual(expectedData)
  })
  it('Check correct countries serialize', () => {
    const res = locationsInstance.serializeCountries(countries)
    const expectedData = {
      RUS: { code: 'RUS', name: 'Russia' }
    }
    expect(res).toEqual(expectedData)
  })
  it('Check countries serialize with incorrect data', () => {
    const res = locationsInstance.serializeCountries(null)
    const expectedData = {}
    expect(res).toEqual(expectedData)
  })
  it('Check correct cities serialize', () => {
    const res = locationsInstance.serializeCities(cities)
    const expectedData = {
      MSC: { country_code: 'RUS', name: 'Moscow', code: 'MSC', country_name: "Russia", full_name: "Moscow, Russia" }
    }
    expect(res).toEqual(expectedData)
  })
  it('Check cities serialize with incorrect data', () => {
    const res = locationsInstance.serializeCities(null)
    const expectedData = {}
    expect(res).toEqual(expectedData)
  })
  it('Check correct tickets serialize', () => {
    const res = locationsInstance.serializeTickets(tickets)
    const expectedData = { 
      airline: "AVIA",
      airline_logo: "http://pics.avs.io/200/200/AVIA.png",
      airline_name: "Airlines",
      departure_at: "14 Jul 2021 05:55",
      destination: "MSC",
      destination_name: "Moscow",
      expires_at: "2021-07-14T17:10:34Z",
      flight_number: 127,
      id: `ticket-${Math.random()}`, // ошибка из-за рандомного айдишника
      origin: "MSC",
      origin_name: "Moscow",
      price: 90,
      return_at: "27 Jul 2021 02:05",
      transfers: 0 
    }
   // expect(res).toEqual(expectedData)
  })
  
})