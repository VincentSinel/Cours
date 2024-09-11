class Animation1 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

        let coef = 40.0;

        let ang1 = Math.PI / 5.89;
        let ang2 = 55.0 / 180.0 * Math.PI;
        let px = cx + 67;
        let py = cy - 54;

        let line1 = this.Content.line(cx - coef * 4, cy + 80, cx + coef * 4, cy + 80)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let pointA = new Anim_Point(this)
        pointA.attr({"center": {x: cx - coef * 4, y: cy + 80}, "text": "A"})
        let pointB = new Anim_Point(this)
        pointB.attr({"center": {x: cx + coef * 4, y: cy + 80}, "text": "B"})
        let pointC = new Anim_Point(this)
        pointC.attr({"center": {x: px, y: py}, "text": "C","point-style": {'opacity': 0.0, stroke: "#000"},
        "text-style": {'opacity': 0.0, fill: "#000"}})
        pointC.AddAnimation({"point-style": {'opacity': 1.0},
            "text-style": {'opacity': 1.0}}, 7000, 1000)


        
        let px1 = cx - coef * 4 + Math.cos(ang1) * 3.8 * coef;
        let py1 = cy + 80 - Math.sin(ang1) * 3.8 * coef;
        let px2 = cx - coef * 4 + Math.cos(ang1) * 4.0 * coef;
        let py2 = cy + 80 - Math.sin(ang1) * 4.0 * coef;

        
        let px4 = cx + coef * 4 - Math.cos(ang2) * 3.8 * coef;
        let py4 = cy + 80 - Math.sin(ang2) * 3.8 * coef;
        let px5 = cx + coef * 4 - Math.cos(ang2) * 4.0 * coef;
        let py5 = cy + 80 - Math.sin(ang2) * 4.0 * coef;

        let px3 = cx - coef * 4 + Math.cos(ang1) * 7 * coef;
        let py3 = cy + 80 - Math.sin(ang1) * 7 * coef;

        let px6 = cx + coef * 4 - Math.cos(ang2) * 7 * coef;
        let py6 = cy + 80 - Math.sin(ang2) * 7 * coef;

        let line2 = this.Content.line(px2, py2, px1, py1)
        line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 1000, 1000)

        let line3 = this.Content.line(cx - coef * 4, cy + 80, px3, py3)
        line3.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}}, 3000, 1000)

        let line5 = this.Content.line(px4, py4, px5, py5)
        line5.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line5, {attr: {'stroke-opacity': 1.0}}, 4000, 1000)

        let line4 = this.Content.line(cx + coef * 4, cy + 80, px6, py6)
        line4.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line4, {attr: {'stroke-opacity': 1.0}}, 6000, 1000)
				
        let regle = new Anim_Regle(this)
        console.log(regle)
        regle.obj.scale(2.0, 2.0).translate(228,310)

        
		let rapporteur = new Anim_Rapporteur(this);
        let or = rapporteur.GetOffSet();
        rapporteur.obj.move(cx - coef * 4 + or.x, cy + 80 + or.y)
        rapporteur.obj.translate(150,-100)

        this.AddAnimation(rapporteur.obj, {transform: {'translateX': -150,'translateY': 100}}, 0, 1000)
        this.AddAnimation(rapporteur.obj, {transform: {'translateX': coef * 8,'translateY': 0}}, 2000, 1000)
        this.AddAnimation(rapporteur.obj, {attr: {'opacity': 0.0},transform: {'translateX': 0,'translateY': 200}}, 5000, 1000)
    }
}