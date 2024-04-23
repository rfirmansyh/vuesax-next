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
var VsNavbar = /** @class */ (function (_super) {
    __extends(VsNavbar, _super);
    function VsNavbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftLine = 0;
        _this.widthLine = 0;
        _this.scrollTop = 0;
        _this.collapsedWidth = 0;
        _this.hidden = false;
        _this.shadowActive = false;
        _this.paddingScrollActive = false;
        _this.lineNotTransition = false;
        _this.collapsedForced = false;
        return _this;
    }
    VsNavbar.prototype.handleShadowScroll = function () {
        this.handleScroll();
    };
    VsNavbar.prototype.setModel = function (id) {
        this.$emit('input', id);
    };
    VsNavbar.prototype.setLeftLine = function (left, transition) {
        var _this = this;
        if (transition === void 0) { transition = true; }
        if (!transition) {
            this.lineNotTransition = true;
        }
        else {
            this.lineNotTransition = false;
        }
        this.$nextTick(function () {
            _this.leftLine = left;
        });
    };
    VsNavbar.prototype.setWidthLine = function (width) {
        var _this = this;
        this.$nextTick(function () {
            _this.widthLine = width;
        });
    };
    VsNavbar.prototype.scroll = function (evt) {
        var scrollTop = this.targetScroll ? document.querySelector(this.targetScroll).scrollTop : window.pageYOffset;
        if (this.hideScroll) {
            if (Math.sign(scrollTop - this.scrollTop) === 1) {
                this.hidden = true;
            }
            else {
                this.hidden = false;
            }
        }
        if (this.shadowScroll) {
            if (scrollTop > 0) {
                this.shadowActive = true;
            }
            else {
                this.shadowActive = false;
            }
        }
        if (this.paddingScroll) {
            if (scrollTop > 0) {
                this.paddingScrollActive = true;
            }
            else {
                this.paddingScrollActive = false;
            }
        }
        this.scrollTop = scrollTop;
    };
    VsNavbar.prototype.handleScroll = function () {
        if (this.hideScroll || this.shadowScroll || this.paddingScroll) {
            if (this.targetScroll) {
                var scrollElement = document.querySelector(this.targetScroll);
                scrollElement.addEventListener('scroll', this.scroll);
            }
            else {
                window.addEventListener('scroll', this.scroll);
            }
        }
    };
    VsNavbar.prototype.handleResize = function () {
        var active = this.$el.querySelector('.vs-navbar__item.active');
        if (active) {
            this.setLeftLine(active.offsetLeft, false);
        }
        else {
            this.widthLine = 0;
        }
        var navbar = this.$el;
        if (this.leftCollapsed || this.centerCollapsed || this.rightCollapsed) {
            if (navbar.offsetWidth < this.collapsedWidth) {
                this.collapsedForced = true;
            }
        }
        if (this.collapsedForced) {
            this.$emit('collapsed', true);
        }
        else {
            this.$emit('collapsed', false);
        }
        if (navbar.offsetWidth < this.collapsedWidth) {
            this.$emit('collapsed', true);
        }
        else {
            this.$emit('collapsed', false);
            this.collapsedForced = false;
        }
    };
    VsNavbar.prototype.mounted = function () {
        var _this = this;
        setTimeout(function () {
            var left = _this.$refs.left;
            var center = _this.$refs.center;
            var right = _this.$refs.right;
            _this.collapsedWidth = left.offsetWidth + center.offsetWidth + right.offsetWidth + 150;
            var navbar = _this.$el;
            if (navbar.offsetWidth < _this.collapsedWidth) {
                _this.collapsedForced = true;
                _this.$emit('collapsed', true);
                _this.widthLine = 0;
                _this.handleResize();
            }
        }, 150);
        this.handleScroll();
        window.addEventListener('resize', this.handleResize);
    };
    VsNavbar.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f, _g;
        var left = h('div', {
            staticClass: 'vs-navbar__left',
            ref: 'left'
        }, [
            this.$slots.left
        ]);
        var center = h('div', {
            staticClass: 'vs-navbar__center',
            ref: 'center'
        }, [
            this.$slots["default"]
        ]);
        var right = h('div', {
            staticClass: 'vs-navbar__right',
            ref: 'right'
        }, [
            this.$slots.right
        ]);
        var line = h('div', {
            staticClass: 'vs-navbar__line',
            "class": {
                notTransition: this.lineNotTransition
            },
            style: {
                left: this.leftLine + "px",
                width: this.widthLine + "px"
            }
        });
        var navbar = h('div', {
            staticClass: 'vs-navbar'
        }, [
            (this.leftCollapsed ? !this.collapsedForced : true) && left,
            (this.centerCollapsed ? !this.collapsedForced : true) && center,
            (this.rightCollapsed ? !this.collapsedForced : true) && right
        ]);
        return h('div', {
            staticClass: 'vs-navbar-content',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [{
                    fixed: this.fixed,
                    shadow: this.shadow,
                    hidden: this.hidden,
                    shadowActive: this.shadowActive,
                    textWhite: this.textWhite,
                    paddingScroll: this.paddingScroll,
                    paddingScrollActive: this.paddingScrollActive,
                    vsNavbarSquare: this.square
                }, (_b = {}, _b["vs-component--primary"] = !!this.primary, _b), (_c = {}, _c["vs-component--danger"] = !!this.danger, _c), (_d = {}, _d["vs-component--warn"] = !!this.warn, _d), (_e = {}, _e["vs-component--success"] = !!this.success, _e), (_f = {}, _f["vs-component--dark"] = !!this.dark, _f), (_g = {}, _g["vs-component--is-color"] = !!this.isColor, _g),]
        }, [
            navbar,
            !this.notLine && line
        ]);
    };
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "fixed");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "shadow");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "shadowScroll");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "hideScroll");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "textWhite");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "square");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "paddingScroll");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "notLine");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "leftCollapsed");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "centerCollapsed");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsNavbar.prototype, "rightCollapsed");
    __decorate([
        Prop({ "default": null })
    ], VsNavbar.prototype, "targetScroll");
    __decorate([
        Watch('hideScroll'),
        Watch('paddingScroll'),
        Watch('shadowScroll')
    ], VsNavbar.prototype, "handleShadowScroll");
    VsNavbar = __decorate([
        Component
    ], VsNavbar);
    return VsNavbar;
}(VsComponent));
export default VsNavbar;
