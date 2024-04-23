var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Component, Prop, Watch } from 'vue-property-decorator';
import VsIconsArrow from '../../../icons/arrow';
import VsComponent from '../../../mixins/component';
var VsPagination = /** @class */ (function (_super) {
    __extends(VsPagination, _super);
    function VsPagination() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.val = 0;
        _this.leftActive = 42;
        _this.activeClassMove = false;
        return _this;
    }
    VsPagination.prototype.handleLength = function () {
        var _this = this;
        this.$nextTick(function () {
            var offsetLeftPagination = _this.$refs.pagination.offsetLeft;
            _this.leftActive = _this.$refs["btn" + _this.value].offsetLeft + offsetLeftPagination;
            setTimeout(function () {
                _this.activeClassMove = false;
            }, 300);
        });
    };
    VsPagination.prototype.handleValue = function (val, prevValue) {
        var _this = this;
        if (this.isDisabledItem(val) || this.isLoadingItem(val)) {
            var newVal = val;
            if (val > prevValue) {
                newVal += 1;
            }
            else {
                newVal -= 1;
            }
            if (newVal > this.length) {
                newVal = this.infinite ? 1 : prevValue;
            }
            else if (newVal <= 0) {
                newVal = this.infinite ? this.length : prevValue;
            }
            this.val = newVal;
            this.setValuePage(newVal);
        }
        else {
            this.val = val;
            if (this.$refs.pagination) {
                this.activeClassMove = true;
                this.$nextTick(function () {
                    var offsetLeftPagination = _this.$refs.pagination.offsetLeft;
                    _this.leftActive = _this.$refs["btn" + val].offsetLeft + offsetLeftPagination;
                    setTimeout(function () {
                        _this.activeClassMove = false;
                    }, 300);
                });
            }
        }
    };
    VsPagination.prototype.setValuePage = function (NumberPage) {
        this.$emit('input', NumberPage);
    };
    VsPagination.prototype.renderDotted = function (text) {
        var _this = this;
        if (text === void 0) { text = '...'; }
        var h = this.$createElement;
        var dotted = h('div', {
            staticClass: 'vs-pagination__dotted',
            "class": {
                next: this.value == this.length ? false : text == '...>'
            },
            on: {
                click: function (evt) {
                    var newVal = (_this.value == _this.length ? false : text == '...>') ?
                        _this.val += _this.dottedNumber : _this.val -= _this.dottedNumber;
                    if (newVal > _this.length) {
                        newVal = _this.length;
                    }
                    else if (newVal < 1) {
                        newVal = 1;
                    }
                    _this.setValuePage(newVal);
                }
            }
        }, [
            h('span', {
                staticClass: 'dotted'
            }, ["..."]),
            h('span', {
                staticClass: 'con-arrows'
            }, [
                h(VsIconsArrow),
                h(VsIconsArrow)
            ]),
        ]);
        return dotted;
    };
    VsPagination.prototype.isDisabledItem = function (item) {
        return this.disabledItems.indexOf(item) !== -1;
    };
    VsPagination.prototype.isLoadingItem = function (item) {
        return this.loadingItems.indexOf(item) !== -1;
    };
    VsPagination.prototype.renderButton = function (NumberPage) {
        var _this = this;
        if (NumberPage === void 0) { NumberPage = 1; }
        var h = this.$createElement;
        var button = h('button', {
            ref: "btn" + NumberPage,
            staticClass: 'vs-pagination__button',
            "class": {
                active: NumberPage == this.value,
                prevActive: NumberPage == this.value - 1,
                nextActive: NumberPage == this.value + 1,
                disabled: this.isDisabledItem(NumberPage),
                loading: this.isLoadingItem(NumberPage)
            },
            on: {
                click: function (evt) {
                    _this.setValuePage(NumberPage);
                }
            }
        }, this.buttonsDotted ? '' : "" + NumberPage);
        return button;
    };
    VsPagination.prototype.renderButtons = function (array) {
        var _this = this;
        var buttons = [];
        array.forEach(function (item) {
            if (item === '...>' || item === '<...') {
                buttons.push(_this.renderDotted(item));
            }
            else {
                buttons.push(_this.renderButton(item));
            }
        });
        return buttons;
    };
    VsPagination.prototype.getButtons = function (start, end) {
        if (start === void 0) { start = 1; }
        if (end === void 0) { end = 6; }
        var buttons = [];
        for (start > 0 ? start : 1; start <= end; start++) {
            buttons.push(start);
        }
        return buttons;
    };
    Object.defineProperty(VsPagination.prototype, "isMobile", {
        get: function () {
            var isMobile = false;
            if (!this.$isServer) {
                if (window.innerWidth < 600) {
                    isMobile = true;
                }
            }
            return isMobile;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VsPagination.prototype, "getPages", {
        get: function () {
            var length = Number(this.length);
            var max = this.isMobile ? 5 : this.max;
            var even = max % 2 === 0 ? 1 : 0;
            var prevRange = Math.floor(max / 2);
            var nextRange = length - prevRange + 1 + even;
            if (this.value >= prevRange && this.value <= nextRange && !this.buttonsDotted) {
                var start = this.value - prevRange + 2;
                var end = this.value + prevRange - 2 - even;
                return this.renderButtons(__spreadArrays([1, '<...'], this.getButtons(start, end), ['...>', this.length]));
            }
            else if (!this.buttonsDotted && this.length > 6) {
                return this.renderButtons(__spreadArrays(this.getButtons(1, prevRange), [
                    '...>'
                ], this.getButtons(nextRange, length)));
            }
            else if (this.buttonsDotted || this.length <= 6) {
                return this.renderButtons(__spreadArrays(this.getButtons(1, this.length == 0 ? 1 : this.length)));
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VsPagination.prototype, "getProgress", {
        get: function () {
            var percent = 0;
            percent = this.value * 100 / this.length;
            return percent;
        },
        enumerable: false,
        configurable: true
    });
    VsPagination.prototype.mounted = function () {
        this.val = this.value;
        this.handleValue(this.value, (this.val += 1));
    };
    VsPagination.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var active = h('div', {
            staticClass: 'vs-pagination__active',
            style: {
                left: this.leftActive + "px"
            },
            "class": {
                move: this.activeClassMove
            }
        }, this.buttonsDotted ? '' : this.value);
        var pagination = h('div', {
            staticClass: 'vs-pagination',
            ref: 'pagination'
        }, [
            this.getPages
        ]);
        var prev = h('button', {
            staticClass: 'vs-pagination__arrow',
            attrs: {
                disabled: this.infinite ? false : this.val <= 1
            },
            "class": [
                'prev'
            ],
            on: {
                click: function () {
                    var newVal = _this.val -= 1;
                    if (newVal > 0) {
                        _this.setValuePage(newVal);
                    }
                    else if (_this.infinite) {
                        _this.setValuePage(_this.length);
                    }
                }
            }
        }, [
            this.$slots.arrowPrev ? this.$slots.arrowPrev : h(VsIconsArrow)
        ]);
        var next = h('button', {
            staticClass: 'vs-pagination__arrow',
            attrs: {
                disabled: this.infinite ? false : this.val >= this.length
            },
            "class": [
                'next',
            ],
            on: {
                click: function () {
                    var newVal = _this.val += 1;
                    if (newVal <= _this.length) {
                        _this.setValuePage(newVal);
                    }
                    else if (_this.infinite) {
                        _this.setValuePage(1);
                    }
                }
            }
        }, [
            this.$slots.arrowNext ? this.$slots.arrowNext : h(VsIconsArrow)
        ]);
        var slot = h('div', {
            staticClass: 'vs-pagination__slot'
        }, [
            this.$slots["default"]
        ]);
        var progress = h('div', {
            staticClass: 'vs-pagination__progress'
        }, [
            h('div', {
                staticClass: 'progress',
                style: {
                    width: this.getProgress + "%"
                }
            })
        ]);
        return h('div', {
            staticClass: 'vs-pagination-content',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [
                {
                    buttonsDotted: this.buttonsDotted,
                    circle: this.circle,
                    square: this.square,
                    disabled: this.disabled,
                    notMargin: this.notMargin
                },
                (_b = {}, _b["vs-component--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _b),
                (_c = {}, _c["vs-component--danger"] = !!this.danger, _c),
                (_d = {}, _d["vs-component--warn"] = !!this.warn, _d),
                (_e = {}, _e["vs-component--success"] = !!this.success, _e),
                (_f = {}, _f["vs-component--dark"] = !!this.dark, _f),
            ]
        }, [
            (!this.onlyArrows && !this.$slots["default"]) && active,
            !this.notArrows && prev,
            this.$slots["default"] && slot,
            (!this.onlyArrows && !this.$slots["default"]) && pagination,
            !this.notArrows && next,
            this.progress && progress
        ]);
    };
    __decorate([
        Prop({})
    ], VsPagination.prototype, "value");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "infinite");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "progress");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "notMargin");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "buttonsDotted");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "notArrows");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "onlyArrows");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "circle");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "square");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsPagination.prototype, "disabled");
    __decorate([
        Prop({ "default": function () { return []; }, type: Array })
    ], VsPagination.prototype, "disabledItems");
    __decorate([
        Prop({ "default": function () { return []; }, type: Array })
    ], VsPagination.prototype, "loadingItems");
    __decorate([
        Prop({ "default": 0, type: Number })
    ], VsPagination.prototype, "length");
    __decorate([
        Prop({ "default": 9, type: Number })
    ], VsPagination.prototype, "max");
    __decorate([
        Prop({ "default": 5, type: Number })
    ], VsPagination.prototype, "dottedNumber");
    __decorate([
        Watch('length')
    ], VsPagination.prototype, "handleLength");
    __decorate([
        Watch('value')
    ], VsPagination.prototype, "handleValue");
    VsPagination = __decorate([
        Component
    ], VsPagination);
    return VsPagination;
}(VsComponent));
export default VsPagination;
