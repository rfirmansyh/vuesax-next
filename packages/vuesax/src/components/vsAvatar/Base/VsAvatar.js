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
import { Component, Prop, Watch } from 'vue-property-decorator';
import VsComponent from '../../../mixins/component';
import { setColor } from '../../../util/index';
var VsAvatar = /** @class */ (function (_super) {
    __extends(VsAvatar, _super);
    function VsAvatar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textLength = 0;
        _this.countPlus = 0;
        _this.index = null;
        return _this;
    }
    VsAvatar.prototype.getParent = function () {
        return this.$parent.vsAvatarGroup && this.$parent;
    };
    Object.defineProperty(VsAvatar.prototype, "getText", {
        get: function () {
            var nodeText = this.$slots.text[0];
            var text = nodeText.text.trim();
            var getLetters = [text];
            if (text.length > 5) {
                getLetters = text.split(/\s/g).map(function (item) {
                    return item[0];
                });
                this.textLength = getLetters.length;
            }
            else {
                this.textLength = getLetters[0].length;
            }
            return getLetters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VsAvatar.prototype, "isHidden", {
        get: function () {
            return this.getParent() && this.getParent().max && this.index > Number(this.getParent().max) - 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VsAvatar.prototype, "isLatest", {
        get: function () {
            return this.getParent() && this.index == Number(this.getParent().max) - 1;
        },
        enumerable: false,
        configurable: true
    });
    VsAvatar.prototype.handleSlotText = function () {
        console.log('cambio el slot');
    };
    VsAvatar.prototype.handleBadgeColor = function () {
        setColor('badge', this.badgeColor, this.$el);
        this.$el.classList.add('vs-change-color-badge');
    };
    VsAvatar.prototype.mounted = function () {
        setColor('badge', this.badgeColor, this.$el);
        this.$el.classList.add('vs-change-color-badge');
        if (this.getParent()) {
            this.index = this.getParent().avatars.length;
            this.getParent().avatars.push(this);
        }
    };
    VsAvatar.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var writing = h('div', {
            staticClass: 'vs-avatar__points'
        }, [
            h('div', {
                staticClass: 'vs-avatar__points__point'
            }),
            h('div', {
                staticClass: 'vs-avatar__points__point'
            }),
            h('div', {
                staticClass: 'vs-avatar__points__point'
            })
        ]);
        var badge = h('div', {
            staticClass: 'vs-avatar__badge',
            "class": [{
                    isSlot: this.$slots.badge,
                    writing: this.writing
                }, this.badgePosition]
        }, [
            this.writing ? writing : this.$slots.badge
        ]);
        var avatar = h('div', {
            staticClass: 'vs-avatar',
            "class": (_a = {},
                _a["vs-avatar--letter--" + this.textLength] = this.textLength > 2,
                _a)
        }, [
            this.$slots.text && this.getText,
            this.$slots["default"]
        ]);
        var loading = h('div', {
            staticClass: 'vs-avatar__loading'
        }, [
            h('div', {
                staticClass: 'vs-avatar__loading__animate'
            })
        ]);
        var latest = h('div', {
            staticClass: 'vs-avatar__latest',
            directives: [
                {
                    name: 'show',
                    value: this.getParent() && this.getParent().avatars.length - this.index - 1 != 0
                }
            ]
        }, [
            "+" + (this.getParent() && this.getParent().avatars.length - this.index - 1)
        ]);
        var icons = h('div', {
            staticClass: 'vs-avatar__icons'
        }, [
            this.$slots.icons
        ]);
        return h('div', {
            staticClass: 'vs-avatar-content',
            attrs: __assign({}, this.$attrs),
            on: __assign({}, this.$listeners),
            style: (_b = {
                    width: this.size + "px",
                    height: this.size + "px",
                    cursor: this.pointer && 'pointer'
                },
                _b['--vs-color'] = this.color ? this.getColor : '',
                _b),
            "class": [(_c = {
                        'history': this.history,
                        'history--gradient': this.historyGradient,
                        'vs-avatar-content--circle': this.circle,
                        'vs-avatar-content--square': this.square,
                        'vs-avatar-content--hidden': this.isHidden,
                        'vs-avatar-content--latest': this.isLatest,
                        'vs-avatar-content--hasIcons': this.$slots.icons
                    },
                    _c["vs-avatar-content--size"] = this.size,
                    _c), (_d = {}, _d["vs-component--primary"] = !!this.primary, _d), (_e = {}, _e["vs-component--danger"] = !!this.danger, _e), (_f = {}, _f["vs-component--warn"] = !!this.warn, _f), (_g = {}, _g["vs-component--success"] = !!this.success, _g), (_h = {}, _h["vs-component--dark"] = !!this.dark, _h), (_j = {}, _j["vs-component--is-color"] = !!this.isColor, _j),]
        }, [
            this.loading && loading,
            avatar,
            this.$slots.badge ? badge : this.badge && badge,
            this.isLatest && latest,
            this.$slots.icons && icons
        ]);
    };
    __decorate([
        Prop({ "default": null })
    ], VsAvatar.prototype, "badgePosition");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "pointer");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "circle");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "square");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "history");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "loading");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "historyGradient");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "writing");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsAvatar.prototype, "badge");
    __decorate([
        Prop({ "default": '', type: String })
    ], VsAvatar.prototype, "badgeColor");
    __decorate([
        Prop({ "default": '', type: String })
    ], VsAvatar.prototype, "size");
    __decorate([
        Watch('$slots.text')
    ], VsAvatar.prototype, "handleSlotText");
    __decorate([
        Watch('badgeColor')
    ], VsAvatar.prototype, "handleBadgeColor");
    VsAvatar = __decorate([
        Component
    ], VsAvatar);
    return VsAvatar;
}(VsComponent));
export default VsAvatar;
