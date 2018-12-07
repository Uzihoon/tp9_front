/**
 * @description timer popup rendering function
 * @constructor
 */

function TimePopup() {
    this.selectTimeObj = null;
}

TimePopup.prototype.getTime = function() {
    return this.selectTimeObj;
}

TimePopup.prototype.timePicker = function (e, t) {
    e.preventDefault(); 
    e.stopPropagation();

    let selectTimeObj = '';
    const container = t;
    const that = this;
    //element create
    const timeWrapper = document.createElement('div');
    const listWrapper = document.createElement('div');

    //class Setting
    timeWrapper.className = 'timeWrapper_wrapper';
    listWrapper.className = 'timeWrapper_list';

    timeWrapper.setAttribute('id', 'timePicker');


    const settingList = [];
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 2; j++) {
                settingList.push(`${k ? 'PM' : 'AM'} ${i == 0 ? 12 : i}:${ j*30 > 0 ? j*30 : "00" }`);
            }
        };
    };

    for (let i = 0; i < settingList.length; i++) {
        const list = document.createElement('div');
        list.className = 'timeList';
        list.textContent = settingList[i];
        listWrapper.appendChild(list);
    }

    timeWrapper.appendChild(listWrapper);
    container.appendChild(timeWrapper);


    //선택시 시간 선택

    const timeList = document.querySelectorAll('.timeList');


    for (let a of timeList) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const inputBox = document.querySelector('.timeInput');
            const timeWrapper = document.querySelector('.timeWrapper_wrapper');
            const timepickerWrapper = document.querySelector('.timeSetting');
            inputBox.setAttribute('value', this.textContent);
            that.selectTimeObj = this.textContent;
            timeWrapper.style.display = 'none'
        });
    }
}

export default TimePopup;
