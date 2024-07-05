

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.CZT7u9nR.js","_app/immutable/chunks/scheduler.DmixjgyW.js","_app/immutable/chunks/index.BanJ8KNA.js","_app/immutable/chunks/entry.Cra9wFfN.js"];
export const stylesheets = [];
export const fonts = [];
