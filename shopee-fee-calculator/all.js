var inputPrice = document.getElementById('price');
var inputQuantity = document.getElementById('quantity');
var selectShippingFee = document.getElementById('shippingFee');
var customShippingFee = document.getElementById('customShippingFee');
var isPromotion = document.getElementById('isPromotion');
var hasDiscount = document.getElementById('hasDiscount');
var isShippingFree = document.getElementById('isShippingFree');
var calculateBtn = document.getElementById('calculateBtn');

//監聽
calculateBtn.addEventListener('click', showResult);
selectShippingFee.addEventListener('change', showInputShippingFee);


function showInputShippingFee(){
    if (selectShippingFee.value  == 'customShippingFee') {
        customShippingFee.style.display = 'block';
    } else {
        customShippingFee.style.display = 'none';
    }
}


//獲取運費值
function getShippingFee() {
    if (selectShippingFee.value == 'customShippingFee') {
        return Number(customShippingFee.value) || 0;
    
    } else {
        return Number(selectShippingFee.value) || 0;
    }
}

function calculateFees(adminRate) {
    // 每次計算時重新獲取所有值
    var price = Number(inputPrice.value);
    var quantity = Number(inputQuantity.value);
    var maxPrice = Math.min(price, 15000); //最高金額15000
    var showAdminRate = (adminRate * 100).toFixed(1);
    var shippingFee = getShippingFee();  // 獲取最新的運費值

    // 重新計算所有費用
    var adminFee = Math.round(maxPrice * quantity * adminRate);
    var processingFee = Math.round(((maxPrice * quantity) + shippingFee) * 0.02);
    var totalFee = adminFee + processingFee;
    
    // 計算訂單收入
    var orderIncome;
    if (isShippingFree.checked) {
        orderIncome = (price * quantity) - shippingFee - totalFee;
    } else {
        orderIncome = (price * quantity) - totalFee;
    }

    // 更新顯示結果
    document.getElementById('result').style.display = 'block';
    document.getElementById('transactionFee').textContent = adminFee;
    document.getElementById('processingFee').textContent = processingFee;
    document.getElementById('totalFee').textContent = totalFee;
    document.getElementById('showShippingFee').textContent = shippingFee;
    document.getElementById('showRate').textContent = showAdminRate + '%';
    document.getElementById('orderIncome').textContent = orderIncome;
}

//預設手續費
function showResult(){
    // 重新獲取運費值
    var shippingFee = getShippingFee();

    if (!isPromotion.checked && !hasDiscount.checked) {
        calculateFees(0.055);
    } else if (isPromotion.checked && !hasDiscount.checked) {
        calculateFees(0.075);
    } else if (!isPromotion.checked && hasDiscount.checked) {
        calculateFees(0.07);
    } else if (isPromotion.checked && hasDiscount.checked) {
        calculateFees(0.055);
    }
}
