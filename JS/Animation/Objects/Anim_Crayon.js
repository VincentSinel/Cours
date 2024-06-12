class Anim_Crayon
{
	Parent;

	get Content() {
			return this.Parent.Content;
	}


	SVG = '<g><path fill="#FF8080" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="3.2" d="M86.7,78.7L86.7,78.7l-0.1-0.1L81.9,74L74,81.9l4.7,4.7l0.1,0.1l0,0c1.4,1.2,4.1,0.5,6.3-1.7C87.2,82.9,87.9,80.1,86.7,78.7z"/><g transform="translate(812.57526,0)"><rect x="-746.1" y="66.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -268.2388 -501.5276)" fill="#CCCCCC" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="3.2" width="13.2" height="13.8"/><path fill="none" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-miterlimit="3.2" d="M-736,69.5l-7.1,7.1"/><path fill="none" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-miterlimit="3.2" d="M-733.5,71.9l-7.1,7.1"/><path fill="none" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-miterlimit="3.2" d="M-738.4,67.1l-7.1,7.1"/></g><g transform="translate(0,174.78574)"><g><rect x="36" y="-170.8" transform="matrix(0.7071 -0.7071 0.7071 0.7071 106.3831 -9.5985)" fill="#FFCC00" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="3.2" width="11.2" height="75.1"/><rect x="39.7" y="-170.8" transform="matrix(0.7071 -0.7071 0.7071 0.7071 106.3827 -9.5983)" fill="#FFCC66" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="3.2" width="3.7" height="75.1"/></g></g><polygon fill="#FFCCAA" stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="3.2" points="9.7,5.7 0.4,0.4 5.7,9.7 11.1,19 15,15 18.9,11 "/><polygon stroke="#000000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="3.2" points="3.2,2 0.4,0.4 2,3.2 3.6,5.9 4.8,4.7 6,3.6 "/></g>'

	CurrentData

	constructor(parent)
	{
			this.Parent = parent;
			this.Init();
			this.Create();
	}

	Init()
	{
		this.CurrentData = {
			px: 0,
			py: 0,
			angle: 0,
		}
	}

	Create()
	{
		this.Content.svg(this.SVG);
		this.obj = this.Content.last()
		this.obj.rotate(-45, 0, 0);
	}

	SetPosition(p, angle = 0)
	{
		var posx = this.CurrentData.px;
		var posy = this.CurrentData.py;
		this.obj.translate(p.x - posx, p.y - posy)
		this.obj.rotate(angle - this.CurrentData.angle, posx, posy)
		this.CurrentData.px = p.x
		this.CurrentData.py = p.y
		this.CurrentData.angle = angle;
		console.log(p.x, p.y)
	}

	Move(p, angle = 0, delay, duration, ease = '<>')
	{
		var posx = this.CurrentData.px;
		var posy = this.CurrentData.py;
		let transform = {
			"translateX": p.x - posx,
			"translateY": p.y - posy,
			"rotate": angle,
			'ox': 0,
			'oy': 0
		}
		this.CurrentData.px = p.x
		this.CurrentData.py = p.y
		this.CurrentData.angle += angle;
		this.Parent.AddAnimation(this.obj, {transform: transform}, delay, duration, ease)
	}

}