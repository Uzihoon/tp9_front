import { dc, c } from '../lib/VirtualDOM';
import confPopup from './rendering/confPopup';
import meetPopup from './rendering/meetPopup';


/**
 * @description popup click button event function
 * @param tId
 * @param result
 * @returns {{id: *, result: *}}
 */
const eventPopup = (tId, result) => {
    const type = tId;
    //type 등록
    const con = 'schBtn';
    //common file
    const getPart = result.data.depts;
    const productionList = [];
    const memeberList = [];
    const partServerId = [];
    const productionColor = [];

    if (getPart) {
        for (let i = 0; i < getPart.length; i++) {
            productionList.push(getPart[i].title);
            memeberList.push(getPart[i].users);
            partServerId.push(getPart[i].id);
            productionColor.push(getPart[i].color);
        }
    }

    //회의일정 생성 팝업 클릭시
    let event;
    const selectList = [];
    const projectList = [];
    if (tId === con) {
        event = result.data;
        for (let i = 0; i < event.places.length; i++) {
            selectList.push(event.places[i]);
        }
        for (let i = 0; i < event.projects.length; i++) {
            projectList.push(event.projects[i]);
        }

    }

    const wrapper = document.getElementById('tp_wrapper');
    let close = true;

    //common popup document node
    const popupWrapper = dc('div');
    const popupBg = dc('div');
    const popupBox = dc('div');
    const iconBox = dc('div');
    const formBox = dc('form');
    const title = dc('div');
    const contentBox = dc('div');
    const inputBox = dc('div');
    const input = dc('input');
    const label = dc('label');
    const button = dc('button');
    const buttonBox = dc('div');

    //class setting
    popupWrapper.className = 'tp_schPopup_wrapper';
    popupBg.className = 'tp_schPopup_bg';
    popupBox.className = 'tp_schPopup_box';
    iconBox.className = 'tp_schPopup_icon';
    formBox.className = 'tp_schPopup_form';
    title.className = 'tp_schPopup_title';
    contentBox.className = 'tp_schPopup_content_box';
    input.className = 'tp_schPopup_input inner_popup_close';
    input.setAttribute('autofocus', true);
    label.className = 'tp_schPopup_label';
    inputBox.className = 'tp_schPopup_inputBox';
    button.className = 'tp_schPopup_button';
    buttonBox.className = 'tp_schPopup_button_box';

    //attribute setting
    button.setAttribute('type', 'submit');

    //text setting
    button.textContent = '추가'

    //append child
    buttonBox.appendChild(button);
    formBox.appendChild(title);
    formBox.appendChild(contentBox);
    formBox.appendChild(buttonBox);
    popupWrapper.appendChild(popupBg);

    const btnBox = dc('div');
    const btnText = ['회의일정', '미팅일정'];
    const btnId = ['inner_meet', 'outer_meet'];

    c(btnBox, 'tp_event_btn_box');

    for (let i = 0; i < btnText.length; i++) {
        const btn = dc('button');
        c(btn, 'tp_popup_btn');
        btn.textContent = btnText[i];
        btn.setAttribute('id', btnId[i]);
        btn.setAttribute('type', 'button');
        btnBox.appendChild(btn);
    }

    title.appendChild(btnBox);
    btnBox.childNodes[0].className += ' active';
    for (let i of btnBox.childNodes) {

        i.addEventListener('click', function (e) {
            e.preventDefault();

            //내부 회의 생성
            if (this.id === 'inner_meet') {
                this.className = 'tp_popup_btn active';
                btnBox.childNodes[1].className = 'tp_popup_btn'
                confPopup(param)

            } else if (this.id === 'outer_meet') { //외부 미팅 생
                const param = {
                    popupBox,
                    iconBox,
                    projectList,
                    contentBox,
                }
                this.className = 'tp_popup_btn active';
                btnBox.childNodes[0].className = 'tp_popup_btn'
                meetPopup(param)
            }
        })
    }
    const param = {
        projectList,
        selectList,
        popupBox,
        label,
        iconBox,
        inputBox,
        contentBox,
        productionList,
        partServerId,
        productionColor
    };
    confPopup(param);

    //append child
    popupBox.appendChild(iconBox);
    popupBox.appendChild(formBox);
    popupWrapper.appendChild(popupBox);
    wrapper.appendChild(popupWrapper);

    //esc 닫기 이벤트
    addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            if (close && popupWrapper) {
                wrapper.removeChild(popupWrapper);
                close = false;
            }
        }
    });

    const obj = {
        id: tId,
        result
    };
    return obj;
}

export default eventPopup;