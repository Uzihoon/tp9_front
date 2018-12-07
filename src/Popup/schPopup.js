import { dc } from '../lib/VirtualDOM';
import projectPopup from './rendering/projectPopup';
/**
 * @description 미팅 등록 popup wrapper rendering function
 * @type {function(*, *=, *=): *}
 */
const schPopup = ((e, tId, result) => {
    function openSch (tId, result) {
        return new Promise((resolve, reject) => {
            const type = tId;
            //type 등록
            const con = 'schBtn';
            const meet = 'meetup_btn';
            const project = 'project_btn';
            //common file
            const getPart = result.data.depts;
            const productionList = [];
            const memberList = [];
            const partId = ['plan_part', 'dev_part', 'design_part', 'marketing_part'];
            const partServerId = [];
            const productionColor = [];

            if (getPart) {
                for (let i = 0; i < getPart.length; i++) {
                    productionList.push(getPart[i].title);
                    memberList.push(getPart[i].users);
                    partServerId.push(getPart[i].id)
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
            inputBox.className = 'tp_schPopup_inputBox'
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
        
            //project 생성 팝업일때
            if (type == project) {
                const param = {
                    popupBox,
                    title,
                    label,
                    button,
                    iconBox,
                    productionList,
                    partId,
                    partServerId,
                    memberList,
                    inputBox,
                    input,
                    contentBox,
                };
                projectPopup(param)
            }
        
        
            //append child
            popupBox.appendChild(iconBox);
            popupBox.appendChild(formBox);
            popupWrapper.appendChild(popupBox);
            wrapper.appendChild(popupWrapper);
        
            //esc 닫기 이벤트
            addEventListener('keydown', (e) => {
                if (e.code === 'Escape') {
                    if (close && popupWrapper) {
                        wrapper.removeChild(popupWrapper)
                        close = false;
                    }
                }
            })
        })
    }

    openSch(tId, result);
    
    return result;
});


export default schPopup;