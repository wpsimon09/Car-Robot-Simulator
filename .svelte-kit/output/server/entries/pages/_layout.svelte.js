import { c as create_ssr_component } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col w-screen h-screen bg-zinc-800"><h1 class="w-full text-center text-2xl text-white" data-svelte-h="svelte-3p1whk">Create a path for your car</h1> <main class="w-full h-full relative ">${slots.default ? slots.default({}) : ``}</main> <footer data-svelte-h="svelte-owhq1p"></footer> </div>`;
});
export {
  Layout as default
};
