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
import { insertBody, setCordsPosition } from '../../../util/index';
var VsTooltip = /** @class */ (function (_super) {
    __extends(VsTooltip, _super);
    function VsTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeTooltip = false;
        _this.isHoverTooltip = false;
        return _this;
    }
    VsTooltip.prototype.insertTooltip = function () {
        var tooltip = this.$refs.tooltip;
        if (!tooltip) {
            return;
        }
        insertBody(tooltip, document.body);
        var position = 'top';
        if (this.bottom) {
            position = 'bottom';
        }
        else if (this.left) {
            position = 'left';
        }
        else if (this.right) {
            position = 'right';
        }
        setCordsPosition(tooltip, this.$refs.content, position);
    };
    VsTooltip.prototype.handlerMouseEnter = function () {
        var _this = this;
        if (this.delay) {
            setTimeout(function () {
                _this.activeTooltip = true;
                _this.$nextTick(function () {
                    _this.insertTooltip();
                });
            }, Number(this.delay));
        }
        else {
            this.activeTooltip = true;
            this.$nextTick(function () {
                _this.insertTooltip();
            });
        }
    };
    VsTooltip.prototype.removeTooltip = function () {
        this.activeTooltip = false;
        this.$emit('input', false);
    };
    VsTooltip.prototype.handleResize = function () {
        var _this = this;
        var position = 'top';
        if (this.bottom) {
            position = 'bottom';
        }
        else if (this.left) {
            position = 'left';
        }
        else if (this.right) {
            position = 'right';
        }
        var tooltip = this.$refs.tooltip;
        if (!tooltip) {
            return;
        }
        this.$nextTick(function () {
            setCordsPosition(tooltip, _this.$refs.content, position);
        });
        for (var index = 0; index < 300; index++) {
            setTimeout(function () {
                setCordsPosition(tooltip, _this.$refs.content, position);
            }, index);
        }
    };
    VsTooltip.prototype.handleMouseDownNotHover = function (evt) {
        if (!evt.target.closest('.vs-tooltip') && !evt.target.closest('.vs-tooltip-content')) {
            this.removeTooltip();
        }
    };
    VsTooltip.prototype.handleWatchValue = function (val) {
        var _this = this;
        this.activeTooltip = val;
        if (val) {
            this.$nextTick(function () {
                _this.insertTooltip();
            });
        }
    };
    VsTooltip.prototype.mounted = function () {
        window.addEventListener('popstate', function (event) {
            var tooltips = document.querySelectorAll('.vs-tooltip');
            tooltips.forEach(function (tooltip) {
                tooltip.remove();
            });
        });
        window.addEventListener('resize', this.handleResize);
        if (this.notHover) {
            window.addEventListener('mousedown', this.handleMouseDownNotHover);
        }
        window.addEventListener('touchstart', this.handleMouseDownNotHover);
    };
    VsTooltip.prototype.beforeDestroy = function () {
        this.activeTooltip = false;
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('mousedown', this.handleMouseDownNotHover);
    };
    VsTooltip.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var loading = h('div', {
            staticClass: 'vs-tooltip__loading'
        });
        var tooltip = h('div', {
            staticClass: 'vs-tooltip',
            ref: 'tooltip',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [
                {
                    top: !this.bottom && !this.left && !this.right,
                    bottom: this.bottom,
                    left: this.left,
                    right: this.right,
                    shadow: this.shadow,
                    notArrow: this.notArrow,
                    square: this.square,
                    circle: this.circle,
                    border: this.border,
                    borderThick: this.borderThick,
                    loading: this.loading
                },
                (_b = {}, _b["vs-component--primary"] = !!this.primary, _b),
                (_c = {}, _c["vs-component--danger"] = !!this.danger, _c),
                (_d = {}, _d["vs-component--warn"] = !!this.warn, _d),
                (_e = {}, _e["vs-component--success"] = !!this.success, _e),
                (_f = {}, _f["vs-component--dark"] = !!this.dark, _f),
            ],
            on: {
                mouseenter: function () {
                    if (_this.interactivity) {
                        _this.isHoverTooltip = true;
                        _this.handlerMouseEnter();
                    }
                },
                mouseleave: function () {
                    _this.isHoverTooltip = false;
                    _this.removeTooltip();
                }
            }
        }, [
            this.$slots.tooltip,
            this.loading && loading
        ]);
        return h('div', {
            staticClass: 'vs-tooltip-content',
            ref: 'content',
            on: {
                mouseenter: function () {
                    if (!_this.notHover) {
                        _this.handlerMouseEnter();
                    }
                },
                mouseleave: function () {
                    if (!_this.notHover) {
                        if (_this.interactivity) {
                            setTimeout(function () {
                                if (!_this.isHoverTooltip) {
                                    _this.removeTooltip();
                                }
                            }, 250);
                        }
                        else {
                            _this.removeTooltip();
                        }
                    }
                }
            }
        }, [
            h('transition', {
                props: {
                    name: 'vs-tooltip'
                }
            }, [
                this.activeTooltip && tooltip,
            ]),
            this.$slots["default"]
        ]);
    };
    __decorate([
        Prop({})
    ], VsTooltip.prototype, "value");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "loading");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "bottom");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "left");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "right");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "notHover");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "shadow");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "interactivity");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "notArrow");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "square");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "circle");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "border");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTooltip.prototype, "borderThick");
    __decorate([
        Prop({ "default": null, type: String })
    ], VsTooltip.prototype, "delay");
    __decorate([
        Watch('value')
    ], VsTooltip.prototype, "handleWatchValue");
    VsTooltip = __decorate([
        Component
    ], VsTooltip);
    return VsTooltip;
}(VsComponent));
export default VsTooltip;
