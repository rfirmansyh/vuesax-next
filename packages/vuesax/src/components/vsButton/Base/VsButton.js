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
import ripple, { rippleCut, rippleReverse } from '../../../util/ripple/index';
var VsButton = /** @class */ (function (_super) {
    __extends(VsButton, _super);
    function VsButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Class = '';
        return _this;
    }
    VsButton.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        var _this = this;
        var defaultSlot = h('div', {
            staticClass: 'vs-button__content'
        }, this.$slots["default"]);
        var animateSlot = h('div', {
            staticClass: 'vs-button__animate',
            "class": [
                "vs-button__animate--" + this.animationType
            ]
        }, this.$slots.animate);
        var loadingElement = h('div', {
            staticClass: 'vs-button__loading'
        });
        var btn = h('button', {
            staticClass: 'vs-button',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [
                // `vs-button--${this.color.replace('#', '')}`,
                "vs-button--" + this.componentColor,
                "vs-button--size-" + this.size,
                (_b = {}, _b["vs-button--fff"] = this.color === '#fff', _b),
                (_c = {}, _c["vs-button--active"] = !!this.active, _c),
                (_d = {}, _d["vs-button--active-disabled"] = !!this.activeDisabled, _d),
                (_e = {}, _e["vs-button--icon"] = !!this.icon, _e),
                (_f = {}, _f["vs-button--circle"] = !!this.circle, _f),
                (_g = {}, _g["vs-button--square"] = !!this.square, _g),
                (_h = {}, _h["vs-button--loading"] = !!this.loading, _h),
                (_j = {}, _j["vs-button--upload"] = !!this.upload, _j),
                (_k = {}, _k["vs-button--block"] = !!this.block, _k),
                (_l = {}, _l["vs-button--animate"] = !!this.$slots.animate, _l),
                (_m = {}, _m["vs-button--animate-" + this.animationType] = !!this.animationType, _m),
                (_o = {}, _o["vs-button--animate-inactive"] = !!this.animateInactive, _o),
                (_p = {}, _p["vs-button--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _p),
                (_q = {}, _q["vs-button--danger"] = !!this.danger, _q),
                (_r = {}, _r["vs-button--warn"] = !!this.warn, _r),
                (_s = {}, _s["vs-button--success"] = !!this.success, _s),
                (_t = {}, _t["vs-button--dark"] = !!this.dark, _t),
                (_u = {}, _u["vs-button--default"] = !this.flat &&
                    !this.border &&
                    !this.gradient &&
                    !this.relief &&
                    !this.transparent &&
                    !this.shadow &&
                    !this.floating, _u),
                (_v = {}, _v["vs-button--flat"] = !!this.flat, _v),
                (_w = {}, _w["vs-button--border"] = !!this.border, _w),
                (_x = {}, _x["vs-button--gradient"] = !!this.gradient, _x),
                (_y = {}, _y["vs-button--relief"] = !!this.relief, _y),
                (_z = {}, _z["vs-button--transparent"] = !!this.transparent, _z),
                (_0 = {}, _0["vs-button--shadow"] = !!this.shadow, _0),
                (_1 = {}, _1["vs-button--floating"] = !!this.floating, _1),
            ],
            attrs: __assign({}, this.$attrs),
            on: __assign(__assign({}, this.$listeners), { mousedown: function (evt) {
                    // ripple effect
                    if (_this.ripple === 'reverse') {
                        rippleReverse(evt);
                    }
                    else if (_this.ripple === 'cut') {
                        rippleCut(evt);
                    }
                    else {
                        if (_this.flat) {
                            ripple(evt, (_this.componentColor || _this.color || 'primary') &&
                                !_this.active &&
                                document.activeElement !== _this.$el ? 'inherit' :
                                null, _this.flat && !_this.active && document.activeElement !== _this.$el);
                        }
                        else {
                            ripple(evt, null, false);
                        }
                    }
                }, click: function (evt) {
                    if (_this.to) {
                        _this.$router.push(_this.to);
                    }
                    else if (_this.href) {
                        window.open(_this.href, _this.blank && '_blank' || '_self');
                        // console.log(this.blank && '_self')
                    }
                    _this.$emit('click', evt);
                } })
        }, [defaultSlot, this.$slots.animate ? animateSlot : null, this.loading ? loadingElement : null]);
        return btn;
    };
    __decorate([
        Prop({ type: String, "default": '' })
    ], VsButton.prototype, "ripple");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "activeDisabled");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "flat");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "border");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "gradient");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "relief");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "transparent");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "shadow");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "floating");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "icon");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "circle");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "square");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsButton.prototype, "size");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "loading");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "upload");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "block");
    __decorate([
        Prop({ type: String, "default": '' })
    ], VsButton.prototype, "animationType");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "animateInactive");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsButton.prototype, "to");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsButton.prototype, "href");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsButton.prototype, "blank");
    VsButton = __decorate([
        Component
    ], VsButton);
    return VsButton;
}(VsComponent));
export default VsButton;
