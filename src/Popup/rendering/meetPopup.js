import { dc } from '../../lib/VirtualDOM';
import moment from 'moment';

/**
 * @description 외부 회의 rendering function
 * @param popupBox
 * @param iconBox
 * @param projectList
 * @param contentBox
 * @returns {Promise<any>}
 */
const meetPopup = ({ popupBox, iconBox, projectList, contentBox, }) => {
    return new Promise((resolve, reject) => {
    const titleList = ['미팅제목', '일시', '장소', '프로젝트', '의제', '참석자'];
    const today = moment().format('YYYY-MM-DD');
    contentBox.innerHTML = ''
    //create element node
    const settingDateBox = dc('div');
    const date = dc('div');
    const time = dc('div');
    const dateInput = dc('input');
    const timeInput = dc('input');
    const attendContainer = dc('div');
    const project = dc('select');
    const defaultOp = dc('option');
    const projectBox = dc('div');
    const projectI = dc('i');
    const defaultBox = dc('div');

    //class setting
    popupBox.className = 'tp_schPopup_box meet_popup';
    settingDateBox.className = 'tp_dateSettingBox';
    date.className = 'tp_dateSetting dateSetting';
    time.className = 'tp_dateSetting timeSetting';
    dateInput.className = 'tp_dateSetting_input dateInput';
    timeInput.className = 'tp_dateSetting_input timeInput';
    attendContainer.className = 'tp_attend_wrapper'
    project.className = 'tp_place_select';
    projectBox.className = 'tp_select_box'
    projectI.className = 'bx bx-chevron-down';
    defaultBox.className = 'tp_place_default_box';

    //text setting
    defaultOp.textContent = '프로젝트를 선택해 주세요.';

    //attribute setting
    dateInput.setAttribute('value', today);
    timeInput.setAttribute('value', '시간 선택');
    dateInput.setAttribute('readonly', 'true');
    timeInput.setAttribute('readonly', 'true');
    defaultOp.disabled = true;
    defaultOp.setAttribute('hidden', 'true');
    defaultOp.selected = true;

    //style setting
    iconBox.style.backgroundImage = 'url(/public/img/meet_icon.png)';

    //append child
    date.appendChild(dateInput);
    time.appendChild(timeInput);
    projectBox.appendChild(project);
    projectBox.appendChild(projectI);
    settingDateBox.appendChild(date);
    settingDateBox.appendChild(time);
    project.appendChild(defaultOp);

    const attendTitleList = ['Our', 'Guest'];
    const attendBoxClass = ['our_attend_box', 'guest_attend_box'];
    const attendInputClass = ['our-attend-input', 'guest-attend-input']

    //project setting
    for (let i = 0; i < projectList.length; i++) {
        const option = dc('option');
        option.textContent = projectList[i].title;
        option.setAttribute('value', projectList[i].id);
        project.appendChild(option);
    }
    //직접입력 option 삽입
    const option = dc('option');
    option.textContent = '직접 입력';
    option.setAttribute('value', 0);
    project.appendChild(option);

    //참석자 입력 부분 렌더링
    for (let i = 0; i < attendTitleList.length; i++) {
        const attendBox = dc('div');
        const titleBox = dc('div');
        const inputBox = dc('div');
        const input = dc('input');
        const selectAttendBox = dc('div');
        const attendInputBox = dc('div');

        //text setting
        titleBox.textContent = attendTitleList[i];

        //attribute setting
        input.setAttribute('placeholder', '참석자 추가')
        input.dataset.type = attendTitleList[i].toLowerCase();

        //class setting
        attendBox.className = 'tp_attend_container';
        inputBox.className = 'tp_attend_inputBox';
        input.setAttribute('id', attendInputClass[i])
        input.className = 'tp_attend_input';
        titleBox.className = 'tp_attend_title';
        selectAttendBox.className = `${attendBoxClass[i]} tp_attend_selectBox`;
        attendInputBox.className = 'tp_append_input_total_box';

        //apend
        inputBox.appendChild(input);
        attendInputBox.appendChild(titleBox);
        attendInputBox.appendChild(inputBox);
        attendBox.appendChild(attendInputBox);
        attendBox.appendChild(selectAttendBox);

        attendContainer.appendChild(attendBox);
    }



    for (let i = 0; i < titleList.length; i++) {
        let labelBox = dc('div');
        let label = dc('label');
        labelBox.innerHTML = '';
        label.textContent = titleList[i];

        labelBox.className = 'tp_schPopup_inputBox';
        label.className = 'tp_schPopup_label';

        labelBox.appendChild(label)
        if (i === 2) {
            let input = dc('input');
            input.className = 'tp_schPopup_input inner_popup_close';
            input.setAttribute('name', 'project_place');
            labelBox.appendChild(input);
        }

        if (i === 0) {
            let input = dc('input');
            input.className = 'tp_schPopup_input inner_popup_close';
            input.setAttribute('name', 'project_title');
            labelBox.appendChild(input);
        }

        if (i === 4) {
            let input = dc('input');
            labelBox.className = ' tp_input_place_box';
            labelBox.appendChild(defaultBox);
            input.className = 'tp_schPopup_input inner_popup_close tp_input_place';
            input.setAttribute('name', 'project_content');
            labelBox.appendChild(input);
        }

        if (i === 1) {
            labelBox.appendChild(settingDateBox)
        }

        if (i === 3) {
            labelBox.appendChild(projectBox);
        }

        if (i === titleList.length - 1) {
            labelBox.appendChild(attendContainer);
        }

        contentBox.appendChild(labelBox);
    }

    //selectbox event
    project.addEventListener('click', function (e) {
        e.preventDefault();
        const defaultLabel = document.querySelector('.tp_place_default_box');
        const parent = document.querySelector('.tp_input_place_box');
        const input = document.querySelector('.tp_input_place');
        if (defaultLabel) {
            if (+(this.options[this.selectedIndex].value) === 0) {
                parent.removeChild(defaultLabel)
                input.focus();
            }
        } else {
            if (+(this.options[this.selectedIndex].value) !== 0) {
                parent.appendChild(defaultBox);
            }
        }

    })

    resolve(contentBox);
    })
}

export default meetPopup;