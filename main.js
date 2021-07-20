function onReady(){
    const mortCalc = document.getElementById('mortCalc');
    //For sliders
    const years = document.getElementById('years');
    const interest = document.getElementById('interest');
    //For inputs
    const loanAmt = document.getElementById('loanAmt');
    const annualTax = document.getElementById('annualTax');
    const insurance = document.getElementById('insurance');
    //For Outputs
    const pAndI = document.getElementById('pAndI');
    const tax = document.getElementById('tax');
    const insuranceCalc = document.getElementById('insuranceCalc');
    const total = document.getElementById('total');
    
    //slider logic
    const inputElements = document.querySelectorAll('[type="range"]');
    
    const handleInput = (inputElement) => {
      let isChanging = false;
    
      const setCSSProperty = () => {
        var percent =
          ((inputElement.value - inputElement.min) /
          (inputElement.max - inputElement.min)) *
          100;
        inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);
      }
    
      const handleMove = () => {
        if (!isChanging) return;
        setCSSProperty();
      };
      const handleUpAndLeave = () => isChanging = false;
      const handleDown = () => isChanging = true;
    
      inputElement.addEventListener("mousemove", handleMove);
      inputElement.addEventListener("mousedown", handleDown);
      inputElement.addEventListener("mouseup", handleUpAndLeave);
      inputElement.addEventListener("mouseleave", handleUpAndLeave);
      inputElement.addEventListener("click", setCSSProperty);
    
      // Init input
      setCSSProperty();
    }
    inputElements.forEach(handleInput);

    //formatting numbers to currency
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    //error handling
    const amtError = document.querySelector('#loanAmt + span.error');
    const taxError = document.querySelector('#annualTax + span.error');
    const insError = document.querySelector('#insurance + span.error');
    loanAmt.addEventListener('input', function (event) {
        if (loanAmt.validity.valid) {
          amtError.textContent = ''; 
          amtError.className = 'error'; 
          loanAmt.classList.remove("invalid");
        } else {
          showError();
        }
      });
      annualTax.addEventListener('input', function (event) {
        if (annualTax.validity.valid) {
          taxError.textContent = ''; 
          taxError.className = 'error'; 
          annualTax.classList.remove("invalid");
        } else {
          showError();
        }
      });
      insurance.addEventListener('input', function (event) {
        if (insurance.validity.valid) {
          insError.textContent = ''; 
          insError.className = 'error'; 
          annualTax.classList.remove("invalid");
        } else {
          showError();
        }
      });
    const showError = () =>{
        if(loanAmt.validity.valueMissing){
            amtError.textContent= "Mandatory Field";
            loanAmt.classList.add("invalid");
        }else if(annualTax.validity.valueMissing){
            taxError.textContent = "Mandatory Field";
            annualTax.classList.add("invalid"); 
        }else if(insurance.validity.valueMissing){
            insError.textContent = "Mandatory Field";
            insurance.classList.add("invalid");
        }
    }
    mortCalc.addEventListener('submit', (e)=>{
        //get and append principal and interest
        
        if(!loanAmt.validity.valid || !annualTax.validity.valid || !insurance.validity.valid){
            showError();
        }else{
        //totals needed for calcs
        let totalLoanAmt = calc.getLoanAmount(loanAmt.value);
        let totalYears = calc.getYears(years.value);
        
        //total principle and interest
        let totalPrinInt = calc.getPrincipalAndInterest(interest.value, totalLoanAmt, totalYears);
        let formattedPAndI = formatter.format(totalPrinInt);
        // gets rid of any previous number if you're submitting more 
        // than once or want to change data after submit
        pAndI.innerHTML = '';
        pAndI.append(formattedPAndI);

        //total taxes
        let totalTax = calc.getTax(annualTax.value);
        let formattedTotalTax =formatter.format(totalTax);
        tax.innerHTML = '';
        tax.append(formattedTotalTax);
        
        //total insurance
        let totalInsurance = calc.getInsurance(insurance.value);
        let formattedInsuance = formatter.format(totalInsurance);
        insuranceCalc.innerHTML = '';
        insuranceCalc.append(formattedInsuance);
        
        //total monthly payment
        let totalMonthlyPmt = calc.getMonthlyPayment(totalPrinInt,totalTax,totalInsurance);
        let formattedTotal = formatter.format(totalMonthlyPmt);
        total.innerHTML = '';
        total.append(formattedTotal);  
    }     
    })
}

window.onload = function() {
    onReady();
 }