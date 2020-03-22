function eval() {
    // Do not use eval!!!
    return;
}
// let arrStart = [];
// let arrNumbers = [];
// let arrOperators = [];
// let objExpressions = {
//     '^': (preLastNumber, lastNumber) => (+preLastNumber) ** +lastNumber,
//     '*': (preLastNumber, lastNumber) => +preLastNumber * +lastNumber,
//     '/': (preLastNumber, lastNumber) => +preLastNumber / +lastNumber,
//     '+': (preLastNumber, lastNumber) => +preLastNumber + +lastNumber,
//     '-': (preLastNumber, lastNumber) => +preLastNumber - +lastNumber,
// };


function expressionCalculator(expr) {
    //expr = " 84 + 62 / 33 * 10 + 15 ";
    // console.log('expr', expr);
    // console.log('arrStart', arrStart);
    // console.log('arrNumbers', arrNumbers);
    // console.log('arrOperators', arrOperators);
    let arrStart = [];
    let arrNumbers = [];
    let arrOperators = [];
    

    let objExpressions = {
        '^': (preLastNumber, lastNumber) => (+preLastNumber) ** +lastNumber,
        '*': (preLastNumber, lastNumber) => +preLastNumber * +lastNumber,
        '/': (preLastNumber, lastNumber) => +preLastNumber / +lastNumber,
        '+': (preLastNumber, lastNumber) => +preLastNumber + +lastNumber,
        '-': (preLastNumber, lastNumber) => +preLastNumber - +lastNumber,
    };
    
    
    
    
    // regExp преобр в массив
    if ( !Array.isArray(expr))  {
        if (expr.length < 5) {
            arrStart = expr.split('');
        } else {
            arrStart = expr.split(' ');
        }
        
        // удаляем пустые элементы из массива и проверяем деление на 0
        for (let i = 0; i< arrStart.length; i++) {
            if (arrStart[i] == '/' & arrStart[i+1] == 0) {
                throw "TypeError: Division by zero.";
            }

            if (arrStart[i] == '') {
                arrStart.splice(i, 1)
            }
        }
    }

    recursiveNumberOperator();
    function recursiveNumberOperator() {

        let lastNumber = arrNumbers[arrNumbers.length - 1];
        let preLastNumber = arrNumbers[arrNumbers.length - 2];
        
        let lastOperator= arrOperators[arrOperators.length - 1];
        let preLastOperator= arrOperators[arrOperators.length - 2];
    
        

        if (arrStart.length == 0 & arrOperators.length < 2) {
            let result = objExpressions[lastOperator](preLastNumber, lastNumber); 
            arrNumbers.splice(-2, 2, result);
            arrOperators.splice(-1, 1);

            return ;
            
        }


        if (arrStart.length > 0 | arrOperators.length > 1) {    // нужно сравнивать с arrOperators
            
            
            // функцию для реализации скобок. сначала ищем открыв, через for? потом ищем закрыв, результат в массив concat, там вычислить, но нужно проверить есть ли там скобки.   может сделать через функицию
            
            
            // condition * /
            if ( (preLastOperator == '*' & lastOperator == '/')  | (preLastOperator == '/' & lastOperator == '*') |
            (preLastOperator == '/' & lastOperator == '/') | (preLastOperator == '*' & lastOperator == '*') ) 
            {
                let resultNumber = objExpressions[preLastOperator](preLastNumber, lastNumber); 
                arrNumbers.splice(-2, 2, resultNumber);
                arrOperators.splice(-2, 1);
            }

            //умножение деление с плюсом

            if ( (preLastOperator == '/' & lastOperator == '-')  | (preLastOperator == '/' & lastOperator == '+') |
            (preLastOperator == '*' & lastOperator == '-') | (preLastOperator == '*' & lastOperator == '+') ) 
            {
                let resultNumber = objExpressions[preLastOperator](preLastNumber, lastNumber); 
                arrNumbers.splice(-2, 2, resultNumber);
                arrOperators.splice(-2, 1);
                return recursiveNumberOperator();
            }

            // condition + - 
            if ( (preLastOperator == '+' & lastOperator == '-')  | (preLastOperator == '-' & lastOperator == '+') |
                    (preLastOperator == '+' & lastOperator == '+') | (preLastOperator == '-' & lastOperator == '-') ) 
                    {
                let resultNumber = objExpressions[preLastOperator](preLastNumber, lastNumber); 
                arrNumbers.splice(-2, 2, resultNumber);
                arrOperators.splice(-2, 1);
            }





            // распределяем исходный массив на массив чисел и операторов
            if (arrStart.length > 0) {
                if (  arrStart[0] == '+' | arrStart[0] == '-' | arrStart[0] == '*' | arrStart[0] == '/' ) {

                    arrOperators.push(arrStart[0]);
                    arrStart.shift();
                } else {
                    arrNumbers.push(arrStart[0]);
                    arrStart.shift();
                }
            } else {
    
                // плюс с умножением делением
    
                if ( (preLastOperator == '+' & lastOperator == '/')  | (preLastOperator == '+' & lastOperator == '*') |
                (preLastOperator == '-' & lastOperator == '/') | (preLastOperator == '-' & lastOperator == '*') ) 
                {
                    let resultNumber = objExpressions[lastOperator](preLastNumber, lastNumber); 
                    arrNumbers.splice(-2, 2, resultNumber);
                    arrOperators.splice(-1, 1);
                }

            }



            recursiveNumberOperator();

        } 

    }
        
    return arrNumbers[0];

}

module.exports = {
    expressionCalculator
}