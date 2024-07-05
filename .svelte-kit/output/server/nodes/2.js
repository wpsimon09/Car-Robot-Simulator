

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Bhzmjxe4.js","_app/immutable/chunks/scheduler.DmixjgyW.js","_app/immutable/chunks/index.BanJ8KNA.js","_app/immutable/chunks/modelLoader.BuleLtHr.js"];
export const stylesheets = ["_app/immutable/assets/2.Cm20_FKu.css"];
export const fonts = [];
