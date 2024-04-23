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
import * as _ from 'lodash';
import { Component, Prop } from 'vue-property-decorator';
import VsComponent from '../../../mixins/component';
var VsTable = /** @class */ (function (_super) {
    __extends(VsTable, _super);
    function VsTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colspan = 0;
        return _this;
    }
    // @Prop({ default: false, type: Boolean }) multiple: boolean
    VsTable.prototype.mounted = function () {
        var tds = this.$refs.thead.querySelectorAll('th');
        this.colspan = tds.length;
    };
    Object.defineProperty(VsTable.prototype, "isMultipleSelected", {
        get: function () {
            return _.isArray(this.value);
        },
        enumerable: false,
        configurable: true
    });
    VsTable.prototype.selected = function (val) {
        if (this.isMultipleSelected) {
            this.selectedMultiple(val);
        }
        else {
            this.$emit('input', val);
        }
    };
    VsTable.prototype.selectedMultiple = function (val) {
        var newVal = this.value;
        if (this.value.includes(val)) {
            newVal.splice(this.value.indexOf(val), 1);
        }
        else {
            newVal.push(val);
        }
        this.$emit('input', newVal);
    };
    VsTable.prototype.render = function (h) {
        var footer = h('footer', {
            staticClass: 'vs-table__footer'
        }, [
            this.$slots.footer
        ]);
        var header = h('header', {
            staticClass: 'vs-table__header'
        }, [
            this.$slots.header
        ]);
        var thead = h('thead', {
            ref: 'thead',
            staticClass: 'vs-table__thead'
        }, [
            this.$slots.thead
        ]);
        var notFound = h('tbody', {
            staticClass: 'vs-table_not-found'
        }, [
            h('tr', [
                h('td', {
                    attrs: {
                        colspan: this.colspan
                    }
                }, [
                    this.$slots.notFound || 'No matching records found'
                ])
            ])
        ]);
        var tbody = h('tbody', {
            staticClass: 'vs-table__tbody'
        }, [
            this.$slots.tbody,
        ]);
        var table = h('div', {
            staticClass: 'vs-table',
            "class": {
                isSelectedValue: this.value,
                striped: this.striped,
                isMultipleSelected: this.isMultipleSelected
            }
        }, [
            h('table', {}, [
                thead,
                tbody,
                notFound
            ])
        ]);
        return h('div', {
            staticClass: 'vs-table-content'
        }, [
            this.$slots.header && header,
            table,
            this.$slots.footer && footer
        ]);
    };
    __decorate([
        Prop({})
    ], VsTable.prototype, "value");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTable.prototype, "striped");
    __decorate([
        Prop({ "default": false, type: Boolean })
    ], VsTable.prototype, "loading");
    VsTable = __decorate([
        Component
    ], VsTable);
    return VsTable;
}(VsComponent));
export default VsTable;
