
importScripts(
	"/JS/PDFKit/pdfkit.standalone.js",
  "/JS/PDFKit/blob-stream.js"
);

// Coef from pixel to points
const A4_w_coef = 595.28 / 210.0
const A4_h_coef = 841.89 / 297.0

var color = "";

onmessage = function(e) {
	CreatePDF(e.data);
}

function CreatePDF(data) 
{
	postMessage({status: "Start", completion: 0, time: 0})
	var cardRangeList = CheckPage(data.range, Object.keys(data.cardlist).length)
	color = data.color
	console.log(color)
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

	const doc = new PDFDocument({size: 'A4'});

	// pipe the document to a blob
	const stream = doc.pipe(blobStream());	

	let w = 157;
	let h = 86;
	let cartonCount = 0;

	for (let cardRangeIndex = 0; cardRangeIndex < cardRangeList.list.length; cardRangeIndex++) {
		const cardRange = cardRangeList.list[cardRangeIndex];

		for (let cardIndex = cardRange[0]; cardIndex <= cardRange[1]; cardIndex++) {
			const element = keys[cardIndex];

			if (cartonCount % 3 == 0 && cartonCount != 0)
			{
				doc.addPage()
			}


			var grid = RetrieveGrid(data[element])

			let dx = 10;
			let dy = 10 + (cartonCount % 3) * (h + 1);

			// let color = "#50E991"

			doc.fontSize(8);
			doc.font('Helvetica-Bold')
			doc.fillColor(color)
			doc.rect(
				dx * A4_w_coef, 
				dy * A4_h_coef, 
				w * A4_w_coef, 
				h * A4_h_coef).fill()

			doc.fillColor("#FFF")
			doc.text('Carton n°' + (cardIndex + 1).toString(), 
				(dx + 2) * A4_w_coef, 
				(dy + 4) * A4_h_coef).fill()

			let uid = element
			let tw = doc.widthOfString(uid);
			doc.text(uid, 
				(dx + w - 2) * A4_w_coef - tw, 
				(dy + 4) * A4_h_coef).fill()

			doc.fillColor("#FFF")
			doc.rect(
				(dx + 2) * A4_w_coef, 
				(dy + 7) * A4_h_coef, 
				(w - 4) * A4_w_coef, 
				(h - 9) * A4_h_coef).fill()
			doc.fillColor(color)
			doc.rect(
				(dx + 2.5) * A4_w_coef, 
				(dy + 7.5) * A4_h_coef, 
				(w - 5) * A4_w_coef, 
				(h - 10) * A4_h_coef).fill()
			doc.fillColor("#FFF")
			doc.rect(
				(dx + 3) * A4_w_coef, 
				(dy + 8) * A4_h_coef, 
				(w - 6) * A4_w_coef, 
				(h - 11) * A4_h_coef).fill()
			doc.fillColor(color)
			doc.rect(
				(dx + 4) * A4_w_coef, 
				(dy + 9) * A4_h_coef, 
				(w - 8) * A4_w_coef, 
				(h - 13) * A4_h_coef).fill()
			
			let dw = (w - 9.5) / 9;
			let dh = (h - 14.5) / 3;

			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 9; j++) {
					
					let x = dx + 5 + j * dw
					let y = dy + 10 + i * dh
					let v = grid[i + j * 3];

					doc.fillColor("#FFF")
					doc.roundedRect(
						x * A4_w_coef, 
						y * A4_h_coef, 
						(dw - 0.5) * A4_w_coef, 
						(dh - 0.5) * A4_h_coef, 
						1, 1).fill()
					
					if (v == 0)
					{
						doc.fillColor(color)
						doc.roundedRect(
							(x + 1) * A4_w_coef, 
							(y + 1) * A4_h_coef, 
							(dw - 2.5) * A4_w_coef, 
							(dh - 2.5) * A4_h_coef, 
							1, 1).fill()
					}
					else
					{
						doc.fillColor("#000");
						doc.fontSize(36);
						let tw = doc.widthOfString(v.toString())
						doc.text(v.toString(), 
						(x + (dw - 0.5) / 2) * A4_w_coef - tw / 2, 
						(y + (dh - 0.5) * 1/3) * A4_h_coef - 10).fill()

						doc.fontSize(12);
						tw = doc.widthOfString(v.toString())
						doc.text(v.toString(),
						(x + (dw - 0.5) / 2) * A4_w_coef - tw / 2, 
						(y + (dh - 0.5)*5/6) * A4_h_coef - 2).fill()

					}
				}
				
			}
			
			cartonCount += 1;

			let e = Date.now()
			if (e - last_time > 500)
			{
				let completion = (cartonCount + 1) / cardRangeList.size;
				postMessage({status: "Generating", completion: completion, time: e - start_time})
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
		postMessage({status: "End", completion: 1, time: Date.now() - start_time, result: blob})
	});
}