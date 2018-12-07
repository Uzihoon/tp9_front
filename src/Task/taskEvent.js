import { dc, c, t, q } from '../lib/VirtualDOM';
import moment from 'moment';


/**
 * @description Task list rendering function
 * @param result
 * @param containerElement
 * @param aLink
 */
const taskEvent = (result, containerElement, aLink) => {
    const data = result.data.tasks;
    const container = q(containerElement);
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const common = 'tp_tasks_';
        const list = dc('a');
        const titleBox = dc('div');
        const title = dc('div');
        const titleText = dc('div');
        const status = dc('div');
        const statusNum = dc('div');
        const statusBarBox = dc('div');
        const statusBar = dc('div');
        const infoBox = dc('div');
        const schNum = dc('div');
        const userList = dc('div');
        const start = moment(data[i].start).format('YYYY.MM.DD');
        const stop = moment(data[i].stop).format('YYYY.MM.DD');
        const percentage = Math.round(data[i].rate*100);
        let statusText;
        let statusColor;

        switch(data[i].flag) {
            case 'DELAY':
                statusColor = '#f28282';
                statusText = '업무지연';
                break;
            case 'PROGRESS':
                statusColor = '#cae096';
                statusText = '정상진행';
                break;
            case 'SUCCESS':
                statusColor = '#e5e5e5';
                statusText = '완료';
                break;
            default:
                statusColor = '#92c8c1';
                statusText = '기타';
                break;
        }

        c(list, common+'list');
        c(titleBox, common+'title_box');
        c(title, common+'title');
        c(titleText, common+'title_text');
        c(status, common+'status');
        c(statusNum, common+'status_num');
        c(statusBarBox, common+'status_bar_box');
        c(statusBar, common+'status_bar');
        c(infoBox, common+'info_box');
        c(schNum, common+'sch_num');
        c(userList, common+'user_list');

        infoBox.appendChild(schNum);
        infoBox.appendChild(userList);
        statusBarBox.appendChild(statusBar);
        titleBox.appendChild(title);
        title.appendChild(titleText);
        title.appendChild(status);
        titleBox.appendChild(statusNum);
        list.appendChild(titleBox);
        list.appendChild(statusBarBox);
        list.appendChild(infoBox);

        list.href = aLink ? data[i].link.web : '#';

        t(titleText, data[i].title);
        t(status, '- '+statusText);
        t(statusNum, percentage + '%');
        t(schNum, `기간: ${start} - ${stop}`);


        statusBar.style.width = `${percentage}%`;
        

        statusBar.style.backgroundColor = statusColor;

        list.dataset.id = data[i].id;
        list.dataset.projectId = data[i].project_id;
        list.dataset.rate = percentage;

        //user rendering
        for (let j = 0; j < data[i].users.length; j++) {
            const user = dc('div');
            const nameBox = dc('div');
            const tri = dc('div');
            const name = dc('div');

            c(user, common+'user');
            c(nameBox, common+'name_box');
            c(tri, common+'tri');
            c(name, common+'name');
            t(name, data[i].users[j].name);
            nameBox.appendChild(tri);
            nameBox.appendChild(name);
            let x = j * 10;
            user.style.transform = 'translate('+x+'px, 0)';
            user.dataset.name = data[i].users[j].name;
            user.dataset.userId = data[i].users[j].id;
            user.dataset.role = data[i].users[j].role;
            user.addEventListener('mouseover', function() {
                this.appendChild(nameBox);
            });
            user.addEventListener('mouseleave', function() {
                nameBox.parentNode.removeChild(nameBox);
            });
            userList.appendChild(user);
        }

        container.appendChild(list);
    }


};

export default taskEvent;