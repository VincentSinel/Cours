class ExpressionLitterale
{

	Coefficient = [0]

	constructor(coef = [])
	{
		this.Coefficient = coef;
	}

	isSum()
	{
		let count = 0
		for(let i = 0; i < this.Coefficient.length; i++)
		{
			if (this.Coefficient[i] != 0)
				count++;
		}
		return count > 1;
	}

	maxCoef()
	{
		for(let i = this.Coefficient.length - 1; i >= 0; i--)
		{
			if (this.Coefficient[i] != 0)
				return i;
		}
		return -1;
	}

	addExpression(expression)
	{
		let final = new ExpressionLitterale();
		let max_pow = Math.max(expression.Coefficient.length, this.Coefficient.length)
		while(final.Coefficient.length < max_pow)
		{
			final.Coefficient.push(0)
		}
		for(let i = 0; i < final.Coefficient.length; i++)
		{
			if (i >= expression.Coefficient.length)
				final.Coefficient[i] = this.Coefficient[i];
			else if (i >= this.Coefficient.length)
				final.Coefficient[i] = expression.Coefficient[i];
			else
				final.Coefficient[i] = this.Coefficient[i] + expression.Coefficient[i];
		}
		return final;
	}

	removeExpression(expression)
	{
		let final = new ExpressionLitterale();
		let max_pow = Math.max(expression.Coefficient.length, this.Coefficient.length)
		while(final.Coefficient.length < max_pow)
		{
			final.Coefficient.push(0)
		}
		for(let i = 0; i < final.Coefficient.length; i++)
		{
			if (i >= expression.Coefficient.length)
				final.Coefficient[i] = this.Coefficient[i];
			else if (i >= this.Coefficient.length)
				final.Coefficient[i] = -expression.Coefficient[i];
			else
				final.Coefficient[i] = this.Coefficient[i] - expression.Coefficient[i];
		}
		return final;
	}

	multiplyExpression(expression)
	{
		let final = new ExpressionLitterale();
		let max_pow = this.Coefficient.length + expression.Coefficient.length - 1;
		while(final.Coefficient.length < max_pow)
		{
			final.Coefficient.push(0)
		}
		for(let i = 0; i < this.Coefficient.length; i++)
		{
			for(let j = 0; j < expression.Coefficient.length; j++)
			{
				final.Coefficient[i + j] += this.Coefficient[i] * expression.Coefficient[j];
			}
		}
		return final;
	}

	addCoefficient(coef, pow)
	{
		while(this.Coefficient.length <= pow)
		{
			this.Coefficient.push(0)
		}
		this.Coefficient[pow] += coef
	}

	toString()
	{
		let exp = "";
		if (this.maxCoef() == -1)
			return "0";
		for(let i = this.Coefficient.length - 1; i >= 0; i--)
		{
			let coef = this.Coefficient[i];
			if (coef != 0)
			{
				if (exp != "" && coef > 0)
					exp += "+";
				if (i == 0)
					exp += coef.toString() + "";
				else if (i == 1)
				{
					if (coef == 1)
						exp += "x";
					else if (coef == -1)
						exp += "-x";
					else
						exp += coef.toString() + "x";
				}
				else
				{
					if (coef == 1)
						exp += "x^" + i;
					else if (coef == -1)
						exp += "-x^" + i;
					else
						exp += coef.toString() + "x^" + i;
				}
			}
		}
		return exp;
	}

	reduire(minimal = false)
	{
		return this;
	}
}



class CalculExpressionLitterale
{
	ExpressionA
	ExpressionB
	Operation = ""

	constructor(exprA, exprB, op)
	{
		this.ExpressionA = exprA
		this.ExpressionB = exprB
		this.Operation = op
	}

	reduire(minimal = false)
	{
		let exprA = this.ExpressionA.reduire(minimal);
		let exprB = this.ExpressionB.reduire(minimal);
		if (this.Operation == "+")
		{
			if (exprA instanceof ExpressionLitterale && exprB instanceof ExpressionLitterale)
				return exprA.addExpression(exprB);
			else
				return this;
		}
		else if (this.Operation == "-")
		{
			if (exprA instanceof ExpressionLitterale && exprB instanceof ExpressionLitterale)
				return exprA.removeExpression(exprB);
			else
				return this;
		}
		else if (this.Operation == "x")
		{
			if (minimal)
			{
				if (exprB instanceof CalculExpressionLitterale)
					return this;
				
				if (exprA instanceof CalculExpressionLitterale)
				{
					if (!exprB.isSum())
					{
						let temp = this.ExpressionA;
						this.ExpressionA = exprB;
						this.ExpressionB = temp;
						return this;
					}
					return this;
				}
				if (!exprA.isSum() && !exprB.isSum())
					return exprA.multiplyExpression(exprB);
				else if (!exprB.isSum())
				{
					let temp = this.ExpressionA;
					this.ExpressionA = exprB;
					this.ExpressionB = temp;
					return this;
				}
				else
					return this
			}
			else if (exprA instanceof ExpressionLitterale && exprB instanceof ExpressionLitterale)
				return exprA.multiplyExpression(exprB);
			else
				return this;
		}
		else if (this.Operation == "²")
		{
			if (minimal)
			{
				if (exprA instanceof ExpressionLitterale)
				{
					if (!exprA.isSum())
						return exprA.multiplyExpression(exprA);
					else
						return this;
				}
				else
					return this;
			}
			else if (exprA instanceof ExpressionLitterale)
				return exprA.multiplyExpression(exprA);
			else
				return this;
		}
		console.log("Unknown operation in CalculExpressionLitterale.reduire(): ", this);
		return this;
	}

	toString()
	{
		if (this.Operation == "+")
			return this.ExpressionA.toString() + "+" + this.ExpressionB.toString();
		else if (this.Operation == "-")
			return this.ExpressionA.toString() + "-" + this.ExpressionB.toString();
		else if (this.Operation == "x")
		{
			let txt = "";
			if (this.ExpressionA instanceof CalculExpressionLitterale)
			{
				if (this.ExpressionA.Operation == "²")
					txt += this.ExpressionA.toString();
				else
					txt += "(" + this.ExpressionA.toString() + ")";
			}
			else if (this.ExpressionA.isSum())
				txt += "(" + this.ExpressionA.toString() + ")";
			else
				txt += this.ExpressionA.toString();
			if (this.ExpressionB instanceof CalculExpressionLitterale)
			{
				if (this.ExpressionB.Operation == "²")
					txt += this.ExpressionB.toString();
				else
					txt += "(" + this.ExpressionB.toString() + ")";
			}
			else if (this.ExpressionB.isSum())
				txt += "(" + this.ExpressionB.toString() + ")";
			else
					txt += "\\times " + this.ExpressionB.toString();
			return txt;
		}
		else if (this.Operation == "²")
		{
			let txt = "";
			if (this.ExpressionA instanceof CalculExpressionLitterale)
				txt += "(" + this.ExpressionA.toString() + ")^2";
			else if (this.ExpressionA.isSum())
				txt += "(" + this.ExpressionA.toString() + ")^2";
			else if (this.ExpressionA.Coefficient[this.ExpressionA.maxCoef()] == 1 || this.ExpressionA.maxCoef() == 0)
				txt += this.ExpressionA.toString() + "^2";
			else
				txt += "(" + this.ExpressionA.toString() + ")^2";
			return txt;
		}
		return "";
	}
}