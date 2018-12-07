import handlePopupEvent from './handlePopupEvent';
import schPopup from './schPopup';
import eventPopup from './eventPopup';
import eventPopupEvent from './eventPopupEvent';
import { get } from '../lib/ajax';
import { server, getProjectList, gerEventList, getEventIn, getEventOut } from '../lib/url';


/**
 * @description popup index function
 */
const handlePopupIndex = () => {
    const popupElement = ['#schBtn', '#project_btn'].map((e) => document.querySelector(e));

    for (let index in popupElement) {
        if (popupElement[index]) {
            popupElement[index].addEventListener('click', function (e) {
                e.preventDefault();
                let url = server;
                switch (this.id) {
                    case 'project_btn':
                        url += getProjectList;
                        get(url)
                            .then(result => schPopup(e, this.id, result))
                            .then(result => handlePopupEvent(this.id, result))
                            .catch(error => console.error(error));
                        break;
                    case 'schBtn':
                        url += gerEventList;
                        get(url)
                            .then(result => eventPopup(this.id, result))
                            .then(result => handlePopupEvent(this.id, result))
                            .then(result => eventPopupEvent(result))
                            .catch(error => console.error(error));
                        break;
                    default:
                        return;
                }
                
            })
        }

    }
}

export default handlePopupIndex;