/**
 * @description menu event function
 */

const menuEvent = () => {
    const menuList = document.querySelectorAll('.tp_pro_box');
    const touchEvent = document.querySelectorAll('.tp_pro_title');

    for (let [index, value] of touchEvent.entries()) {

        value.addEventListener('click', () => {
            const classList = value.className.split(' ');
            const className = 'closed_menu';
            const listHeight = value.nextElementSibling.clientHeight;
            const closed = classList.includes(className);
            const icon = value.children[1];

            if (!closed) {
                //menu close
                menuList[index].style.height = '70px';
                value.className += ' closed_menu';
                icon.className = 'bx bx-chevron-down aniState closeIconAni';
            } else {
                menuList[index].style.height = listHeight + 70 + 'px';
                value.className = 'tp_pro_title';
                icon.className = 'bx bx-chevron-down aniState openIconAni'
            }
        })
    }

}

export default menuEvent;