import api, { Api } from "../apiService";
import config from "../../config/apiConfig";
import axios from "axios";
import { expect } from "@jest/globals";

jest.mock('axios');

const cities = [{ country_code: 'RUS', name: 'Moscow', code: 'MSC' }]
const countries = [{ code: 'RUS', name: 'Russia' }]
const airlines = [{ country_code: 'RUS', name: 'Airlines', code: 'AVIA' }]
const params = (
  'MSC',
  'MSC',
  '2021-07',
  '2021-08',
  'RUB'
)
const prices = { ['2021-07']: {
  airline: "AVIA",
  departure_at: "2021-07",
  destination: "MSC",
  expires_at: "2021-07-14T19:51:43Z",
  flight_number: 267,
  origin: "MSC",
  price: 87,
  return_at: "2021-08",
  transfers: 0 }}

describe('Test API Service', () => {
  it('Check that apiInstance is instance of Api class', () => {
    expect(api).toBeInstanceOf(Api)
  })
  it('Success Api instance creat', () => {
    const instance = new Api(config)
    expect(instance.url).toEqual(config.url)
  })
  it('Success fetch cities', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: cities }))
    await expect(api.cities()).resolves.toEqual(cities);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`)
  })
  it('Fetch cities failure', async () => {
    const errMsg = 'New Error'
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
    await expect(api.cities()).rejects.toThrow(errMsg);
  })
  it('Success fetch countries', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: countries }))
    await expect(api.countries()).resolves.toEqual(countries);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/countries`)
  })
  it('Fetch countries failure', async () => {
    const errMsg = 'New Error'
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
    await expect(api.countries()).rejects.toThrow(errMsg);
  })
  it('Success fetch airlines', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: airlines }))
    await expect(api.airlines()).resolves.toEqual(airlines);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/airlines`)
  })
  it('Fetch airlines failure', async () => {
    const errMsg = 'New Error'
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
    await expect(api.airlines()).rejects.toThrow(errMsg);
  })
  it('Success fetch prices', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: prices }))
    await expect(api.prices(params)).resolves.toEqual(prices);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/prices/cheap`, { params, })
  })
  it('Fetch prices failure', async () => {
    const errMsg = 'New Error'
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)))
    await expect(api.prices()).rejects.toThrow(errMsg);
  })

})
