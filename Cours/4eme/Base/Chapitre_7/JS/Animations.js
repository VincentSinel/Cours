/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */
class Animation1 extends Animation_Data
{
    CreateObjects()
    {
        let cx = this.width / 2.0;
        let cy = this.height / 2.0;


        let cos = Math.cos(-50 / 180.0 * Math.PI) 
        let sin = Math.sin(-50 / 180.0 * Math.PI)  
        let m2 = {
          x: cx - 100 + 100 * cos - 50 * sin,
          y: cy + 100 * sin + 50 * cos - 2,
        }

        let coef = 3
        let dx = (m2.x - cx + 100) / coef;
        let dy = (m2.y - cy) / coef;

        let line1 = this.Content.line(cx-200, cy - 50, cx + 90, cy + 95)
        line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

        let line2 = this.Content.line(m2.x + dx, m2.y + dy, m2.x + dx, m2.y + dy)
        line2.stroke({opacity: 0.0, color: '#F00' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}, plot: [m2.x+dx,",",m2.y+dy,m2.x+dx*1.2,",",m2.y+dy*1.2].join(' ')}, 2000, 1000)

        let line3 = this.Content.line(m2.x - dx * 5, m2.y - dy * 5, m2.x + dx * 3, m2.y + dy * 3)
        line3.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
        this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}}, 4000, 1000)

        let compas = new Anim_Compas(this)
        compas.attr({"p1": {x: cx+-50, y: cy+100}, "p2": {x: cx+50, y: cy+100}})
        compas.AddAnimation({
            "p1": {x: cx - 100, y: cy}, 
            "p2": {x: cx, y: cy + 50}
        }, 5000, 1000)
        compas.Draw(-90, 6000, 1000)
        compas.AddAnimation({
            "p1": {x: cx + 100, y: cy}, 
            "p2": {x: compas.P2.x + 200, y: compas.P2.y}
        }, 7000, 1000)

        let pointO = new Anim_Point(this)
        pointO.attr({"center": {x: cx - 100, y: cy}, "text": "O"})

        let pointM = new Anim_Point(this)
        pointM.attr({"center": {x: cx, y: cy + 50}, "text": "M"})

        let pointM2 = new Anim_Point(this)
        pointM2.attr({"center": m2, "text": "M\'", 
        "point-style": {'opacity': 0.0, stroke: "#F00"},
        "text-style": {'opacity': 0.0, fill: "#F00"}})
        pointM2.AddAnimation({"point-style": {'opacity': 1.0},
        "text-style": {'opacity': 1.0}}, 8000, 1000)
        
        let rapporteur = new Anim_Rapporteur(this);
        let or = rapporteur.GetOffSet();
        rapporteur.obj.move(cx - 100 + or.x, cy + or.y)
        rapporteur.obj.translate(150,-100)

        this.AddAnimation(rapporteur.obj, {transform: {'translateX': -150,'translateY': 100}}, 0, 1000)
        this.AddAnimation(rapporteur.obj, {transform: {'rotate': 26.5, 'ox': cx - 100, 'oy': cy}}, 1000, 1000)
        this.AddAnimation(rapporteur.obj, {attr: {'opacity': 0.0},transform: {'translateX': -200,'translatey': 0}}, 3000, 1000)
    }
}