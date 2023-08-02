import {
  defineCustomElement as VueDefineCustomElement,
  h,
  createApp,
  getCurrentInstance,
} from 'vue';

const nearestElement = (el: HTMLElement) => {
  while (el?.nodeType !== 1) el = el.parentElement;
  return el;
};

export const defineCustomElement = (component: any) =>
  VueDefineCustomElement({
    setup() {
      const app = createApp(component);
      app.mixin({
        mounted() {
          const insertStyles = (styles: any[]) => {
            if (styles?.length) {
              this.__style = document.createElement('style');
              this.__style.innerText = styles.join().replace(/\n/g, '');
              nearestElement(this.$el).prepend(this.__style);
            }
          };

          insertStyles(this.$?.type.styles);
          if (this.$options.components) {
            const components = Object.values(this.$options.components) as any;
            for (const comp of components) {
              insertStyles(comp.styles);
            }
          }
        },
        unmounted() {
          this.__style?.remove();
        },
      });

      const inst = getCurrentInstance();
      Object.assign(inst.appContext, app._context);

      return () => h(component);
    },
  });
