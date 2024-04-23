import './style.sass';
import component from './VsTable';
component.install = function (vue) {
    vue.component('vs-table', component);
};
if (typeof window !== 'undefined' && window.Vue) {
    component.install(window.Vue);
}
export default component;
