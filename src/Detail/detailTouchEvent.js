import { c, q } from "../lib/VirtualDOM";

/**
 * @description task detail page event function
 */
const detailTouchEvent = () => {

    //click event
    const title = q('.task_listBox');
    const hideWrapper = q('.task_hide_box');
    const wrapper = q('.tp_calendar_container');

    /*
        title 클릭할 경우 해당 프로젝트에 속한 Task List 가 표시된다.
     */
    title.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        hideWrapper.style.display = 'block';
        hideWrapper.style.animationName = 'show';
        c(hideWrapper, ' showHide')
    };

    /*
        그 외 background 클릭할 경우 List 가 숨겨진다.
     */
    wrapper.onclick = (e) => {
        e.preventDefault();
        const hide = q('.showHide');
        if (hide || hideWrapper.style.display === 'block') {
            hideWrapper.style.animationName = 'close';
            setTimeout(() => {
                hideWrapper.style.display = 'none';
                hideWrapper.className = 'task_hide_box mater_design_shadow';
            }, 500);
        }
    }
};

export default detailTouchEvent;