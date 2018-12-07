import {dc, c, t} from '../lib/VirtualDOM';

/**
 * @description work part create function
 * @param part
 * @returns {HTMLElement}
 */
const createPart = (part) => {
    const type = part;
    const memberList = ['홍길동 팀장', '김길동 팀장', '이길동 팀장', '박길동 팀장', '박길동 팀장', '박길동 팀장', '박길동 팀장'];//서버에서 멤버 리스트 받아와야 함.
    const partList = [
        {
            type: '개발',
            class: 'dev_icon',
            data: 'dev'
        },
        {
            type: '기획',
            class: 'plan_icon',
            data: 'plan'
        },
        {
            type: '디자인',
            class: 'design_icon',
            data: 'design'
        },
        {
            type: '마케팅',
            class: 'marketing_icon',
            data: 'marketing'
        },
    ];

    const container = document.querySelector('.plus_team_list_container');
    const typeIndex = partList.findIndex(e => e.type === type);

    //create element
    const titleBox = dc('div');
    const titleIcon = dc('div');
    const title = dc('div');
    const memberListBox = dc('div');
    const commentBox = dc('div');
    const comment = dc('input');
    const wrapper = dc('div');

    c(memberListBox, 'partMember_list_box');
    c(commentBox, 'partMember_comment_box');
    c(comment, 'partMemeber_comment');
    c(wrapper, 'partMember_wrapper');
    c(titleBox, 'partMember_title_box');
    c(title, 'partMemeber_title');
    c(titleIcon, `partMember_title_icon ${partList[typeIndex].class}`);

    t(title, type);
    comment.setAttribute('placeholder', '업무지시 코멘트');
    wrapper.dataset.type = type;

    for (let i = 0; i < memberList.length; i++) {
        const label = dc('label');
        const check = dc('input');
        const icon = dc('i');
        const span = dc('div');

        check.setAttribute('type', 'radio');
        check.setAttribute('name', partList[typeIndex].data + 'member');

        c(label, 'partMember_label_box');
        c(icon, 'bx bx-checkbox');
        c(span, 'partMember_text');

        t(span, memberList[i]);

        label.appendChild(check);
        label.appendChild(icon);
        label.appendChild(span);
        memberListBox.appendChild(label);
    }

    commentBox.appendChild(comment);
    titleBox.appendChild(titleIcon);
    titleBox.appendChild(title);
    wrapper.appendChild(titleBox);
    wrapper.appendChild(memberListBox);
    wrapper.appendChild(commentBox);
    container.appendChild(wrapper);
    
    return wrapper;
};

export default createPart;