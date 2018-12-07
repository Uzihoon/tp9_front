import { dc } from '../../lib/VirtualDOM';


/**
 * @description project 생성 popup rendering function
 * @param popupBox
 * @param title
 * @param label
 * @param button
 * @param iconBox
 * @param productionList
 * @param partId
 * @param partServerId
 * @param memeberList
 * @param inputBox
 * @param input
 * @param contentBox
 * @returns {*}
 */
const projectPopup = ({ popupBox, title, label, button, iconBox, productionList, partId, partServerId, memeberList, inputBox, input, contentBox }) => {
    const partTitleList = ['파트', '파트담당자', 'Start Date', 'Due Date', '업무지시 코멘트'];
    const partTitleClass = ['part_setting', 'part_admin', 'start_date', 'due_date', 'part_comment'];


    const popupSetting = [{
        create(j, i) {
            const check = dc('input');
            const label = dc('span');
            const container = dc('label');
            const icon = dc('i');
            icon.className = 'bx bx-checkbox';
            label.textContent = productionList[i];
            check.setAttribute('type', 'checkbox');
            check.className = 'project_part_chackBox'
            // check.setAttribute('name', productionColor[i]);
            check.setAttribute('id', partId[i])
            label.setAttribute('for', partId[i]);
            container.appendChild(check);
            container.appendChild(icon);
            container.appendChild(label);
            container.dataset.index = i;
            container.dataset.team = productionList[i];
            check.dataset.id = partServerId[i];
            check.dataset.team = productionList[i];
            container.className = 'project_choice_container'
            return container;
        }
    }, {
        create(j, i) {
            const select = dc('select');
            const selectBox = dc('div');
            const icon = dc('i');
            icon.className = 'bx bx-chevron-down'
            selectBox.className = 'project_select_box'
            select.className = 'project_select';
            //option
            memeberList[i].map((e) => {
                const option = dc('option');
                option.setAttribute('value', e.id);
                option.textContent = e.name
                select.appendChild(option);
            })
            selectBox.appendChild(icon)
            selectBox.appendChild(select);
            return selectBox;
        }
    }, {
        create(j, i) {
            const dueDate = dc('input');
            const icon = dc('i')
            const dueDateBox = dc('div');
            dueDate.setAttribute('readonly', true);
            dueDate.className = 'start_date_input dateInput';
            dueDateBox.className = 'start_date_box dateSetting';
            icon.className = 'bx bx-calendar';

            dueDateBox.appendChild(dueDate);
            dueDateBox.appendChild(icon);

            return dueDateBox
        }
    }, {
        create(j, i) {
            const dueDate = dc('input');
            const icon = dc('i')
            const dueDateBox = dc('div');
            dueDate.setAttribute('readonly', true);
            dueDate.className = 'due_date_input dateInput';
            dueDateBox.className = 'due_date_box dateSetting';
            icon.className = 'bx bx-calendar';

            dueDateBox.appendChild(dueDate);
            dueDateBox.appendChild(icon);

            return dueDateBox
        }
    }, {
        create(j, i) {
            const comment = dc('input');
            comment.className = 'comment_input inner_popup_close'
            return comment
        }
    }]

    //create Element
    const partSelectBox = dc('div');
    const partTitle = dc('ul');
    const selectListBox = dc('div');

    //class setting
    popupBox.className += ' project_popup';
    partTitle.className = 'project_popup_title_list';
    selectListBox.className = 'project_popup_select_list_box';

    //text setting
    title.textContent = '새 프로젝트';
    label.textContent = '프로젝트명';
    button.textContent = '저장'

    iconBox.style.backgroundImage = 'url(/public/img/project_icon.png)';

    //title setting
    for (let i = 0; i < partTitleList.length; i++) {
        const li = dc('li');
        li.className = `project_popup_title ${partTitleClass[i]}`;
        li.textContent = partTitleList[i];
        partTitle.appendChild(li);
    }

    //select list setting
    for (let i = 0; i < productionList.length; i++) {
        const selectList = dc('div');
        selectList.className = 'project_popup_select_list';
        selectListBox.appendChild(selectList);
    }
    for (let i = 0; i < selectListBox.childNodes.length; i++) {
        for (let j = 0; j < partTitleList.length; j++) {
            const commonBox = dc('div');
            const defaultBox = dc('div');
            defaultBox.className = 'project_default_box';
            commonBox.className = `${partTitleClass[j]} project_popup_detail`
            commonBox.appendChild(popupSetting[j].create(j, i));
            if (j !== 0) {
                commonBox.appendChild(defaultBox);
            }
            selectListBox.childNodes[i].appendChild(commonBox);
        }
    }

    button.className += ' new_project_btn';
    //append child
    partSelectBox.appendChild(partTitle);
    partSelectBox.appendChild(selectListBox);
    inputBox.appendChild(label);
    inputBox.appendChild(input);

    contentBox.appendChild(inputBox)
    contentBox.appendChild(partSelectBox);

    return contentBox;
}

export default projectPopup;