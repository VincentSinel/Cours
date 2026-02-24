importScripts(
	"/JS/PDFKit/pdfkit.standalone.js",
  "/JS/PDFKit/blob-stream.js"
);

// Coef from cm to points
const DIM_A4_POINTS = { width: 595.28, height: 841.89 }
const MM_POINTS_COEF = 2.83465;
const TAB_SIZE = 15 * MM_POINTS_COEF;

var txt_txt = "";
var txt_auteur = "";
var txt_titre = "";
var txt_complement = "";

var parameters_marge = 10;
var parameters_indent = 30;
var parameters_paragraph_gap = 10;
var parameters_line_number_space = 30;
var parameters_count_step = 5;
var parameters_font_size = 12;


var arrayBuffer1, arrayBuffer2, arrayBuffer3;


onmessage = function(e) {
	CreatePDF(e.data);
}

function CreatePDF(data) 
{
	postMessage({status: "Start", completion: 0, time: 0})
	txt_txt = data.text;
	txt_auteur = data.auteur;
	txt_titre = data.titre;
	txt_complement = data.complement;

	parameters_marge = data.parameters_marge ? data.parameters_marge : parameters_marge;
	parameters_indent = data.parameters_indent ? data.parameters_indent : parameters_indent;
	parameters_paragraph_gap = data.parameters_paragraph_gap ? data.parameters_paragraph_gap : parameters_paragraph_gap;
	parameters_line_number_space = data.parameters_line_number_space ? data.parameters_line_number_space : parameters_line_number_space;
	parameters_count_step = data.parameters_count_step ? data.parameters_count_step : parameters_count_step;
	parameters_font_size = data.parameters_font_size ? data.parameters_font_size : parameters_font_size;

	var oReq1 = new XMLHttpRequest();
	oReq1.open("GET", "verdana.ttf", true);
	oReq1.responseType = "arraybuffer";

	oReq1.onload = function(oEvent1) {
			arrayBuffer1 = oReq1.response;
			
			var oReq2 = new XMLHttpRequest();
			oReq2.open("GET", "verdana-bold.ttf", true);
			oReq2.responseType = "arraybuffer";

			oReq2.onload = function(oEvent2) {
					arrayBuffer2 = oReq2.response;
					
					var oReq3 = new XMLHttpRequest();
					oReq3.open("GET", "verdana-bold-italic.ttf", true);
					oReq3.responseType = "arraybuffer";

					oReq3.onload = function(oEvent3) {
							arrayBuffer3 = oReq3.response;
							PDFCreation(arrayBuffer1, arrayBuffer2, arrayBuffer3);	
					};

					oReq3.send(null);
			};

			oReq2.send(null);
	};

	oReq1.send(null);
}

function PDFCreation(buffer1, buffer2, buffer3)
{

	var start_time = Date.now()
	var last_time = start_time

	let lineNumberSpace = 30;
	let marge = parameters_marge * MM_POINTS_COEF;

	const doc = new PDFDocument({size: 'A4', layout: 'portrait', 
		margins: {
    top: marge,
    bottom: marge,
    left: marge + lineNumberSpace,
    right: marge
  }, fontSize: parameters_font_size});

	doc.registerFont('verdana', buffer1)
	doc.registerFont('verdana-bold', buffer2)
	doc.registerFont('verdana-bold-italic', buffer3)

	// pipe the document to a blob
	const stream = doc.pipe(blobStream());

	while(txt_txt.includes("\n\n"))
	{
		txt_txt = txt_txt.replaceAll("\n\n", "\n");
	}

	let paragraphs = txt_txt.split("\n");
	let options = {align: "justify", indent: parameters_indent, paragraphGap: parameters_paragraph_gap, width: DIM_A4_POINTS.width - marge * 2 - parameters_line_number_space}

	doc.font('verdana')

	{ // Do the page

		let line_height = doc.currentLineHeight(true);
		let current_page_y = marge;
		let restart_y = marge;
		let global_line = 1;
		for (let i = 0; i < paragraphs.length; i++)
		{
			const paragraph = paragraphs[i];
			let paragraphHeight = doc.heightOfString(paragraph, options);
			let line_count = Math.round((paragraphHeight - parameters_paragraph_gap) / line_height);
			let line = 0;
			while(current_page_y + (line - 1) * line_height < DIM_A4_POINTS.height - marge * 2 && line < line_count)
			{
				if (global_line % parameters_count_step == 0 || global_line == 1)
					doc.text(global_line.toString(), 0, current_page_y + line * line_height, options).fill()
				line++;
				global_line++;
			}
			let previous_page = doc.bufferedPageRange().start;
			doc.text(paragraph, marge + parameters_line_number_space, current_page_y, options).fill()
			
			// ERROR FROM MY CALCULATION I FORGOT TO INCLUDE LINE NUMBER WIDTH IN THE OPTIONS OF heightOfString KEEP IT HERE IN CASE OF ANOTHER BUG LIKE THIS IN THE FUTURE
			// BUGFIX : Line count calculation is not accurate when text wrapping involve page break, sometimes line count is underestimated, so we check the line count after writing the text and if it is superior to the estimation, we update it and write the line numbers for the missing lines
			// if (Math.round((doc.y - restart_y - paragraphGap) / line_height) > line_count)
			// {
			// 	line_count = Math.round((doc.y - restart_y - paragraphGap) / line_height);
			// }

			restart_y = doc.y;
			if (doc.bufferedPageRange().start != previous_page)
			{
				current_page_y = marge - line * line_height;
			}
			while(current_page_y + (line - 1) * line_height < DIM_A4_POINTS.height - marge * 2 && line < line_count)
			{
				if (global_line % parameters_count_step == 0 || global_line == 1)
					doc.text(global_line.toString(), 0, current_page_y + line * line_height, options).fill()
				line++;
				global_line++;
			}
			current_page_y = restart_y;


			let e = Date.now()
			if (e - last_time > 500)
			{
				let completion = (i + 1) / paragraphs.length;
				postMessage({status: "Generating", completion: completion, time: e - start_time})
				last_time = e;
			}
		}
	}
	
	doc.font('verdana-bold')
	let w1 = doc.widthOfString(txt_auteur +",");
	doc.font('verdana-bold-italic')
	let w2 = doc.widthOfString(txt_titre)
	doc.font('verdana-bold')
	let w3 = doc.boundsOfString(", " + txt_complement, marge + w1 + w2 + 3, doc.y).width
	console.log(w3)

	let lp =  DIM_A4_POINTS.width - marge;
	let y = doc.y;
	doc.text(txt_auteur +",", lp - w1 - w2 - w3 - 3, y, {align: "right", width: w1})
	doc.font('verdana-bold-italic')
	doc.text(txt_titre,  lp - w2 - w3, y, {align: "right", width: w2})
	doc.font('verdana-bold')
	doc.text(", " + txt_complement,  lp - w3, y, {align: "right", width: w3})
	
	doc.end();
	
	var blob;
	
	stream.on("finish", function() {
		// get a blob you can do whatever you like with
		blob = stream.toBlob("application/pdf");
		postMessage({status: "End", completion: 1, time: Date.now() - start_time, result: blob})
	});
}