var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var getPage = function (data, page, maxItems) {
    if (maxItems === void 0) { maxItems = 5; }
    // console.log(data)
    var max = Math.ceil(page * maxItems);
    var min = max - maxItems;
    var items = [];
    data.forEach(function (item, index) {
        if (index >= min && index < max) {
            items.push(item);
        }
    });
    return items;
};
var getLength = function (data, maxItems) {
    if (maxItems === void 0) { maxItems = 5; }
    var length = Math.ceil(data.length / maxItems);
    return length;
};
var checkAll = function (selected, data) {
    if (selected.length !== data.length) {
        selected = [];
        data.forEach(function (item) {
            selected.push(item);
        });
        return selected;
    }
    else {
        return [];
    }
};
var getSearch = function (data, search) {
    if (search === void 0) { search = ''; }
    function flattenDeep(val) {
        return Object.values(val || []).reduce(function (acc, val) { return (typeof val === 'object') ?
            acc.concat(flattenDeep(val)) :
            acc.concat(val); }, []);
    }
    function getValues(obj) {
        return flattenDeep(obj).filter(function (item) {
            return (typeof item === 'string') || (typeof item === 'number');
        });
    }
    function normalize(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
    var searchNormalize = normalize(search);
    return data.filter(function (item) {
        return normalize(getValues(item).toString()).indexOf(searchNormalize) != -1;
    });
};
var sortData = function (evt, data, sortKey, type) {
    data = __spreadArrays(data).sort(returnOriginalIndex);
    var sortType = type || 'desc';
    var el = evt.target;
    if (el.dataset["sortType" + sortKey] == 'desc') {
        sortType = 'asc';
    }
    else if (el.dataset["sortType" + sortKey] == 'asc') {
        sortType = null;
    }
    if (sortType == 'desc') {
        data.map(function (item, i) {
            item["vsOriginalIndex" + sortKey] = i;
        });
    }
    el.dataset["sortType" + sortKey] = sortType;
    el.dataset['sortType'] = sortType;
    el.dataset['sortKey'] = "sortType" + sortKey;
    var parent = el.closest('.vs-table__tr');
    var ths = parent.querySelectorAll('th.sort');
    ths.forEach(function (th) {
        if (th != el) {
            th.dataset.sortType = null;
            th.dataset[th.dataset["sortKey"]] = null;
        }
    });
    function compare(a, b) {
        if (a[sortKey] < b[sortKey]) {
            return sortType !== 'desc' ? 1 : -1;
        }
        if (a[sortKey] > b[sortKey]) {
            return sortType !== 'desc' ? -1 : 1;
        }
        return 0;
    }
    function returnOriginalIndex(a, b) {
        return a["vsOriginalIndex" + sortKey] - b["vsOriginalIndex" + sortKey];
    }
    return sortType !== null ? __spreadArrays(data).sort(compare) : __spreadArrays(data).sort(returnOriginalIndex);
};
export { getPage, getLength, checkAll, getSearch, sortData };
