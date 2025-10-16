class Animation2 extends Animation_Data
{

  CreateObjects()
  {
      let cx = this.width / 2.0;
      let cy = this.height / 2.0;

      let line1 = this.Content.line(cx-100, cy + 50, cx + 100, cy + 50)
      line1.stroke({color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})

      
      let crayon = new Anim_Crayon(this);
      crayon.SetPosition({x: 20,y: 20}, 240)

      let cos = Math.cos(-62 / 180.0 * Math.PI) 
      let sin = Math.sin(-62 / 180.0 * Math.PI)  
      let m2 = {
        x: cx - 100 + 113 * cos,
        y: cy + 50 + 113 * sin,
      }

      let coef = 3
      let dx = (m2.x - cx + 100) / coef;
      let dy = (m2.y - cy - 50) / coef;


      let line2 = this.Content.line(m2.x + dx, m2.y + dy, m2.x + dx, m2.y + dy)
      line2.stroke({opacity: 0.0, color: '#F00' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
      this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}, plot: [m2.x+dx,",",m2.y+dy,m2.x+dx*1.2,",",m2.y+dy*1.2].join(' ')}, 2000, 300)
      
      let line3 = this.Content.line(m2.x - dx * 5, m2.y - dy * 5, m2.x + dx * 3, m2.y + dy * 3)
      line3.stroke({opacity: 0.0, color: '#00F' ,'stroke-width': 1 ,linecap: 'round', linejoin: 'round'})
      this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}}, 4000, 1000)

      crayon.Move({x: m2.x + dx, y: m2.y + dy}, 0, 1000, 500)
      crayon.Move({x: m2.x + dx*1.2, y: m2.y + dy*1.2}, 0, 2000, 300)
      crayon.Move({x: cx, y: 20}, 0, 3000, 1000)
      this.AddAnimation(crayon.obj, {attr: {'opacity': 0.0}}, 3000, 1000)


      let pointA = new Anim_Point(this)
      pointA.attr({"center": {x: cx-100, y: cy+50}, "text": "O"}) // 61°
      
      let rapporteur = new Anim_Rapporteur(this);
      let or = rapporteur.GetOffSet();
      rapporteur.obj.move(cx - 100 + or.x, cy + 50 + or.y)
      rapporteur.obj.translate(150,-100)

      this.AddAnimation(rapporteur.obj, {transform: {'translateX': -150,'translateY': 100}}, 0, 1000)
      this.AddAnimation(rapporteur.obj, {attr: {'opacity': 0.0},transform: {'translateX': 200,'translateY': 200}}, 3000, 1000)

  }
}