import { MenuItem } from "../models/menu-item.model";

export const MENUITEMS_MOCKS: MenuItem[] = [
  {
    name: 'Inicio', icon: 'bi bi-house', path: '', children: []
  },
  {
    name: 'Usuarios', icon: 'bi bi-house', path: '/usuarios', children: []
  },
  {
    name: 'Clientes', icon: 'bi bi-house', path: '/clientes', children: []
  },
  {
    name: 'Consulta DNI', icon: 'bi bi-house', path: '/consulta-dni', children: []
  },
  {
    name: 'Consulta RUC', icon: 'bi bi-house', path: '/consulta-ruc', children: []
  }
];
