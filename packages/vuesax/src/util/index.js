// import * as consolee from 'consolee'
var isColor = function (color) {
    var vsColors = [
        'primary', 'secondary', 'success', 'danger', 'warning', 'dark', 'light', 'warn',
        // social colors
        'facebook',
        'twitter',
        'youtube',
        'pinterest',
        'linkedin',
        'snapchat',
        'whatsapp',
        'tumblr',
        'reddit',
        'spotify',
        'amazon',
        'medium',
        'vimeo',
        'skype',
        'dribbble',
        'slack',
        'yahoo',
        'twitch',
        'discord',
        'telegram',
        'google-plus',
        'messenger'
    ];
    return vsColors.includes(color);
};
var setVar = function (propertyName, value, el) {
    if (!el) {
        document.documentElement.style.setProperty("--vs-" + propertyName, value);
    }
    else {
        if (el.nodeName !== '#comment') {
            el.style.setProperty("--vs-" + propertyName, value);
        }
    }
};
var setColor = function (colorName, color, el, addClass) {
    function hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            // tslint:disable-next-line:object-literal-sort-keys
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    var isRGB = /^(rgb|rgba)/.test(color);
    var isRGBNumbers = /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/.test(color);
    var isHEX = /^(#)/.test(color);
    var newColor;
    if (color == 'dark' && el) {
        if (addClass) {
            el.classList.add('vs-component-dark');
        }
    }
    if (isRGB) {
        var arrayColor = color.replace(/[rgba()]/g, '').split(',');
        newColor = arrayColor[0] + "," + arrayColor[1] + "," + arrayColor[2];
        setVar(colorName, newColor, el);
        if (addClass) {
            el.classList.add('vs-change-color');
        }
    }
    else if (isHEX) {
        var rgb = hexToRgb(color);
        newColor = rgb.r + "," + rgb.g + "," + rgb.b;
        setVar(colorName, newColor, el);
        if (addClass) {
            el.classList.add('vs-change-color');
        }
    }
    else if (isColor(color)) {
        var style = window.getComputedStyle(document.body);
        newColor = style.getPropertyValue('--vs-' + color);
        setVar(colorName, newColor, el);
        if (addClass) {
            el.classList.add('vs-change-color');
        }
    }
    else if (isRGBNumbers) {
        setVar(colorName, color, el);
        if (addClass) {
            el.classList.add('vs-change-color');
        }
    }
    else {
        //     consolee.warn({
        //       el,
        //       link: 'https://lusaxweb.github.io/vuesax/',
        //       text: `• Component: ${el.__vue__.$vnode.componentOptions.tag}
        // • Warn info: El formato de la propiedad color es incorrecto
        // • Prop: color
        // • value: ${color}
        // • Valores Permitidos: (RGB, HEX, RGB Numbers, Vuesax Colors)
        // • Example: color="#000" or color="rgb(255,255,255)"`,
        //       title: 'VUESAX'
        //     })
    }
};
var getColor = function (color) {
    function hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            // tslint:disable-next-line:object-literal-sort-keys
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    var isRGB = /^(rgb|rgba)/.test(color);
    var isRGBNumbers = /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/.test(color);
    var isHEX = /^(#)/.test(color);
    var newColor;
    if (isRGB) {
        var arrayColor = color.replace(/[rgba()]/g, '').split(',');
        newColor = arrayColor[0] + "," + arrayColor[1] + "," + arrayColor[2];
    }
    else if (isHEX) {
        var rgb = hexToRgb(color);
        newColor = rgb.r + "," + rgb.g + "," + rgb.b;
    }
    else if (isColor(color)) {
        var style = window.getComputedStyle(document.body);
        newColor = style.getPropertyValue('--vs-' + color);
    }
    else if (isRGBNumbers) {
        newColor = color;
    }
    return newColor;
};
var insertBody = function (element, parent) {
    var target = parent ? parent : document.body;
    target.insertBefore(element, target.lastChild);
};
var removeBody = function (element, parent) {
    var target = parent ? parent : document.body;
    target.removeChild(element);
};
var setCords = function (element, parent) {
    var cords = parent.getBoundingClientRect();
    var x = cords.x;
    var y = cords.y;
    var w = cords.width;
    var h = cords.height;
    var style = element.style;
    var scrollTop = window.pageYOffset;
    var elTop = element.clientHeight + cords.y + scrollTop;
    var rootTop = scrollTop + window.innerHeight;
    if ((rootTop - elTop) < 30) {
        // console.log('hola mundo')
        style.top = y + scrollTop - element.clientHeight - 4 + "px";
        style.left = x + "px";
        style.width = w + "px";
        element.classList.add('top');
        parent.classList.add('top');
    }
    else {
        style.top = y + scrollTop + h - 4 + "px";
        style.left = x + "px";
        style.width = w + "px";
        element.classList.remove('top');
        parent.classList.remove('top');
    }
};
var setCordsPosition = function (element, parent, position) {
    var cords = parent.getBoundingClientRect();
    var x = cords.x;
    var y = cords.y;
    var w = cords.width;
    var h = cords.height;
    var style = element.style;
    var scrollTop = window.pageYOffset;
    var elTop = element.clientHeight + cords.y + scrollTop;
    var rootTop = scrollTop + window.innerHeight;
    if (x + w + 10 + element.getBoundingClientRect().width > window.innerWidth && position == 'right') {
        position = 'left';
        element.classList.remove('right');
        element.classList.add('left');
    }
    if (x - 10 < element.getBoundingClientRect().width && position == 'left') {
        position = 'top';
        element.classList.remove('left');
        element.classList.add('top');
    }
    if ((rootTop - elTop) < 30 || position == 'top') {
        // console.log('hola mundo')
        style.top = y + scrollTop - element.clientHeight - 8 + "px";
        var left = x + ((w - element.getBoundingClientRect().width) / 2);
        if (left + element.getBoundingClientRect().width < window.innerWidth) {
            if (left > 0) {
                style.left = left + "px";
            }
            else {
                style.left = '10px';
                element.classList.add('notArrow');
            }
        }
        else {
            style.left = 'auto';
            style.right = '10px';
            element.classList.add('notArrow');
        }
    }
    else if (position == 'bottom') {
        style.top = y + scrollTop + h + 8 + "px";
        var left = x + ((w - element.getBoundingClientRect().width) / 2);
        if (left + element.getBoundingClientRect().width < window.innerWidth) {
            if (left > 0) {
                style.left = left + "px";
            }
            else {
                style.left = '10px';
                element.classList.add('notArrow');
            }
        }
        else {
            style.left = 'auto';
            style.right = '10px';
            element.classList.add('notArrow');
        }
    }
    else if (position == 'left') {
        style.top = y + scrollTop + ((h - element.getBoundingClientRect().height) / 2) + "px";
        style.left = x - element.getBoundingClientRect().width - 8 + "px";
    }
    else if (position == 'right') {
        style.top = y + scrollTop + ((h - element.getBoundingClientRect().height) / 2) + "px";
        style.left = x + w + 8 + "px";
    }
};
export { setColor, getColor, setVar, isColor, insertBody, removeBody, setCords, setCordsPosition };
