var pavage;


class Pavage{

    Canvas_width = 300;
    Canvas_height = 300;

    draw;

    size = 40.0;
    angle = Math.atan2(1.0, 3.0);
    lenght = (Math.cos(this.angle) * 2 -  Math.sin(this.angle)) * this.size * 2.0

    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    pointid = 0
    pointsize = 3;
    circler = 18;

    DrawPavage()
    {
        this.draw = SVG().addTo('#activiteIntro').size(this.Canvas_width, this.Canvas_height)
        let x = this.Canvas_width / 2.0;
        let y = this.Canvas_height / 2.0;

        let e = this.lenght * (1 - Math.sin(this.angle));
        let mx = Math.floor((this.Canvas_width / 2.0) / (e) + 1);
        let my1 = Math.floor((this.Canvas_height / 2.0 + e) / (e * 2))
        let my2 = Math.floor((this.Canvas_height / 2.0) / (e * 2) + 1)
        
        let points = []
        for (let dx = -mx; dx <= mx; dx++) {
            if(dx % 2 == 0)
            {
                for (let dy = -my1; dy <= my1; dy++) 
                {
                    points.push(this.DrawComboPolygone(x + this.lenght * dx, y + this.lenght * 2 * dy, dx == dy && dx == 0));
                }
            }
            else
            {
                for (let dy = -my2; dy < my2; dy++) 
                {
                    points.push(this.DrawComboPolygone(x + this.lenght * dx, y + this.lenght * (2* dy + 1)));
                }
            }
        }

        points.forEach(uniq => {
            uniq.forEach(element => {
                let x = element.x;
                let y = element.y;
                this.draw.line(x-this.pointsize, y-this.pointsize, x+this.pointsize, y+this.pointsize).stroke({ color: '#fff', width: 1, linecap: 'round' })
                this.draw.line(x-this.pointsize, y+this.pointsize, x+this.pointsize, y-this.pointsize).stroke({ color: '#fff', width: 1, linecap: 'round' })
    
                let text = this.draw.text(this.alphabet[this.pointid])
                text.move(x, y)
                text.font({ fill: '#fff', family: 'Bahnschrift', size: 12, anchor:'middle' })

                this.pointid += 1;
            });
        })

        this.DrawFigureID(x + this.lenght/2, y + this.lenght / 4, '1');
        this.DrawFigureID(x + this.lenght/4, y - this.lenght / 2, '2');
        this.DrawFigureID(x - this.lenght/4, y + this.lenght / 2, '3');
        this.DrawFigureID(x - this.lenght/2, y - this.lenght / 4, '4');

        this.DrawFigureID(x + this.lenght/4*3, y - this.lenght / 2, '5');
        this.DrawFigureID(x - this.lenght/4*3, y + this.lenght / 2, '6');

        this.DrawFigureID(x + this.lenght/2, y + this.lenght / 4 * 3, '7');
        this.DrawFigureID(x - this.lenght/2, y - this.lenght / 4 * 3, '8');

        
    }

    DrawFigureID(ox, oy, content)
    {
        let circle = this.draw.circle(this.circler).fill('none    ').stroke("#fff").move(ox - this.circler / 2.0,oy - this.circler / 2.0);
        let text = this.draw.text(content)
        text.move(ox, oy - 8)
        text.font({ fill: '#fff', family: 'Bahnschrift', size: 12, anchor:'middle' })
    }

    DrawComboPolygone(ox, oy, namepoints = false)
    {
        let points = [];
        let p = this.DrawPolygone(ox, oy, 0, "#FDC463")
        p.forEach(element => {
            points.push({x: element[0], y: element[1]})
        });
        p = this.DrawPolygone(ox, oy, 90, "#ADEBF6")
        for(let i = 3; i < p.length; i++) {
            points.push({x: p[i][0], y: p[i][1]})
        }
        p = this.DrawPolygone(ox, oy, 180, "#465058")
        for(let i = 3; i < p.length; i++) {
            points.push({x: p[i][0], y: p[i][1]})
        }
        p = this.DrawPolygone(ox, oy, 270, "#F77C55")
        for(let i = 3; i < p.length - 2; i++) {
            points.push({x: p[i][0], y: p[i][1]})
        }
        if (namepoints)
        {
            return points
        }
        else{
            return []
        }
    }


    
    
    DrawPolygone(ox, oy, ang = 0, color = "#f06")
    {
        let d = this.size;
        let a90 = 0.5 * Math.PI;
        let a = this.angle;

        let ta = ang/ 180.0 * Math.PI;

        let point = [];

        // point.push([ox, oy]);
        ta += a;
        let x = ox //+ d*2*Math.cos(ta);
        let y = oy //+ d*2*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);
        ta += a90;
        x += d*Math.cos(ta);
        y += d*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);
        ta -= a90;
        x += d*2*Math.cos(ta);
        y += d*2*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);
        ta += a90 * 2 - a * 2;
        x += d*2*Math.cos(ta);
        y += d*2*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);
        ta -= a90;
        x += d*Math.cos(ta);
        y += d*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);
        ta += a90;
        x += d*Math.cos(ta);
        y += d*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);
        ta += a90;
        x += d*2*Math.cos(ta);
        y += d*2*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);
        
        ta += a*2;
        x += d*2*Math.cos(ta);
        y += d*2*Math.sin(ta);
        point.push([this.Round(x, 1), this.Round(y, 1)]);

        var polygon = this.draw.polygon('')
        polygon.fill(color);
        polygon.plot(point);
        return point;
    }

    Round(value, decimal = 0)
    {
        return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal)
    }

}
