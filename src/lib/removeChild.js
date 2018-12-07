/**
 * @description child node remove function
 * @param {HTMLElement} child
 */

const removeChild = (child) => {
    child.parentNode.removeChild(child);
};

export default removeChild;