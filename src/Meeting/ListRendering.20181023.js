import {
    dc,
    c,
    t,
    qAll
} from '../lib/VirtualDOM';
import moment from 'moment';

const ListRendering = (result, date) => {
    let today = date ? date : 'Today';
    const today_date = moment().format('YYYY-MM-DD');
    if (today === today_date) {
        today = 'Today';
    }
    const dateText = qAll('.date_text');
    for (let a of dateText) {
        a.textContent = today
    }
    const eventList = result;
    const data = eventList.data.events;
    const inContainer = document.querySelector('#place_in');
    const outContainer = document.querySelector('#place_out');
    inContainer.innerHTML = '';
    outContainer.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const start = moment(data[i].start).format('kk:mm');
        const stop = moment(data[i].stop).format('kk:mm');
        const type = data[i].event_type;
        //createElement
        const wrapper = dc('div');
        const time = dc('div');
        const departBox = dc('div');
        const place_box = dc('div');

        //class Setting
        c(wrapper, 'tp_sch_item');
        c(time, 'sch_time');
        c(departBox, 'sch_depart');
        c(place_box, 'sch_place');

        t(time, start);
        wrapper.appendChild(time);
        wrapper.appendChild(departBox);
        wrapper.appendChild(place_box);

        //내부 미팅
        if (type === 100) {
            const partList = data[i].depts;
            for (let i = 0; i < partList.length; i++) {
                const depart = dc('div');
                const icon = dc('div');
                const text = dc('div')
                const place = data[i].place_title_by_id;
                t(place_box, place)
                icon.style.backgroundColor = partList[i].color;
                c(depart, 'depart');
                c(icon, 'dep_icon');
                c(text, 'text');
                t(text, partList[i].title);
                depart.appendChild(icon);
                depart.appendChild(text);
                departBox.appendChild(depart)
            }

            inContainer.appendChild(wrapper);
        }

        //외부 미팅
        if (type === 200) {
            const place = data[i].place_title;
            t(place_box, place)
            outContainer.appendChild(wrapper);
        }
        //text Setting

    }
}

export default ListRendering;