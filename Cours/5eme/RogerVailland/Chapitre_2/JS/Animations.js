/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */

// Animation perpendiculaire à l'equerre
class Animation1 extends Animation_Data
{

    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;

				let coef = 40.0;

				let px = cx + coef * 4 - 2.75 * coef;
				let py = cy + 80 - Math.sqrt(8.5) * coef

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
					"text-style": {'opacity': 1.0}}, 10000, 1000)


        let line2 = this.Content.line(cx - coef * 4, cy + 80, px, py)
        line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 11000, 1000)

        let line3 = this.Content.line(cx + coef * 4, cy + 80, px, py)
        line3.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}}, 11000, 1000)

				
				let regle = new Anim_Regle(this)
				regle.obj.rotate(180, 0, 0).scale(2.0, 2.0).translate(250,50)

				let compas = new Anim_Compas(this)
        compas.attr({
            "p1": {x: cx - 200, y: cy - 50},
            "p2": {x: cx - 200, y: cy + 55},
        })

        compas.AddAnimation({
                "p1": {x: cx - coef * 4 + 80, y: 65},
                "p2": {x: cx + coef * 4, y: 65}
            }, 0, 1000 )
				compas.AddAnimation({
								"p1": {x: cx - coef * 4, y: cy + 80},
								"p2": {x: cx + coef * 4 - 80, y: cy + 80}
						}, 2000, 1000 )
        
        compas.Rotate(-20, 3000, 1000)
        compas.Draw(-30, 4000, 1000)

        compas.AddAnimation({
            "p1": {x: cx + coef * 4, y: 65},
            "p2": {x: cx - coef * 4 + 160, y: 65}
        }, 5000, 1000)
				compas.AddAnimation({
								"p1": {x: cx + coef * 4, y: cy + 80},
								"p2": {x: cx - coef * 4 + 160, y: cy + 80}
						}, 7000, 1000 )
        
        compas.Rotate(30, 8000, 1000)
        compas.Draw(45, 9000, 1000)

        compas.AddAnimation({
                "p1": {x: cx + 200, y: cy + 80},
                "p2": {x: cx + 200, y: cy - 50},
                "arms": {opacity: 0.0},
                "pen": {opacity: 0.0},
                "head": {opacity: 0.0},
            }, 10000, 1000 )
        
    }
}

class Animation2 extends Animation_Data
{

    CreateObjects()
    {
			let cx = this.width / 2.0;
			let cy = this.height / 2.0;

			let coef = 40.0;

			let ang = Math.PI / 5.89
			let px = cx - coef * 4 + Math.cos(ang) * 5 * coef;
			let py = cy + 80 - Math.sin(ang) * 5 * coef;

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
					"text-style": {'opacity': 1.0}}, 10000, 1000)


			
			let px1 = cx - coef * 4 + Math.cos(ang) * 3.8 * coef;
			let py1 = cy + 80 - Math.sin(ang) * 3.8 * coef;
			let px2 = cx - coef * 4 + Math.cos(ang) * 4.0 * coef;
			let py2 = cy + 80 - Math.sin(ang) * 4.0 * coef;

			let px3 = cx - coef * 4 + Math.cos(ang) * 7 * coef;
			let py3 = cy + 80 - Math.sin(ang) * 7 * coef;

			let line2 = this.Content.line(px2, py2, px1, py1)
			line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
			this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 1000, 1000)

			let line3 = this.Content.line(cx - coef * 4, cy + 80, px3, py3)
			line3.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
			this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}}, 3000, 1000)

			let line4 = this.Content.line(cx + coef * 4, cy + 80, px, py)
			line4.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
			this.AddAnimation(line4, {attr: {'stroke-opacity': 1.0}}, 11000, 1000)
			
			let regle = new Anim_Regle(this)
			regle.obj.rotate(180, 0, 0).scale(2.0, 2.0).translate(250,50)

			let compas = new Anim_Compas(this)
			compas.attr({
					"p1": {x: cx - 200, y: cy - 50},
					"p2": {x: cx - 200, y: cy + 55},
					"arms": {opacity: 0.0},
					"pen": {opacity: 0.0},
					"head": {opacity: 0.0},
			})

			compas.AddAnimation({
							"p1": {x: cx - coef * 4 + 120, y: 65},
							"p2": {x: cx + coef * 4, y: 65},
							"arms": {opacity: 1.0},
							"pen": {opacity: 1.0},
							"head": {opacity: 1.0},
					}, 4000, 1000 )
			compas.AddAnimation({
											"p1": {x: cx - coef * 4, y: cy + 80},
											"p2": {x: cx + coef * 4 - 120, y: cy + 80}
							}, 5000, 1000 )
			
			compas.Rotate(-20, 6000, 1000)
			compas.Draw(-30, 7000, 1000)

			compas.AddAnimation({
							"p1": {x: cx + 200, y: cy + 80},
							"p2": {x: cx + 200, y: cy - 50},
							"arms": {opacity: 0.0},
							"pen": {opacity: 0.0},
							"head": {opacity: 0.0},
					}, 8000, 1000 )
			
			let rapporteur = new Anim_Rapporteur(this);
			let or = rapporteur.GetOffSet();
			rapporteur.obj.move(cx - coef * 4 + or.x, cy + 80 + or.y)
			rapporteur.obj.translate(150,-100)

			this.AddAnimation(rapporteur.obj, {transform: {'translateX': -150,'translateY': 100}}, 0, 1000)
			this.AddAnimation(rapporteur.obj, {attr: {'opacity': 0.0},transform: {'translateX': 0,'translateY': 200}}, 2000, 1000)

    }
}

class Animation3 extends Animation_Data
{

	CreateObjects()
	{
			let cx = this.width / 2.0;
			let cy = this.height / 2.0;

			let coef = 40.0;

			let ang = Math.PI / 5.89
			let px = cx - coef * 4 + 86;
			let py = cy + 80 - 51;

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
					"text-style": {'opacity': 1.0}}, 10000, 1000)


			
			let px1 = cx - coef * 4 + Math.cos(ang) * 3.8 * coef;
			let py1 = cy + 80 - Math.sin(ang) * 3.8 * coef;
			let px2 = cx - coef * 4 + Math.cos(ang) * 4.0 * coef;
			let py2 = cy + 80 - Math.sin(ang) * 4.0 * coef;

			let px3 = cx - coef * 4 + Math.cos(ang) * 7 * coef;
			let py3 = cy + 80 - Math.sin(ang) * 7 * coef;

			let line2 = this.Content.line(px2, py2, px1, py1)
			line2.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
			this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}}, 1000, 1000)

			let line3 = this.Content.line(cx - coef * 4, cy + 80, px3, py3)
			line3.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
			this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}}, 3000, 1000)

			let line4 = this.Content.line(cx + coef * 4, cy + 80, px, py)
			line4.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
			this.AddAnimation(line4, {attr: {'stroke-opacity': 1.0}}, 11000, 1000)
			
			let regle = new Anim_Regle(this)
			regle.obj.rotate(180, 0, 0).scale(2.0, 2.0).translate(250,50)

			let compas = new Anim_Compas(this)
			compas.attr({
					"p1": {x: cx - 200, y: cy - 50},
					"p2": {x: cx - 200, y: cy + 55},
					"arms": {opacity: 0.0},
					"pen": {opacity: 0.0},
					"head": {opacity: 0.0},
			})

			compas.AddAnimation({
							"p1": {x: cx + coef * 4, y: 65},
							"p2": {x: cx - coef * 4 + 80, y: 65},
							"arms": {opacity: 1.0},
							"pen": {opacity: 1.0},
							"head": {opacity: 1.0},
					}, 4000, 1000 )
			compas.AddAnimation({
							"p1": {x: cx + coef * 4, y: cy + 80},
							"p2": {x: cx - coef * 4 + 80, y: cy + 80}
					}, 6000, 1000 )
			
			compas.Draw(40, 7000, 1000)

			compas.AddAnimation({
							"p1": {x: cx + 200, y: cy + 80},
							"p2": {x: cx + 200, y: cy - 50},
							"arms": {opacity: 0.0},
							"pen": {opacity: 0.0},
							"head": {opacity: 0.0},
					}, 8000, 1000 )
			
			let rapporteur = new Anim_Rapporteur(this);
			let or = rapporteur.GetOffSet();
			rapporteur.obj.move(cx - coef * 4 + or.x, cy + 80 + or.y)
			rapporteur.obj.translate(150,-100)

			this.AddAnimation(rapporteur.obj, {transform: {'translateX': -150,'translateY': 100}}, 0, 1000)
			this.AddAnimation(rapporteur.obj, {attr: {'opacity': 0.0},transform: {'translateX': 0,'translateY': 200}}, 2000, 1000)

	}
}

class Animation4 extends Animation_Data
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