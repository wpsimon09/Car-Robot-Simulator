import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/modelLoader.js";
const SpeechGround = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  let { apiResponse } = $$props;
  if ($$props.apiResponse === void 0 && $$bindings.apiResponse && apiResponse !== void 0)
    $$bindings.apiResponse(apiResponse);
  return `<section class="flex w-[80%] h-[80%] flex-col items-center rounded-2xl "><canvas id="maincanvas" class="h-full w-full"${add_attribute("this", canvas, 0)} data-svelte-h="svelte-11v1yan"></canvas></section>`;
});
const css = {
  code: ".speak-btn.svelte-oqf1ki{background:linear-gradient(to right, #e0e0e0 50%, #75c775 50%);background-size:200% 100%;background-position:right bottom;transition:background-position 300ms ease-out}.speak-btn.svelte-oqf1ki:hover{background-position:left bottom}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let transcriptionResult = "";
  let apiResponse = [];
  $$result.css.add(css);
  return `${apiResponse.length > 0 ? `<div class="w-full h-full flex flex-col items-center justify-center"><a class="speak-btn p-2 w-20 text-zinc-900 shadow-2xl duration-300 rounded-lg text-center  svelte-oqf1ki" href="/" data-svelte-h="svelte-1hhsevv">Draw</a> <h1 class="text-white">Speech: ${escape(transcriptionResult)}</h1> ${validate_component(SpeechGround, "SpeechGround").$$render($$result, { apiResponse }, {}, {})}</div>` : `<p data-svelte-h="svelte-qdsr2u">Loading...</p>`}`;
});
export {
  Page as default
};
