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
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import VsIconsClose from '../../../icons/close';
import { setColor } from '../../../util/index';
var VsNotification = /** @class */ (function (_super) {
    __extends(VsNotification, _super);
    function VsNotification() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isVisible = false;
        _this.content = null;
        _this.title = null;
        _this.text = null;
        _this.color = null;
        _this.colorName = null;
        _this.border = null;
        _this.icon = null;
        _this.onClickClose = null;
        _this.onClick = null;
        _this.buttonClose = true;
        _this.flat = true;
        _this.onDestroy = null;
        _this.sticky = false;
        _this.square = false;
        _this.width = null;
        _this.loading = false;
        _this.progressAuto = false;
        _this.progress = 0;
        _this.duration = 4000;
        _this.countProgress = 0;
        _this.intervalProgress = null;
        _this.notPadding = null;
        _this.clickClose = false;
        _this.classNotification = null;
        return _this;
    }
    VsNotification.prototype.close = function () {
        this.isVisible = false;
    };
    VsNotification.prototype.handleClickClose = function () {
        this.isVisible = false;
    };
    VsNotification.prototype.beforeEnter = function (el) {
        el.style.maxHeight = "0px";
        el.style.padding = "0px 20px";
    };
    VsNotification.prototype.enter = function (el, done) {
        var h = el.scrollHeight;
        el.style.maxHeight = h + 40 + "px";
        if (window.innerWidth < 600) {
            el.style.padding = "15px";
        }
        else {
            el.style.padding = "20px";
        }
        done();
    };
    VsNotification.prototype.leave = function (el, done) {
        var _this = this;
        var parent = this.$el.parentNode;
        setTimeout(function () {
            done();
            if (parent.childNodes.length == 1) {
                document.body.removeChild(parent);
            }
            parent.removeChild(_this.$el);
            _this.$destroy();
            if (_this.onDestroy) {
                _this.onDestroy();
            }
        }, 250);
    };
    VsNotification.prototype.handleIsVisible = function () {
        var _this = this;
        this.$nextTick(function () {
            setColor('color', _this.color, _this.$el);
            setColor('border', _this.border, _this.$el);
        });
    };
    Object.defineProperty(VsNotification.prototype, "getProgress", {
        get: function () {
            var _this = this;
            setInterval(function () {
                _this.progress++;
            }, 1);
            return 20;
        },
        enumerable: false,
        configurable: true
    });
    VsNotification.prototype.mounted = function () {
        var _this = this;
        if (this.progressAuto) {
            this.intervalProgress = setInterval(function () {
                _this.progress++;
            }, (this.duration / 100));
        }
    };
    VsNotification.prototype.beforeDestroy = function () {
        clearInterval(this.intervalProgress);
    };
    VsNotification.prototype.render = function (h) {
        var _this = this;
        var title = h('header', {
            staticClass: 'vs-notification__content__header'
        }, [
            h('h4', {
                domProps: {
                    innerHTML: this.title
                }
            })
        ]);
        var text = h('div', {
            staticClass: 'vs-notification__content__text'
        }, [
            h('p', {
                domProps: {
                    innerHTML: this.text
                }
            })
        ]);
        var content = h('div', {
            staticClass: 'vs-notification__content'
        }, [
            this.title && title,
            this.text && text,
            this.content && h(this.content)
        ]);
        var icon = h('div', {
            staticClass: 'vs-notification__icon',
            domProps: {
                innerHTML: this.icon
            }
        });
        var closeBtn = h('button', {
            staticClass: 'vs-notification__close',
            on: {
                click: this.handleClickClose
            }
        }, [
            h(VsIconsClose, {
                props: {
                    hover: 'less'
                }
            })
        ]);
        var loading = h('div', {
            staticClass: 'vs-notification__loading'
        });
        var progress = h('div', {
            staticClass: 'vs-notification__progress',
            style: {
                width: this.progress + "%"
            }
        });
        return h('transition', {
            props: {
                name: 'notification'
            },
            on: {
                beforeEnter: this.beforeEnter,
                enter: this.enter,
                leave: this.leave
            }
        }, [
            this.isVisible && h('div', {
                staticClass: 'vs-notification',
                "class": [
                    { 'vs-notification--color': this.color },
                    { 'vs-notification--border': this.border },
                    { 'vs-notification--icon': this.icon },
                    { 'vs-notification--onClick': this.onClick },
                    { 'vs-notification--onClickClose': this.onClickClose },
                    { 'vs-notification--flat': this.flat },
                    { 'vs-notification--sticky': this.sticky },
                    { 'vs-notification--square': this.square },
                    { 'vs-notification--width-all': this.width == '100%' },
                    { 'vs-notification--width-auto': this.width == 'auto' },
                    { 'vs-notification--loading': this.loading },
                    { 'vs-notification--notPadding': this.notPadding },
                    "vs-notification--" + this.colorName,
                    this.classNotification
                ],
                on: {
                    click: function () {
                        if (_this.onClick) {
                            _this.onClick();
                        }
                        if (_this.clickClose) {
                            _this.close();
                            if (_this.onClickClose) {
                                _this.onClickClose();
                            }
                        }
                    }
                }
            }, [
                (!this.loading && this.icon) && icon,
                !this.loading && content,
                this.buttonClose && closeBtn,
                this.loading && loading,
                progress
            ])
        ]);
    };
    __decorate([
        Watch('isVisible')
    ], VsNotification.prototype, "handleIsVisible");
    VsNotification = __decorate([
        Component
    ], VsNotification);
    return VsNotification;
}(Vue));
export default VsNotification;
