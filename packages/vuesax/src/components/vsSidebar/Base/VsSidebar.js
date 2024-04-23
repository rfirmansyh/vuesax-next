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
import { Component, Prop, Watch } from 'vue-property-decorator';
import VsComponent from '../../../mixins/component';
import { setColor } from '../../../util/index';
var VsSidebar = /** @class */ (function (_super) {
    __extends(VsSidebar, _super);
    function VsSidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.staticWidth = 260;
        _this.forceExpand = false;
        _this.reduceInternal = false;
        return _this;
    }
    VsSidebar.prototype.handleOpen = function (val) {
        var _this = this;
        if (val) {
            setTimeout(function () {
                window.addEventListener('click', _this.clickCloseSidebar);
            }, 200);
        }
        else {
            window.removeEventListener('click', this.clickCloseSidebar);
        }
    };
    VsSidebar.prototype.handleReduce = function (val) {
        this.reduceInternal = val;
        var el = this.$el;
        if (val) {
            el.style.width = '50px';
        }
        else {
            el.style.width = this.staticWidth + "px";
        }
    };
    VsSidebar.prototype.handleReduceInternal = function (val) {
        var el = this.$el;
        if (val) {
            el.style.width = '50px';
        }
        else {
            el.style.width = this.staticWidth + "px";
        }
    };
    VsSidebar.prototype.handleBackground = function () {
        setColor('background', this.background, this.$el, true);
    };
    Object.defineProperty(VsSidebar.prototype, "getValue", {
        get: function () {
            return this.value;
        },
        enumerable: false,
        configurable: true
    });
    VsSidebar.prototype.clickCloseSidebar = function (evt) {
        if (!evt.target.closest('.vs-sidebar-content')) {
            this.$emit('update:open', false);
        }
    };
    VsSidebar.prototype.handleClickItem = function (id) {
        this.$emit('input', id);
    };
    VsSidebar.prototype.mounted = function () {
        this.staticWidth = this.$el.offsetWidth;
        this.reduceInternal = this.reduce;
        if (this.background !== 'background') {
            setColor('background', this.background, this.$el, true);
        }
        if (this.textWhite) {
            setColor('text', '#fff', this.$el, true);
        }
    };
    VsSidebar.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = this;
        var logo = h('div', {
            staticClass: 'vs-sidebar__logo'
        }, [
            this.$slots.logo
        ]);
        var header = h('div', {
            staticClass: 'vs-sidebar__header'
        }, [
            this.$slots.header
        ]);
        var footer = h('div', {
            staticClass: 'vs-sidebar__footer'
        }, [
            this.$slots.footer
        ]);
        var sidebar = h('div', {
            staticClass: 'vs-sidebar'
        }, [
            this.$slots["default"]
        ]);
        return h('div', {
            staticClass: 'vs-sidebar-content',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [{
                    reduce: this.reduceInternal,
                    open: this.open,
                    notLineActive: this.notLineActive,
                    square: this.square,
                    notShadow: this.notShadow,
                    textWhite: this.textWhite,
                    relative: this.relative,
                    absolute: this.absolute,
                    right: this.right
                }, (_b = {}, _b["vs-component--primary"] = !!this.primary, _b), (_c = {}, _c["vs-component--danger"] = !!this.danger, _c), (_d = {}, _d["vs-component--warn"] = !!this.warn, _d), (_e = {}, _e["vs-component--success"] = !!this.success, _e), (_f = {}, _f["vs-component--dark"] = !!this.dark, _f), (_g = {}, _g["vs-component--is-color"] = !!this.isColor, _g),],
            on: {
                mouseenter: function () {
                    if (_this.hoverExpand) {
                        _this.reduceInternal = false;
                    }
                },
                mouseleave: function () {
                    if (_this.hoverExpand) {
                        _this.reduceInternal = true;
                    }
                }
            }
        }, [
            this.$slots.logo && logo,
            this.$slots.header && header,
            sidebar,
            this.$slots.footer && footer
        ]);
    };
    __decorate([
        Prop({})
    ], VsSidebar.prototype, "value");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "reduce");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "hoverExpand");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "open");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "notLineActive");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "square");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "textWhite");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "notShadow");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "relative");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "absolute");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsSidebar.prototype, "right");
    __decorate([
        Prop({ "default": 'background', type: String })
    ], VsSidebar.prototype, "background");
    __decorate([
        Watch('open')
    ], VsSidebar.prototype, "handleOpen");
    __decorate([
        Watch('reduce')
    ], VsSidebar.prototype, "handleReduce");
    __decorate([
        Watch('reduceInternal')
    ], VsSidebar.prototype, "handleReduceInternal");
    __decorate([
        Watch('background')
    ], VsSidebar.prototype, "handleBackground");
    VsSidebar = __decorate([
        Component
    ], VsSidebar);
    return VsSidebar;
}(VsComponent));
export default VsSidebar;
