var list = document.querySelector('.list-section');
var send = document.querySelector('.check-result');
var bmiResult = document.querySelector('.show-result');
var resetBtn = document.querySelector('.reset-btn');
var data = JSON.parse(localStorage.getItem('bmiData')) || [];


//監聽與更新
send.addEventListener('click', addData);
send.addEventListener('click', showResult);
resetBtn.addEventListener('click', resetResult);


//計算BMI
function calculateBMI (height,weight){
    var heightInMeters = height / 100 ; 
    return (weight/(heightInMeters*heightInMeters)).toFixed(2); 
}

//BMI等級
function classfyBmiLevel(bmiValue) {
    if (bmiValue < 18.5 ) {
        return '體重過輕';
    } else if (bmiValue < 24.9){
        return '體重正常';
    } else if ( bmiValue < 29.9){
        return '體重過重';
    } else if ( bmiValue < 34.9){
        return '輕度肥胖';
    } else if ( bmiValue < 39.9) {
        return '中度肥胖';
    } else {
        return '嚴重肥胖';
    };
}

//定義bmi顏色
function getBorderColor(level) {
    var borderColors = {
        '體重過輕': 'var(--underweight)',
        '體重正常': 'var(--normal)',
        '體重過重': 'var(--overweight)',
        '輕度肥胖': 'var(--obesseI)',
        '中度肥胖': 'var(--obesseII)',
        '嚴重肥胖': 'var(--obesseIII)',
    };
    // 根據傳入的level返回對應的顏色，如果沒有找到則返回預設顏色
    return borderColors[level] || 'var(--normal)';
}


//新增事件到local storage
function addData(e){
    e.preventDefault();
    var height = document.querySelector('.inputHeight').value;
    var weight = document.querySelector('.inputWeight').value;
    var currentTime = new Date().toLocaleString('zh-TW', {
       year: 'numeric',
       month: '2-digit',
       day: '2-digit',
       hour: '2-digit',
       minute: '2-digit',
       hour12: false // 24小時制
   });
    
    //BMI陣列
    var bmiValue = calculateBMI(height,weight);
    var bmiData = {
        height: height,
        weight: weight,
        bmi: bmiValue,
        level: classfyBmiLevel(bmiValue),
        date: currentTime,
    };

    data.push(bmiData);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));

    //顯示點擊的bmi結果
    document.querySelector('.bmi-number').textContent =  bmiValue ;
    document.querySelector('.result-level').textContent = classfyBmiLevel(bmiValue);
    document.querySelector('.show-result').style.color = getBorderColor(bmiData.level);
    document.querySelector('.reset-btn').style.backgroundColor = getBorderColor(bmiData.level);

}


//顯示bmi結果
function showResult(){
    bmiResult.style.display = 'flex' ; 
    send.style.display = 'none';
}

// Reset成空狀態
function resetResult(){
    var heightInput = document.querySelector('.inputHeight');
    var weightInput = document.querySelector('.inputWeight');

    bmiResult.style.display = 'none' ; 
    send.style.display = 'block';

    //同時清空輸入值
    heightInput.value = '';
    weightInput.value = '';
}


//印出BMI List
function updateList() {
    var str = '';
    var len = data.length;
    for (let i = 0; i < len; i++) {
        // 根據 BMI 等級設置邊框顏色
        var borderColor = getBorderColor(data[i].level);

        str +=  `<div class="history-item" style="border-left: 7px solid ${borderColor};">
        <div class="list-content-m"> ${data[i].level} </div>
        <div class="content-group">
            <div class="list-content-s">BMI</div>
            <div class="list-content-m"> ${data[i].bmi} </div>
        </div>
        <div class="content-group">
            <div class="list-content-s"> weight </div>
            <div class="list-content-m"> ${data[i].weight}kg </div>
        </div>
        <div class="content-group">
            <div class="list-content-s">height</div>
            <div class="list-content-m"> ${data[i].height}cm</div>
        </div>
        <div class="content-group">
            <div class="list-content-s"> ${data[i].date}</div>
        </div>
    </div>`
    };
    list.innerHTML = str ;
}


updateList(data);