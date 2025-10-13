class EM_Base
{
	BaseOptionsColorpicker = {
		swatches: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0", "#f0cccc"],
		defaultFormat: 'hex',
		submitMode: 'instant',
		showClearButton: true,
		dismissOnOutsideClick: true,
	}


	UUID_V4() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
			.replace(/[xy]/g, function (c) {
					const r = Math.random() * 16 | 0, 
							v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
			});
	}
}