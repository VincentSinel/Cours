const randomId = function(length = 6) {
  return Math.random().toString(36).substring(2, length+2);
};

const base_options_colorpicker = {
		swatches: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0", "#f0cccc"],
		defaultFormat: 'hex',
		submitMode: 'instant',
		showClearButton: true,
		dismissOnOutsideClick: true,
	}


function CustomSelect(element, arg = {})
{
	var id = randomId()
	element.setAttribute("data", id);

	var select = element.getElementsByTagName("select")[0];
	var options_count = select.length;

	var replacement = document.createElement("div");
	replacement.setAttribute("class", "select-selected");
	replacement.innerHTML = select.options[select.selectedIndex].innerHTML;
	element.appendChild(replacement);

	var context_menu = document.createElement("div");
	context_menu.setAttribute("id", id);
	context_menu.setAttribute("class", "select-items select-hide");
	context_menu.setAttribute("style", "max-width: " + arg["width"])

	for (j = 0; j < options_count; j++) {
			/* For each option in the original select element,
			create a new DIV that will act as an option item: */
			let option = document.createElement("div");
			if (arg.hasOwnProperty("class"))
				option.setAttribute("class", arg["class"]);
			if (arg.hasOwnProperty("obj-width"))
			{
				option.style["maxWidth"] = arg["obj-width"];
				option.style["minWidth"] = arg["obj-width"];
			}
			else
			{
				option.style["maxWidth"] = arg["width"];
				option.style["minWidth"] = arg["width"];
			}
			if (arg.hasOwnProperty("isfont"))
			{
				option.style["font-family"] = select.options[j].innerHTML;
			}
			option.innerHTML = select.options[j].innerHTML;
			option.setAttribute("index", j);

			option.addEventListener("click", function(e) {
					let _context_menu = this.parentNode;
					let _element = document.querySelector('[data="' + _context_menu.getAttribute("id") +'"]')
					let _select = _element.getElementsByTagName("select")[0];
					let _remplacement = _element.children[1];

					_select.selectedIndex = parseInt(this.getAttribute("index"));
					var event = new Event('input');
					_select.dispatchEvent(event);

					_remplacement.innerHTML = this.innerHTML;

					for(let item of _context_menu.getElementsByClassName("same-as-selected")) 
					{
						item.classList.remove("same-as-selected") 
					};
					this.classList.add("same-as-selected");

					_remplacement.click();
				
			});
			context_menu.appendChild(option);
	}

	document.body.appendChild(context_menu);

	replacement.addEventListener("click", function(e) {
		e.stopPropagation();
		closeAllSelect(this);
		let temp = e.target.getBoundingClientRect()
		let _context_menu = document.getElementById(this.parentNode.getAttribute("data"))
		if (temp.top + temp.height + 120 < window.innerHeight)
			_context_menu.style['top'] = (temp.top + temp.height).toString() + "px";
		else
			_context_menu.style['top'] = (temp.top - 120).toString() + "px";
		_context_menu.style['left'] = temp.left.toString() + "px";
		_context_menu.classList.toggle("select-hide");
		_context_menu.style['max-height'] = "120px";
		this.classList.toggle("select-arrow-active");
	})
}

function closeAllSelect(elmnt) {
	let contexts_menus = document.getElementsByClassName("select-items");
	let remplacements = document.getElementsByClassName("select-selected");
	let arrNo = [];
	for (let i = 0; i < remplacements.length; i++) {
		const element = remplacements[i];
		if (elmnt == element) {
			arrNo.push(elmnt.parentNode.getAttribute("data"));
		}
		else
		{
			element.classList.remove("select-arrow-active");
		}
	}
	for (let i = 0; i < contexts_menus.length; i++) {
		const element = contexts_menus[i];
		if (arrNo.indexOf(element.getAttribute("id")) < 0) {
			element.classList.add("select-hide");
		}
	}
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 




/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */

/**
 * Usage: d = new Detector();
 *        d.detect('font name');
 */
var Detector = function() {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';

    var h = document.body;

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};

let d = new Detector();
d.detect('font name');

let font_list = [
	"Andale Mono",
	"Arial",
	"Arial black",
	"Avanta Garde",
	"Bahnschrift",
	"Bodoni 72",
	"Calibri",
	"Cambria",
	"Candara",
	"Century Gothic",
	"Comic Sans MS",
	"Consolas",
	"Constantia",
	"Corbel",
	"Courier",
	"Ebrima",
	"Franklin Gothic Medium",
	"Futura",
	"Gabriola",
	"Gadugi",
	"Geneva",
	"Georgia",
	"Gill Sans",
	"Helvetica",
	"Impact",
	"Javanese Text",
	"Leelawadee UI",
	"Lucida Console",
	"Malgun Gothic",
	"Microsoft Himalaya",
	"Microsoft Sans Serif",
	"Microsoft Yi Baiti",
	"MingLiU-ExtB",
	"Monaco",
	"Mongolian Baiti",
	"MS Gothic",
	"MV Boli",
	"Myanmar Text",
	"Nirmala UI",
	"Noto",
	"Optima",
	"Palatino Linotype",
	"Segoe MDL2 Assets",
	"Segoe Print",
	"Segoe Script",
	"Segoe UI",
	"SimSun",
	"Sitka",
	"Sylfaen",
	"Tahoma",
	"Times New Roman",
	"Trebuchet MS",
	"Verdana",
	"Yu Gothic",
	
]

var valid_font = []
font_list.forEach(function(font) {
	if (d.detect(font)) {
		valid_font.push(font);
	}
});

function FontSelector(element, arg = {})
{
	let select = document.createElement("select");
	valid_font.forEach(element => {
		let option = document.createElement("option");
		option.innerHTML = element;
		select.appendChild(option);
	});
	element.appendChild(select);
	if (arg.hasOwnProperty("font"))
		select.selectedIndex = valid_font.indexOf(arg["font"]);
	if (select.selectedIndex < 0)
		select.selectedIndex = 0;

	return select;
}