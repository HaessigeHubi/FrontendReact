import { v4 as uuid } from 'uuid';

export const customers = [
  {
    id: uuid(),
    address: {
      country: 'In Progress',
      state: '',
      city: '',
      street: ''
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'Erstellen der Datenstruktur',
    name: '1',
    phone: '21.01.2022 18:00'
  },
  {
    id: uuid(),
    address: {
      country: 'In Progress',
      state: '',
      city: '',
      street: ''
    },
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'Abändern der Tabelle',
    name: '2',
    phone: '21.01.2022 18:00'
  },
  {
    id: uuid(),
    address: {
      country: 'In Progress',
      state: '',
      city: '',
      street: ''
    },
    avatarUrl: '/static/images/avatars/avatar_2.png',
    createdAt: 1555016400000,
    email: 'Task3',
    name: '3',
    phone: '21.01.2022 18:00'
  }
];
