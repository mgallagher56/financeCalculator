function calculate(){
    document.querySelector('#submit').addEventListener('click', function (e) {
        e.preventDefault()

        let loan = document.getElementById('loan').value
        let salary = document.getElementById('salary').value
        let APR = document.getElementById('APR').value

        let validation = dataValidation(loan,salary,APR)

        if (validation === true) {
            let adminFee = 0
            prepareValues(loan, adminFee)
            prepLoan(loan)
            prepAdminFee(adminFee)
            let borrowedAmount = calcBorrowedAmount(loan, adminFee)
            let monthlyPayment = calcMonthlyPayment(salary, APR)
            let repaymentTime = calcRepaymentTime(borrowedAmount, monthlyPayment)
            let finalPayment = calcFinalPayment(borrowedAmount, repaymentTime, monthlyPayment)
            let upfrontFee = calcUpfrontFee(borrowedAmount)
            outputPayback(repaymentTime,borrowedAmount,monthlyPayment,upfrontFee, finalPayment)
        }
    })
}

calculate()

function prepareValues(loan) {
    if ((loan >= 6400) && (loan <= 7199)) {
        let adminFee = 500
        return adminFee
    } else if (loan >= 7200) {
        let adminFee = 1000
        return adminFee
    } else {
       let adminFee = 0
        return adminFee
    }
}

function prepLoan(loan) {
    return parseInt(loan)
}

function prepAdminFee(adminFee) {
    return parseInt(adminFee)
}
function calcBorrowedAmount(loan, adminFee) {
    return loan + adminFee
}

function calcMonthlyPayment(salary, APR) {
    let monthlyPayment =  (salary / 12) / (100 / APR)
    return Number(monthlyPayment).toFixed(2)
}

function calcRepaymentTime(borrowedAmount,monthlyPayment) {
    let repaymentTime = borrowedAmount / monthlyPayment
    repaymentTime = Number(Math.floor(repaymentTime)).toFixed(0)
    if (repaymentTime < 1) {
        return 1
    } else {
        return repaymentTime
    }
}

function calcFinalPayment(borrowedAmount,repaymentTime,monthlyPayment) {
    let finalPayment = borrowedAmount - (repaymentTime * monthlyPayment)
    return  Number(finalPayment).toFixed(2)

}

function calcUpfrontFee(borrowedAmount) {
    let upfrontFee = borrowedAmount / 20
    return Number(upfrontFee).toFixed(2)
}

function dataValidation(loan, salary, APR) {
    //output 3 error messages if all inputs are incorrect
    if (((loan <= 0) || (loan > 8000)) && ((APR < 10) || (APR > 100)) && ((salary < 10000) || (salary > 150000))) {
        document.querySelector('#output').innerHTML = ' <H2>Error</H2><p class="output">Loan must be between £1 and £8,000</p>' +
            '<p class="output">Salary must be between £10,000 and £150,000.</p>' +
            '<p class="output"> Monthly Repayment must be between 10% and 100%.</p>'
        return false
        //output 2 error messages if loan amount and APR are incorrect
    } else if (((loan <= 0) || (loan > 8000)) && ((APR < 10) || (APR > 100))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000.</p>' +
            '<p class="output"> Monthly Repayment must be between 10% and 100%.</p>'
        return false
        //output 2 error messages if salary amount and APR are incorrect
    } else if (((salary < 10000 || salary > 150000)) && ((APR < 10 || APR > 100))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>' +
            '<p class="output">Monthly Repayment must be between 10% and 100%.</p>'
        return false
        //output 2 error messages if loan amount and salary are incorrect
    } else if (((loan <= 0) || (loan > 8000)) && ((salary < 10000) || (salary > 150000))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000</p>' +
            '<p class="output">Salary must be between £10,000 and £150,000.</p>'
        return false
        //output error message if loan amount is incorrect
    } else if ((loan <= 0) || (loan > 8000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000.</p>'
        return false
        //output error message if salary is incorrect
    } else if ((salary < 10000) || (salary > 150000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>'
        return false
        //output error message if salary amount is incorrect
    } else if ((salary < 10000) || (salary > 150000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>'
        return false
        //set validation to true
    } else {
        return true
    }
}

function outputPayback(repaymentTime,monthlyPayment,borrowedAmount,upfrontFee,finalPayment) {
    //Loan repayment output
        if (monthlyPayment >= borrowedAmount) {
            document.querySelector('#output').innerHTML = '<h2> Borrowing Information</h2>' +
                '<p class="output">UpFront Admin Fee: £' + upfrontFee + '</p>' +
                '<p class="output">Total Borrowed Amount: £' + borrowedAmount + '</p>' +
                '<p class="output">Monthly payments of £' + borrowedAmount + '</p>'
        } else {
            document.querySelector('#output').innerHTML = '<h2> Borrowing Information</h2>' +
                '<p class="output">UpFront Admin Fee: £' + upfrontFee + '</p>' +
                '<p class="output">Total Borrowed Amount: £' + borrowedAmount + '</p>' +
                '<p class="output">Monthly payments of £' + monthlyPayment + ' for ' + repaymentTime + ' months. One final payment of £' + finalPayment + '</p>'
        }
}