import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import "../../chunks/modelLoader.js";
const css = {
  code: ".speak-btn.svelte-oqf1ki{background:linear-gradient(to right, #e0e0e0 50%, #75c775 50%);background-size:200% 100%;background-position:right bottom;transition:background-position 300ms ease-out}.speak-btn.svelte-oqf1ki:hover{background-position:left bottom}",
  map: null
};
const MainGround = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  $$result.css.add(css);
  return `<section class="flex w-[80%] h-[80%] flex-col items-center rounded-2xl "><a class="speak-btn p-2 w-20 text-zinc-900 shadow-2xl duration-300 rounded-lg text-center  svelte-oqf1ki" href="/speech" data-svelte-h="svelte-chdaqv">Speak</a> <canvas id="maincanvas" class="h-full w-full"${add_attribute("this", canvas, 0)} data-svelte-h="svelte-11v1yan"></canvas> ${``} <div class="flex flex-row itmes-center"><button id="start" class="w-20 h-20 rounded-2xl shadow-2xl hover:w-24 hover:h-24 duration-100 mt-10">${`<img src="/icons/play.png" alt="play">`}</button></div> </section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-full h-full flex flex-col items-center justify-center">${validate_component(MainGround, "MainGround").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};
