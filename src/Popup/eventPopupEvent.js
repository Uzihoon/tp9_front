import handlePopupEvent from './handlePopupEvent';

/**
 * @description 회의 일정 외부/내부 클릭 event
 * @param id
 * @param result
 */
const eventPopupEvent = ({id, result}) => {
    const popupElement = ['#inner_meet', '#outer_meet'].map((e) => document.querySelector(e));
    for (let index in popupElement) {
        if (popupElement[index]) {
            popupElement[index].addEventListener('click', function() {
                handlePopupEvent(this.id, result);
            })
        }
    }
}

export default eventPopupEvent;