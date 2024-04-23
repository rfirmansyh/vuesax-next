import './style.sass';
import component from './VsDialog';
component.install = function (vue) {
    vue.component('vs-dialog', component);
};
if (typeof window !== 'undefined' && window.Vue) {
    component.install(window.Vue);
}
export default component;
