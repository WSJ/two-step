function getDirectionByKeyCode(keyCode) {
    // key codes here: https://css-tricks.com/snippets/javascript/javascript-keycodes/
    const keyCodesPositive = [
        40, // down key
        32, // spacebar
        39, // right key
        34 // page down
    ];
    const keyCodesNegative = [
        37, // left
        38, // up
        33 // page up
    ];
    if (keyCodesPositive.indexOf(keyCode) > -1) {
        return 1;
    } else if (keyCodesNegative.indexOf(keyCode) > -1) {
        return -1;
    }
    return 0;
}

export default getDirectionByKeyCode;