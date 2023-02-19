/**
 * Le nom de la classe doit être l'id du div contenant l'animation
 */
class Animation1 extends Animation_Data
{
    CreateFrames()
    {
        for (let i = 0; i < 10; i++) {
            this.AddFrame(1.0);
        }
    }

    CreateObjects()
    {
        let reclist = []
        let txtlist = []
        for (let i = 0; i < 100; i++) {
            let rec = new Anim_Rectangle(this, this)
            let txt = new Anim_Text(this, this)
            rec.QuickAssignKeyFrame(0, {
                "X": -175 + (i % 10) * 35, 
                "Y": 175 - Math.floor(i / 10) * 35,
                "Width": 35,
                "Height": 35})
            txt.QuickAssignKeyFrame(0, {
                "X": -175 + (i % 10 + 0.5) * 35, 
                "Y": 175 - (Math.floor(i / 10) + 0.5) * 35,
                "Width": 35,
                "Height": 35,
                "Text": (i+1).toString()})
            for (let j = 1; j < this.frames.length; j++) {
                rec.QuickAssignKeyFrame(j, {
                    "ColorR": 255,
                    "ColorG": 255,
                    "ColorB": 255 
                })
            }
            reclist.push(rec);
            txtlist.push(txt);
        }
        for (let j = 1; j < this.frames.length; j++) {
            reclist[0].QuickAssignKeyFrame(j, {
                "ColorR": 255,
                "ColorG": 230,
                "ColorB": 0 
            })}

        let primes = [2,3,5,7];
        let frame = 2;
        for (let k = 0; k < 4; k++) {
            const p = primes[k]

            for (let j = frame; j < this.frames.length; j++) {
                reclist[p - 1].QuickAssignKeyFrame(j, {
                    "ColorR": 50,
                    "ColorG": 255,
                    "ColorB": 0 
                })}
            for (let i = p * 2 - 1; i < 100; i+= p)
            {
                for (let j = frame + 1; j < this.frames.length; j++) {
                    reclist[i].QuickAssignKeyFrame(j, {
                        "ColorR": 0,
                        "ColorG": 0,
                        "ColorB": 0 
                    })
                }
            }
            frame += 2
        }
        primes = [11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
        for (let k = 0; k < primes.length; k++) {
            const p = primes[k] - 1;
            reclist[p].QuickAssignKeyFrame( frame, {
                "ColorR": 50,
                "ColorG": 255,  
                "ColorB": 0 
            })
        }
    }
}