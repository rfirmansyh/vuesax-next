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
import { Component, Prop } from 'vue-property-decorator';
import VsComponent from '../../../mixins/component';
var VsRadio = /** @class */ (function (_super) {
    __extends(VsRadio, _super);
    function VsRadio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VsRadio.prototype, "isChecked", {
        get: function () {
            return this.value == this.val;
        },
        enumerable: false,
        configurable: true
    });
    VsRadio.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var radioInput = h('input', {
            attrs: {
                type: 'radio',
                id: this._uid,
                value: this.val,
                name: this.name || this.value,
                checked: this.isChecked
            },
            on: {
                input: function () {
                    _this.$emit('input', _this.val);
                }
            }
        });
        var radioEffect = h('span', {
            staticClass: 'vs-radio__effect'
        }, [
            h('span', {
                staticClass: 'vs-radio__effect__icon'
            }, [
                this.$slots.icon
            ]),
            h('span', { staticClass: 'vs-radio__effect__loading' })
        ]);
        var label = h('label', {
            staticClass: 'vs-radio__label',
            attrs: {
                "for": this._uid
            }
        }, [this.$slots["default"]]);
        var radio = h('div', {
            staticClass: 'vs-radio'
        }, [
            radioInput,
            radioEffect,
        ]);
        return h('div', {
            staticClass: 'vs-radio-content',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [{
                    disabled: this.disabled,
                    loading: this.loading,
                    active: this.isChecked
                }, (_b = {}, _b["vs-component--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _b), (_c = {}, _c["vs-component--danger"] = !!this.danger, _c), (_d = {}, _d["vs-component--warn"] = !!this.warn, _d), (_e = {}, _e["vs-component--success"] = !!this.success, _e), (_f = {}, _f["vs-component--dark"] = !!this.dark, _f),]
        }, [
            this.labelBefore && label,
            radio,
            !this.labelBefore && label
        ]);
    };
    __decorate([
        Prop({})
    ], VsRadio.prototype, "value");
    __decorate([
        Prop({})
    ], VsRadio.prototype, "val");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsRadio.prototype, "name");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsRadio.prototype, "disabled");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsRadio.prototype, "loading");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsRadio.prototype, "labelBefore");
    VsRadio = __decorate([
        Component
    ], VsRadio);
    return VsRadio;
}(VsComponent));
export default VsRadio;
