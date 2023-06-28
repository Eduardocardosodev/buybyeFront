import axios from 'axios';
import { EventDTO } from '../interfaces/EventDTO';
import { SubscribeDTO } from '../interfaces/SubscribeDTO';

export const api = axios.create({
  baseURL: 'http://localhost:3003',
});

export const createSession = async (email: string, senha: string) => {
  return api.post('/competidor/sessions', { email, senha });
};

export const getEvents = async () => {
  return api.get('/event');
};

export const getEvent = async (id: number) => {
  return api.get(`/event/${id}`);
};

export const createEvent = async (event: EventDTO) => {
  return api.post('/event', event);
};

export const subscribe = async (subscribe: SubscribeDTO) => {
  return api.post('/subscription', subscribe);
};
