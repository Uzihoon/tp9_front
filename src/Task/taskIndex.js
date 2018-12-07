import { get, formPut } from '../lib/ajax';
import taskEvent from './taskEvent';
import { dc, q } from '../lib/VirtualDOM';
import { server, getTasks, createProject } from '../lib/url';
import addTask from "./addTask";


/**
 * @description Task list render index & edit event function
 */
const taskIndex = () => {
    const projectId = q('#project_title').dataset.projectId;
    const url = server + getTasks + '?project_id='+ projectId;

    get(url)
        .then(result => taskEvent(result, '.tp_tasks_list_box', true))
        .catch(error => console.error(error));

    //TASK EVENT
    const editIcon = q('.editIcon');
    const titleBox = q('.tp_tasks_main_title_box');
    const pjtTitle = q('.tp_tasks_main_title');
    const addTaskBtn = q('.tp_tasks_plus_box');

    editIcon.onclick = (e) => {
        e.preventDefault();
        const value = pjtTitle.textContent.trim();
        const input = dc('input');
        const icon = dc('i');

        input.value = value;
        input.autofocus = true;
        input.style.fontSize = '1em';
        icon.className = 'bx bx-subdirectory-left push_icon';
        icon.style.fontSize = '1.2em';
        pjtTitle.innerHTML = '';
        pjtTitle.appendChild(input);
        pjtTitle.appendChild(icon);

        input.onkeypress = function(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                updateTitle(this.value);
            }
        };
        icon.onclick = function(e) {
            updateTitle(input.value);
        }

    };

    const updateTitle = (value) => {
        send(value);
        pjtTitle.innerHTML = '';
        pjtTitle.textContent = value;
        pjtTitle.appendChild(editIcon);
        editIcon.className = 'bx bxs-pencil editIcon';
    };

    const send = (title) => {
        const url = server + createProject + '/' + projectId;
        const data = 'title='+title;

        formPut(url, data)
            .catch(error => console.error(error));
    }

    addTaskBtn.onclick = (e) => {
        e.preventDefault();
        addTask(projectId);
    }
}

export default taskIndex;