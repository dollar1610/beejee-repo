import { TASK_LIST, IS_ADMIN, ACTIVE_PAGE } from './constants';

export function setTaskList(payload) {
  return {
    type: TASK_LIST,
    payload,
  }
}

export function isAdmin(payload) {
  return {
    type: IS_ADMIN,
    payload,
  }
}

export function setActivePage(payload) {
  return {
    type: ACTIVE_PAGE,
    payload,
  }
}
