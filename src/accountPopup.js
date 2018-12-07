/**
 * @description 거래처 관리 popup rendering function
 * @type {Function}
 */

const accountPopup = ((e) => {
    const wrapper = document.getElementById('tp_wrapper');
    const container = document.createElement('div');
    const iconBox = document.createElement('div');
    const bg = document.createElement('div');
    const popupBg = document.createElement('div');
    const buttonBox = document.createElement('div');
    const x = e.clientX;
    const y = e.clientY;
    const title = document.createElement('div');
    const button = document.createElement('button');
    const link = document.createElement('a');
    let close = true;

    link.className = 'popupLink';
    button.className = 'popupLink';
    buttonBox.className = 'tp_buttonBox';
    title.className = 'tp_popup_title'

    link.setAttribute('href', '#');
    link.textContent = '거래처 목록 확인하기';
    button.className += ' open_submit'
    button.textContent = '등록하기';
    title.textContent = '거래처 관리';

    bg.className = 'tp_bg';
    container.className = 'tp_popup_wrapper';
    popupBg.className = 'tp_popup_bg';
    iconBox.className = 'tp_icon_box';

    buttonBox.appendChild(button);
    buttonBox.appendChild(link);

    popupBg.appendChild(iconBox);
    popupBg.appendChild(title);
    popupBg.appendChild(buttonBox);
    popupBg.style.top = '65px';
    popupBg.style.right = wrapper.clientWidth - x + 'px';
    popupBg.style.marginLeft = '-150px';

    container.appendChild(bg);
    container.appendChild(popupBg);

    wrapper.appendChild(container);

    const popup = document.querySelector('.tp_popup_bg');
    const submit = document.querySelector('.open_submit');
    const btnBox = document.querySelector('.tp_buttonBox');
    const popupWrapper = document.querySelector('.tp_popup_wrapper');

    //form 생성
    const formList = ['이름', '회사명', '직책/직급', '연락처', '이메일'];
    const formEn = ['name','company','position','num','email'];
    const formType = ['text', 'text', 'text', 'num', 'email'];
    const form = document.createElement('form');
    const btn = document.createElement('button');
    btn.setAttribute('type', 'submit');
    btn.textContent = '확인';
    form.className = 'tp_account_form';

    for(let i = 0; i < formList.length; i++) {
        let label = document.createElement('label');
        let input = document.createElement('input');
        let box = document.createElement('div');
        label.textContent = formList[i];
        label.setAttribute('for', formEn[i]);
        input.setAttribute('type', formType[i]);
        input.setAttribute('name', formEn[i]);
        input.className += 'tp_account_input';
        input.setAttribute('id', formEn[i]);

        box.appendChild(label);
        box.appendChild(input);

        form.appendChild(box);
    }

    form.appendChild(btn);
    

    addEventListener('keydown', (e) => {
        if(e.code === 'Escape') {
            if(close) {
                wrapper.removeChild(popupWrapper)
                close = false;
            }
        }
    })

    submit.addEventListener('click', () => {
        popup.style.height = '80%';
        popup.className += ' submit_popup_bg';
        popup.removeChild(btnBox);
        popup.appendChild(form);
    })

});

export default accountPopup;