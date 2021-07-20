class Calc{
    constructor(years, interest, amount, tax, insurance){
        this.years = years;
        this.interest = interest;
        this.amount = amount;
        this.tax = tax;
        this.insurance = insurance;
    }
    getLoanAmount(n){
        this.amount = n;
        return this.amount;
    }
    getYears(n){
        this.years = n;
        return this.years;
    }
    getPrincipalAndInterest(n, amount, years){
        this.interest = ((n / 100) / 12)* amount / (1-Math.pow((1 + ((n / 100)/12)), -years*12));
        return this.interest;
    }
    getTax(n){
        this.tax = n/12;
        return this.tax;
        
    }
    getInsurance(n){
        this.insurance = n/12;
        return this.insurance;
    }
    getMonthlyPayment(totalPrinInterest, totalTax, totalInsurance){
        let totalMonthlyPmt = totalPrinInterest + totalTax + totalInsurance;
        return totalMonthlyPmt;
    }

}
const calc = new Calc();