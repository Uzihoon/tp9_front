import ListRendering from './ListRendering'
import { get } from '../lib/ajax';
import { server, getEvent, userId, id } from '../lib/url';

/**
 * @description meeting list handle function
 * @param date
 */
const getMeeting = (date) => {

    let url = server + getEvent + '?' + userId + id;
    if (date) {
        url += '&today='+date;
    }
    get(url)
        .then(result => ListRendering(result, date))
        .catch(error => console.log(error))
};

export default getMeeting;