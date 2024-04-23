import './style.sass';
import component from './VsPagination';
component.install = function (vue) {
    vue.component('vs-pagination', component);
};
if (typeof window !== 'undefined' && window.Vue) {
    component.install(window.Vue);
}
export default component;
