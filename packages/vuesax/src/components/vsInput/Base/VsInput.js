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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from 'vue-property-decorator';
import VsComponent from '../../../mixins/component';
var VsInput = /** @class */ (function (_super) {
    __extends(VsInput, _super);
    function VsInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isVisiblePassword = false;
        return _this;
    }
    Object.defineProperty(VsInput.prototype, "getId", {
        get: function () {
            return "vs-input--" + (this.$attrs.id || this._uid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VsInput.prototype, "hasColor", {
        get: function () {
            return (this.color || this.primary || this.danger || this.success || this.dark || this.warn);
        },
        enumerable: false,
        configurable: true
    });
    VsInput.prototype.beforeEnter = function (el) {
        el.style.height = 0;
    };
    VsInput.prototype.enter = function (el, done) {
        var h = el.scrollHeight;
        el.style.height = h - 1 + 'px';
        done();
    };
    VsInput.prototype.leave = function (el, done) {
        el.style.minHeight = '0px';
        el.style.height = '0px';
    };
    VsInput.prototype.getMessage = function (type) {
        return this.$createElement('transition', {
            on: {
                beforeEnter: this.beforeEnter,
                enter: this.enter,
                leave: this.leave
            }
        }, [
            !!this.$slots["message-" + type] && this.$createElement('div', {
                staticClass: 'vs-input__message',
                "class": ["vs-input__message--" + type]
            }, [
                this.$slots["message-" + type]
            ])
        ]);
    };
    VsInput.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var _this = this;
        var input = h('input', {
            staticClass: 'vs-input',
            domProps: {
                value: this.value
            },
            "class": [
                (_a = {}, _a['vs-input--has-icon'] = !!this.$slots.icon, _a),
                (_b = {}, _b['vs-input--has-icon--after'] = !!this.iconAfter, _b)
            ],
            on: __assign(__assign({}, this.$listeners), { input: function (evt) {
                    _this.$emit('input', evt.target.value);
                } }),
            attrs: __assign(__assign({}, this.$attrs), { placeholder: '', id: this.getId, type: this.visiblePassword ? 'text' : this.$attrs.type })
        });
        var label = h('label', {
            attrs: {
                "for": this.getId
            },
            "class": [
                'vs-input__label',
                { 'vs-input__label--placeholder': this.labelPlaceholder },
                { 'vs-input__label--hidden': this.value !== '' || this.$attrs.type == 'date' || this.$attrs.type == 'time' },
                { 'vs-input__label--label': this.label }
            ]
        }, [
            this.label || this.$attrs.placeholder || this.labelPlaceholder
        ]);
        var placeholder = h('label', {
            attrs: {
                "for": this.getId
            },
            "class": [
                'vs-input__label',
                { 'vs-input__label--hidden': this.value !== '' },
            ]
        }, [
            this.$attrs.placeholder
        ]);
        var icon = h('span', {
            staticClass: 'vs-input__icon',
            "class": [
                { 'vs-input__icon--after': this.iconAfter },
                { 'vs-input__icon--click': !!this.$listeners['click-icon'] }
            ],
            on: {
                click: function (evt) {
                    _this.$emit('click-icon', evt.target.value);
                }
            }
        }, [
            this.$slots.icon
        ]);
        var messageSuccess = this.getMessage('success');
        var messageDanger = this.getMessage('danger');
        var messageWarn = this.getMessage('warn');
        var messagePrimary = this.getMessage('primary');
        var progressBar = h('div', {
            staticClass: 'vs-input__progress',
            "class": [
                { 'vs-input__progress--danger': this.progress < 33 },
                { 'vs-input__progress--warn': this.progress < 66 && this.progress > 33 },
                { 'vs-input__progress--success': this.progress > 66 }
            ]
        }, [
            h('div', {
                staticClass: 'vs-input__progress__bar',
                style: {
                    width: this.progress + "%"
                }
            })
        ]);
        var loading = h('div', {
            staticClass: 'vs-input__loading'
        });
        var effects = h('div', {
            staticClass: 'vs-input__affects'
        }, [
            h('div', {
                staticClass: 'vs-input__affects__1'
            }),
            h('div', {
                staticClass: 'vs-input__affects__2'
            }),
            h('div', {
                staticClass: 'vs-input__affects__3'
            }),
            h('div', {
                staticClass: 'vs-input__affects__4'
            })
        ]);
        var inputContent = h('div', {
            staticClass: 'vs-input-content',
            "class": [
                (_c = {}, _c["vs-input-content--has-color"] = this.hasColor, _c),
                (_d = {}, _d["vs-input-content--has-label"] = this.label || this.labelPlaceholder, _d)
            ]
        }, [
            input,
            this.label && placeholder,
            label,
            this.$slots.icon && icon,
            this.loading && loading,
            effects
        ]);
        return h('div', {
            staticClass: 'vs-input-parent',
            style: (_e = {},
                _e['--vs-color'] = this.color ? this.getColor : '',
                _e),
            "class": [
                "vs-input-parent--state-" + this.state,
                { 'vs-input-parent--border': !!this.border },
                { 'vs-input-parent--shadow': !!this.shadow },
                (_f = {}, _f["vs-input-content--has-label"] = this.label || this.labelPlaceholder, _f),
                { block: this.block },
                { transparent: this.transparent },
                { textWhite: this.textWhite },
                { square: this.square },
                (_g = {}, _g["vs-component--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _g),
                (_h = {}, _h["vs-component--danger"] = !!this.danger, _h),
                (_j = {}, _j["vs-component--warn"] = !!this.warn, _j),
                (_k = {}, _k["vs-component--success"] = !!this.success, _k),
                (_l = {}, _l["vs-component--dark"] = !!this.dark, _l),
                (_m = {}, _m["vs-component--is-color"] = !!this.isColor, _m),
            ]
        }, [
            inputContent,
            this.progress > 0 && progressBar,
            messageSuccess,
            messageDanger,
            messageWarn,
            messagePrimary
        ]);
    };
    __decorate([
        Prop({ "default": '' })
    ], VsInput.prototype, "value");
    __decorate([
        Prop({ "default": '' })
    ], VsInput.prototype, "labelPlaceholder");
    __decorate([
        Prop({ "default": '' })
    ], VsInput.prototype, "label");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "block");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "iconAfter");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "visiblePassword");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "loading");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsInput.prototype, "color");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsInput.prototype, "state");
    __decorate([
        Prop({ type: Number, "default": 0 })
    ], VsInput.prototype, "progress");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "border");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "shadow");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "transparent");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "textWhite");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsInput.prototype, "square");
    VsInput = __decorate([
        Component
    ], VsInput);
    return VsInput;
}(VsComponent));
export default VsInput;
