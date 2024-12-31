var promotionDay2025={
    1: [11, 12, 18, 25], // 一月
    2: [2, 18, 19, 25],  // 二月
    3: [3, 4, 18, 25],   // 三月
    4: [4, 18, 19, 25],  // 四月
    5: [5, 6, 18, 25],   // 五月
    6: [6, 18, 19, 25],  // 六月
    7: [7, 8, 18, 25],   // 七月
    8: [8, 9, 18, 25],   // 八月
    9: [9, 10, 18, 25],  // 九月
    10: [10, 11, 18, 25],// 十月
    11: [11, 12, 18, 25],// 十一月
    12: [12, 13, 18, 25] // 十二月
};
var inputPrice = document.getElementById('price');
var inputQuantity = document.getElementById('quantity');
var selectShippingFee = document.getElementById('shippingFee');
var customShippingFee = document.getElementById('customShippingFee');
var isPromotion = document.getElementById('isPromotion');
var hasDiscount = document.getElementById('hasDiscount');
var isShippingFree = document.getElementById('isShippingFree');
var calculateBtn = document.getElementById('calculateBtn');
var  promotionAlert = document.getElementById('promotion-alert');

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

//判斷今天是否為促銷日
function isTodayPromotionDay() {
  var today = new Date();
  var currentMonth = today.getMonth() + 1;  // 取得當前月份
  var currentDay = today.getDate();         // 取得當前日期


    // 判斷本月是否有促銷日
  var promotionDays = promotionDay2025[currentMonth] || [];
  // if (!promotionDays) {
  //     console.log("本月沒有促銷日");
  //     return false;
  // }

  if (promotionDays.includes(currentDay)){
      promotionAlert.style.display = 'block';
      document.getElementById('promotion-alert-text').textContent = '今天是蝦皮促銷日，手續費率7.5%';
      console.log("今天是促銷日");
  } else {
      console.log("今天不是促銷日");
  }
}

isTodayPromotionDay();

