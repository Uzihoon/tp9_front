import { dc, c, t, q, qAll} from '../lib/VirtualDOM';
import { server, msgsPut } from '../lib/url';
import { jsonPut } from '../lib/ajax';
import moment from 'moment';

/**
 * @description message 관련 event 처리
 * @param id
 * @param result
 */

const infoRender = (id, result) => {
    const data = result.data.msgs;
    const container = q('#tp_wrapper');

    //common box;
    const wrapper = dc('div');
    const bg = dc('div');
    const popup = dc('div');
    const titleBox = dc('div');
    const title = dc('div');
    const close = dc('i');
    const head = dc('div');
    const body = dc('div');
        
    c(wrapper, 'tp_info-wrapper');
    c(bg, 'tp_info_bg');
    c(popup, 'tp_info_popup');
    c(titleBox, 'tp_info_title_box');
    c(title, 'tp_info_title');
    c(head, 'tp_info_head');
    c(body, 'tp_info_body');
    c(close, 'bx bx-x');

    //close event
    close.addEventListener('click', () => wrapper && wrapper.parentNode.removeChild(wrapper));
    bg.addEventListener('click', () => wrapper && wrapper.parentNode.removeChild(wrapper));

    //msg popup
    const makeMsg = ({ data, head, body, title }) => {
        t(title, '메세지');
        const headList = ['날짜', '프로젝트', '내용', '보낸사람'];
        const headClass = ['info-date', 'info-project', 'info-content', 'info-user'];
        const create = [
            {
                create(data, text, index) {
                    const date = moment(data[index].created_at).format('YY.MM.DD');
                    t(text, date);
                    return text;
                }
            },
            {
                create(data, text, index) {
                    const project = '';
                    t(text, project);
                    return text;
                }
            },
            {
                create(data, text, index) {
                    const content = data[index].content;
                    t(text, content);
                    return text;
                }
            },
            {
                create(data, text, index) {
                    const user = data[index].senderable_title;
                    t(text, user);
                    return text;
                }
            }
        ];

        for (let i = 0; i < headList.length; i++) {
            const headItem = dc('div');
            c(headItem, headClass[i]);
            t(headItem, headList[i]);
            head.appendChild(headItem);
        }

        for (let j = 0; j < data.length; j++) {
            const box = dc('div');
            box.dataset.href = data[j].link.web;
            box.dataset.msgId = data[j].id;
            box.dataset.hits = data[j].hits;

            if(data[j].flag) {
                box.style.opacity = '0.5';
            }

            c(box, 'tp_info_item_box');
            for (let k = 0; k < headList.length; k++) {
                const text = dc('div');
                c(text, headClass[k]);
                box.appendChild(create[k].create(data, text, j));
            }

            //msg list click시, server에 읽음 처리 후, 페이지 이동
            box.addEventListener('click', function (e) {
                e.preventDefault();
                const url = server + msgsPut + '/' + this.dataset.msgId;
                jsonPut(url, {flag: 1})
                    .then(res => location.href = this.dataset.href)
                    .catch(error => console.error(error));
            })
            body.appendChild(box);
        }
    }


    //mgs 보기 버튼을 눌렀을 경우
    if (id === 'msg_list') {
        const param = {
            data,
            head,
            body,
            title
        }
        makeMsg(param);
    }

    

    wrapper.appendChild(bg);
    wrapper.appendChild(popup);
    popup.appendChild(titleBox);
    titleBox.appendChild(title);
    titleBox.appendChild(close);
    popup.appendChild(head);
    popup.appendChild(body);

    container.appendChild(wrapper);
}

export default infoRender;