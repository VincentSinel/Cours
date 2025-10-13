class EM
{
	// SVG Drawing
	SVG_Draw;
	PatternsMask = {};
	Size = {w:300, h:150};
	Margin = 10;
	
	constructor(preview_element, parameters = {})
	{
		this.SVG_Draw = SVG().addTo(preview_element);//'#svg_holder');
		this.SVG_Draw.attr("xml:space", "preserve");

		parameters.hasOwnProperty("size") ? this.Size = parameters.size : this.Size = {w:300, h:150};

		this.ResetSize(this.Size.w, this.Size.h);
		this.CreatePatterns();
	}

	SetSize(w,h)
	{
		if (this.Size.w == w && this.Size.h == h) return;
		this.Size.w = w;
		this.Size.h = h;
		this.ResetSize(w,h);
	}

	SetMargin(m)
	{
		if (this.Margin == m) return;
		this.Margin = m;
		this.ResetSize(this.Size.w, this.Size.h);
	}
	
	ResetSize(size_w, size_h)
	{
		this.SVG_Draw.size(size_w + this.Margin * 2, size_h + this.Margin * 2);
		this.SVG_Draw.viewbox(0, 0, size_w + this.Margin * 2, size_h + this.Margin * 2);
	}

	Clear()
	{
		this.SVG_Draw.clear()
		this.CreatePatterns()
	}
	
	CreatePatterns()
	{
		var coef = 2; // A changer pour adpater la taille des patternes
		this.PatternsMask["pattern1"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.rect(5 * coef, 5 * coef).fill('#fff')
					add.rect(5 * coef, 5 * coef).move(5 * coef, 5 * coef).fill('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern2"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.line(0,0,0,10 * coef).stroke('#fff')
					add.line(5 * coef,0,5 * coef,10 * coef).stroke('#fff') 
					add.line(10 * coef,0,10 * coef,10 * coef).stroke('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern3"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.line(0,0,10 * coef,0).stroke('#fff')
					add.line(0,5 * coef,10 * coef,5 * coef).stroke('#fff') 
					add.line(0,10 * coef,10 * coef,10 * coef).stroke('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern4"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.line(0,0,10 * coef,10 * coef).stroke('#fff')
					add.line(5 * coef,-5 * coef,15 * coef, 5 * coef).stroke('#fff') 
					add.line(-5 * coef, 5 * coef,5 * coef,15 * coef).stroke('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern5"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.line(0,10 * coef,10 * coef,0).stroke('#fff')
					add.line(-5 * coef, 5 * coef,5 * coef,-5 * coef).stroke('#fff') 
					add.line(5 * coef,15 * coef,15 * coef, 5 * coef).stroke('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern6"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.circle(4 * coef).move(5 * coef, 5 * coef).fill('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern7"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.circle(2 * coef).move(0,0).fill('#fff')
					add.circle(2 * coef).move(10 * coef,0).fill('#fff')
					add.circle(2 * coef).move(0,10 * coef).fill('#fff')
					add.circle(2 * coef).move(10 * coef,10 * coef).fill('#fff')
					add.circle(2 * coef).move(5 * coef, 5 * coef).fill('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern8"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.polygon('0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2').transform({scale: coef}).fill('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern9"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.circle(1 * coef).move(5 * coef, 5 * coef).fill('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern10"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.path("M 0,5 A 5,5,90,0,0,5,0 M 5,0 A 5,5,90,0,0,10,5 M 0,5 A 5,5,180,0,0,10,5 M 0,-5 A 5,5,180,0,0,10,-5").transform({scale: coef}).fill("none").stroke('#fff')
				}).url()
				)
		)
	
		this.PatternsMask["pattern11"] = this.SVG_Draw.mask().add(
			this.SVG_Draw.rect("100%", "100%").fill(
				this.SVG_Draw.pattern(10 * coef, 10 * coef, function(add) {
					add.polygon('0,0 2.5,0 0,2.5').transform({scale: coef}).fill('#fff')
					add.polygon('10,10 7.5,10 10,7.5').transform({scale: coef}).fill('#fff')
					add.polygon('10,0 10,5 5,10 5,7.5 7.5,5 5,5 5,2.5 2.5,5 0,5 5,0').transform({scale: coef}).fill('#fff')
				}).url()
				)
		)
	}

}