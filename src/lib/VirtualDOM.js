/**
 * @description virtual element create function
 * @param {HTMLElement} a,b element
 * @returns {HTMLElement}
 */
export const dc = (a) => document.createElement(a);
export const c = (a, b) => a.className += b;
export const t = (a, b) => a.textContent = b;
export const q = (a) => document.querySelector(a);
export const qAll = (a) => document.querySelectorAll(a);
export const imgUrl = '/public/img/'; //client img url