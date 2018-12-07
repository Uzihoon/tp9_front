import '../../public/css/main.scss';
import '../../public/css/accountPopup.scss';
import '../../public/css/schPopup.scss';
import '../../public/css/task.scss';

import accountPopup from '../accountPopup';
import handlePopupIndex from '../Popup/handlePopupIndex';
import { getMeeting } from '../Meeting/index';
import { handleInfoIndex } from '../Info/index';
import { taskIndex } from '../Task/index';
import { projectListIndex } from '../ProjectList/index';


/**
 * @description project detail page control
 */
window.onload = function () {
    // const projectId = location.pathname.split('/')[location.pathname.split('/').length-1];
    const accountBtn = document.querySelector('.tp_add_btn');
    accountBtn.addEventListener('click', (e) => {
        accountPopup(e);
    });

    handlePopupIndex();
    getMeeting();
    handleInfoIndex();
    taskIndex();

    //common file
    projectListIndex();
}