import '../../public/css/main.scss';
import '../../public/css/accountPopup.scss';
import '../../public/css/schPopup.scss';
import '../../public/css/taskDetail.scss'

import accountPopup from '../accountPopup';
import { handleInfoIndex } from '../Info/index';
import { projectListIndex } from '../ProjectList/index';
import { handleDetailIndex } from "../Detail/index";

/**
 * @description task page control function
 */
window.onload = function () {
    const accountBtn = document.querySelector('.tp_add_btn');
    accountBtn.addEventListener('click', (e) => {
        accountPopup(e);
    });

    handleInfoIndex();
    handleDetailIndex();
    projectListIndex();
}