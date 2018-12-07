import changeTeamPopup from './changeTeamPopup';
import plusTeamPopup from './plusTeamPopup';
import checkEvent from '../Popup/checkEvent';

/**
 * @description project 관련 popup handler function
 */
const handleProjectPopup = () => {
    const wrapper = document.getElementById('tp_wrapper');
    const change = document.querySelectorAll('.change_manager');
    const plus = document.querySelectorAll('.tp_project_add_manager');

    for (let a of change) {
        a.addEventListener('click', function (e) {
            wrapper.appendChild(changeTeamPopup(e));
            closeEvent();
        })
    }

    for (let b of plus) {
        b.addEventListener('click', function (e) {
            wrapper.appendChild(plusTeamPopup(e))
            closeEvent();
            checkEvent('.plus_team_label_box');
        })
    }



    //close event
    function closeEvent() {
        //close event
        const closeElement = ['.close_project_popup', '.tp_project_background'].map(e => document.querySelector(e));
        for (let index in closeElement) {
            if (closeElement) {
                closeElement[index].addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const popup = document.querySelector('.tp_project_popup_wrapper');
                    wrapper.removeChild(popup);
                })
            }
        }
    }

}

export default handleProjectPopup;