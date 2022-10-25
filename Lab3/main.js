function showVal(val) {
    document.getElementById('tipPercentage').value = val;
    this.calTip(document.getElementById('totalBill').value);
 }

 function calTip(bill) {
     if(Number(bill) > 0) {
         let tipPercent = document.getElementById('tipPercentage').value;
         let tipValue = tipPercent/100*bill;
         let tip = Math.round(tipValue*100)/100;
         document.getElementById('tipTotal').value = tip;
         let totalBillWithTip = Number(bill) + Number(tip) ;
         document.getElementById('totalBillWithTip').value = Math.round(totalBillWithTip*100)/100;
     }
     
 }

 function validateInput(inputValue){
    if(inputValue < 0){
        document.getElementById('totalBill').style.borderColor = "red";
        document.getElementById('tipSlider').disabled = true;
        document.getElementById('tipSlider').style.backgroundColor = "grey";
        let error = document.getElementById("error");
        error.textContent = "enter a valid amount to adjust tip and calcuate bill";
        error.style.color = "red";
        document.getElementById('totalBillWithTip').value = "N/A";
        document.getElementById('tipTotal').value = "N/A";
        document.getElementById('tipPercentage').value = "N/A"
    } else{
        document.getElementById('tipSlider').disabled = false;
        document.getElementById('totalBill').style.borderColor = "black";
        document.getElementById('tipSlider').style.backgroundColor = "black";
        document.getElementById('tipPercentage').value = document.getElementById('tipSlider').value;
        document.getElementById('totalBillWithTip').value = "";
        document.getElementById('tipTotal').value = ""
        document.getElementById('error').textContent = ""
        calTip(inputValue)
    }
 }