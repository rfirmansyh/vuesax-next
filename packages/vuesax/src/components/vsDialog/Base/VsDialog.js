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
import VsIconsClose from '../../../icons/close';
import VsComponent from '../../../mixins/component';
import { insertBody } from '../../../util/index';
var VsDialog = /** @class */ (function (_super) {
    __extends(VsDialog, _super);
    function VsDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rebound = false;
        return _this;
    }
    VsDialog.prototype.esc = function (evt) {
        if (evt.which == 27 && !this.preventClose) {
            this.$emit('input', false);
            this.$emit('close');
        }
    };
    VsDialog.prototype.addEsc = function () {
        window.addEventListener('keydown', this.esc);
    };
    VsDialog.prototype.insertDialog = function () {
        var _this = this;
        this.addEsc();
        this.$nextTick(function () {
            var dialog = _this.$refs['dialog-content'];
            if (!dialog) {
                return;
            }
            insertBody(dialog, document.body);
        });
    };
    VsDialog.prototype.handleWatchValue = function (val) {
        if (val) {
            this.insertDialog();
            if (this.overflowHidden) {
                document.body.style.overflow = 'hidden';
            }
        }
        else {
            if (this.overflowHidden) {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', this.esc);
            }
        }
    };
    VsDialog.prototype.beforeDestroy = function () {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
    };
    VsDialog.prototype.render = function (h) {
        var _this = this;
        var header = h('header', {
            staticClass: 'vs-dialog__header'
        }, [
            this.$slots.header
        ]);
        var content = h('div', {
            staticClass: 'vs-dialog__content',
            "class": {
                notFooter: !this.$slots.footer
            }
        }, [
            this.$slots["default"]
        ]);
        var footer = h('footer', {
            staticClass: 'vs-dialog__footer'
        }, [
            this.$slots.footer
        ]);
        var close = h('button', {
            staticClass: 'vs-dialog__close',
            on: {
                click: function (evt) {
                    _this.$emit('input', !_this.value);
                    _this.$emit('close');
                }
            }
        }, [
            h(VsIconsClose, {
                props: {
                    hover: 'x'
                }
            })
        ]);
        var loading = h('div', {
            staticClass: 'vs-dialog__loading'
        }, [
            h('div', {
                staticClass: 'vs-dialog__loading__load'
            })
        ]);
        var dialog = h('div', {
            staticClass: 'vs-dialog',
            style: {
                width: this.width
            },
            "class": {
                'vs-dialog--fullScreen': this.fullScreen,
                'vs-dialog--rebound': this.rebound,
                'vs-dialog--notPadding': this.notPadding,
                'vs-dialog--square': this.square,
                'vs-dialog--autoWidth': this.autoWidth,
                'vs-dialog--scroll': this.scroll,
                'vs-dialog--loading': this.loading,
                'vs-dialog--notCenter': this.notCenter
            }
        }, [
            this.loading && loading,
            !this.notClose && close,
            this.$slots.header && header,
            content,
            this.$slots.footer && footer
        ]);
        var dialogContent = h('div', {
            staticClass: 'vs-dialog-content',
            ref: 'dialog-content',
            "class": {
                blur: this.blur,
                fullScreen: this.fullScreen
            },
            on: {
                click: function (evt) {
                    if (!evt.target.closest('.vs-dialog') && !_this.preventClose) {
                        _this.$emit('input', !_this.value);
                        _this.$emit('close');
                    }
                    if (_this.preventClose && !evt.target.closest('.vs-dialog')) {
                        _this.rebound = true;
                        setTimeout(function () {
                            _this.rebound = false;
                        }, 300);
                    }
                }
            }
        }, [
            dialog
        ]);
        return h('transition', {
            props: {
                name: 'vs-dialog'
            }
        }, [this.value && dialogContent]);
    };
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "value");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "loading");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "fullScreen");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "notClose");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "preventClose");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "notPadding");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "overflowHidden");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "blur");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "square");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "autoWidth");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "scroll");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "notCenter");
    __decorate([
        Prop({ "default": null, type: String })
    ], VsDialog.prototype, "width");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsDialog.prototype, "routerClose");
    __decorate([
        Watch('value')
    ], VsDialog.prototype, "handleWatchValue");
    VsDialog = __decorate([
        Component
    ], VsDialog);
    return VsDialog;
}(VsComponent));
export default VsDialog;
