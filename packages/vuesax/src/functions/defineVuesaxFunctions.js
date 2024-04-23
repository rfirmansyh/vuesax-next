import { setColor } from '../util/index';
import { setTheme, toggleTheme } from './toggleTheme/index';
import loading from './vsLoading/Base/index';
import notification from './vsNotification/Base/index';
import { checkAll, getLength, getPage, getSearch, sortData } from './vsTable/index';
export default (function (Vue) {
    var vsFunctions = {
        setColor: function (color, val) {
            setColor(color, val, document.body);
        },
        loading: loading,
        toggleTheme: toggleTheme,
        setTheme: setTheme,
        notification: notification,
        getPage: getPage,
        getLength: getLength,
        checkAll: checkAll,
        getSearch: getSearch,
        sortData: sortData
    };
    Vue.prototype.$vs = vsFunctions;
});
