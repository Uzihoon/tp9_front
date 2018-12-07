import SelectPicker from "../Popup/selectPicker";
import {qAll} from "../lib/VirtualDOM";

/**
 * @description calendar popup event function
 */
const openCalendar = () => {

    const selectPicker = new SelectPicker();

    const datePicker = qAll('.dateSetting');
    const datePickerInput = qAll('.dateInput');
    selectPicker.dateSetting(datePicker, datePickerInput);
}

export default openCalendar;