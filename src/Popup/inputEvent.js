/**
 * @description popup 내 input event handle function
 * @param idString
 * @param result
 */
const inputEvent = (idString, result) => {
    const type = idString;
    const selectData = new SelectPicker();
    const attendData = new AttendSearch(type, result);
    
}

export default inputEvent;