import SelectPicker from './selectPicker';
import AttendSearch from './attendSearch';
import checkEvent from './checkEvent';
import moment from 'moment';
import Calendar from '../calendar';
import { jsonPost } from '../lib/ajax';
import { q, qAll } from '../lib/VirtualDOM';
import { server, createProject, createEvent, userId, getProject, id } from '../lib/url';
import { getMeeting } from '../Meeting/index';

/**
 * @description popup event handle function
 * @param idString
 * @param result
 * @returns {{idString: *, result: *}}
 */
const handlePopupEvent = (idString, result) => {
    const type = idString;
    
    const urlString = server + getProject + '?' + userId + id;
    const ourAttendInput = document.getElementById('our-attend-input');
    const guestAttendInput = document.getElementById('guest-attend-input');
    const selectData = new SelectPicker();

    const datePicker = document.querySelectorAll('.dateSetting');
    const datePickerInput = document.querySelectorAll('.dateInput');

    const timePicker = document.querySelector('.timeSetting');
    const timePickerInput = document.querySelector('.timeInput');

    if (type === 'project_btn') {
        checkEvent('.project_choice_container');
    } else {
        const attendData = new AttendSearch(type, result);
        
        if (ourAttendInput) {
            // Our 참석자 추가
            ourAttendInput.addEventListener('focus', function () {
                removeAttendPopup();
                attendData.test(this, '.our_attend_box');
            });
        }
    
        if (guestAttendInput) {
            // Guest 참석자 추가
            guestAttendInput.addEventListener('focus', function () {
                removeAttendPopup();
                attendData.test(this, '.guest_attend_box');
            })
        }
    }
    //date popup
    if (datePickerInput) {
        selectData.dateSetting(datePicker, datePickerInput)
    }
    //time popup
    if (timePickerInput) {
        selectData.timeSetting(timePicker, timePickerInput);
    }

    const t = document.querySelector('.tp_schPopup_button');
    const projectPopup = document.querySelector('.project_popup');
    const confPopup = document.querySelector('.conf_popup');
    const meetPopup = document.querySelector('.meet_popup');

    t.addEventListener('click', function (e)  {
        e.preventDefault();
        let sendFile;
        let url = server;  
        const c = this.parentNode;
        if (projectPopup) {
            url += createProject;
            sendFile = projectPopupPost();
            if (!sendFile) return false;
            if (sendFile.start > sendFile.stop) {
                alert('프로젝트 일자를 다시 확인해 주세요!')
                return false;
            }
            if (sendFile.content === 'error') {
                alert(sendFile.error);
                return false;
            }
            if (sendFile.title === '' || sendFile.start === '' || sendFile.stop === '' || !Object.keys(sendFile.tasks).length) {
                alert('제목과 최소 한개 파트를 입력해 주세요!');
                return false;
            }
            console.log(sendFile);
            jsonPost(url, sendFile)
                .then(result => {
                    const cal = new Calendar('#body', '#header', urlString, true);
                    removePopup();
                    cal.getJSON();
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (confPopup) {
            url += createEvent;
            sendFile = eventPopupPost(100);
            if (!sendFile) return false;
            jsonPost(url, sendFile)
                .then(result => {
                    removePopup();
                    getMeeting();
                })
                .catch(error => console.error(error));
        } else if (meetPopup) {
            url += createEvent;
            sendFile = eventPopupPost(200);
            if (!sendFile) return false;
            jsonPost(url, sendFile)
                .then(result => {
                    removePopup();
                    getMeeting();
                })
                .catch(error => console.error(error));
        }
    }, false)

    const projectPopupPost = () => {
        const item = {
            title: '',
            start: '',
            stop: '',
            users: [+id],
            tasks: {},
            content: ''
        };
        const titleText = document.querySelector('.tp_schPopup_input');
        item.title = titleText.value;
        const checkBox = document.querySelectorAll('.project_part_chackBox');
        const select = document.querySelectorAll('.project_select');
        const startInput = document.querySelectorAll('.start_date_input');
        const dueInput = document.querySelectorAll('.due_date_input');
        const msgInput = document.querySelectorAll('.comment_input ');
        for (let i = 0; i < checkBox.length; i++) {
            if (checkBox[i].checked) {
                const s = moment(startInput[i].value).format('YYYY-MM-DD HH:mm:ss');
                const d = moment(dueInput[i].value).format('YYYY-MM-DD HH:mm:ss')
                item.tasks[checkBox[i].dataset.id] = {
                    user_id: select[i].options[select[i].selectedIndex].value,
                    start: s,
                    stop: d,
                    msg: msgInput[i].value,
                }
                if (s > d) {
                    alert(`${checkBox[i].dataset.team} 날짜를 다시 설정해주세요!`)
                    return false;
                }
                if (s === 'Invalid date' || d === 'Invalid date') {
                    alert(`${checkBox[i].dataset.team} 날짜를 입력해주세요!`)
                    return false;
                }
            }
        }
        const startDate = [];
        const dueDate = [];
        const itemList = Object.keys(item.tasks)
        for (let j = 0; j < itemList.length; j++) {
            startDate.push(moment(item.tasks[itemList[j]].start));
            dueDate.push(moment(item.tasks[itemList[j]].stop));
        }

        item.start = moment(Math.min.apply(null, startDate)).format('YYYY-MM-DD HH:mm:ss');
        item.stop = moment(Math.max.apply(null, dueDate)).format('YYYY-MM-DD HH:mm:ss');
        item.tasks =JSON.stringify(item.tasks);
        return item;
    }
    
    const eventPopupPost = (type) => {
        const item = {
            content : '',
            event_type: type,
            place_id: '',
            project_id: '',
            start: '',
            place_title: '',
            stop: '',
            title: '',
            users: [],
            depts: [],
        }
        const today = moment().subtract(1, 'd');
        const date = q('.dateInput').value;
        const time = q('.timeInput').value;
        const start = moment(`${date} ${time}`, 'YYYY-MM-DD A hh:mm')
        const stop = moment(`${date} ${time}`, 'YYYY-MM-DD A hh:mm').add(1, 'h');
        const project = +(qAll('.tp_place_select')[0].options[qAll('.tp_place_select')[0].selectedIndex].value);
        const usersList = qAll('.our_attend_box .tp_selected_input');
        const guestList = qAll('.guest_attend_box .tp_selected_input');
        const label = qAll('.tp_production_label');
        const partList = [];
        let place;
        let meetInput;

        if (type === 100) {
            const checkInput = qAll('.tp_production_input');
            place = +(qAll('.tp_place_select')[1].options[qAll('.tp_place_select')[1].selectedIndex].value);
            item.title = qAll('.tp_place_select')[0].options[qAll('.tp_place_select')[0].selectedIndex].textContent
            item.place_id = place;
            for (let a of checkInput) {
                if (a.checked) {
                    item.depts.push(+a.dataset.deptId);
                }
            }
    
            if (item.depts.length <= 0) {
                alert('부서를 선택해 주세요!')
                return false;
            }
        }

        if (type === 200) {
            meetInput = qAll('.tp_schPopup_input');
            for (let a of meetInput)  {
                if (a.name === 'project_title') {
                    if (!a.value) {
                        alert('미팅 제목을 입력해 주세요!');
                        return false;
                    }
                    item.title = a.value;
                }
                if (a.name === 'project_place') {
                    if (!a.value) {
                        alert('장소를 입력해 주세요!');
                        return false;
                    }
                    item.place_title = a.value;
                }
                if (a.name === 'project_content') {
                    item.content = a.value;
                }
            }
            if (guestList) {
                for (let i of guestList) {
                    item.bzcards = [];
                    item.bzcards.push(+i.dataset.list);
                }
            }
        }

        

        

        if (time === '시간 선택') {
            alert('시간을 선택해 주세요!');
            return false;
        }

        if (today > start) {
            alert('회의는 오늘 이후부터 등록 가능합니다.');
            return false;
        }

        if (usersList.length === 0) {
            alert('회의 참석자를 추가해 주세요!');
            return false;
        }
        for (let i of usersList) {
            item.users.push(+i.dataset.list);
        }
        

        item.start = start.format('YYYY-MM-DD kk:mm:ss');
        item.stop = stop.format('YYYY-MM-DD kk:mm:ss');
        item.project_id = project;
        return item;
    }


    //total popup remove
    function removePopup() {
        const popupWrapper = document.querySelector('.tp_schPopup_wrapper');
        const parent = popupWrapper.parentNode;
        parent.removeChild(popupWrapper);
    }

    //inner popup 선택 해제
    const closeFocus = document.querySelectorAll('.inner_popup_close');

    for (let a of closeFocus) {
        a.addEventListener('focus', () => {
            const popupWrapper = ['.datePicker_wrapper', '.timeWrapper_wrapper', '.tp_attend_search_wrapper'].map(e => document.querySelector(e));

            for (let a of popupWrapper) {
                if (a) {
                    const parent = a.parentNode;
                    parent.removeChild(a);
                }
            }

        })
    }

    //참석자 popup 지우기
    function removeAttendPopup() {
        const attendWrapper = document.querySelectorAll('.tp_attend_inputBox');
        for (let a of attendWrapper) {
            if (a.children.length >= 2) {
                const searchWrapper = document.querySelector('.tp_attend_search_wrapper');
                a.removeChild(searchWrapper)
            }
        }
    }

    return {
        idString, result
    }

};

export default handlePopupEvent;