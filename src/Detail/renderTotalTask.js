import { q, qAll, dc, c, t } from '../lib/VirtualDOM';
import progressBar from './progressBar';

/**
 * @description work list rendering function
 * @param result
 * @param containerElement
 * @param workData
 */
const renderTotalTask = (result, containerElement, workData) => {
    const container = q(containerElement);
    const data = result.data.tasks[0];
    const work = workData.data.works;
    const rate = +(data.rate.toFixed(2));
    //rendering element
    const wrapper = dc('div');
    const common = 'tp_task_status_';
    const processData = [];
    let statusColor;
    let statusText;
    const processStatus = ((data) => {
        switch (data) {
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
    })(data.flag);
    const manager = data.users.filter(e => e.role === 100).map(e => {
        const managerElement = dc('div');
        const managerTitle = dc('div');
        const managerBox = dc('div');
        c(managerElement, common+'user');
        c(managerBox, common+'manager_box');
        c(managerTitle, common+'manager_title');
        t(managerTitle, e.name);
        managerElement.dataset.userId = e.id;
        managerBox.appendChild(managerElement);
        managerBox.appendChild(managerTitle);
        processData.push(managerBox);
        return managerBox;
    });
    const team = data.users.filter(e => e.role === 200).map(e => {
        console.log(e);
    });
    //임시로 div 넣어둠
    const test = dc('div');
    processData.push(test);
    const finishWork = work.filter(e => e.flag === 1).length;
    const dueWork = work.filter(e => e.flag === 0).length;
    const numElement = (text, className, ...options) => {
        const numEl = dc('div');
        t(numEl, text);
        c(numEl, common+className);
        className === 'status_text' ? numEl.style.color = statusColor : '';
        processData.push(numEl);
    };


    numElement(finishWork, 'num');
    numElement(dueWork, 'num');
    numElement(statusText, 'status_text');


    const titleText = [data.title + ' 담당자', '팀원', '완료된 워크', '진행중인 워크', '진행상황'].forEach((e,index) => {
        const contentBox = dc('div');
        const title = dc('div');
        c(title, common+'title');
        c(contentBox, common+'content_box');
        t(title, e);
        contentBox.appendChild(title);
        wrapper.appendChild(contentBox);
    });
    const content = [];
    const contentBox = wrapper.childNodes.forEach((e, index) => {
        const contentElement = dc('div');
        c(contentElement, common+'content');

        e.appendChild(contentElement);
        content.push(contentElement);
    });

    content.forEach((e, index) => {
        e.appendChild(processData[index]);
    });

    //progress circle div
    const progress = dc('div');
    c(progress, common+'progress_box');
    progress.id = 'progress';


    wrapper.appendChild(progress);
    c(wrapper, common+'wrapper');
    container.appendChild(wrapper);
    progressBar(statusColor, rate);

};

export default renderTotalTask;