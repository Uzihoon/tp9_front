import detailTouchEvent from './detailTouchEvent';
import { q } from '../lib/VirtualDOM';
import { server, getTasks, getWork } from '../lib/url';
import { get } from '../lib/ajax';
import renderTotalTask from './renderTotalTask';

/**
 * @description task detail page handle function
 */
const handleDetailIndex = () => {
    const taskId = q('#taskInfo').dataset.taskId;
    const projectId = q('#taskInfo').dataset.projectId;
    const url = server + getTasks + '/' + taskId;
    const workUrl = server + getWork + '?task_id=' + taskId;
    let workData;
    let taskData;

    get(url)
        .then(result => taskData = result)
        .then(result => get(workUrl))
        .then(result => workData = result)
        .then(result => renderTotalTask(taskData, '.tp_info_box', workData))
        .then(result => console.log(workData))
        .catch(error => console.error(error));
    //touch event
    detailTouchEvent();
};

export default handleDetailIndex;