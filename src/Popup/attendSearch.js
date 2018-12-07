import { dc, q, qAll } from '../lib/VirtualDOM';


/**
 * @description search rendering handle function
 */
class AttendSearch {

    constructor(id, { tId, result }) {
        //create element
        this.background = dc('div');
        this.contentWrapper = dc('div');
        this.data = {};
        this.memberList = [];
        this.attend = {
            'our': [],
            'guest': [],
        };
        this.key = {
            input: '',
        };
        //classSetting
        this.background.className = 'tp_attend_search_wrapper popup_shadow';
        this.type = null;
        this.contentWrapper.className = 'tp_attend_search_content';
        this.inputContainer = null;
        //append
        this.background.appendChild(this.contentWrapper);
        this.attendBox = null;
        this.typeId = id;
        this.resultData = result.data;
        if (this.typeId === 'conf_btn') {
            this.deleteUser();
        }
    }

    getData(input) {
        const checkPart = qAll('.tp_production_input');
        if (this.typeId === 'inner_meet' || this.typeId === 'schBtn') {
            const clicked = [];
            this.memberList = [];
            for (let i of checkPart) {
                if (i.checked) {
                    clicked.push(this.resultData.depts.filter(e => e.id === +i.dataset.deptId));
                }
            }
            for (let i = 0; i < clicked.length; i++) {
                for (let j = 0; j < clicked[i][0].users.length; j++) {
                    this.memberList.push(clicked[i][0].users[j]);
                }
            }
            if (clicked.length <= 0) {

            }
        } else if (this.typeId === 'outer_meet') {
            this.memberList = [];
            if (input.id === 'guest-attend-input') {
                for (let i = 0; i < this.resultData.bzcards.length; i++) {
                    this.memberList.push(this.resultData.bzcards[i]);
                }
            } else {
                for (let i = 0; i < this.resultData.depts.length; i++) {
                    for (let j = 0; j < this.resultData.depts[i].users.length; j++) {
                        this.memberList.push(this.resultData.depts[i].users[j]);
                    }
                }
            }
            
        }
        return this.memberList;

    }

    typeEvent(e) {
        function isCheck (e) {
            return e.name.match(value) || e.email.match(value)
        }
        e.preventDefault();
        e.stopPropagation();
        const value = e.target.value;
        const attendBox = this.inputContainer.id === 'our-attend-input' ? '.our_attend_box' : '.guest_attend_box'
        let list = [];
        if (e.target.id === this.inputContainer.id) {
            this.key = {
                input: e.target.value
            };
            this.inputContainer.value = this.key.input;
            const member = this.memberList.filter(isCheck);
            if (list.length !== member.length) {
                list = JSON.parse(JSON.stringify( member ));
                this.test(this.inputContainer, attendBox, list);
            } else {
                return;
            }
        }
    }

    deleteUser() {
        const partLabel = qAll('.tp_production_input');
        const t = this;
        for (let a of partLabel) {
            a.addEventListener('click', function() {
                if (!a.checked) {
                    // t.removePart(+a.dataset.deptId);
                }
            })
        }
    }

    getSearch() {
        return this.attend;
    }

    test(input, attendBox, value) {
        this.inputContainer = input;
        this.type = this.inputContainer.dataset.type;
        const inputBox = this.inputContainer.parentNode;
        const check = q('.tp_attend_search_wrapper');
        const pickerWrapper = q('.datePicker_wrapper');
        const timeWrapper = q('.timeWrapper_wrapper');
        this.attendBox = q(attendBox);

        if (pickerWrapper) {
            const parent = pickerWrapper.parentNode;
            parent.removeChild(pickerWrapper)
        }
        if (timeWrapper) {
            const parent = timeWrapper.parentNode;
            parent.removeChild(timeWrapper)
        }

      

        const listValue = value ? value : this.getData(input);

        this.contentWrapper.innerHTML = '';
        if (listValue.length === 0) {
            const msg = dc('div');
            msg.className = 'tp_attend_msg';
            msg.textContent = '부서를 선택해 주세요.';
            this.contentWrapper.appendChild(msg);
        } else {
            for (let i = 0; i < listValue.length; i++) {
                //create element
                const searchList = dc('div');
                const profileBox = dc('div');
                const infoBox = dc('div');
                const name = dc('div');
                const email = dc('div');
                const profileImg = dc('div');
                const imgBox = dc('div');
                //class setting
                searchList.className = 'tp_attend_search_list';
                imgBox.className = 'tp_attend_profile_imgBox';
                infoBox.className = 'tp_attend_profile_infoBox';
                name.className = 'tp_attend_name';
                email.className = 'tp_attend_email';
                profileBox.className = 'tp_attend_profileBox';
                profileImg.className = 'tp_attend_profileImg';

                //text setting
                name.textContent = listValue[i].name;
                email.textContent = listValue[i].email;

                //attribute setting
                profileImg.style.backgroundImage = 'url(/public/img/user_profile.png)';
                searchList.dataset.listId = listValue[i].id;
                searchList.dataset.index = i;

                //append child
                infoBox.appendChild(name);
                infoBox.appendChild(email);
                imgBox.appendChild(profileImg);
                profileBox.appendChild(imgBox);
                searchList.appendChild(profileBox);
                searchList.appendChild(infoBox);
                this.contentWrapper.appendChild(searchList);
            }
        } 


        inputBox.appendChild(this.background);

        const t = this;
        const attendList = qAll('.tp_attend_search_list');
        for (let a of attendList) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const isData = t.attend[t.type].filter((i) => i.item.id === +this.dataset.listId).length;
                if (!isData) {
                    t.clickedEvent(listValue, this, e)
                } else {
                    return false;
                }
            });
        }

        //input 에서 enter 입력시, 제일 상단에 있는 부분
        this.inputContainer.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' ||e.keyCode === 13) {
                e.preventDefault();
                e.stopPropagation();
                console.log(e);
            }
        });
        this.inputContainer.addEventListener('input', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            this.typeEvent(e);
        });
        
    }

    clickedEvent(list, t, e) {
        const that = this;
        const id = +t.dataset.listId;
        const index = +t.dataset.index;
        const clickedItem = list.filter(e => e.id === id);
        const button = dc('button');
        const closeIcon = dc('i');
        const container = this.attendBox;
        button.dataset.list = clickedItem[0].id;
        button.dataset.index = index;
        button.setAttribute('type', 'button');
        button.textContent = clickedItem[0].name;
        button.className = 'tp_selected_input';
        closeIcon.className = 'bx bx-x';
        button.appendChild(closeIcon);
        container.appendChild(button);
        this.attend[this.type].push({
            index: index,
            dept_id: list[index].dept_id,
            id: id,
            item: list[index]
        });

        this.removeList(this.inputContainer);
        this.inputContainer.value = '';
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            that.removeName(e, this);
        })


    }

    removeName(e, t) {
        const item = +t.dataset.list;
        const removeArray = this.attend[this.type].filter((i) => i.item.id !== item);
        const container = t.parentNode;
        container.removeChild(t);
        this.attend[this.type] = removeArray;
    }

    removePart(d) {
        const deptsId = d;
        const removeArray = this.attend[this.type].filter((i) => i.item.dept_id !== deptsId);
        this.attend[this.type] = removeArray;
        this.test(q('#our-attend-input'),'.our_attend_box')
    }

    removeList(t) {
        const wrapper = q('.tp_attend_search_wrapper');
        const parentContainer = t.parentNode;

        if (wrapper) {
            parentContainer.removeChild(wrapper);
        }
    }


}

export default AttendSearch;