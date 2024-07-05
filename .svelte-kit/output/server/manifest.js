export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","icons/metal.jpg","icons/play.png","icons/stop-button.png","models/red_lego_car.glb","textures/gravel_stones_ao_2k.jpg","textures/gravel_stones_arm_2k.jpg","textures/gravel_stones_diff_2k.jpg","textures/gravel_stones_disp_2k.jpg","textures/gravel_stones_nor_gl_2k.jpg","textures/gravel_stones_rough_2k.jpg"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".glb":"model/gltf-binary"},
	_: {
		client: {"start":"_app/immutable/entry/start.kCxuU5w-.js","app":"_app/immutable/entry/app.COrTHVMa.js","imports":["_app/immutable/entry/start.kCxuU5w-.js","_app/immutable/chunks/entry.Cra9wFfN.js","_app/immutable/chunks/scheduler.DmixjgyW.js","_app/immutable/entry/app.COrTHVMa.js","_app/immutable/chunks/scheduler.DmixjgyW.js","_app/immutable/chunks/index.BanJ8KNA.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
