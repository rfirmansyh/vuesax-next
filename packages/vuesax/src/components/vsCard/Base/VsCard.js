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
var VsCard = /** @class */ (function (_super) {
    __extends(VsCard, _super);
    function VsCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VsCard.prototype.render = function (h) {
        var title = h('div', {
            staticClass: 'vs-card__title'
        }, [
            this.$slots.title
        ]);
        var text = h('div', {
            staticClass: 'vs-card__text'
        }, [
            this.$slots.title && title,
            this.$slots.text
        ]);
        var buttons = h('div', {
            staticClass: 'vs-card__buttons'
        }, [
            this.$slots.buttons
        ]);
        var interactions = h('div', {
            staticClass: 'vs-card__interactions'
        }, [
            this.$slots.interactions
        ]);
        var img = h('div', {
            staticClass: 'vs-card__img'
        }, [
            this.$slots.img,
            this.$slots.interactions && interactions
        ]);
        var card = h('div', {
            staticClass: 'vs-card',
            on: __assign({}, this.$listeners)
        }, [
            this.$slots.img && img,
            // this.type != 2 ? this.$slots.title : false && title,
            this.$slots.text && text,
            this.$slots.buttons && buttons
        ]);
        return h('div', {
            staticClass: 'vs-card-content',
            "class": [
                "type-" + this.type
            ]
        }, [
            card
        ]);
    };
    __decorate([
        Prop({ "default": '1', type: [String, Boolean] })
    ], VsCard.prototype, "type");
    VsCard = __decorate([
        Component
    ], VsCard);
    return VsCard;
}(VsComponent));
export default VsCard;
