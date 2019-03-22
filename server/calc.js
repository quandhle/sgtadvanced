function doMath(num1, num2, operator) {
    var result = null;
    switch (operator){
        case '+':
            result = num1+num2;
            break;
        case '-':
            result = num1-num2;
            break;
        case 'x':
            result = num1*num2;
            break;
        case '/':
            result = num1/num2;
            break;
    }
    
    return result;
}

var n1 = parseInt(process.argv[2]);
var op = process.argv[3];
var n2 = parseInt(process.argv[4]);

var answer = doMath(n1, n2, op);

console.log(answer);