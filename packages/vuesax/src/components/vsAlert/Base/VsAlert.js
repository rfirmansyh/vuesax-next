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
import VsIconsClose from '../../../icons/close';
import VsIconsPlus from '../../../icons/plus';
import VsComponent from '../../../mixins/component';
var VsAlert = /** @class */ (function (_super) {
    __extends(VsAlert, _super);
    function VsAlert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VsAlert.prototype.handleWatchPage = function () {
        var _this = this;
        var content = this.$refs.content;
        content.style.minHeight = content.scrollHeight + 'px';
        this.$nextTick(function () {
            var el = _this.$el;
            el.style.height = _this.$el.scrollHeight - 1 + 'px';
        });
    };
    Object.defineProperty(VsAlert.prototype, "getTotalPages", {
        get: function () {
            var keys = Object.keys(this.$slots).filter(function (item) {
                return item.indexOf('page') !== -1;
            });
            return keys.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VsAlert.prototype, "getPages", {
        get: function () {
            var _this = this;
            var keys = Object.keys(this.$slots).filter(function (item) {
                return item.indexOf('page') !== -1;
            });
            var values = [];
            keys.forEach(function (item) {
                values.push(_this.page == item.split('-')[1] && _this.$slots[item]);
            });
            return values;
        },
        enumerable: false,
        configurable: true
    });
    VsAlert.prototype.mounted = function () {
        if (this.$el && this.$refs.content) {
            var el = this.$el;
            el.style.height = this.$el.scrollHeight - 1 + 'px';
            var content = this.$refs.content;
            content.style.minHeight = content.scrollHeight + 'px';
        }
    };
    VsAlert.prototype.handleHiddenContent = function (val) {
        var _this = this;
        if (!this.value) {
            return;
        }
        var el = this.$el;
        var content = this.$refs.content;
        if (!val) {
            el.style.height = 'auto';
            setTimeout(function () {
                el.style.height = _this.$el.scrollHeight - 1 + 'px';
            }, 250);
        }
        else {
            el.style.height = this.$el.scrollHeight - content.scrollHeight + 'px';
        }
    };
    VsAlert.prototype.beforeEnter = function (el) {
        el.style.height = 0;
    };
    VsAlert.prototype.enter = function (el, done) {
        var h = el.scrollHeight;
        el.style.height = h - 1 + 'px';
        done();
    };
    VsAlert.prototype.leave = function (el, done) {
        el.style.minHeight = '0px';
        el.style.height = '0px';
    };
    VsAlert.prototype.handleClickClose = function () {
        this.$emit('input', !this.value);
    };
    VsAlert.prototype.handleClickHidden = function () {
        this.$emit('update:hiddenContent', !this.hiddenContent);
    };
    VsAlert.prototype.handleClickPrevPage = function () {
        if (this.page > 1) {
            this.$emit('update:page', Number(this.page) - 1);
        }
    };
    VsAlert.prototype.handleClickNextPage = function () {
        if (this.page < this.getTotalPages) {
            this.$emit('update:page', Number(this.page) + 1);
        }
    };
    VsAlert.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var icon = h('div', {
            staticClass: 'vs-alert__icon',
            ref: 'icon'
        }, [
            this.$slots.icon
        ]);
        var contentText = h('div', {
            staticClass: 'vs-alert__content__text',
            ref: 'text'
        }, __spreadArrays([
            this.$slots["default"]
        ], this.getPages));
        var content = h('transition', {
            on: {
                beforeEnter: this.beforeEnter,
                enter: this.enter,
                leave: this.leave
            }
        }, [!this.hiddenContent &&
                h('div', {
                    staticClass: 'vs-alert__content',
                    ref: 'content'
                }, [contentText])
        ]);
        var title = h('div', {
            staticClass: 'vs-alert__title',
            "class": {
                'vs-alert__title--clickHidden': typeof this.hiddenContent === 'boolean'
            },
            on: {
                click: this.handleClickHidden
            }
        }, [
            this.$slots.title,
            !this.closable && typeof this.hiddenContent === 'boolean' && h(VsIconsPlus, {
                props: {
                    less: !this.hiddenContent
                },
                on: {
                    click: this.handleClickHidden
                }
            })
        ]);
        var closeBtn = h('button', {
            staticClass: 'vs-alert__close',
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
        var pagination = h('div', {
            staticClass: 'vs-alert__pagination'
        }, [
            h('button', {
                on: {
                    click: this.handleClickPrevPage
                }
            }, '<'),
            h('span', this.page + " / " + this.getTotalPages),
            h('button', {
                on: {
                    click: this.handleClickNextPage
                }
            }, '>')
        ]);
        var footer = h('div', {
            staticClass: 'vs-alert__footer'
        }, [
            this.$slots.footer
        ]);
        var progress = h('div', {
            staticClass: 'vs-alert__progress'
        }, [
            h('div', {
                staticClass: 'vs-alert__progress__bar',
                style: {
                    width: this.progress + "%"
                }
            })
        ]);
        var render = h('div', {
            staticClass: 'vs-alert',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [
                (_b = {}, _b["vs-alert--solid"] = !!this.solid, _b),
                (_c = {}, _c["vs-alert--border"] = !!this.border, _c),
                (_d = {}, _d["vs-alert--shadow"] = !!this.shadow, _d),
                (_e = {}, _e["vs-alert--gradient"] = !!this.gradient, _e),
                (_f = {}, _f["vs-alert--flat"] = !!this.flat, _f),
                (_g = {}, _g["vs-alert--relief"] = !!this.relief, _g),
                (_h = {}, _h["vs-alert--pages"] = this.getPages.length > 0, _h),
                (_j = {}, _j["vs-component--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _j),
                (_k = {}, _k["vs-component--danger"] = !!this.danger, _k),
                (_l = {}, _l["vs-component--warn"] = !!this.warn, _l),
                (_m = {}, _m["vs-component--success"] = !!this.success, _m),
                (_o = {}, _o["vs-component--dark"] = !!this.dark, _o),
            ]
        }, [
            this.$slots.icon && icon,
            this.$slots.title && title,
            content,
            this.closable && closeBtn,
            this.$slots.footer && footer,
            !!this.progress && progress,
            this.getTotalPages > 0 && pagination
        ]);
        return h('transition', {
            on: {
                beforeEnter: this.beforeEnter,
                enter: this.enter,
                leave: this.leave
            }
        }, [this.value && render]);
    };
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsAlert.prototype, "solid");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsAlert.prototype, "border");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsAlert.prototype, "shadow");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsAlert.prototype, "gradient");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsAlert.prototype, "flat");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsAlert.prototype, "relief");
    __decorate([
        Prop({ "default": true })
    ], VsAlert.prototype, "value");
    __decorate([
        Prop({ type: Boolean, "default": null })
    ], VsAlert.prototype, "hiddenContent");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsAlert.prototype, "closable");
    __decorate([
        Prop({ type: [Number, String], "default": 0 })
    ], VsAlert.prototype, "progress");
    __decorate([
        Prop({ type: [Number, String], "default": 0 })
    ], VsAlert.prototype, "page");
    __decorate([
        Watch('page')
    ], VsAlert.prototype, "handleWatchPage");
    __decorate([
        Watch('hiddenContent')
    ], VsAlert.prototype, "handleHiddenContent");
    VsAlert = __decorate([
        Component
    ], VsAlert);
    return VsAlert;
}(VsComponent));
export default VsAlert;
