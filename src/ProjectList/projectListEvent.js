/**
 * @description 메뉴에 보여질 project list rendering function
 * @param {object} 서버에서 받아온 project list
 */

import { dc, c, t, q} from '../lib/VirtualDOM';

const projectListEvent = (projectList) => {
    const sideMenu = q('.tp_project_list_menu');
    const data = projectList.data.projects;
    const projectListBtn = q('#projectListMenu');

    const common = 'tp_project_list_';
    const tri = dc('div');
    const listBox = dc('div');
    const list = dc('div');
    const allProBox = dc('div');
    const allProText = dc('div');
    const allProNum = dc('div');
    const totalNum = data.end.length + data.progress.length;

    listBox.appendChild(tri);
    listBox.appendChild(list);
    allProBox.appendChild(allProText);
    allProBox.appendChild(allProNum);
    list.appendChild(allProBox);

    c(allProBox, common+'all_pro_box');
    c(allProText, common+'all_pro_text');
    c(tri, common+'tri');
    c(listBox, common+'list_box');
    c(list, common+'list mater_design_shadow');
    c(allProNum, common+'all_pro_num');
    
    t(allProNum, totalNum);
    t(allProText, '전체 프로젝트');

    const makePro = (titleText, dataType) => {
        const proTitleBox = dc('div');
        const proTitleText = dc('div');
        const proTitleNum = dc('div');
        const proList = dc('div');
        const proItemContainer = dc('div');
        const icon = dc('i');
        const text = dc('div');
        
        

        c(proTitleBox, common+'pro_title_box');
        c(proTitleText, common+'pro_title_text');
        c(proTitleNum, common+'pro_title_num');
        c(proList, common+'pro_list');
        c(icon, 'bx bx-chevron-right');
        c(proItemContainer, common+'pro_item_container');
        c(text, 'text');
        proTitleText.appendChild(icon);
        proTitleText.appendChild(text);
        t(text, titleText);
        t(proTitleNum, dataType.length);

        for (let i = 0; i < dataType.length; i++) {
            const proItem = dc('a');
            proItem.href = dataType[i].link.web;
            c(proItem, common+'pro_item');
            t(proItem, dataType[i].title);
            proItem.dataset.id = dataType[i].id;
            proList.appendChild(proItem);
        }
        proTitleBox.appendChild(proTitleText);
        proTitleBox.appendChild(proTitleNum);
        proItemContainer.appendChild(proTitleBox);
        proItemContainer.appendChild(proList);
        list.appendChild(proItemContainer);

        proItemContainer.style.height = '60px';

        proItemContainer.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.clientHeight <= 60) {
                this.style.height = 60+proList.clientHeight+'px';
                icon.style.animationName = 'openMenu'
            } else {
                this.style.height = '60px';
                icon.style.animationName = 'closeMenu'
            }
        })
    };

    //진행중인 프로젝트 rendering
    makePro('진행 중인 프로젝트', data.progress);

    //완료된 프로젝트
    makePro('완료된 프로젝트', data.end);
   

    sideMenu.addEventListener('mouseover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showList(listBox, true);
    });

    sideMenu.addEventListener('mouseleave', function(e) {
        e.preventDefault();
        e.stopPropagation();

        showList(listBox, false);
    });

    //list box
    const showList = (list, show) => {
        const listClass = list.className.split(' ').findIndex(e => e === 'show_list');
        if (listClass > 0 && show) {
            return;
        } else if (!show && listClass > 0) {
            listBox.style.opacity = 0;
            setTimeout(() => {
                listBox.parentNode.removeChild(listBox);
                listBox.className = common+'list_box';
            }, 1000);
        } else {
            if (show) {
                sideMenu.appendChild(listBox);
                listBox.style.opacity = 1;
                c(listBox, ' show_list');
            } 
        }

    }
    


};

export default projectListEvent;
