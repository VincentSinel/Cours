/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */
class Animation1 extends Animation_Data
{

    CreateObjects()
    {
        let size = 35
        let dx = this.width / 2.0 - 5 * size;
        let dy = this.height / 2.0 - 5 * size;
        let count = 0;
        for (let i = 0; i < 100; i++) 
        {
            let x = dx + (i % 10) * size;
            let y = dy + Math.floor(i / 10) * size;
            let rect = this.Content.rect(size, size).move(x, y).fill('#FFF').stroke('black');
            let v = i+1;
            let txt = this.Content.text(v.toString())
            .center(x, y).dmove(size / 2.0, size / 2.0)
            .fill('#000').font('size', 18).font('family', 'Bahnschrift');
            
            if (v == 1)
                this.AddAnimation(rect, {attr: {'fill': '#FF0' }}, 0, 1000)
            else if (v == 2)
                this.AddAnimation(rect, {attr: {'fill': '#0F0' }}, 1000, 1000)
            else if (v == 3)
                this.AddAnimation(rect, {attr: {'fill': '#0F0' }}, 3000, 1000)
            else if (v == 5)
                this.AddAnimation(rect, {attr: {'fill': '#0F0' }}, 5000, 1000)
            else if (v == 7)
                this.AddAnimation(rect, {attr: {'fill': '#0F0' }}, 7000, 1000)
            else if (v % 2 == 0)
                this.AddAnimation(rect, {attr: {'fill': '#555' }}, 2000, 1000)
            else if (v % 3 == 0)
                this.AddAnimation(rect, {attr: {'fill': '#555' }}, 4000, 1000)
            else if (v % 5 == 0)
                this.AddAnimation(rect, {attr: {'fill': '#555' }}, 6000, 1000)
            else if (v % 7 == 0)
                this.AddAnimation(rect, {attr: {'fill': '#555' }}, 8000, 1000)
            else
            {
                this.AddAnimation(rect, {attr: {'fill': '#0F0' }}, 9000 + count * 50, 200)
                count += 1;
            }
        }
    }
}