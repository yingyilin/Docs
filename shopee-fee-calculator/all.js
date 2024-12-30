var inputPrice = document.getElementById('price');
var inputQuantity = document.getElementById('quantity');
var inputShippingFee = document.getElementById('shippingFee');
var isPromotion = document.getElementById('isPromotion');
var hasDiscount = document.getElementById('hasDiscount');
var isShippingFree = document.getElementById('isShippingFree');
var calculateBtn = document.getElementById('calculateBtn');

//監聽
calculateBtn.addEventListener('click', showResult);

function calculateFees(adminRate){
    var price = Number(inputPrice.value) ;
    var quantity = Number(inputQuantity.value);
    var shippingFee = Number(inputShippingFee.value) ;
    var maxPrice = Math.min(price, 15000); //最高金額15000
    var showAdminRate = Math.round(adminRate * 100);
    //計算公式
    var adminFee = Math.round(maxPrice * quantity * adminRate);
    var processingFee = Math.round(((maxPrice * quantity) + shippingFee) * 0.02);
    var totalFee = adminFee + processingFee;
    var orderIncome = (price * quantity)  - totalFee ;

    if (isShippingFree.checked) {
        orderIncome = (price * quantity) - shippingFee - totalFee ;
    }

    //顯示到html
    document.getElementById('result').style.display = 'block';
    document.getElementById('transactionFee').textContent = adminFee;
    document.getElementById('processingFee').textContent = processingFee;
    document.getElementById('totalFee').textContent = totalFee;
    document.getElementById('showRate').textContent = showAdminRate + '%';
    document.getElementById('orderIncome').textContent = orderIncome;

}

//預設手續費
function showResult(){
    if (!isPromotion.checked && !hasDiscount.checked) {
        calculateFees(0.055);
    };
    
     //勾選為促銷期間
     if (isPromotion.checked) {
        calculateFees(0.075);
        
    };
    
    //勾選參與免運補貼/蝦幣回饋
    if (hasDiscount.checked) {
        calculateFees(0.07);
    };
}
