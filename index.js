document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault()

    var loan = document.getElementById('loan').value
    var salary = document.getElementById('salary').value
    var APR = document.getElementById('APR').value



        if (validation === true) {
            let adminFee = prepareValues(loan)
            loan = prepLoan(loan)
            adminFee = prepAdminFee(adminFee)
            let monthlyPayment = calcMonthlyPayment(salary, APR)
            let borrowedAmount = calcBorrowedAmount(loan, adminFee)
            borrowedAmount = Number(borrowedAmount).toFixed(2)
            monthlyPayment = Number(monthlyPayment).toFixed(2)
            let repaymentTime = calcRepaymentTime(borrowedAmount, monthlyPayment)
            let finalPayment = calcFinalPayment(borrowedAmount, repaymentTime, monthlyPayment)
            let upfrontFee = calcUpfrontFee(borrowedAmount)

            outputPayback(repaymentTime, monthlyPayment, borrowedAmount, upfrontFee, finalPayment)
        }
    })
}

calculate()

function prepareValues(loan) {
    if ((loan >= 6400) && (loan <= 7199)) {
        return 500
    } else if (loan >= 7200) {
        return 1000
    } else {
       return 0  
    }
    loan = parseInt(loan)
    adminFee = parseInt(adminFee)

    borrowedAmount = loan + adminFee

    var monthlyPayment = (salary / 12) / (100 / APR)

    var repaymentTime = borrowedAmount / monthlyPayment
    repaymentTime = Number(Math.floor(repaymentTime)).toFixed(0)

    var finalPayment = borrowedAmount - (repaymentTime * monthlyPayment)

    var upfrontFee = borrowedAmount / 20

    monthlyPayment = Number(monthlyPayment).toFixed(2)
    finalPayment = Number(finalPayment).toFixed(2)
    upfrontFee = Number(upfrontFee).toFixed(2)


    //validation for inputs
    var validation = false
    //output 3 error messages if all inputs are incorrect
    if (((loan < 1) || (loan > 8000)) && ((APR < 10) || (APR > 100)) && ((salary < 10000) || (salary > 150000))) {
        document.querySelector('#output').innerHTML = ' <H2>Error</H2><p class="output">Loan must be between £1 and £8,000</p>' +
            '<p class="output">Salary must be between £10,000 and £150,000.</p>' +
            '<p class="output"> Monthly Repayment must be between 10% and 100%.</p>'
        //output 2 error messages if loan amount and APR are incorrect
    } else if (((loan < 1) || (loan > 8000)) && ((APR < 10) || (APR > 100))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000.</p>' +
            '<p class="output"> Monthly Repayment must be between 10% and 100%.</p>'
        //output 2 error messages if salary amount and APR are incorrect
    } else if (((salary < 10000 || salary > 150000)) && ((APR < 10 || APR > 100))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>' +
            '<p class="output">Monthly Repayment must be between 10% and 100%.</p>'
        //output 2 error messages if loan amount and salary are incorrect
    } else if (((loan < 1) || (loan > 8000)) && ((salary < 10000) || (salary > 150000))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000</p>' +
            '<p class="output">Salary must be between £10,000 and £150,000.</p>'
        //output error message if loan amount is incorrect
    } else if ((loan < 1) || (loan > 8000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000.</p>'
        //output error message if salary is incorrect
    } else if ((salary < 10000) || (salary > 150000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>'
        //output error message if salary amount is incorrect
    } else if ((salary < 10000) || (salary > 150000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>'
        //set validation to true
    } else {
        validation = true
    }


function outputPayback(repaymentTime,monthlyPayment,borrowedAmount,upfrontFee,finalPayment) {
    //Loan repayment output

        if (monthlyPayment >= borrowedAmount) {
            document.querySelector('#output').innerHTML = '<h2> Borrowing Information</h2>' +
                '<p class="output">UpFront Admin Fee: £' + upfrontFee + '</p>' +
                '<p class="output">Total Borrowed Amount: £' + borrowedAmount + '</p>' +
                '<p class="output">One monthly payment of £' + borrowedAmount + '</p>'
        } else {

            document.querySelector('#output').innerHTML = '<h2> Borrowing Information</h2>' +
                '<p class="output">UpFront Admin Fee: £' + upfrontFee + '</p>' +
                '<p class="output">Total Borrowed Amount: £' + borrowedAmount + '</p>' +
                '<p class="output">£' + monthlyPayment + ' for ' + repaymentTime + ' months. One final payment of £' + finalPayment + '</p>'
        }
    }
})
