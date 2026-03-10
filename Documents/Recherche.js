const SVGs = {
	pdf: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 213.51 262.5" width="27" height="33"><path fill="#ff2116" d="M27.11,0A27.16,27.16,0,0,0,0,27.12V235.38A27.15,27.15,0,0,0,27.11,262.5H186.36a27.15,27.15,0,0,0,27.11-27.12V64.13a22.38,22.38,0,0,0-1.75-9.89,27.38,27.38,0,0,0-5.36-7.76l0,0L166.82,7.69l-.07-.06a31,31,0,0,0-8.37-5.36,30.55,30.55,0,0,0-12-2.26H27.11Z" /><path fill="#f5f5f5" d="M27.11,8.91H146.6a25.64,25.64,0,0,1,8.27,1.54,22.94,22.94,0,0,1,5.76,3.64l0,0,39.41,38.67a21.55,21.55,0,0,1,3.53,5.08,19.18,19.18,0,0,1,1,5.89,1.15,1.15,0,0,1,0,.19V235.38a18.06,18.06,0,0,1-18.2,18.21H27.11a18.07,18.07,0,0,1-18.2-18.21V27.12A18.07,18.07,0,0,1,27.11,8.91Z" /><path fill="#ff2116" d="M148.1,109.4L148.1,126.8L65.4,126.8L65.4,109.4L49.5,109.4L49.5,142.7L164,142.7L164,109.4Z M107.1,119.6L138.8,64.6L123,64.6L123,39.2L91.2,39.2L91.2,64.6L75.4,64.6Z" /><path fill="#2c2c2c" d="M63.73,184.67h10a26.93,26.93,0,0,1,7.74.92,9,9,0,0,1,5,4,13,13,0,0,1,2,7.39,13.41,13.41,0,0,1-1.64,6.83,9.66,9.66,0,0,1-4.45,4.12c-1.84.84-4.69,1.27-8.54,1.27H70.38v15.69H63.73Zm6.65,5.15v14h3.3q4.41,0,6.09-1.65t1.71-5.36a8.06,8.06,0,0,0-1.12-4.47,4.58,4.58,0,0,0-2.47-2.12,15.25,15.25,0,0,0-4.21-.42Z" /><path fill="#2c2c2c" d="M93.55,184.67h9q6.55,0,10.48,2.33a14.43,14.43,0,0,1,5.94,6.92,24.78,24.78,0,0,1,2,10.18,28.35,28.35,0,0,1-1.82,10.51,16.68,16.68,0,0,1-5.54,7.42q-3.71,2.83-10.59,2.83H93.55ZM100.2,190v29.53H103q5.81,0,8.42-4T114,204.78Q114,190,103,190Z" /><path fill="#2c2c2c" d="M127.43,184.67h22.32V190H134.09v12h12.54v5.33H134.09v17.52h-6.66Z" /></svg>',
	docx: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27 33" width="27" height="33"><path fill="#295497" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0l-5-4.9l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0L3.5,0L3.5,0z"/><path fill="#F5F5F5" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2c0.3,0.1,0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6c0.1,0.2,0.1,0.5,0.1,0.7c0,0,0,0,0,0v21.6c0,1.3-1,2.3-2.3,2.3c0,0,0,0,0,0h-20c-1.3,0-2.3-1-2.3-2.3c0,0,0,0,0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1C3.5,1.1,3.5,1.1,3.5,1.1z"/><path fill="#295497" d="M18.7,13.8v2.2H8.3v-2.2h-2v4.2h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><path fill="#2C2C2C" d="M6.4,23h1.3c1.3,0,1.8,0.9,1.8,2.5c0,1.8-0.5,2.7-1.9,2.7H6.4V23z M7.3,27.6h0.4c0.8,0,1.1-0.6,1.1-2c0-1.3-0.3-1.8-1.1-1.8H7.3V27.6z"/><path fill="#2C2C2C" d="M13.4,25.6c0,1.9-0.5,2.7-1.7,2.7c-1.1,0-1.6-0.9-1.6-2.7c0-1.8,0.6-2.6,1.7-2.6C12.9,23,13.4,23.8,13.4,25.6z M11,25.6c0,1.3,0.2,2.1,0.8,2.1c0.6,0,0.8-0.7,0.8-2.1c0-1.3-0.2-1.9-0.8-1.9C11.2,23.7,11,24.3,11,25.6z"/><path fill="#2C2C2C" d="M17.1,26.8c0,0.3-0.1,1.6-1.5,1.6c-1.5,0-1.6-1.4-1.6-2.7c0-1.6,0.5-2.7,1.7-2.7c1.3,0,1.4,1.2,1.5,1.6h-0.8c0-0.2,0-0.9-0.7-0.9c-0.7,0-0.8,0.9-0.8,2c0,1,0.1,2,0.8,2c0.6,0,0.7-0.7,0.7-0.9H17.1z"/><path fill="#2C2C2C" d="M19.8,28.3l-0.8-2h0l-0.9,2h-0.9l1.3-2.7L17.3,23h0.9l0.8,1.8l0,0l0.8-1.8h0.9l-1.2,2.5l1.3,2.8H19.8z"/></svg>',
	xlsx: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26.8 33" width="27" height="33"><path fill="#4C9D71" d="M3.4,0C1.5,0,0,1.5,0,3.4v26.2C0,31.5,1.5,33,3.4,33h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0l-5-4.9l0,0c-0.3-0.3-0.7-0.5-1.1-0.7S18.9,0,18.4,0C18.4,0,3.4,0,3.4,0z"/><path fill="#F5F5F5" d="M3.4,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6c0,1.3-1,2.3-2.3,2.3h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.1,2.2,2.1,1.1,3.4,1.1C3.4,1.1,3.4,1.1,3.4,1.1z"/><path fill="#4C9D71" d="M18.6,13.8V16H8.2v-2.2h-2V18h14.4v-4.2H18.6z M13.4,15l4-6.9h-2V4.9h-4v3.2h-2C9.4,8.1,13.4,15,13.4,15z"/><polygon fill="#2D2D2D" points="9,23 8,23 7.1,24.9 6.1,23 5.1,23 6.6,25.7 5.1,28.4 6.1,28.4 7.1,26.6 8,28.4 9,28.4 7.5,25.7 	"/><polygon fill="#2D2D2D" points="10.3,23 9.4,23 9.4,28.4 12.7,28.4 12.7,27.5 10.3,27.5 	"/><path fill="#2D2D2D" d="M14.9,23.8c0.2,0,0.3,0,0.5,0.1c0.2,0.1,0.3,0.2,0.5,0.4l0.1,0.1l0.6-0.7l-0.1-0.1c-0.2-0.2-0.5-0.4-0.7-0.5c-0.3-0.1-0.5-0.2-0.9-0.2c-0.5,0-0.8,0.1-1.1,0.4c-0.3,0.3-0.4,0.6-0.4,1.1c0,0.4,0.1,0.7,0.3,0.9c0.2,0.2,0.4,0.4,0.8,0.6l0.8,0.4c0.2,0.1,0.4,0.3,0.4,0.6c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.6,0.2c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.4-0.1-0.7-0.3l-0.1-0.1l-0.1,0.9l0.1,0c0.2,0.1,0.4,0.2,0.7,0.2c0.2,0,0.5,0.1,0.8,0.1c0.6,0,1-0.1,1.3-0.4c0.3-0.3,0.4-0.6,0.4-1.1c0-0.4-0.1-0.7-0.3-0.9c-0.2-0.2-0.5-0.5-0.8-0.6L14.7,25c-0.1-0.1-0.3-0.2-0.3-0.3c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.2,0.1-0.4,0.2-0.5C14.6,23.9,14.7,23.8,14.9,23.8z"/><polygon fill="#2D2D2D" points="19.3,25.7 20.8,23 19.8,23 18.8,24.9 17.9,23 16.9,23 18.4,25.7 16.9,28.4 17.9,28.4 18.8,26.6 19.7,28.3 19.8,28.4 20.8,28.4 	"/></svg>',
	odt: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27 33" width="27" height="33"><path style="fill:#fb6400;" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2 c-0.2-0.4-0.4-0.7-0.7-1l0,0L21,1l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0H3.5L3.5,0z"/><path style="fill:#F5F5F5;" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6 c0,1.3-1,2.3-2.3,2.3l0,0h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1L3.5,1.1z"/><path style="fill:#fb6400;" d="M18.7,13.8V16H8.3v-2.2h-2V18h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><path style="fill:#2C2C2C;" d="M11.8,23h1.3c1.3,0,1.8,0.9,1.8,2.5c0,1.8-0.5,2.7-1.9,2.7h-1.2V23z M12.7,27.6h0.4c0.8,0,1.1-0.6,1.1-2 c0-1.3-0.3-1.8-1.1-1.8h-0.4V27.6z"/><path style="fill:#2C2C2C;" d="M11.2,25.6c0,1.9-0.5,2.7-1.7,2.7c-1.1,0-1.6-0.9-1.6-2.7c0-1.8,0.6-2.6,1.7-2.6S11.2,23.8,11.2,25.6z M8.8,25.6c0,1.3,0.2,2.1,0.8,2.1s0.8-0.7,0.8-2.1c0-1.3-0.2-1.9-0.8-1.9S8.8,24.3,8.8,25.6z"/><path style="fill:#2C2C2C;" d="M15.4,23.7V23h3.5v0.7H15.4z M16.8,28.3V23h0.7v5.3H16.8z"/></svg>',
	ods: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27 33" width="27" height="33"><path fill="#39B54A" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0L21,1l0,0c-0.3-0.3-0.7-0.5-1.1-0.7S19,0,18.5,0H3.5L3.5,0z"/><path fill="#F5F5F5" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6c0,1.3-1,2.3-2.3,2.3l0,0h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1L3.5,1.1z"/><path fill="#39B54A" d="M18.7,13.8V16H8.3v-2.2h-2V18h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><path fill="#2C2C2C" d="M11.8,23h1.3c1.3,0,1.8,0.9,1.8,2.5c0,1.8-0.5,2.7-1.9,2.7h-1.2C11.8,28.2,11.8,23,11.8,23z M12.7,27.6h0.4c0.8,0,1.1-0.6,1.1-2c0-1.3-0.3-1.8-1.1-1.8h-0.4V27.6z"/><path fill="#2C2C2C" d="M11.2,25.6c0,1.9-0.5,2.7-1.7,2.7c-1.1,0-1.6-0.9-1.6-2.7c0-1.8,0.6-2.6,1.7-2.6S11.2,23.8,11.2,25.6z M8.8,25.6c0,1.3,0.2,2.1,0.8,2.1s0.8-0.7,0.8-2.1c0-1.3-0.2-1.9-0.8-1.9S8.8,24.3,8.8,25.6z"/><path fill="#2C2C2C" d="M16.9,28.3c-0.3,0-0.5,0-0.7-0.1c-0.2,0-0.4-0.1-0.6-0.2l0.1-0.7c0.2,0.1,0.4,0.2,0.7,0.3c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0,0.5-0.1,0.6-0.2c0.1-0.1,0.2-0.3,0.2-0.5c0-0.3-0.1-0.5-0.4-0.7l-0.8-0.4c-0.3-0.2-0.5-0.3-0.7-0.6c-0.2-0.2-0.2-0.5-0.2-0.8c0-0.4,0.1-0.8,0.3-1c0.2-0.2,0.6-0.4,1-0.4c0.3,0,0.6,0,0.8,0.2s0.4,0.3,0.7,0.5L18,24.2c-0.2-0.2-0.4-0.3-0.5-0.4s-0.3-0.1-0.5-0.1c-0.2,0-0.4,0.1-0.5,0.2s-0.2,0.3-0.2,0.5c0,0.2,0,0.3,0.1,0.4c0.1,0.1,0.2,0.2,0.3,0.3l0.6,0.4c0.3,0.2,0.6,0.4,0.7,0.6c0.2,0.2,0.3,0.5,0.3,0.9c0,0.5-0.1,0.8-0.4,1S17.4,28.3,16.9,28.3z"/></svg>',
	zip: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"viewBox="0 0 27 33" width="27" height="33"><style type="text/css">.lines{fill:none;stroke:#2C2C2C;stroke-width:0.75;stroke-miterlimit:10;}</style><path fill="#F6A117" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0L21,1l0,0c-0.3-0.3-0.7-0.5-1.1-0.7C19.5,0.1,19,0,18.5,0H3.5L3.5,0z"/><path fill="#F5F5F5" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6c0,1.3-1,2.3-2.3,2.3l0,0h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1L3.5,1.1z"/><path fill="#F6A117" d="M18.7,13.8V16H8.3v-2.2h-2V18h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><g><path fill="#2C2C2C" d="M8.2,20h4.1v0.5L9,24.6h3.4v0.6H8.2v-0.5l3.3-4.1H8.2V20z"/><path fill="#2C2C2C" d="M13.4,20h0.7v5.2h-0.7V20z"/><path fill="#2C2C2C" d="M15.5,20h1.6c0.6,0,1,0.1,1.3,0.4c0.3,0.3,0.4,0.7,0.4,1.2c0,0.5-0.1,0.9-0.4,1.2s-0.7,0.4-1.3,0.4h-0.9v2.1h-0.7V20z M16.3,20.6v2h0.9c0.3,0,0.6-0.1,0.8-0.3s0.3-0.4,0.3-0.7c0-0.3-0.1-0.6-0.3-0.7c-0.2-0.2-0.4-0.3-0.8-0.3H16.3z"/></g><g><path class="lines" d="M17,30.1h-1.7v-3.3H17c0.9,0,1.7,0.7,1.7,1.7v0C18.6,29.4,17.9,30.1,17,30.1z"/><line class="lines" x1="8.4" y1="28.4" x2="15.3" y2="28.4"/><line class="lines" x1="9.4" y1="27.3" x2="9.4" y2="29.6"/><line class="lines" x1="10.9" y1="27.3" x2="10.9" y2="29.6"/><line class="lines" x1="12.3" y1="27.3" x2="12.3" y2="29.6"/><line class="lines" x1="13.8" y1="27.3" x2="13.8" y2="29.6"/><rect x="16.3" y="27.7" fill="#F6A117" width="0.8" height="1.5"/></g></svg>',
	any: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"viewBox="0 0 27 33" width="27" height="33"><path fill="#B3B3B3" d="M3.5,0C1.6,0,0.1,1.5,0.1,3.4v26.2c0,1.9,1.5,3.4,3.4,3.4h20c1.9,0,3.4-1.5,3.4-3.4V8.1c0-0.4-0.1-0.9-0.2-1.2c-0.2-0.4-0.4-0.7-0.7-1l0,0L21,1l0,0c-0.3-0.3-0.7-0.5-1.1-0.7S19,0,18.5,0H3.5L3.5,0z"/><path fill="#F5F5F5" d="M3.5,1.1h15c0.4,0,0.7,0.1,1,0.2s0.5,0.3,0.7,0.5l0,0l5,4.9c0.2,0.2,0.3,0.4,0.4,0.6s0.1,0.5,0.1,0.7l0,0v21.6c0,1.3-1,2.3-2.3,2.3l0,0h-20c-1.3,0-2.3-1-2.3-2.3l0,0V3.4C1.2,2.2,2.2,1.1,3.5,1.1L3.5,1.1z"/><path fill="#B3B3B3" d="M18.7,13.8V16H8.3v-2.2h-2V18h14.4v-4.2H18.7z M13.5,15l4-6.9h-2V4.9h-4v3.2h-2L13.5,15z"/><polygon fill="#2C2C2C" points="15.9,25.4 15.4,24.3 13.5,25.1 13.6,23 12.4,23 12.5,25.1 10.6,24.3 10.2,25.4 12.2,26 10.7,27.6 11.7,28.4 13,26.5 14.3,28.4 15.3,27.6 13.8,26 "/></svg>',
}


var document_data = {};

var documents_list = [];

window.addEventListener('load', function() {
	Load_Data();
})

function Load_Data()
{
	var client = new XMLHttpRequest();
	client.open('GET', 'DataBase.json');
	client.onreadystatechange = function() {
		if (client.readyState === 4){ 
			End_load(client.responseText);
		}
	}
	client.send();
}

function End_load(list)
{
	document_data = JSON.parse(list);

	documents_list = [];
	Object.keys(document_data).forEach(key => {
		if (document_data[key].hasOwnProperty('linked'))
		{
			if (document_data[key].linked)
				return;
		}
		documents_list.push(key);
	})

	documents_list.sort();
	
	Rechercher("")
}


function Rechercher(texte)
{
	texte = FormatText(texte.toLowerCase())
	var textes = texte.split(" ");
	textes.unshift(texte)
	var resultats = {};
	for(var l = 0; l < documents_list.length; l++)
	{
		var doc = documents_list[l];

		if (texte == "")
		{
			resultats[l] = 0;
			continue;
		}

		var base_titre = FormatText(doc.toLowerCase());

		textes.forEach(txt => {
			if (txt != "")
			{
				let Regex = RegExp('(' + txt + ')+');
				if (Regex.test(base_titre))
				{
					let poids
					if (textes.indexOf(txt) == 0 && txt.length > 5)
						poids = count('(' + txt + ')+', base_titre) + 1;
					else
						poids = count('(' + txt + ')+', base_titre) * txt.length / base_titre.length;
					
					if (resultats.hasOwnProperty(l))
					{
							if (resultats[l] < poids)
								resultats[l] = poids;
							return;
					}
					resultats[l] = poids;
				}
			}
		});
	}
	CreateListeResultat(resultats);
}

function CreateListeResultat(resultats){
	document.getElementById("Resultats").innerHTML = "";

	var results = Object.keys(resultats).map(function(key) {
			return [Number(key), resultats[key]];
	});
	results.sort(function(a, b){
			if (a[0] == b[0]) {
					if (a[1] < b[1]) return -1;
					if (a[1] > b[1]) return 1;
					return 0;
			}
			return b[1]-a[1]
	})

	if (results.length == 0)
	{
			var ligneblock = document.createElement("div");
			ligneblock.setAttribute("class", "Result");
			ligneblock.innerHTML = "Aucun résultat"
			document.getElementById("Resultats").appendChild(ligneblock);
			return;
	}
	for(var l = 0; l < results.length; l++)
	{
			var ligneblock = CreateHTML(results[l][0]);
			document.getElementById("Resultats").appendChild(ligneblock);
	}
}



function CreateHTML(id)
{
	var doc_id = documents_list[id];
	var doc_data = document_data[doc_id];

	var name = doc_data.name;
	var div = document.createElement("div");
	div.id = "resultat" + id.toString();
	div.classList.add("resultat");
	div.onclick = function() { SelectDoc(doc_data.path); }

	let div1 = document.createElement("div");
	div1.classList.add("resultat_info");
	div.appendChild(div1);

	let span1 = document.createElement("span");
	span1.classList.add("resultat_title")
	span1.classList.add("unselectable")
	span1.innerText = name.replaceAll("_", " ");
	div1.appendChild(span1)

	let div2 = document.createElement("div");
	div2.classList.add("resultat_tag")
	div2.classList.add("unselectable")
	div1.appendChild(div2);
	
	for (let i = 0; i < doc_data.list_tag.length; i++) {
		const element = doc_data.list_tag[i];
		let tag = document.createElement("div");
		tag.innerText = element;
		tag.onclick = function() { TagClick(element); }
		div2.appendChild(tag);
	}

	let div3 = document.createElement("div");
	div3.classList.add("resultat_buttons");
	div.appendChild(div3);

	let file_count = 0;
	let fileadded = AddFileButton(div3, doc_data)
	if (fileadded) file_count+= 1;

	for (let i = 0; i < doc_data.list_file.length; i++) {
		const element = doc_data.list_file[i];
		AddFileButton(div3, document_data[element], true)
		file_count+= 1;
	}

	if (file_count > 1)
	{
		let div4 = document.createElement("div");
		div4.onclick = function() { DownloadAll(doc_data, 'ALL') };
		div4.innerHTML = SVGs.zip;
		div3.appendChild(div4);
	}

	return div
}

function AddFileButton(parent, file,any = false)
{
	let added = false;
	let div = document.createElement("div");
	if (file.path.endsWith('.pdf'))
	{
		div.onclick = function() { Download(file.path, file.file_name, 'PDF') };
		div.innerHTML = SVGs.pdf;
		added = true;
	}
	if (file.path.endsWith('.docx'))
	{
		div.onclick = function() { Download(file.path, file.file_name, 'DOCX') };
		div.innerHTML = SVGs.docx;
		added = true;
	}
	if (file.path.endsWith('.odt'))
	{
		div.onclick = function() { Download(file.path, file.file_name, 'ODT') };
		div.innerHTML = SVGs.odt;
		added = true;
	}
	if (file.path.endsWith('.xlsx'))
	{
		div.onclick = function() { Download(file.path, file.file_name, 'XLSX') };
		div.innerHTML = SVGs.xlsx;
		added = true;
	}
	if (file.path.endsWith('.ods'))
	{
		div.onclick = function() { Download(file.path, file.file_name, 'ODS') };
		div.innerHTML = SVGs.ods;
		added = true;
	}
	if (file.path.endsWith('.zip'))
	{
		div.onclick = function() { Download(file.path, file.file_name, 'ZIP') };
		div.innerHTML = SVGs.zip;
		added = true;
	}
	if (!added && any)
	{
		div.onclick = function() { Download(file.path, file.file_name, 'ANY') };
		div.innerHTML = SVGs.any;
		added = true;
	}
	if (added)
		parent.appendChild(div);
	return added
}



function count(re, str) {
	if (typeof re !== "string") {
			return 0;
	}
	re = (re === '.') ? ('\\' + re) : re;
	var cre = new RegExp(re, 'g');
	return ((str || '').match(cre) || []).length;
}

function FormatText(txt)
{
	txt = txt.replaceAll(/[àâä]/g, 'a')
	txt = txt.replaceAll(/[ÀÂÄ]/g, 'A')
	txt = txt.replaceAll(/[éèêë]/g, 'e')
	txt = txt.replaceAll(/[ÉÈÊË]/g, 'E')
	txt = txt.replaceAll(/[ìîï]/g, 'i')
	txt = txt.replaceAll(/[ÌÎÏ]/g, 'I')
	txt = txt.replaceAll(/[òôö]/g, 'o')
	txt = txt.replaceAll(/[ÒÔÖ]/g, 'O')
	txt = txt.replaceAll(/[ùûü]/g, 'u')
	txt = txt.replaceAll(/[ÙÛÜ]/g, 'U')
	return txt
}

function SelectDoc(filename)
{
	document.getElementById("preview").classList.add("hidden");
	document.getElementById("preview_img").classList.add("hidden");
	console.log(filename);
	if (filename.endsWith('.svg') || filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg'))
	{
		document.getElementById("preview_img").classList.remove("hidden");
		document.getElementById("preview_img").src = filename;
	}
	else
	{
		document.getElementById("preview").classList.remove("hidden");
		document.getElementById("preview").src = filename;
	}
}

function TagClick(tag)
{
	document.getElementById('recherche').value = tag
	Rechercher(tag)
}

function Download(filename, name, type)
{
	var a = document.createElement("a");
    a.href = filename;
    a.download = name;
    a.click()
}

function DownloadAll(file)
{
	var zip = new JSZip();

	let promises = [];
	let names = [];
	names.push(file.file_name);
	promises.push(fetch(file.path));
	for (let i = 0; i < file.list_file.length; i++) {
		const element = document_data[file.list_file[i]];
		names.push(element.file_name);
		promises.push(fetch(element.path));
	}
	Promise.all(promises)
  .then(
    results => 
		{
			for(let i = 0; i < results.length; i++)
			{
				zip.file(names[i], results[i].blob());
			}

			zip.generateAsync({type:"blob"})
				.then(function(content) {
						// see FileSaver.js
						saveAs(content, file.name);
				});
		}
  )
}


function Save()
{
	var zip = new JSZip();
	if (View_Front_flip)
		zip.file("Face_arriere.svg", View_Front["view"].node.outerHTML);
	else
		zip.file("Face_avant.svg", View_Front["view"].node.outerHTML);
	if (View_Right_flip)
		zip.file("Face_droite.svg", View_Right["view"].node.outerHTML);
	else
		zip.file("Face_gauche.svg", View_Right["view"].node.outerHTML);
	if (View_Top_flip)
		zip.file("Face_dessous.svg", View_Top["view"].node.outerHTML);
	else
		zip.file("Face_dessus.svg", View_Top["view"].node.outerHTML);
	zip.file("Vue_isometrique.svg", View_Iso.node.outerHTML);
	zip.file("Vue_cavaliere.svg", View_Cav.node.outerHTML);

	zip.generateAsync({type:"blob"})
	.then(function(content) {
			// see FileSaver.js
			saveAs(content, "Structuro.zip");
	});
}