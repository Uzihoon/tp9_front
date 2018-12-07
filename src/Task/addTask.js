import {server, createProject, projectEdit, postTask} from '../lib/url';
import { get, jsonPost } from '../lib/ajax';
import { dc, c, t, q, qAll } from '../lib/VirtualDOM';
import moment from 'moment';
import taskIndex from './taskIndex';
import openCalendar from './openCalendar';


/**
 * @description Task page 에서 부서 추가 하는 popup rendering function
 * @param {string} id
 */

const addTask = (id) => {
    const projectId = id;
    const url = server + createProject + '/' + projectId + projectEdit;
    get(url)
        .then(result => createPopup(result, projectId))
        .then(() => openCalendar())
        .catch(error => console.error(error));

    const createPopup = (result, projectId) => {
        const data = result.data.depts;
        const isNot = data.filter(e => e.task === 0);

        if(isNot.length === 0) {
            alert('이미 모든 부서가 추가되었습니다.');
            return;
        }

        const wrapper = q('#tp_wrapper');
        const common = 'tp_create_task';
        const container = dc('div');
        const bg = dc('div');
        const popupBox = dc('div');
        const titleBox = dc('div');
        const title = dc('div');
        const close = dc('i');
        const button = dc('button');
        const formBox = dc('div');
        const buttonBox = dc('div');
        const labelList = ['부서', '담당자', '기간', '업무지시 코멘트'];
        const labelCreate = [
            {
                create() {
                    const select = dc('select');
                    const selectBox = dc('div');
                    const icon = dc('i');
                    select.id = 'taskSelect';
                    c(icon, 'bx bx-chevron-down');
                    c(selectBox, 'tp_select_box');
                    c(select, 'tp_place_select');
                    for (let i = 0; i < isNot.length; i++) {
                        const op = dc('option');
                        c(op, common+'op');
                        op.value = isNot[i].id;
                        op.dataset.index = i;
                        t(op, isNot[i].title);
                        select.appendChild(op);
                    }
                    select.onchange = () => {
                        const index = +(select.options[select.selectedIndex].dataset.index);
                        const labelBox = qAll('.tp_schPopup_inputBox')[1].childNodes[1];
                        labelBox.innerHTML = '';
                        labelBox.appendChild(labelCreate[1].create(isNot[index]))
                    };
                    selectBox.appendChild(icon);
                    selectBox.appendChild(select);
                    return selectBox;
                }
            },
            {
                create(index = isNot[0]) {
                    const select = dc('select');
                    const selectBox = dc('div');
                    const icon = dc('i');
                    select.id = 'userSelect';
                    c(icon, 'bx bx-chevron-down');
                    c(selectBox, 'tp_select_box');
                    c(select, 'tp_place_select');
                    for (let i = 0; i < index.users.length; i++) {
                        const op = dc('option');
                        op.value = index.users[i].id;
                        t(op, index.users[i].name);
                        select.appendChild(op);
                    }
                    selectBox.appendChild(icon);
                    selectBox.appendChild(select);
                    return selectBox;
                },
            },
            {
                create() {
                    const inputCon = dc('div');
                    c(inputCon, 'tp_dateSettingBox');
                    const idList = ['startDate', 'stopDate']
                    for (let i = 0; i < 2; i++) {
                        const input = dc('input');
                        const inputBox = dc('div');
                        input.id = idList[i];
                        c(inputBox, 'tp_dateSetting dateSetting task_edit_date_box');
                        c(input, 'tp_dateSetting_input dateInput');
                        input.readOnly = true;
                        input.setAttribute('value', moment().format('YYYY-MM-DD'));
                        inputBox.appendChild(input);
                        inputCon.appendChild(inputBox);
                    }
                    return inputCon;
                },
            },
            {
                create() {
                    const input = dc('input');
                    c(input, 'tp_schPopup_input');
                    input.id = 'taskComment';
                    return input
                }
            }
        ];

        close.onclick = () => {
            closePopup(container);
        }

        //class
        c(container, 'tp_schPopup_wrapper');
        c(bg, 'tp_schPopup_bg');
        c(popupBox, 'tp_schPopup_box');
        c(formBox, 'tp_schPopup_form ');
        c(button, 'tp_schPopup_button');
        c(buttonBox, 'tp_schPopup_button_box');
        c(titleBox, common+'title_box');
        c(title, common+'title');
    
        button.type = 'submit';
        t(title, '부서 추가');
        t(button, '추가');
        c(close, 'bx bx-x');


        for (let i = 0; i < labelList.length; i++) {
            const labelBox = dc('div');
            const label = dc('label');
            t(label, labelList[i]);
            c(labelBox, 'tp_schPopup_inputBox');
            c(label, 'tp_schPopup_label');
            labelBox.appendChild(label);
            formBox.appendChild(labelBox);
            labelBox.appendChild(labelCreate[i].create());
        }

        container.appendChild(bg);
        container.appendChild(popupBox);
        titleBox.appendChild(title);
        titleBox.appendChild(close);
        popupBox.appendChild(titleBox);
        popupBox.appendChild(formBox);
        formBox.appendChild(button);

        wrapper.appendChild(container);


        button.onclick = (e) => {
            e.preventDefault();
            const url = server + postTask;

            const taskInfo = {
                content: '',
                taskable_type: 50,
                taskable_id: '',
                project_id: +projectId,
                start: '',
                stop: '',
                title: '',
                users: [],
            };

            const depart = q('#taskSelect').options[q('#taskSelect').selectedIndex]
            taskInfo.start = moment(q('#startDate').value, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss');
            taskInfo.stop = moment(q('#stopDate').value, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss');
            taskInfo.title = depart.textContent.trim();
            taskInfo.taskable_id = +depart.value;
            taskInfo.users.push(+(q('#userSelect').options[q('#userSelect').selectedIndex].value));
            taskInfo.content = q('#taskComment').value;

            if (taskInfo.stop < taskInfo.start) {
                alert('프로젝트 종료 기간을 확인해 주세요!');
                return;
            }

            jsonPost(url, taskInfo)
                .then(result => {
                    closePopup(container);
                    taskIndex();
                })
                .catch(error => console.error(error));
        };

        addEventListener('keydown', (e) => {
            if (e.code === 'Escape' || e.keyCode === 27) {
                closePopup(container);
            }
        });
        return result;
    };


    const closePopup = (container) => {
        container.parentNode.removeChild(container);
    };

};

export default addTask;