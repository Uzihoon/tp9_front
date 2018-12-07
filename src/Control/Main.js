/**
 * @description main page control function
 */

import '../../public/css/main.scss';
import '../../public/css/accountPopup.scss';
import '../../public/css/schPopup.scss';

import Calendar from '../calendar';
import accountPopup from '../accountPopup';
import menuEvent from '../menuEvent';
import handlePopupIndex from '../Popup/handlePopupIndex';
import { getMeeting } from '../Meeting/index';
import { handleInfoIndex } from '../Info/index';
import { server, userId, getProject, id } from '../lib/url';
import { projectListIndex } from '../ProjectList/index';

window.onload = function () {
    const url = server + getProject + '?' + userId + id;
    const cal = new Calendar('#body', '#header', url, true);
    const accountBtn = document.querySelector('.tp_add_btn');
    accountBtn.addEventListener('click', (e) => {
        accountPopup(e);
    });

    menuEvent();
    handlePopupIndex();
    getMeeting();
    handleInfoIndex();

    //common file
    projectListIndex();
};