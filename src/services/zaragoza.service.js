const axios = require("axios");

const BASE_URL = "https://www.zaragoza.es/sede/servicio/cultura/evento";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json"
  }
});

async function getEvents(start = 0, rows = 10) {

  const res = await client.get("/list", {
    params: { start, rows }
  });

  return res.data;
}

async function getEventById(id) {

  const res = await client.get(`/${id}`);

  return res.data;
}

async function getTodayEvents() {

  const res = await client.get("/hoy");

  return res.data;
}

async function searchEvents(text) {

  const res = await client.get("/list", {
    params: {
      q: text
    }
  });

  return res.data;
}

module.exports = {
  getEvents,
  getEventById,
  getTodayEvents,
  searchEvents
};