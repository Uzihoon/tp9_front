import { dc, c } from '../lib/VirtualDOM';

/**
 * @description project create popup wrapper element render function
 * @returns {HTMLElement}
 */
const projectPopupWrapper = () => {

    //create element
    const popupWrapper = dc('div');
    const background = dc('div');
    const popupBg = dc('div');
    const title = dc('div');
    const closeIcon = dc('i');
    const titleBox = dc('div');

    //class setting
    popupWrapper.className = 'tp_project_popup_wrapper';
    background.className = 'tp_project_background';
    popupBg.className = 'tp_project_popupBg';
    c(title, 'popup_title');
    c(closeIcon, 'bx bx-x close_project_popup');
    c(titleBox, 'popup_titleBox');


    titleBox.appendChild(title);
    titleBox.appendChild(closeIcon);
    popupBg.appendChild(titleBox);
    popupWrapper.appendChild(background);
    popupWrapper.appendChild(popupBg);

    return popupWrapper;
}

export default projectPopupWrapper;

