import { server, getMsg, commentableId, id, commentableTpye, userType } from '../lib/url';
import { get } from '../lib/ajax';
import infoRender from './infoRender';

/**
 * @description msg, file icon click 시, 서버에서 데이터 받아와서 rendering
 */

const handleInfoIndex = () => {
    const infoElement = ['#file_list', '#msg_list'].map(e => document.querySelector(e));

    for (let i in infoElement) {
        if (infoElement[i]) {
            infoElement[i].addEventListener('click', function(e) {
                e.preventDefault();
                let url = server;
                switch(this.id) {
                    case 'file_list':
                        url += getMsg + '?' + commentableId + id; //+ '&' + commentableTpye + userType;
                        break;
                    case 'msg_list':
                        url += getMsg + '?' + commentableId + id + '&' + commentableTpye + userType;
                        break;
                    default:
                        return;
                }
                get(url)
                    .then(result => infoRender(this.id, result))
                    .catch(error => console.error(error));
            })
        }
            
    }
    
}

export default handleInfoIndex;