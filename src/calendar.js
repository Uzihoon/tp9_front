/**
 * @description Calendar rendering Class
 * @param {HTMLElement} container
 * @param {HTMLElement} header
 * @param {string} url
 * @param {boolean} main
 *
 */

import moment from 'moment';
import { get } from './lib/ajax';
import { server, userId, getProject, id } from './lib/url';
import { getMeeting } from './Meeting/index';
import { dc, q, qAll, c, t } from './lib/VirtualDOM';

function Calendar(container, header, url, main) {
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
    this.resultData = null;
    this.copySetDate = null;
    this.moreProjectList = [];
    this.standardDate = null;
    this.schCount = {
        type: '',
        count: 0,
    };
    this.monthCheck = 0;
    this._url = url;
    this.main = main;
    this._init(container, header);
    this._initEvent();
}

/**
 * @description 초기화 함수
 * @param container
 * @param header
 * @private
 */

Calendar.prototype._init = function (container, header) {
    const t = this;
    this._container = q(container);
    this._container.innerHTML = '';
    this.prev = q('.prev');
    this.next = q('.next');
    this.standardDate = moment();
    t.dayList = ['일', '월', '화', '수', '목', '금', '토'];
    t._header = q(header);
    t._header.innerHTML = '';

    //calendar list
    for (let i = 0; i < 6; i++) {
        let calList = dc('div');
        calList.classList.add('t_body');

        t._container.appendChild(calList)
    }
    this.weekNode = qAll('.t_body');
};

/**
 * @description 이벤트 핸들링 함수
 * @private
 */

Calendar.prototype._initEvent = function () {
    this.getJSON();

    this.calendarSetting();
    // this.dateSetting(this.index);
    this.clickEvent();
};

/**
 * @description 달력 초기 셋팅
 */
Calendar.prototype.calendarSetting = function () {
    const t = this;
    const dayBox = dc('ul');
    dayBox.classList.add('tp_dayList');

    for (let i = 0; i < t.dayList.length; i++) {
        let day = dc('li');
        let text = dc('span');
        text.textContent = t.dayList[i];
        day.classList.add('tp_day');
        day.appendChild(text);
        dayBox.appendChild(day);
    }
    t._header.appendChild(dayBox);
};

/**
 * @description 달력 월 설정 및 해당 월 및 전,후 date 설정
 * @param {number} month
 * @returns {string}
 */

Calendar.prototype.dateSetting = function (month) {
    const t = this;
    const m = t.moment().month() + month;

    //param에 따라 설정되는 기준 날짜
    t.setDate = t.moment().add(month, 'months');
    t.copySetDate = t.setDate;
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
                if (day === 0) {
                    return 'sun'
                } else if (day === 6) {
                    return 'sat'
                } else {
                    return 'week'
                }
            },
        };
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
                    if (day === 0) {
                        return 'sun'
                    } else if (day === 6) {
                        return 'sat'
                    } else {
                        return 'week'
                    }
                }
            };
            t._date.push(next);
        }
    }

    //타이틀
    const titleYear = q('.cal_title span');
    const titleMonth = q('.cal_title b')

    titleMonth.textContent = `${this.stringMonth}, `;
    titleYear.textContent = `${this.stringYear}`;

    this.dateRendering();
};

/**
 * @description date element 생성 함수
 */

Calendar.prototype.dateRendering = function () {
    const t = this;
    let r = -1;
    for (let a of t.weekNode) {
        a.innerHTML = null;
    }
    for (let i = 0; i < 6; i++) {
        let bgNode = dc('div');
        let dateNode = dc('div');
        let numNode = dc('div');
        let schNode = dc('div');

        bgNode.classList.add('bg_box');
        bgNode.setAttribute('data-line', i);
        dateNode.classList.add('t_date');
        numNode.classList.add('t_num');
        schNode.classList.add('line_box');

        dateNode.appendChild(numNode);
        dateNode.appendChild(schNode);
        t.weekNode[i].appendChild(bgNode);
        t.weekNode[i].appendChild(dateNode);

        for (let j = 0; j < 7; j++) {
            r++;
            const numBox = qAll('.t_num');
            // const schBox = qAll('.t_sch');
            const bgBox = qAll('.bg_box');
            const num = dc('div');
            // let sch = dc('div');
            const bg = dc('div');
            const date = t._date[r].date;
            const month = t._date[r].month;
            const year = t._date[r].year;

            const today = t.moment().set({
                'year': year,
                'month': month,
                'date': date
            });

            num.classList.add('num');
            num.dataset.date = today.format('YYYY-MM-DD')
            // sch.classList.add('sch');
            bg.classList.add('bg');
            bg.setAttribute('data-row', j)
            bg.setAttribute('data-date', today.format('YYYY-MM-DD'));

            // if (t.setDate.month() + 1 == month && day == t.today) {
            //     bg.classList.add('active')
            //     t.clickDate = today
            // }
            if (t.setDate.month() !== month) {
                bg.classList.add('default');
            }
            if (t._date[r].week() == 'sun') {
                num.classList.add('sun')
            } else if (t._date[r].week() == 'sat') {
                num.classList.add('sat')
            }
            num.innerText = date;
            numBox[i].appendChild(num);
            bgBox[i].appendChild(bg);
        }
    }
    t.selecDate();
    this.checkToday();
    // t.getJSON();
    t.makeSch(t.resultData);
};

/**
 * @description 오늘 날짜 체크 함수
 */

Calendar.prototype.checkToday = function () {
    const dateList = qAll('.bg');
    const t = this;
    for (let a of dateList) {
        if (a.dataset.date === t.moment().format('YYYY-MM-DD')) {
            a.classList.add('active');
            t.clickDate = a.dataset.date;
        }
    }
};

/**
 * @description 비동기로 데이터 받아오는 함수
 */

Calendar.prototype.getJSON = function () {
    const t = this;
    const url = t._url;
    get(url)
        .then(
            result => {
                t.resultData = result;
                t.dateSetting(t.index);
            }
        )
        .catch(
            error => console.error(error)
        )
};

/**
 * @description 서버에서 프로젝트 받아 온 후 달력에 rendering 함수
 * @param schList
 */

Calendar.prototype.makeSch = function (schList) {
    const t = this;
    const list = t.main ? t.resultData.data.projects : t.resultData.data.tasks;
    const schBox = qAll('.line_box');
    const bg = qAll('.bg');
    const backgroundColor = ['15007f', 'ab2000', '1d94aa', '5617e7'];
    let filteredList = [];
    const targetList = list.map(e => {
        const start = t.moment(e.start).format('YYYY-MM');
        const start_month = t.moment(e.start);
        const stop = t.moment(e.stop).format('YYYY-MM');
        const stop_month = t.moment(e.stop);
        const standardDate = t.setDate.format('YYYY-MM');
        const lastDate = t.moment(t.setDate.format('YYYY-MM-DD')).subtract(1, 'month').format('YYYY-MM-DD');
        const nextDate = t.moment(t.setDate.format('YYYY-MM-DD')).add(1, 'months').format('YYYY-MM');

        if (stop === standardDate || start === standardDate || start_month < t.setDate && stop_month > t.setDate || start === nextDate || stop === lastDate) {
            filteredList.push(e);
        }
    });

    for (let i = 0; i < filteredList.length; i++) {
        let sDate = t.moment(filteredList[i].start);
        let dDate = t.moment(filteredList[i].stop);
        let startDate = sDate.format('YYYY-MM-DD');
        let dueDate = dDate.format('YYYY-MM-DD');

        //month setting
        let startMonth = sDate.month();
        let dueMonth = dDate.month();
        const lastMonth = t.moment(t.setDate.format('YYYY-MM-DD')).subtract(1, 'month');
        const nextMonth = t.moment(t.setDate.format('YYYY-MM-DD')).add(1, 'months');

        //day setting
        let startDay = sDate.date();
        let dueDay = dDate.date();

        let firstDay = t.moment(bg[0].dataset['date']).date();
        let lastDay = t.moment(bg[bg.length - 1].dataset['date']).date();

        let startYear = sDate.year();
        let dueYear = dDate.year();

        let startCol, startRow;
        let dueCol, dueRow;

        const projectTitle = filteredList[i].title;
        const link = filteredList[i].link.web; //링크 넣어야함
        // const link = 'http://localhost:8585/project/'+filteredList[i].id;
        const color = filteredList[i].color;
        for (let a of bg) {
            let listDate = t.moment(a.dataset.date).format('YYYY-MM-DD');
            //시작 부분 설정 
            if (startMonth === lastMonth.month()) { //지난달 부터 시작한 경우
                if (startDay < firstDay || firstDay === 1) {
                    startCol = 0;
                    startRow = 0;
                } else {
                    if (listDate === startDate) {
                        startCol = +a.parentNode.dataset['line'];
                        startRow = +a.dataset['row'];
                    }
                }
            } else if (startMonth === t.setDate.month()) { //이번달 부터 시작한 경우
                if (listDate === startDate) {
                    startCol = +a.parentNode.dataset['line'];
                    startRow = +a.dataset['row'];
                }
            } else if (startMonth === nextMonth.month()) {
                if (startDay < lastDay) {
                    if (listDate === startDate) {
                        startCol = +a.parentNode.dataset['line'];
                        startRow = +a.dataset['row'];
                    }
                } else {
                    startRow = -2;
                }
            } else {
                startCol = 0;
                startRow = 0;
            }

            //끝나는 부분 설정
            if (dueMonth === lastMonth.month()) {
                if (dueDay > firstDay) {
                    if (listDate === dueDate) {
                        dueCol = +a.parentNode.dataset['line'];
                        dueRow = +a.dataset['row'];
                    }
                } else {
                    dueRow = -2;
                }
            } else if (dueMonth === t.setDate.month()) {
                if (listDate === dueDate) {
                    dueCol = +a.parentNode.dataset['line'];
                    dueRow = +a.dataset['row'];
                }
            } else if (dueMonth === nextMonth.month()) {
                if (dueDay < lastDay) {
                    if (listDate === dueDate) {
                        dueCol = +a.parentNode.dataset['line'];
                        dueRow = +a.dataset['row'];
                    }
                } else {
                    dueCol = 5;
                    dueRow = 6;
                }
            } else {
                dueCol = 5;
                dueRow = 6;
            }


        }
        // console.log('startCol: ' + startCol, 'startRow: ' + startRow, 'dueCol: ' + dueCol, 'dueRow: ' + dueRow, projectTitle)

        if (startRow < 0 || dueRow < 0) {
            renderSch(-1);
        } else if (startCol === dueCol) {
            renderSch(startCol, (dueRow + 1), startRow, projectTitle, link, color, t, sDate);

        } else if (startCol !== dueCol) {

            renderSch(startCol, 7, startRow, projectTitle, link, color, t, sDate);
            renderSch(dueCol, (dueRow + 1), 0, projectTitle, link, color, t, sDate);
            for (let k = startCol + 1; k < dueCol; k++) {
                renderSch(k, 7, 0, projectTitle, link, color, t, sDate);
            }
        }

    }

    function renderSch(col, dueRow, startRow, projectTitle, link, color, that, sDate) {
        if (col < 0) return;
        //해당 일에 프로젝트가 5개 이상 추가되는 경우, ...개 더보기로 표시된다.
        if (schBox[col].childNodes.length >= 5) {
            const colNum = 7 * col;
            const start = sDate.clone().subtract(1, 'days');
            const child = schBox[col].childNodes;
            const box = dc('div');
            let index = 1;
            if (child[child.length - 1].className !== 'tp_more_sch_box') {
                c(box, 'tp_more_sch_box');
                box.innerHTML = '';
                for (let j = 0; j < 7; j++) {
                    const a = dc('div');
                    c(a, 'tp_more_sch');
                    box.appendChild(a);
                }
                schBox[col].appendChild(box);
            }
            for (let i = startRow; i < dueRow; i++) {
                start.add(index, 'days');
                const targetDate = bg[i+colNum].dataset.date;
                const target = child[child.length - 1].childNodes[i];
                
                // target.dataset.project = that.schCount.count;
                target.dataset.date = targetDate;
                target.dataset.col = col;
                target.dataset.row = i;
                // index++;
                that.moreSelectSch(target);
            }
            return;
        }

        const schList = dc('div');
        schList.classList.add('t_sch');
        for (let i = 0; i < 7; i++) {
            let sch = dc('div');
            sch.classList.add('sch')
            schList.appendChild(sch);
        }
        schBox[col].appendChild(schList);
        const schNode = schBox[col].lastChild;
        let t = schNode.childNodes;

        const schBoxWidth = schNode.clientWidth / 7;
        const schBoxHeight = schNode.clientHeight;

        //title
        const title = dc('a');
        const titleBox = dc('div');
        const triangle = dc('div');
        const titleText = dc('div');

        titleText.textContent = projectTitle;
        c(titleBox, 'title_box ');
        c(triangle, 'tp_tri');
        c(titleText, 'tp_title_text');
        titleBox.appendChild(triangle);
        titleBox.appendChild(titleText);
        title.appendChild(titleBox);
        title.classList.add('sch_title');
        title.setAttribute('href', link);
        // title.textContent = projectTitle;
        title.style.width = schBoxWidth * (dueRow - startRow) + 'px';
        title.style.height = schBoxHeight + 'px';
        title.style.left = schBoxWidth * startRow + 'px';
        // title.style.backgroundColor = color;
        title.addEventListener('mouseover', function (e) {
            const x = e.x;
            const y = e.y;
            // titleBox.style.left = x+'px';
            titleBox.style.opacity = 1;
            titleBox.style.display = 'block';
        });
        title.addEventListener('mouseleave', function (e) {
            setTimeout(() => {
                titleBox.style.opacity = 0;
                titleBox.style.display = 'none';
            }, 200);

        });

        schNode.appendChild(title);
        let random = Math.floor(Math.random() * backgroundColor.length);
        // 링크 삽입
        for (let j = startRow; j < dueRow; j++) {
            let a = dc('a');
            a.setAttribute('href', '/project');
            a.classList.add('sch_a');
            a.style.backgroundColor = color;
            t[j].appendChild(a);
            t[j].dataset.schedule = true;
        }

    }
    this.countSch();
};


/**
 * @description 달력 전, 후 버튼 클릭 event
 */

Calendar.prototype.clickEvent = function () {
    const t = this;
    function clickE(e) {
        const compareDate = t.copySetDate.clone();
        const standardDate = t.standardDate.clone();
        if (this.classList.value == 'prev') {
            t.index += -1;
            t.monthCheck += -1;
            compareDate.subtract(1, 'months');
            standardDate.subtract(7, 'months');
        } else if (this.classList.value == 'next') {
            t.index += 1;
            t.monthCheck += 1;
            compareDate.add(1, 'months');
            standardDate.add(6, 'months');
        }

        if (t.main) {
            if (compareDate.format('YYYY-MM-DD') === standardDate.format('YYYY-MM-DD')) {
                t._url = server + getProject + '?' + userId + id + '&current_month=' + compareDate.format('YYYY-MM');
                t.getJSON();
                t.standardDate = standardDate;
            } else {
                t.dateSetting(t.index);
            }

        } else {
            t.dateSetting(t.index);

        }
    }
    t.prev.addEventListener('click', clickE, false);
    t.next.addEventListener('click', clickE, false);
};



Calendar.prototype.selecDate = function () {
    const t = this;
    const bg = qAll('.bg');
    for (let b of bg) {
        b.addEventListener('click', function () {
            if (this.classList.contains('default')) return;
            for (let a of bg) {
                a.classList.remove('active')
            }
            b.classList.add('active')
            const date = this.dataset.date;
            getMeeting(date);
        })
    }
};

Calendar.prototype.moreSelectSch = function (target) {
    const t = this;
    const container = q('#tp_wrapper');

    target.removeEventListener('click', openSch, false);
    target.addEventListener('click', openSch);

    function openSch (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const date = moment(this.dataset.date, 'YYYY-MM-DD');
        const project = [];
        const data = t.resultData.data.projects;
        data.filter(e => {
            const start = moment(e.start);
            const stop = moment(e.stop);
            if (start <= date  && stop >= date) {
                project.push(e)
            }
        });

        //rendering
        const wrapper = dc('div');
        const box = dc('div');
        const title = dc('div');
        const content = dc('div');
        const titleBox = dc('div');
        const i = dc('i');
        const bg = dc('div');
        c(content, 'tp_more_project_content');
        c(wrapper, 'tp_more_project_wrapper');
        c(box, 'tp_more_project_box');
        c(title, 'tp_more_project_title');
        c(i, 'bx bx-x');
        c(bg, 'tp_more_project_bg');
        c(titleBox, 'tp_more_project_title_box');

        title.textContent = date.format('DD');
        for (let i = 0; i < project.length; i++) {
            const item = dc('a');
            const p = project[i];
            item.textContent = p.title;
            item.style.backgroundColor = p.color;
            item.setAttribute('href', p.link.web);
            item.dataset.projectId = p.id;
            c(item, 'tp_more_project_item');
            content.appendChild(item);
        }
        titleBox.appendChild(title);
        titleBox.appendChild(i);
        box.appendChild(titleBox);
        box.appendChild(content);
        wrapper.appendChild(box);
        wrapper.appendChild(bg);
        
        container.appendChild(wrapper);
        box.style.animationName = 'show';
        box.style.marginLeft = e.x+'px';
        box.style.top = (e.y - (box.clientHeight/2)) + 'px';
        bg.addEventListener('click', closePopup);
        i.addEventListener('click', closePopup);

        function closePopup () {
            const close = new Promise((res, rej) => {
                box.style.animationName = 'close';
                res('done')
            });
            close
                .then(res => {
                    setTimeout(() => container.removeChild(wrapper), 100);
                })
                .catch(error => console.error(error));
            
        }
    }
};

Calendar.prototype.countSch = function() {
    // console.log(target, child);
    const list = qAll('.tp_more_sch[data-date]');
    const column = qAll('.line_box');

    for (let a of list) {
        const date = moment(a.dataset.date);
        const data = this.resultData.data.projects;
        const project = [];
        const rowList = [];
        data.filter(e => {
            const start = moment(e.start);
            const stop = moment(e.stop);
            if (start <= date  && stop >= date) {
                project.push(e)
            }
        });
        const sch = column[a.dataset.col].childNodes;
        for (let i = 0; i < sch.length-1; i++) {
            const row = sch[i].childNodes[a.dataset.row];
            if (row.dataset.schedule) {
                rowList.push(row);
            }
        }
        a.textContent = (project.length - rowList.length) + '개 더보기';
    }
};

export default Calendar;