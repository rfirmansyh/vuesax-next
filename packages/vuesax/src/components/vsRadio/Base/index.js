import './style.sass';
import component from './VsRadio';
component.install = function (vue) {
    vue.component('vs-radio', component);
};
if (typeof window !== 'undefined' && window.Vue) {
    component.install(window.Vue);
}
export default component;
