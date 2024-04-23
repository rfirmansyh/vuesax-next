import { setColor } from './index';
var defineColors = function (colors) {
    Object.keys(colors).forEach(function (item) {
        if (document.body) {
            setColor(item, colors[item], document.body);
        }
    });
};
export var defineVuesaxOptions = function (options) {
    if (!!options.colors) {
        defineColors(options.colors);
    }
};
