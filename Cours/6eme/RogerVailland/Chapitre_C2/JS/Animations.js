/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */
class Animation1 extends Animation_Data
{
    CreateObjects()
    {
        
        let stroke_style = {color: "#F77943", width: 5,linecap: 'round', linejoin: 'round', "opacity" : 0.0}

        let line1 = this.Content.line(65, 45, 65, 45) //this.Content.line(65, 15, 65,15)
        line1.stroke(stroke_style);
        this.AddAnimation(line1, {attr: {'stroke-opacity': 1.0}, plot: [65, 45, 95, 15]}, 0, 500, "-")
        this.AddAnimation(line1, {attr: {'stroke-opacity': 0.0}, plot: [95, 15, 95, 15]}, 1200, 500, "-")

        let line2 = this.Content.line(95, 15, 95, 15)
        line2.stroke(stroke_style);
        this.AddAnimation(line2, {attr: {'stroke-opacity': 1.0}, plot: [95, 15, 65, 15]}, 400, 500, "-")
        this.AddAnimation(line2, {attr: {'stroke-opacity': 0.0}, plot: [65, 15, 65, 15]}, 1600, 500, "-")

        let line3 = this.Content.line(65, 15, 65, 15)
        line3.stroke(stroke_style);
        this.AddAnimation(line3, {attr: {'stroke-opacity': 1.0}, plot: [65, 15, 95,45]}, 800, 500, "-")
        this.AddAnimation(line3, {attr: {'stroke-opacity': 0.0}, plot: [95, 45, 95,45]}, 2000, 500, "-")

    }
}