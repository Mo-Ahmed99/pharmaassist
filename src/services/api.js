const BASE_URL = 'http://127.0.0.1:3000/api';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

// ─── Auth ──────────────────────────────────────────────────────
export const signupApi = (data) =>
  fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const loginApi = (data) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

// ─── Medicines ────────────────────────────────────────────────
export const searchMedicinesApi = (query) =>
  fetch(`${BASE_URL}/medicines/search/${encodeURIComponent(query)}`).then((r) => r.json());

export const getMedicineByIdApi = (id) =>
  fetch(`${BASE_URL}/medicines/${id}`).then((r) => r.json());

export const addMedicineApi = (data, token) =>
  fetch(`${BASE_URL}/medicines`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  }).then((r) => r.json());

// ─── Pharmacy Inventory ───────────────────────────────────────
export const getInventoryApi = (token) =>
  fetch(`${BASE_URL}/pharmacy/inventory`, {
    headers: getHeaders(token),
  }).then((r) => r.json());

export const addToInventoryApi = (data, token) =>
  fetch(`${BASE_URL}/pharmacy/inventory`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateInventoryApi = (inventoryId, data, token) =>
  fetch(`${BASE_URL}/pharmacy/inventory/${inventoryId}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deductStockApi = (inventoryId, quantity, token) =>
  fetch(`${BASE_URL}/pharmacy/inventory/${inventoryId}/deduct`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify({ quantity }),
  }).then((r) => r.json());


export const getAlternativesApi = (id) =>
    fetch(`${BASE_URL}/medicines/${id}/alternatives`).then((r) => r.json());
