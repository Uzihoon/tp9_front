import projectPopupWrapper from './projectPopupWrapper';

/**
 * @description 팀원 변경 event rendering
 * @param e
 * @returns {HTMLElement}
 */
const changeTeamPopup = (e) => {
    
    const container = projectPopupWrapper();
    const popupWrapper = Array.from(container.childNodes).filter(e => e.className === 'tp_project_popupBg')[0]
    const title = popupWrapper.childNodes[0].childNodes[0];
    const dc = (a) => document.createElement(a);
    const c = (a, b) => a.className = b;
    const t = (a, b) => a.textContent = b;

    const win_w = window.outerWidth;
    const event_x = e.clientX;
    const top = e.clientY + 10;
    const right = win_w - event_x;

    popupWrapper.className += ' change_team_popup';
    const managerName = '장영민'; // 서버에서 담당자 이름 가져오기.
    const name = ['홍길동', '김길동', '최길동', '박길동', '이길동']; // 서버에서 담당자 리스트 가져오기.



    //createElement
    const presentManager = dc('div');
    const selectContainer = dc('div');
    const selectIcon = dc('i');
    const select = dc('select');
    const btn = dc('button');

    for (let i = 0; i < name.length; i++) {
        const op = dc('option');
        op.setAttribute('value', name[i]);
        t(op, name[i]);
        select.appendChild(op)
    }

    //setting class
    c(presentManager, 'popup_present_name');
    c(selectContainer, 'popup_select_box');
    c(selectIcon, 'bx bx-arrow-back');
    c(select, 'popup_select');
    c(btn, 'popup_btn');

    //setting text
    t(presentManager, managerName);
    t(btn, '변경하기');
    t(title, '팀원변경');


    selectContainer.appendChild(presentManager);
    selectContainer.appendChild(selectIcon);
    selectContainer.appendChild(select);

    popupWrapper.appendChild(selectContainer);
    popupWrapper.appendChild(btn);

    popupWrapper.style.top = top + 'px';
    popupWrapper.style.right = right + 'px';

    return container;
};

export default changeTeamPopup;