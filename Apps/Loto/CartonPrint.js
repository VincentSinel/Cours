
importScripts(
	"/JS/PDFKit/pdfkit.standalone.js",
  "/JS/PDFKit/blob-stream.js"
);

// Coef from cm to points
const mm_points_coef = 2.8346;

var color = "";

var txt_nbr = true;
var txt_uid = true;
var txt_txt1 = false;
var txt_txt2 = false;
var txt_txt3 = false;
var txt_txt1_value = "";
var txt_txt2_value = "";
var txt_txt3_value = "";

var parameters_width = 0;
var parameters_height = 0;
var parameters_marge = 0;
var parameters_gap = 0;
var parameters_pagetype = 0;

onmessage = function(e) {
	CreatePDF(e.data);
}

function CreatePDF(data) 
{
	postMessage({status: "Start", completion: 0, time: 0})
	var cardRangeList = CheckPage(data.range, Object.keys(data.cardlist).length)
	color = data.color
	txt_nbr = data.show_carton_nbr;
	txt_uid = data.show_carton_uid;
	txt_txt1 = data.show_carton_txt1;
	txt_txt2 = data.show_carton_txt2;
	txt_txt3 = data.show_carton_txt3;
	txt_txt1_value = data.show_carton_txt1_value;
	txt_txt2_value = data.show_carton_txt2_value;
	txt_txt3_value = data.show_carton_txt3_value;
	parameters_width = data.parameters_width;
	parameters_height = data.parameters_height;
	parameters_marge = data.parameters_marge;
	parameters_gap = data.parameters_gap;
	parameters_pagetype = data.parameters_pagetype == 0 ? 'A4' : 'A3';

	PDFCreation(data.cardlist, cardRangeList)
}

function CheckPage(data_string, length)
{
	var re = /((\d+) *-+ *(\d+))|(\d+)/g;
	var d = data_string.replaceAll(" ", '');
	if (d == "")	
		return {list: [[0, length - 1]], size: length};
	else
	{
		var count = 0;
		let l;
		var list = [];
		while((l = re.exec(d)) !== null)
		{
			let value;
			if (l[4] == undefined)
				value = [parseInt(l[2]) - 1, parseInt(l[3]) - 1]
			else
				value = [parseInt(l[4]) - 1, parseInt(l[4]) - 1]
			list.push(value)
			count += value[1]-value[0] + 1
		}
		console.log(list)
		return {list: list, size: count};
	}
}

function RetrieveGrid(string)
{
	var list = []
	for (let j = 0; j < 27; j++) 
	{
		list.push(parseInt(string.slice(j*2,(j+1) *2)));
	}
	return list
}

function PDFCreation(data, cardRangeList)
{
	var start_time = Date.now()
	var last_time = start_time

	var keys = Object.keys(data)

	const doc = new PDFDocument({size: parameters_pagetype, layout: parameters_pagetype == 'A4' ? 'portrait' : 'landscape' });

	// pipe the document to a blob
	const stream = doc.pipe(blobStream());	

	let w = parameters_width;
	let h = parameters_height;
	let margin = parameters_marge;
	let cartonCount = 0;

	let c = 0;
	let r = 0;
	if (parameters_pagetype == 'A4')
	{
		c = Math.max(Math.floor((210 - margin * 2 + parameters_gap) / (w + parameters_gap)), 1);
		r = Math.max(Math.floor((297 - margin * 2 + parameters_gap) / (h + parameters_gap)), 1);
	}	
	else if (parameters_pagetype == 'A3')
	{
		c = Math.max(Math.floor((420 - margin * 2 + parameters_gap) / (w + parameters_gap)), 1);
		r = Math.max(Math.floor((297 - margin * 2 + parameters_gap) / (h + parameters_gap)), 1);
	}	
	

	// if (cartonCount % 3 == 0 && cartonCount != 0 && parameters_pagetype == 'A4')

	for (let cardRangeIndex = 0; cardRangeIndex < cardRangeList.list.length; cardRangeIndex++) {
		const cardRange = cardRangeList.list[cardRangeIndex];

		for (let cardIndex = cardRange[0]; cardIndex <= cardRange[1]; cardIndex++) {
			const element = keys[cardIndex];

			if (cartonCount % (c * r) == 0 && cartonCount != 0)
			{
				doc.addPage()
			}

			// if (cartonCount % 6 == 0 && cartonCount != 0 && parameters_pagetype == 'A3')
			// {
			// 	doc.addPage()
			// }


			var grid = RetrieveGrid(data[element])

			let dx = margin + (w + parameters_gap) * Math.floor((cartonCount % (r * c))  / r);
			// if (parameters_pagetype == 'A3' && cartonCount % 6 >=3)
			// 	dx += w + parameters_gap;
			let dy = margin + ((cartonCount % (r * c)) % r) * (h + parameters_gap);

			doc.fontSize(8);
			doc.font('Helvetica-Bold')
			doc.fillColor(color)
			doc.rect(
				dx * mm_points_coef, 
				dy * mm_points_coef, 
				w * mm_points_coef, 
				h * mm_points_coef).fill()

			doc.fillColor("#FFF")
			let txt1 = txt_nbr ? ('Carton n°' + (cardIndex + 1).toString()) : txt_txt1 ? txt_txt1_value : "";
			doc.text(txt1, 
				(dx + 2) * mm_points_coef, 
				(dy + 4) * mm_points_coef).fill()

			let txt2 = txt_txt2 ? txt_txt2_value : "";
			let tw = doc.widthOfString(txt2);
			doc.text(txt2, 
				(dx + w / 2.0) * mm_points_coef - tw / 2.0, 
				(dy + 4) * mm_points_coef).fill()

			let txt3 = txt_uid ? element : txt_txt3 ? txt_txt3_value : "";
			tw = doc.widthOfString(txt3);
			doc.text(txt3, 
				(dx + w - 2) * mm_points_coef - tw, 
				(dy + 4) * mm_points_coef).fill()

			doc.fillColor("#FFF")
			doc.rect(
				(dx + 2) * mm_points_coef, 
				(dy + 7) * mm_points_coef, 
				(w - 4) * mm_points_coef, 
				(h - 9) * mm_points_coef).fill()
			doc.fillColor(color)
			doc.rect(
				(dx + 2.5) * mm_points_coef, 
				(dy + 7.5) * mm_points_coef, 
				(w - 5) * mm_points_coef, 
				(h - 10) * mm_points_coef).fill()
			doc.fillColor("#FFF")
			doc.rect(
				(dx + 3) * mm_points_coef, 
				(dy + 8) * mm_points_coef, 
				(w - 6) * mm_points_coef, 
				(h - 11) * mm_points_coef).fill()
			doc.fillColor(color)
			doc.rect(
				(dx + 4) * mm_points_coef, 
				(dy + 9) * mm_points_coef, 
				(w - 8) * mm_points_coef, 
				(h - 13) * mm_points_coef).fill()
			
			let dw = (w - 9.5) / 9;
			let dh = (h - 14.5) / 3;

			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 9; j++) {
					
					let x = dx + 5 + j * dw
					let y = dy + 10 + i * dh
					let v = grid[i + j * 3];

					doc.fillColor("#FFF")
					doc.roundedRect(
						x * mm_points_coef, 
						y * mm_points_coef, 
						(dw - 0.5) * mm_points_coef, 
						(dh - 0.5) * mm_points_coef, 
						1, 1).fill()
					
					if (v == 0)
					{
						doc.fillColor(color)
						doc.roundedRect(
							(x + 1) * mm_points_coef, 
							(y + 1) * mm_points_coef, 
							(dw - 2.5) * mm_points_coef, 
							(dh - 2.5) * mm_points_coef, 
							1, 1).fill()
					}
					else
					{
						doc.fillColor("#000");
						doc.fontSize(34);
						let tw = doc.widthOfString(v.toString())
						doc.text(v.toString(), 
						(x + (dw - 0.5) / 2) * mm_points_coef - tw / 2, 
						(y + (dh - 0.5) * 1/3) * mm_points_coef - 10, 
						{lineBreak: false}).fill()

						doc.fontSize(12);
						tw = doc.widthOfString(v.toString())
						doc.text(v.toString(),
						(x + (dw - 0.5) / 2) * mm_points_coef - tw / 2, 
						(y + (dh - 0.5)*5/6) * mm_points_coef - 2, 
						{lineBreak: false}).fill()

					}
				}
				
			}
			
			cartonCount += 1;

			let e = Date.now()
			if (e - last_time > 500)
			{
				let completion = (cartonCount + 1) / cardRangeList.size;
				postMessage({status: "Generating", completion: completion, time: e - start_time, column: c, rows: r})
				last_time = e;
			}
				
		}
			
	}
	
	doc.end();
	
	var blob;
	
	stream.on("finish", function() {
		// get a blob you can do whatever you like with
		blob = stream.toBlob("application/pdf");
		console.log(blob)
		postMessage({status: "End", completion: 1, time: Date.now() - start_time, result: blob, column: c, rows: r})
	});
}