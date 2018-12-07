import DatePicker from './datePicker';
import TimePicker from './timePicker';

/**
 * @description calendar popup & timer popup handle function
 * @constructor
 */
function SelectPicker() {
    this.settingDate = {
        time: '',
        date: '',
    }
}

SelectPicker.prototype.dateSetting = function (date, dateInput) {
    //date rendering
    const datePicker = date;
    const datePickerInput = dateInput;
    let openDate = false;
    const newDatePicker = new DatePicker();
    const num = document.querySelectorAll('.datePicker_wrapper .num');
    const dateWrapper = document.querySelector('.datePicker_wrapper');
    for (let a of datePickerInput) {
        a.addEventListener('focus', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const inputParent = a.parentNode;
            const dateWrapper = document.querySelector('.datePicker_wrapper');
            if (dateWrapper) {
                const parent = dateWrapper.parentNode;
                parent.removeChild(dateWrapper);
            }
            newDatePicker.settingDate(a.parentNode, this);
            openDatePicker();
        })
    }
    

    const openDatePicker = () => {
        const searchWrapper = document.querySelector('.tp_attend_search_wrapper');
        const timeWrapper = document.querySelector('.timeWrapper_wrapper');
        const dateWrapper = document.querySelector('.datePicker_wrapper');

        if (searchWrapper) {
            const parent = searchWrapper.parentNode;
            parent.removeChild(searchWrapper);
        }
        if (timeWrapper) {
            const parent = timeWrapper.parentNode;
            parent.removeChild(timeWrapper);
        }
    };


    // this.settingDate.date = newDatePicker.getDate();
}

SelectPicker.prototype.timeSetting = function (time, timeInput) {

    const timePicker = time;
    const timePickerInput = timeInput;
    let openDate = false;
    const closeFocus = document.querySelectorAll('.tp_schPopup_input');

    //시간 선택 이벤트
    timePickerInput.addEventListener('focus', function (e) {
        openTimePicker(e, timePicker);
        // this.settingDate.time = TimePickerFunc.getTime();
    });


    const TimePickerFunc = new TimePicker();

    //선택된 시간 가져오기



    const openTimePicker = (e, t) => {
        const dateWrapper = document.querySelector('.datePicker_wrapper');
        const timeWrapper = document.querySelector('.timeWrapper_wrapper');
        const searchWrapper = document.querySelector('.tp_attend_search_wrapper');

        if (searchWrapper) {
            const parent = searchWrapper.parentNode;
            parent.removeChild(searchWrapper);
        }
        if (dateWrapper) {
            const parent = dateWrapper.parentNode;
            parent.removeChild(dateWrapper);
        }

        if (!timeWrapper) {
            TimePickerFunc.timePicker(e, t);
        } else {
            const timeStyle = getComputedStyle(timeWrapper).display
            timeWrapper.style.display = 'block'
        }
    }

}

SelectPicker.prototype.getData = function () {
    return this.settingDate;
}

export default SelectPicker;