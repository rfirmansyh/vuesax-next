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
import { setColor, setVar } from '../../../util/index';
var VsLoading = /** @class */ (function (_super) {
    __extends(VsLoading, _super);
    function VsLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.type = 'default';
        _this.color = null;
        _this.background = null;
        _this.opacity = null;
        _this.percent = null;
        _this.progress = null;
        _this.scale = null;
        _this.target = null;
        _this.isVisible = false;
        return _this;
    }
    VsLoading.prototype.handleIsVisible = function () {
        var _this = this;
        this.$nextTick(function () {
            setColor('color', _this.color, _this.$el);
            setColor('background', _this.background, _this.$el);
            if (_this.opacity) {
                setVar('opacity', _this.opacity, _this.$el);
            }
        });
    };
    VsLoading.prototype.render = function (h) {
        var animation = h('div', {
            "class": ['vs-loading__load__animation']
        }, [
            h('div', {
                staticClass: 'vs-loading__load__percent'
            }, [
                this.percent
            ]),
            h('div', {
                staticClass: 'vs-loading__load__animation__1'
            }),
            h('div', {
                staticClass: 'vs-loading__load__animation__2'
            }),
            h('div', {
                staticClass: 'vs-loading__load__animation__3'
            })
        ]);
        var text = h('div', {
            "class": ['vs-loading__load__text']
        }, this.text);
        var loading = h('div', {
            "class": ['vs-loading__load'],
            style: {
                transform: "scale(" + this.scale + ")"
            }
        }, [
            animation,
            text
        ]);
        var progress = h('div', {
            "class": ['vs-loading__progress']
        }, [
            h('div', {
                staticClass: 'vs-loading__progress__bar',
                style: {
                    width: this.progress + "%"
                }
            })
        ]);
        return h('transition', {
            props: {
                name: 'loading'
            }
        }, [
            this.isVisible && h('div', {
                staticClass: 'vs-loading',
                "class": [
                    "vs-loading--" + (this.type || 'default'),
                    { 'vs-loading--target': !!this.target },
                    { 'vs-loading--background': !!this.background }
                ]
            }, [
                loading,
                this.progress && progress
            ])
        ]);
    };
    __decorate([
        Watch('isVisible')
    ], VsLoading.prototype, "handleIsVisible");
    VsLoading = __decorate([
        Component
    ], VsLoading);
    return VsLoading;
}(Vue));
export default VsLoading;
