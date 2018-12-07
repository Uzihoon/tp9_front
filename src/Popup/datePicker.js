import moment from 'moment';

/**
 * @description calender wrapper rendering function
 * @constructor
 */
function DatePicker() {
    this._container = null;
    this._header = null;
    this._date = [];
    this.moment = moment;
    this.weekNode = null;
    this.dayList = [];
    this.stringMonth = null;
    this.stringYear = null;
    this.prev = null;
    this.next = null;
    this.index = 0;
    this.today = null;
    this.setDate = null;
    this.clickDate = null;
    this.selectTimeObj = null;
    this.targetInput = null;
}

DatePicker.prototype.settingDate = function (container, targetInput) {
    this.viewRendering(container, targetInput);
}

DatePicker.prototype.viewRendering = function (container, targetInput) {

    //create element node
    const dateBox = document.createElement('div');
    const dateHeader = document.createElement('div');
    const dateWrapper = document.createElement('div');
    const titleBox = document.createElement('div');
    const titleInnerBox = document.createElement('div');
    const titleMonth = document.createElement('span');
    const titleYear = document.createElement('span');
    const btnBox = document.createElement('div');
    const prev = document.createElement('i');
    const next = document.createElement('i');

    //attribute setting
    dateBox.setAttribute('id', 'date_body');
    dateHeader.setAttribute('id', 'date_header');
    prev.setAttribute('id', 'picker_prev');
    next.setAttribute('id', 'picker_next')

    //class Setting
    dateWrapper.className = 'datePicker_wrapper';
    titleBox.className = 'datePicker_titleBox';
    prev.className = 'datePicker_prev bx bx-chevron-left';
    next.className = 'datePicker_next bx bx-chevron-right';
    titleMonth.className = 'datePicker_month';
    titleYear.className = 'datePicker_Year';
    btnBox.className = 'datePicker_btnBox'
    titleInnerBox.className = 'datePicker_titleInnerBox'


    btnBox.appendChild(prev);
    btnBox.appendChild(next);
    titleInnerBox.appendChild(titleYear);
    titleInnerBox.appendChild(titleMonth);
    titleBox.appendChild(titleInnerBox);
    titleBox.appendChild(btnBox);

    dateWrapper.appendChild(titleBox);
    dateWrapper.appendChild(dateHeader);
    dateWrapper.appendChild(dateBox);
    container.appendChild(dateWrapper);
    this._init(dateBox,dateHeader, targetInput);
    this._initEvent();
}

DatePicker.prototype._init = function (container, header,targetInput) {
    const t = this;
    this._container = container
    this.prev = document.querySelector('#picker_prev');
    this.next = document.querySelector('#picker_next');
    this.targetInput = targetInput;

    t.dayList = ['일', '월', '화', '수', '목', '금', '토'];
    t._header = header
    //calendar list
    for (let i = 0; i < 6; i++) {
        let calList = document.createElement('div');
        calList.classList.add('datePopup_body');

        t._container.appendChild(calList)
    }
    this.weekNode = document.querySelectorAll('.datePopup_body');
}

DatePicker.prototype._initEvent = function () {
    this.calendarSetting();
    this.dateSetting(this.index);
    this.clickEvent();
    this.selectedDate();
}

DatePicker.prototype.calendarSetting = function () {
    const t = this;
    const dayBox = document.createElement('ul');
    dayBox.classList.add('datePopup_dayList')

    for (let i = 0; i < t.dayList.length; i++) {
        let day = document.createElement('li');
        let text = document.createElement('span');
        text.textContent = t.dayList[i];
        day.classList.add('datePopup_day')
        day.appendChild(text);
        dayBox.appendChild(day);
    }
    t._header.appendChild(dayBox);
}

DatePicker.prototype.dateSetting = function (month) {
    const t = this;
    const m = t.moment().month() + month

    //기준 날짜
    t.setDate = t.moment().add(month, 'months');

    t.stringMonth = t.setDate._locale._months[t.setDate.month()];
    t.stringYear = t.setDate.year();
    t._date = [];
    //시작 요일
    const thisDay = t.moment().set({
        'year': t.setDate.year(),
        'month': t.setDate.month(),
        'date': 1
    }).day();
    //마지막 날짜
    const lastDay = t.setDate.daysInMonth();
    const startDay = !(thisDay === 0);
    //전월 삽입
    if (startDay) {
        const lastDateSetting = t.moment().add(month - 1, 'month')
        const lastMonthDay = lastDateSetting.daysInMonth();
        for (let i = thisDay - 1; i >= 0; i--) {
            let last = {
                year: lastDateSetting.year(),
                month: lastDateSetting.month(),
                date: lastMonthDay - i,
                week() {
                    let day = lastDateSetting.set({
                        'date': this.date
                    }).day();
                    if (day === 0) {
                        return 'sun'
                    } else if (day === 6) {
                        return 'sat'
                    } else {
                        return 'week'
                    }
                }
            };
            t._date.push(last)
        }
    }

    //이번요일 삽입
    for (let i = 1; i <= lastDay; i++) {
        let now = {
            year: t.setDate.year(),
            month: t.setDate.month(),
            date: i,
            week() {
                let day = t.setDate.set({
                    'date': i
                }).day();
                if (day == 0) {
                    return 'sun'
                } else if (day == 6) {
                    return 'sat'
                } else {
                    return 'week'
                }
            },
        }
        t._date.push(now);
    }

    //다음달 삽입
    if (t._date.length < 42) {
        const limit = 42 - t._date.length;
        const nextDateSetting = t.moment().add(month + 1, 'months');
        for (let i = 1; i <= limit; i++) {
            let next = {
                year: nextDateSetting.year(),
                month: nextDateSetting.month(),
                date: i,
                week() {
                    let day = nextDateSetting.set({
                        'date': i
                    }).day();
                    if (day == 0) {
                        return 'sun'
                    } else if (day == 6) {
                        return 'sat'
                    } else {
                        return 'week'
                    }
                }
            }
            t._date.push(next);
        }
    }

    //타이틀
    const titleYear = document.querySelector('.datePicker_Year');
    const titleMonth = document.querySelector('.datePicker_month');

    titleMonth.textContent = `${this.stringMonth}.`;
    titleYear.textContent = `${this.stringYear} `;
    this.dateRendering();

};

DatePicker.prototype.dateRendering = function () {
    const t = this;
    let r = -1;
    for (let a of t.weekNode) {
        a.innerHTML = null;
    }
    for (let i = 0; i < 6; i++) {
        const bgNode = document.createElement('div');
        const dateNode = document.createElement('div');
        const numNode = document.createElement('div');

        bgNode.classList.add('datePopup_bg');
        bgNode.setAttribute('data-line', i)
        dateNode.classList.add('datePopup_date');
        numNode.classList.add('datePopup_num');

        dateNode.appendChild(numNode);
        t.weekNode[i].appendChild(bgNode);
        t.weekNode[i].appendChild(dateNode);
        for (let j = 0; j < 7; j++) {
            r++;
            const numBox = document.querySelectorAll('.datePopup_num');
            const bgBox = document.querySelectorAll('.datePopup_bg');
            const num = document.createElement('div');
            const dateText = document.createElement('div');
            const bg = document.createElement('div');
            const date = t._date[r].date;
            const month = t._date[r].month;
            const year = t._date[r].year;

            const today = t.moment().set({
                'year': year,
                'month': month,
                'date': date
            });

            const t_format = today.format('YYYY-MM-DD')

            dateText.className = 'date-text';
            dateText.textContent = today.format('DD');
            num.appendChild(dateText);

            num.classList.add('num');
            num.dataset.date = t_format

            bg.classList.add('bg');
            bg.dataset.row = j
            bg.dataset.date = t_format

            if (t.setDate.month() !== month) {
                bg.classList.add('default');
            }
            if (t._date[r].week() == 'sun') {
                num.classList.add('sun')
            } else if (t._date[r].week() == 'sat') {
                num.classList.add('sat')
            }
            numBox[i].appendChild(num);
            bgBox[i].appendChild(bg);
        }
    }
    t.selecDate();
    t.checkToday();
}

DatePicker.prototype.checkToday = function () {
    const dateList = document.querySelectorAll('.num');
    const t = this;
    for (let a of dateList) {
        if (a.dataset.date === t.moment().format('YYYY-MM-DD')) {
            a.classList.add('active');
            t.clickDate = a.dataset.date;
        }
    }
}


DatePicker.prototype.clickEvent = function () {
    const t = this;

    function clickE(e) {
        if (this.id == 'picker_prev') {
            t.index += -1;
            t.dateSetting(t.index);
        } else if (this.id == 'picker_next') {
            t.index += 1;
            t.dateSetting(t.index);
        }
        t.selectedDate();
    }
    t.prev.addEventListener('click', clickE, false)
    t.next.addEventListener('click', clickE, false)
}

DatePicker.prototype.selecDate = function () {
    const t = this;
    const bg = document.querySelectorAll('.bg');
    const num = document.querySelectorAll('.num');
    const picker = document.querySelector('.datePicker_wrapper');
    const datePicker = document.querySelector('.dateSetting');
    const dateInput = this.targetInput;

    for (let b of num) {

        b.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (picker) {
                const parent = picker.parentNode;
                parent.removeChild(picker)
            }
            dateInput.setAttribute('value', this.dataset.date);
            t.selectTimeObj = this.dataset.date;
            t.selectedDate();

            const icon = dateInput.nextSibling;
            if (icon) {
                icon.style.color = '#92c8c1';
            }
        })
    }
}

DatePicker.prototype.selectedDate = function (selectDate) {
    const today = this.moment().format('YYYY-MM-DD');
    const input = this.targetInput.value;
    const num = document.querySelectorAll('.num')
    const selected = document.querySelectorAll('.selected-date');

    for (let b of selected) {
        b.classList.remove('selected-date');
    }

    if (input === today) return

    for (let a of num) {
        if (input === a.dataset.date) {
            a.classList.add('selected-date');
        }
    }

}

DatePicker.prototype.getDate = function () {
    const t = this;
    return t.selectTimeObj;
}


export default DatePicker;


/*

TODO:
01. 현재 날짜가 31일 일 경우 다음달 클릭시 30일이 마지막달이라면, 현재날짜 선택이 안됨.
    마지막 날짜를 체크하여 없는경우 그 달의 마지막으로 해야 함 ex) 2월, 30일이 마지막인 전or다음 달

02. 공휴일 체크가 되어 있지 않음

03. 일정표시가 되어 있지가 않음

*/