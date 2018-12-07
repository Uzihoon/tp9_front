import createPart from '../Project/createPart';
import { format } from 'url';

/**
 * @description checkbox event function
 * @param container
 */
const checkEvent = (container) => {

    const checkBox = document.querySelectorAll(container);
    for (let i of checkBox) {
        const checkItem = i.childNodes[0];
        const icon = i.childNodes[1];

        i.addEventListener('click', function (e) {
            e.preventDefault();
            let status = checkItem.checked;
            checkItem.checked = status ? false : true;
            checkItem.checked ? icon.className = 'bx bx-checkbox-checked' : icon.className = 'bx bx-checkbox';

            const type = this.dataset.type;

            if (type) {
                pushPartMember(type, checkItem.checked);
            }

            if (container === '.project_choice_container') {
                newProjectCheck(checkItem.checked, this.dataset.index);
            }
        });

    }

    const pushPartMember = (t, status) => {
        const type = t;
        const isCheck = status;
        const container = document.querySelector('.plus_team_list_container');

        if (isCheck) {
            createPart(type);
        } else {
            const inSertPart = document.querySelectorAll('.partMember_wrapper');
            if (inSertPart) {
                for (let a of inSertPart) {
                    if (a.dataset.type === type) {
                        container.removeChild(a);
                    }
                }
            }
        }
        radioCheck()
    }

    const radioCheck = () => {
        const labelList = document.querySelectorAll('.partMember_label_box');
        const check = () => {
            for (let a of labelList) {
                const radio = a.childNodes[0];
                const icon = a.childNodes[1];
                radio.checked ? icon.className = 'bx bx-checkbox-checked' : icon.className = 'bx bx-checkbox';
            }
        }
        for (let a of labelList) {
            a.addEventListener('click', function () {
                check();
            })
        }
    }

    const newProjectCheck = (checked, index) => {
        const defaultBox = document.querySelectorAll('.project_default_box');
        for (let i = index * 4; i < (index * 4) + 4; i++) {
            defaultBox[i].style.display = checked ? 'none' : 'block';
        }
    }
}

export default checkEvent;