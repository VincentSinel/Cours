class F_Base
{
	EM;

	Parameters = {};
	svg_group = {};

	Object = new Set();

	size;
	
	colors = ["#e60049B3", "#0bb4ffB3", "#50e991B3", "#e6d800B3", "#9b19f5B3", "#ffa300B3", "#dc0ab4B3", "#b3d4ffB3", "#00bfa0B3", "#f0ccccB3"];


	constructor(em)
	{
		if (em == undefined)
			return;
		this.EM = em;
		
		this.EM.SVG_Draw.clear();
	}

	DrawObjects(drawing_droup)
	{
		let i = 0;
		this.Object.forEach(obj => {
			obj.Recreate(drawing_droup, i);
			i++;
		});
	}


	// Version 4.0
	pSBC=(p,c0,c1,l)=>{
		let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
		if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
		if(!this.pSBCr)this.pSBCr=(d)=>{
				let n=d.length,x={};
				if(n>9){
						[r,g,b,a]=d=d.split(","),n=d.length;
						if(n<3||n>4)return null;
						x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
				}else{
						if(n==8||n==6||n<4)return null;
						if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
						d=i(d.slice(1),16);
						if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
						else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
				}return x};
		h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
		if(!f||!t)return null;
		if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
		else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
		a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
		if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
		else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
	}


	DrawEllipseArc(group, center, starta, enda, rx, ry, close = true)
	{
		let sx = Round(center.x + rx * Math.cos(starta * Math.PI / 180.0),3);
		let sy = Round(center.y + ry * Math.sin(starta * Math.PI / 180.0),3);

		let ex = Round(center.x + rx * Math.cos(enda * Math.PI / 180.0),3);
		let ey = Round(center.y + ry * Math.sin(enda * Math.PI / 180.0),3);

		let txt = "M" + sx + " " + sy + " A ";
		txt += Round(rx,3) + " " + Round(ry,3) + " 0 ";
		if (Math.abs(enda - starta) < 360)
		{
			if (Math.abs(enda - starta) > 180)
				txt += "1 "
			else
				txt += "0 "
			if (enda < starta)
				txt += "0 "
			else
				txt += "1 " 
			
			txt += ex + " " + ey
			if (close)
			{
				txt += "L" + center.x + " " + center.y;
				return group.path(txt + "Z");
			}
			else
				return group.path(txt);
		}
		else
		{
			return group.ellipse(rx * 2, ry * 2).center(center.x, center.y);
		}
	}
}