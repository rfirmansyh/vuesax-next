import './style.sass';
import component from './VsAvatar';
component.install = function (vue) {
    vue.component('vs-avatar', component);
};
if (typeof window !== 'undefined' && window.Vue) {
    component.install(window.Vue);
}
export default component;
