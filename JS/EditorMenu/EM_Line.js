class EM_Line extends EM_Base
{
	Target
	Stroke
	Stroke_Width
	Stroke_Style

	ID;

	OnInput_StrokeSize;
	OnInput_Stroke;
	OnInput_StrokeType;

	constructor(target, parameters = {})
	{
		this.Target = target;
		this.Target.classList.add("tool-line");
		this.ID = this.UUID_V4();
	}

	CreateHTMLElements() 
	{
		var img1 = document.createElement("img");
		img1.src = "/Images/Icons/Stroke Width.svg"
		this.Target.appendChild(img1);

		var stroke_size = document.createElement("input");
		stroke_size.type = "number";
		stroke_size.value = "3";
		stroke_size.step = "1";
		stroke_size.min = "1";
		stroke_size.oninput = (e) => { this.OnInput_StrokeSize(e.target.value); }
		this.Target.appendChild(stroke_size);

		var img2 = document.createElement("img");
		img2.src = "/Images/Icons/Stroke.svg"
		this.Target.appendChild(img2);

		var btn_stroke = document.createElement("button");
		btn_stroke.setAttribute("data-color", "black");
		btn_stroke.style.setProperty("--cp-size", "24px");
		this.Target.appendChild(btn_stroke);
		var color_picker = new ColorPicker(btn_stroke, this.BaseOptionsColorpicker)
		color_picker.on('pick', (color) => { this.OnInput_Stroke(color); } );

		var img3 = document.createElement("img");
		img3.src = "/Images/Icons/Line Style.svg"
		this.Target.appendChild(img3);

		var stroke_type = document.createElement("input");
		stroke_type.type = "text";
		stroke_type.oninput = (e) => { this.OnInput_StrokeType(e.target.value); }
		this.Target.appendChild(stroke_size);

	}

	


}