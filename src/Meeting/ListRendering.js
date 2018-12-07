import { dc, c, t, qAll, imgUrl } from '../lib/VirtualDOM';
import moment from 'moment';

/**
 * @description meeting list rendering function
 * @param result
 * @param date
 * @constructor
 */
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
    const container = document.querySelector('#schList');
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        eventRendering(data[i]);
    }


    function eventRendering(data) {
        const box = dc('div');
        const timeBox = dc('div');
        const time = dc('span');
        const infoBox = dc('div');
        const titleBox = dc('div');
        const title = dc('div');
        const icon = dc('div');
        const placeBox = dc('div');
        const place = dc('div');
        const partBox = dc('div');
        const part = dc('div');
        const partText = dc('div');
        const titleText = data.event_type === 100 ? '회의 ['+ data.title + ']' : '미팅 ['+ data.title + ']';

        //class
        c(box, 'tp_event_box');
        c(timeBox, 'tp_event_time_box');
        c(time, 'tp_event_time');
        c(infoBox, 'tp_event_info_box');
        c(titleBox, 'tp_event_title_box');
        c(title, 'tp_event_title');
        c(icon, 'tp_event_icon');
        c(placeBox, 'tp_event_place_box');
        c(place, 'tp_event_place');
        c(partBox, 'tp_event_part_box');
        c(part, 'tp_event_part');
        c(partText, 'tp_event_part_text');
        
        //text
        t(time, moment(data.start).format('kk:mm'));
        t(title, titleText);
        t(place, data.event_type === 100 ? data.place_title_by_id : data.place_title);

        //data
        box.dataset.projectId = data.project_id;
        box.dataset.eventId = data.id;
        icon.style.backgroundImage = 'url('+imgUrl+'tp_edit.png)';

        if(data.event_type === 100) {
            //참석 부서가 2개 이상일 경우
            if (data.depts.length > 2) {
                const partBg = dc('div');
                c(partBg, 'tp_event_part_bg');
                //text
                t(part, data.depts[0].title);
                t(partText, '외 ' + (data.depts.length-1) + '팀');

                //style
                part.style.backgroundColor = data.depts[0].color;

                partBox.appendChild(part);
                partBox.appendChild(partText);

                partText.addEventListener('mouseover', () => {
                    partBg.innerHTML = '';
                    for (let i = 1; i < data.depts.length; i++) {
                        const partList = dc('div');
                        c(partList, 'tp_event_part_list');
                        t(partList, data.depts[i].title);
                        partBg.appendChild(partList);
                    }
                    partBox.appendChild(partBg);
                });
                partText.addEventListener('mouseleave', () => {
                    partBg.parentNode.removeChild(partBg);
                })
            } else { //2개 이하일 경우
                for (let i = 0; i < data.depts.length; i++) {
                    let p = dc('div');
                    t(p, data.depts[i].title);
                    c(p, 'tp_event_part');
                    p.style.backgroundColor = data.depts[i].color;
                    partBox.appendChild(p);
                }
            }
        } else {
            c(partText, '외부');
            partBox.appendChild(partText);
        }
        
        placeBox.appendChild(place);
        placeBox.appendChild(partBox);
        titleBox.appendChild(title);
        titleBox.appendChild(icon);
        infoBox.appendChild(titleBox);
        infoBox.appendChild(placeBox);
        timeBox.appendChild(time);
        box.appendChild(timeBox);
        box.appendChild(infoBox);
        container.appendChild(box)
    }
}

export default ListRendering;