import './style.sass';
import component from './VsNavbar';
component.install = function (vue) {
    vue.component('vs-navbar', component);
};
if (typeof window !== 'undefined' && window.Vue) {
    component.install(window.Vue);
}
export default component;
