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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Component, Prop, Watch } from 'vue-property-decorator';
import VsIconsArrow from '../../../icons/arrow';
import VsIconsClose from '../../../icons/close';
import VsComponent from '../../../mixins/component';
import { insertBody, setCords } from '../../../util/index';
var VsSelect = /** @class */ (function (_super) {
    __extends(VsSelect, _super);
    function VsSelect() {
        // @Provide()
        // select: any = this
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderSelect = false;
        _this.activeOptions = false;
        _this.valueLabel = null;
        _this.hoverOption = -1;
        _this.uids = [];
        _this.childOptions = [];
        _this.targetSelect = false;
        _this.targetSelectInput = false;
        _this.targetClose = false;
        _this.activeFilter = false;
        _this.textFilter = null;
        _this.childVisibles = 0;
        _this.isSelect = true;
        return _this;
    }
    VsSelect.prototype.insertOptions = function () {
        var options = this.$refs.options;
        insertBody(options, document.body);
        setCords(options, this.$refs.select);
    };
    VsSelect.prototype.clickOption = function (value, label) {
        var _this = this;
        if (this.multiple) {
            var oldVal = __spreadArrays(this.value);
            if (oldVal.indexOf(value) == -1) {
                oldVal.push(value);
            }
            else {
                oldVal.splice(oldVal.indexOf(value), 1);
            }
            this.$emit('input', oldVal);
        }
        else {
            this.$emit('input', value);
            this.valueLabel = label;
        }
        setTimeout(function () {
            if (_this.multiple && _this.activeOptions) {
                _this.$refs.chips.focus();
            }
        }, 10);
        if (!this.multiple) {
            this.handleBlur();
        }
    };
    VsSelect.prototype.setHover = function () {
        var _this = this;
        var index = -1;
        this.childOptions.forEach(function (item, i) {
            if (item.value == _this.value) {
                index = i;
            }
        });
        this.hoverOption = index;
    };
    VsSelect.prototype.getValue = function () {
        var _this = this;
        var options = this.childOptions;
        var filterOptions = options.filter(function (option) {
            return typeof _this.value == 'number' ? _this.value == option.value : _this.value.indexOf(option.value) !== -1;
        });
        var label = [];
        filterOptions.forEach(function (item) {
            label.push({
                label: item.label,
                value: item.value
            });
        });
        label.sort(function (a, b) {
            return _this.value.indexOf(a.value) - _this.value.indexOf(b.value);
        });
        this.valueLabel = label;
    };
    Object.defineProperty(VsSelect.prototype, "getValueLabel", {
        get: function () {
            var valueLabel = this.valueLabel;
            var labels = [];
            if (Array.isArray(valueLabel)) {
                valueLabel.forEach(function (item) {
                    labels.push(item.label);
                });
            }
            else {
                labels = valueLabel;
            }
            return labels;
        },
        enumerable: false,
        configurable: true
    });
    VsSelect.prototype.handleBlur = function () {
        var _this = this;
        this.$nextTick(function () {
            _this.activeOptions = false;
        });
        this.$emit('blur');
        this.setHover();
        window.removeEventListener('click', this.handleWindowClick);
        if (this.activeOptions) {
            this.textFilter = '';
            if (!this.multiple) {
                this.activeFilter = false;
            }
        }
    };
    Object.defineProperty(VsSelect.prototype, "getChips", {
        get: function () {
            var _this = this;
            var chip = function (item, isCollapse) {
                return _this.$createElement('span', {
                    staticClass: 'vs-select__chips__chip',
                    attrs: {
                        'data-value': item.value
                    },
                    "class": [
                        {
                            isCollapse: isCollapse
                        }
                    ]
                }, [
                    item.label,
                    !isCollapse && _this.$createElement('span', {
                        staticClass: 'vs-select__chips__chip__close',
                        on: {
                            click: function () {
                                setTimeout(function () {
                                    _this.targetClose = false;
                                }, 100);
                                if (!_this.activeOptions) {
                                    _this.$refs.chips.blur();
                                    if (_this.filter) {
                                        _this.$refs.chips_input.blur();
                                    }
                                }
                                _this.clickOption(item.value, item.label);
                            },
                            mouseleave: function () {
                                _this.targetClose = false;
                            },
                            mouseenter: function () {
                                _this.targetClose = true;
                            }
                        }
                    }, [_this.$createElement(VsIconsClose, {
                            props: {
                                hover: 'less'
                            }
                        })])
                ]);
            };
            var chips = [];
            if (Array.isArray(this.valueLabel)) {
                this.valueLabel.forEach(function (item) {
                    chips.push(chip(item, false));
                });
            }
            if (this.collapseChips) {
                chips = [chips[0], chips.length > 1 && chip({ label: "+" + (chips.length - 1), value: null }, true)];
            }
            return chips;
        },
        enumerable: false,
        configurable: true
    });
    VsSelect.prototype.blur = function (evt) {
        if (!this.multiple) {
            this.handleBlur();
        }
        else {
            if (!evt.relatedTarget) {
                this.handleBlur();
            }
            else if (!this.targetSelectInput || !this.targetSelect && !this.activeOptions) {
                this.handleBlur();
            }
        }
        if (this.filter) {
            this.activeFilter = false;
        }
    };
    VsSelect.prototype.handleKeydown = function (evt) {
        var _this = this;
        var options = this.$refs.options;
        for (var index = 0; index < 300; index++) {
            setTimeout(function () {
                setCords(options, _this.$refs.select);
            }, index);
        }
        if (evt.code == 'ArrowDown') {
            evt.preventDefault();
            if (this.hoverOption < this.childOptions.length - 1) {
                this.hoverOption++;
            }
            else {
                this.hoverOption = 0;
            }
        }
        else if (evt.code == 'ArrowUp') {
            evt.preventDefault();
            if (this.hoverOption > 0) {
                this.hoverOption--;
            }
            else {
                this.hoverOption = this.childOptions.length - 1;
            }
        }
        else if (evt.code == 'Enter') {
            evt.preventDefault();
            if (this.hoverOption !== -1) {
                if (!this.childOptions[this.hoverOption].disabled) {
                    this.clickOption(this.childOptions[this.hoverOption].value, this.childOptions[this.hoverOption].label);
                    if (!this.multiple) {
                        this.handleBlur();
                        this.$refs.input.blur();
                    }
                }
            }
        }
        if (this.hoverOption !== -1) {
            this.$refs.content.scrollTop = this.childOptions[this.hoverOption].$el.offsetTop - 66;
        }
    };
    Object.defineProperty(VsSelect.prototype, "notData", {
        get: function () {
            var childOptions = [];
            this.$slots["default"].forEach(function (option) {
                if (option.tag) {
                    if (!option.componentInstance.hiddenOption) {
                        childOptions.push(option);
                    }
                }
            });
            childOptions = childOptions.filter(function (item) {
                if (item.optionGroup) {
                    return !item.componentInstance.hiddenOptionGroup;
                }
                return true;
            });
            return childOptions.length == 0;
        },
        enumerable: false,
        configurable: true
    });
    VsSelect.prototype.handleWindowClick = function (evt) {
        var _this = this;
        if (!this.targetSelectInput) {
            this.handleBlur();
        }
        if (this.filter && !this.activeOptions) {
            this.activeFilter = false;
        }
        if (evt.target == this.$refs.input && this.activeOptions && !this.filter) {
            this.handleBlur();
            setTimeout(function () {
                _this.$refs.input.blur();
            }, 100);
        }
    };
    VsSelect.prototype.handleResize = function () {
        var _this = this;
        var options = this.$refs.options;
        if (!options) {
            return;
        }
        this.$nextTick(function () {
            setCords(options, _this.$refs.select);
        });
        for (var index = 0; index < 300; index++) {
            setTimeout(function () {
                setCords(options, _this.$refs.select);
            }, index);
        }
    };
    VsSelect.prototype.handleScroll = function () {
        var options = this.$refs.options;
        if (options) {
            setCords(options, this.$refs.select);
        }
    };
    VsSelect.prototype.beforeEnter = function (el) {
        el.style.height = 0;
    };
    VsSelect.prototype.enter = function (el, done) {
        var h = el.scrollHeight;
        el.style.height = h - 1 + 'px';
        done();
    };
    VsSelect.prototype.leave = function (el, done) {
        el.style.minHeight = '0px';
        el.style.height = '0px';
    };
    VsSelect.prototype.getMessage = function (type) {
        return this.$createElement('transition', {
            on: {
                beforeEnter: this.beforeEnter,
                enter: this.enter,
                leave: this.leave
            }
        }, [
            !!this.$slots["message-" + type] && this.$createElement('div', {
                staticClass: 'vs-select__message',
                "class": ["vs-select__message--" + type]
            }, [
                this.$slots["message-" + type]
            ])
        ]);
    };
    VsSelect.prototype.handleTextFilter = function (val) {
        if (val) {
            if (this.$refs.placeholder) {
                this.$refs.placeholder.style.transition = '0s';
            }
        }
        else {
            if (this.$refs.placeholder) {
                this.$refs.placeholder.style.transition = '';
            }
        }
    };
    VsSelect.prototype.handleValue = function (val) {
        var _this = this;
        this.getValue();
        setTimeout(function () {
            _this.$emit('change', val);
        }, 10);
        if (this.multiple) {
            this.$nextTick(function () {
                var h = _this.$refs.chips.scrollHeight;
                _this.$refs.input.style.height = h + "px";
                var options = _this.$refs.options;
                if (_this.activeOptions) {
                    _this.$nextTick(function () {
                        setCords(options, _this.$refs.select);
                    });
                }
            });
        }
        if (val) {
            if (this.$refs.placeholder) {
                this.$refs.placeholder.style.transition = '0s';
            }
        }
        else {
            if (this.$refs.placeholder) {
                this.$refs.placeholder.style.transition = '';
            }
        }
    };
    VsSelect.prototype.handleActive = function (val) {
        var _this = this;
        this.$nextTick(function () {
            if (val) {
                _this.insertOptions();
            }
        });
        this.uids = [];
    };
    VsSelect.prototype.mounted = function () {
        this.getValue();
        this.renderSelect = true;
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
    };
    VsSelect.prototype.beforeDestroy = function () {
        this.handleBlur();
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
    };
    VsSelect.prototype.render = function (h) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var _this = this;
        var options = h('transition', {
            props: {
                name: 'vs-select'
            }
        }, [this.activeOptions && h('div', {
                staticClass: 'vs-select__options',
                ref: 'options',
                style: (_a = {},
                    _a['--vs-color'] = this.color ? this.getColor : '',
                    _a),
                "class": [{
                        isColorDark: this.isColorDark
                    }, (_b = {}, _b["vs-component--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _b), (_c = {}, _c["vs-component--danger"] = !!this.danger, _c), (_d = {}, _d["vs-component--warn"] = !!this.warn, _d), (_e = {}, _e["vs-component--success"] = !!this.success, _e), (_f = {}, _f["vs-component--dark"] = !!this.dark, _f)],
                on: {
                    mouseleave: function () {
                        _this.targetSelect = false;
                        _this.targetSelectInput = false;
                    },
                    mouseenter: function () {
                        _this.targetSelect = true;
                        _this.targetSelectInput = true;
                    }
                }
            }, [
                h('div', {
                    staticClass: 'vs-select__options__content',
                    ref: 'content'
                }, [
                    this.notData && h('div', {
                        staticClass: 'vs-select__options__content__not-data'
                    }, [
                        this.$slots.notData || 'No data available'
                    ]),
                    this.$slots["default"]
                ])
            ])
        ]);
        var input = h('input', {
            attrs: {
                readonly: !this.filter && true,
                id: !this.multiple && this._uid
            },
            staticClass: 'vs-select__input',
            ref: 'input',
            domProps: {
                value: this.activeFilter ? this.textFilter : this.getValueLabel
            },
            "class": [
                {
                    multiple: this.multiple,
                    simple: !this.multiple && !this.filter
                }
            ],
            on: __assign(__assign({}, this.$listeners), { keydown: this.handleKeydown, focus: function (evt) {
                    _this.activeOptions = true;
                    _this.$emit('focus', evt);
                    if (_this.filter) {
                        _this.activeFilter = true;
                    }
                    window.addEventListener('mousedown', _this.handleWindowClick);
                }, 
                // blur: this.blur,
                input: function (evt) {
                    _this.textFilter = evt.target.value;
                } })
        }, this.$slots["default"]);
        var chips = h('button', {
            staticClass: 'vs-select__chips',
            ref: 'chips',
            on: {
                keydown: this.handleKeydown,
                focus: function (evt) {
                    if (!_this.targetClose) {
                        _this.activeOptions = true;
                        _this.$emit('focus', evt);
                    }
                    if (_this.filter && _this.multiple) {
                        _this.$refs.chips_input.focus();
                    }
                },
                blur: this.blur
            }
        }, __spreadArrays(this.getChips, [
            this.filter && h('input', {
                staticClass: 'vs-select__chips__input',
                ref: 'chips_input',
                attrs: {
                    placeholder: this.placeholder,
                    id: this._uid
                },
                domProps: {
                    value: this.textFilter
                },
                on: {
                    // keydown: this.handleKeydown,
                    focus: function (evt) {
                        if (!_this.targetClose) {
                            _this.activeOptions = true;
                            _this.$emit('focus', evt);
                        }
                    },
                    blur: this.blur,
                    input: function (evt) {
                        _this.textFilter = evt.target.value;
                    }
                }
            })
        ]));
        var icon = h(VsIconsArrow, {
            on: {
                click: function () {
                    if (_this.activeOptions) {
                        _this.activeOptions = false;
                    }
                    else {
                        _this.$refs.input.focus();
                    }
                }
            }
        });
        var label = h('label', {
            staticClass: 'vs-select__label',
            attrs: {
                "for": this._uid
            },
            "class": {
                'vs-select__label--placeholder': this.labelPlaceholder,
                'vs-select__label--label': this.label,
                'vs-select__label--hidden': this.value
            }
        }, [this.labelPlaceholder || this.label]);
        var placeholder = h('label', {
            staticClass: 'vs-select__label',
            ref: 'placeholder',
            attrs: {
                "for": this._uid
            },
            "class": {
                'vs-select__label--hidden': this.value || this.textFilter
            }
        }, [this.placeholder]);
        var loading = h('div', {
            staticClass: 'vs-select__loading'
        });
        var messageSuccess = this.getMessage('success');
        var messageDanger = this.getMessage('danger');
        var messageWarn = this.getMessage('warn');
        var messagePrimary = this.getMessage('primary');
        var selectContent = h('div', {
            staticClass: 'vs-select',
            ref: 'select',
            "class": [
                "vs-select--state-" + this.state,
                {
                    'vs-select--disabled': this.disabled,
                    'activeOptions': this.activeOptions,
                    'loading': this.loading
                }
            ],
            on: {
                mouseleave: function (evt) {
                    if (evt.relatedTarget !== _this.$refs.options) {
                        _this.targetSelectInput = false;
                        _this.targetSelect = false;
                    }
                },
                mouseenter: function () {
                    _this.targetSelectInput = true;
                }
            }
        }, [
            input,
            (!this.multiple || this.label) && label,
            (!this.multiple && !this.labelPlaceholder) && placeholder,
            this.multiple && chips,
            options,
            this.loading && loading,
            icon
        ]);
        return h('div', {
            staticClass: 'vs-select-content',
            style: (_g = {},
                _g['--vs-color'] = this.color ? this.getColor : '',
                _g),
            "class": [{
                    block: this.block
                }, (_h = {}, _h["vs-component--primary"] = !this.danger && !this.success && !this.warn && !this.dark && !this.color, _h), (_j = {}, _j["vs-component--danger"] = !!this.danger, _j), (_k = {}, _k["vs-component--warn"] = !!this.warn, _k), (_l = {}, _l["vs-component--success"] = !!this.success, _l), (_m = {}, _m["vs-component--dark"] = !!this.dark, _m), (_o = {}, _o[this.customClass] = !!this.customClass, _o)]
        }, [
            selectContent,
            messageSuccess,
            messageDanger,
            messageWarn,
            messagePrimary
        ]);
    };
    __decorate([
        Prop({})
    ], VsSelect.prototype, "value");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsSelect.prototype, "multiple");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsSelect.prototype, "filter");
    __decorate([
        Prop({ type: String, "default": '' })
    ], VsSelect.prototype, "placeholder");
    __decorate([
        Prop({ type: String, "default": '' })
    ], VsSelect.prototype, "labelPlaceholder");
    __decorate([
        Prop({ type: String, "default": '' })
    ], VsSelect.prototype, "label");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsSelect.prototype, "disabled");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsSelect.prototype, "collapseChips");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsSelect.prototype, "loading");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsSelect.prototype, "state");
    __decorate([
        Prop({ type: String, "default": null })
    ], VsSelect.prototype, "customClass");
    __decorate([
        Prop({ type: Boolean, "default": false })
    ], VsSelect.prototype, "block");
    __decorate([
        Watch('textFilter')
    ], VsSelect.prototype, "handleTextFilter");
    __decorate([
        Watch('value')
    ], VsSelect.prototype, "handleValue");
    __decorate([
        Watch('activeOptions')
    ], VsSelect.prototype, "handleActive");
    VsSelect = __decorate([
        Component
    ], VsSelect);
    return VsSelect;
}(VsComponent));
export default VsSelect;
