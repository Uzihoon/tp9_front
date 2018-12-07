import { dc, imgUrl } from '../../lib/VirtualDOM';
import moment from 'moment';

/**
 * @description 내부 회의 popup rendering function
 * @param projectList
 * @param selectList
 * @param popupBox
 * @param label
 * @param iconBox
 * @param inputBox
 * @param contentBox
 * @param productionList
 * @param partServerId
 * @param productionColor
 * @returns {Promise<any>}
 */
const confPopup = ({ projectList, selectList, popupBox, label, iconBox, inputBox, contentBox, productionList, partServerId, productionColor }) => {
    return new Promise((resolve, reject) => {
        const titleList = ['일시', '회의부서', '프로젝트', '장소', '받는이'];
        const classList = ['time', 'tp_production', 'tp_location', 'tp_peaple'];
        const today = moment().format('YYYY-MM-DD');
        contentBox.innerHTML = ''
        inputBox.innerHTML = '';

        //document node
        const labelBox = dc('div');
        const select = dc('select');
        const project = dc('select');
        const projectBox = dc('div');
        const selectBox = dc('div');
        const i = dc('i');
        const projectI = dc('i');
        const sendBox = dc('div');
        const date = dc('div');
        const time = dc('div');
        const dateInput = dc('input');
        const timeInput = dc('input');
        const settingBox = dc('div');
        const attendTitle = dc('div');
        const attendInputBox = dc('div');
        const attendInput = dc('input');
        const attendTotalBox = dc('div');
        const attendContainer = dc('div');
        const attendList = dc('div');

        //class setting
        popupBox.className = 'tp_schPopup_box conf_popup';
        labelBox.className = 'tp_label_box';
        select.className = 'tp_place_select';
        project.className = 'tp_place_select';
        selectBox.className = 'tp_select_box';
        projectBox.className = 'tp_select_box'
        i.className = 'bx bx-chevron-down';
        projectI.className = 'bx bx-chevron-down';
        sendBox.className = 'tp_attend_wrapper';
        date.className = 'tp_dateSetting dateSetting';
        time.className = 'tp_dateSetting timeSetting';
        dateInput.className = 'tp_dateSetting_input dateInput';
        timeInput.className = 'tp_dateSetting_input timeInput';
        settingBox.className = 'tp_dateSettingBox';
        attendTotalBox.className = 'tp_append_input_total_box';
        attendTitle.className = 'tp_attend_title';
        attendInputBox.className = 'tp_attend_inputBox';
        attendInput.className = 'tp_attend_input'
        attendContainer.className = 'tp_attend_container';
        attendList.className = 'our_attend_box tp_attend_selectBox';


        //attribute setting
        dateInput.setAttribute('value', today);
        timeInput.setAttribute('value', '시간 선택');
        dateInput.setAttribute('readonly', 'true');
        timeInput.setAttribute('readonly', 'true');
        attendInput.setAttribute('placeholder', '참석자 추가');
        attendInput.dataset.type = 'our';
        attendInput.setAttribute('id', 'our-attend-input');

        //text setting
        label.textContent = titleList[0];
        attendTitle.textContent = 'Our'

        //style setting
        iconBox.style.backgroundImage = 'url('+ imgUrl+ 'conf_icon.png)';

        //append child
        attendInputBox.appendChild(attendInput);
        attendTotalBox.appendChild(attendTitle);
        attendTotalBox.appendChild(attendInputBox);
        attendContainer.appendChild(attendTotalBox);
        attendContainer.appendChild(attendList);
        sendBox.appendChild(attendContainer);
        date.appendChild(dateInput);
        time.appendChild(timeInput);
        settingBox.appendChild(date);
        settingBox.appendChild(time)
        inputBox.appendChild(label);
        inputBox.appendChild(settingBox)
        contentBox.appendChild(inputBox);
        projectBox.appendChild(project);
        projectBox.appendChild(projectI);
        selectBox.appendChild(select);
        selectBox.appendChild(i);

        //select box setting 
        for (let i = 0; i < selectList.length; i++) {
            const option = dc('option');
            option.textContent = selectList[i].title;
            option.setAttribute('value', selectList[i].id);
            select.appendChild(option);
        }

        //project list setting
        for (let i = 0; i < projectList.length; i++) {
            const option = dc('option');
            option.textContent = projectList[i].title;
            option.setAttribute('value', projectList[i].id);
            project.appendChild(option);
        }

        //회의부서 label setting
        for (let i = 0; i < productionList.length; i++) {
            let label = dc('label');
            let input = dc('input');
            let button = dc('div');

            //class setting
            label.className = 'tp_production_label';
            input.className = 'tp_production_input';
            button.className = `tp_production_btn`;

            //text setting
            button.textContent = productionList[i];

            //attribute setting
            input.setAttribute('type', 'checkbox')
            label.dataset.index = i;
            input.dataset.deptId = partServerId[i];

            //append child
            label.appendChild(input);
            label.appendChild(button);
            labelBox.appendChild(label);

            //부서별 클릭시 지정한 컬러값 보여주
            label.addEventListener('click', function () {
                const checkbox = this.childNodes[0];
                let checked = checkbox.checked ? true : false;
                const index = this.dataset.index;
                const eventAttend = document.querySelector('.tp_attend_search_wrapper');

                if (checked) {
                    this.style.backgroundColor = productionColor[index];
                } else {
                    this.style.backgroundColor = '#e0e0e0';
                }
                if (eventAttend) {
                    const parent = eventAttend.parentNode;
                    parent.removeChild(eventAttend);
                }
            })
        }

        //input box setting
        for (let i = 1; i < titleList.length; i++) {
            let label = dc('label');
            let inputBox = dc('div');
            inputBox.innerHTML = '';

            //class setting
            label.className = 'tp_schPopup_label';
            inputBox.className = `tp_schPopup_inputBox ${classList[i]}`;

            //text setting
            label.textContent = titleList[i];

            //append setting
            inputBox.appendChild(label);
            switch (i) {
                case 1:
                    inputBox.appendChild(labelBox);
                    break;
                case 2:
                    inputBox.appendChild(projectBox);
                    break;
                case 3:
                    inputBox.appendChild(selectBox);
                    break;
                case 4:
                    inputBox.appendChild(sendBox);
                    break;
                default:
                    return;
            }
            contentBox.appendChild(inputBox);
        }


        resolve(contentBox);
    });
}

export default confPopup;