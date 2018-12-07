import projectPopupWrapper from './projectPopupWrapper';

/**
 * @description 팀원추가 popup rendering function
 * @param {object} e
 * @returns {HTMLElement}
 */
const plusTeamPopup = (e) => {
    
    const container = projectPopupWrapper();
    const popupWrapper = Array.from(container.childNodes).filter(e => e.className === 'tp_project_popupBg')[0]
    const title = popupWrapper.childNodes[0].childNodes[0];

    const dc = (a) => document.createElement(a);
    const c = (a, b) => a.className = b;
    const t = (a, b) => a.textContent = b;

    popupWrapper.className += ' plus_team_popup';

    t(title, '팀원추가');


    //create element
    const selectBox = dc('div');
    const partList = ['기획', '개발', '디자인', '마케팅'] //서버에서 가지고 있는 부서리스트 가져오기
    const btn = dc('button');
    const list = dc('div');

    // 부서 목록
    for (let i = 0; i < partList.length; i++) {
        const label = dc('label');
        const checkBox = dc('input');
        const span = dc('span');
        const icon = dc('i');

        checkBox.setAttribute('type', 'checkbox')

        c(icon, 'bx bx-checkbox');
        c(checkBox, 'plus_team_check');
        c(span, 'plus_team_check_label');
        c(label, 'plus_team_label_box');

        label.dataset.type = partList[i]

        t(span, partList[i]);
        label.appendChild(checkBox);
        label.appendChild(icon);
        label.appendChild(span);
        selectBox.appendChild(label);
    }

    //class setting
    c(btn, 'popup_btn');
    c(list, 'plus_team_list_container');
    c(selectBox, 'plus_team_check_container');

    //text setting
    t(btn, '저장');

    popupWrapper.appendChild(selectBox);
    popupWrapper.appendChild(list);

    popupWrapper.appendChild(btn);

    return container;
}

export default plusTeamPopup;