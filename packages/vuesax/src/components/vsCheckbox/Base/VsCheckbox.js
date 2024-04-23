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
import VsIconsCheck from '../../../icons/check';
import VsComponent from '../../../mixins/component';
var VsCheckbox = /** @class */ (function (_super) {
    __extends(VsCheckbox, _super);
    function VsCheckbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VsCheckbox.prototype.handleIndeterminate = function (val) {
        if (val) {
            this.$emit('input', true);
        }
        else {
            this.$emit('input', false);
        }
    };
    VsCheckbox.prototype.mounted = function () {
        if (this.checked && typeof this.value == 'boolean') {
            this.$emit('input', true);
        }
    };
    Object.defineProperty(VsCheckbox.prototype, "isChecked", {
        get: function () {
            var _this = this;
            var isChecked = false;
            if (this.value) {
                if (typeof this.value == 'boolean') {
                    isChecked = this.value;
                }
                else if (typeof this.value == 'object' && this.value !== null) {
                    var array = this.value;
                    var containValue = array.indexOf(this.val) === -1 &&
                        JSON.stringify(array).indexOf(JSON.stringify(this.val)) === -1;
                    var indexVal_1 = 0;
                    array.forEach(function (item, index) {
                        if (JSON.stringify(item) == JSON.stringify(_this.val)) {
                            indexVal_1 = index;
                        }
                    });
                    if (containValue) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            else {
                isChecked = false;
            }
            return isChecked;
        },
        enumerable: false,
        configurable: true
    });
    VsCheckbox.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var InputCheckbox = h('input', {
            staticClass: 'vs-checkbox',
            attrs: __assign(__assign({}, this.$attrs), { type: 'checkbox', id: this._uid }),
            domProps: {
                checked: this.checkedForce || this.isChecked
            },
            on: __assign(__assign({}, this.$listeners), { input: function (evt) {
                    if (typeof _this.value == 'boolean') {
                        _this.$emit('input', !_this.value);
                    }
                    else if (typeof _this.value == 'object' && _this.value !== null) {
                        var array = _this.value;
                        var containValue = array.indexOf(_this.val) === -1 &&
                            JSON.stringify(array).indexOf(JSON.stringify(_this.val)) === -1;
                        var indexVal_2 = 0;
                        array.forEach(function (item, index) {
                            if (JSON.stringify(item) == JSON.stringify(_this.val)) {
                                indexVal_2 = index;
                            }
                        });
                        if (containValue) {
                            array.push(_this.val);
                        }
                        else {
                            array.splice(indexVal_2, 1);
                        }
                        _this.$emit('input', array);
                    }
                    else {
                        if (_this.val !== _this.value) {
                            _this.$emit('input', _this.val);
                        }
                        else {
                            _this.$emit('input', _this.notValue || null);
                        }
                    }
                    _this.$emit('mousedown', evt);
                }, blur: function (evt) {
                    _this.$emit('blur', evt);
                } })
        });
        var checkbox = h('div', {
            staticClass: 'vs-checkbox-mask'
        }, [
            !this.$slots.icon && h(VsIconsCheck, {
                props: {
                    indeterminate: this.indeterminate
                }
            }),
            this.$slots.icon
        ]);
        var label = h('label', {
            staticClass: 'vs-checkbox-label',
            "class": [
                {
                    lineThrough: this.lineThrough
                }
            ],
            attrs: {
                "for": this._uid
            }
        }, [
            this.$slots["default"]
        ]);
        var conCheckbox = h('div', {
            staticClass: 'vs-checkbox-con'
        }, [
            InputCheckbox,
            checkbox
        ]);
        return h('div', {
            staticClass: 'vs-checkbox-content',
            style: (_a = {},
                _a['--vs-color'] = this.color ? this.getColor : '',
                _a),
            "class": [
                { 'vs-checkbox--checked': this.isChecked },
                { 'vs-checkbox--disabled': this.$attrs.hasOwnProperty('disabled') },
                { 'vs-checkbox--loading': this.loading },
                { 'vs-checkbox--label-before': this.labelBefore },
                (_b = {}, _b["vs-component--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _b),
                (_c = {}, _c["vs-component--danger"] = !!this.danger, _c),
                (_d = {}, _d["vs-component--warn"] = !!this.warn, _d),
                (_e = {}, _e["vs-component--success"] = !!this.success, _e),
                (_f = {}, _f["vs-component--dark"] = !!this.dark, _f),
            ]
        }, [
            conCheckbox,
            this.$slots["default"] && label
        ]);
    };
    __decorate([
        Prop({ "default": '' })
    ], VsCheckbox.prototype, "value");
    __decorate([
        Prop({ "default": '' })
    ], VsCheckbox.prototype, "val");
    __decorate([
        Prop({ "default": '' })
    ], VsCheckbox.prototype, "notValue");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsCheckbox.prototype, "indeterminate");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsCheckbox.prototype, "lineThrough");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsCheckbox.prototype, "checked");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsCheckbox.prototype, "checkedForce");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsCheckbox.prototype, "loading");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsCheckbox.prototype, "labelBefore");
    __decorate([
        Watch('indeterminate')
    ], VsCheckbox.prototype, "handleIndeterminate");
    VsCheckbox = __decorate([
        Component
    ], VsCheckbox);
    return VsCheckbox;
}(VsComponent));
export default VsCheckbox;
