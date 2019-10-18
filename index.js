document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault()
    var loan = document.getElementById('loan').value
    var salary = document.getElementById('salary').value
    var APR = document.getElementById('APR').value

    if ((loan >= 6400) && (loan <= 7199)) {
        var adminFee = 500
    } else if (loan >= 7200) {
        adminFee = 1000
    } else {
        adminFee = 0
        var borrowedAmount = loan
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

    if (((loan <= 0) || (loan > 8000)) && ((APR < 10) || (APR > 100)) && ((salary < 10000) || (salary > 150000))) {
        document.querySelector('#output').innerHTML = ' <H2>Error</H2><p class="output">Loan must be between £1 and £8,000</p>' +
            '<p class="output">Salary must be between £10,000 and £150,000.</p>' +
            '<p class="output"> Monthly Repayment must be between 10% and 100%.</p>'
    } else if (((loan <= 0) || (loan > 8000)) && ((APR < 10) || (APR > 100))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000.</p>' +
            '<p class="output"> Monthly Repayment must be between 10% and 100%.</p>'
    } else if (((salary < 10000 || salary > 150000)) && ((APR < 10 || APR > 100))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>' +
            '<p class="output">Monthly Repayment must be between 10% and 100%.</p>'
    } else if (((loan <= 0) || (loan > 8000)) && ((salary < 10000) || (salary > 150000))) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000</p>' +
            '<p class="output">Salary must be between £10,000 and £150,000.</p>'
    } else if ((loan <= 0) || (loan > 8000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Loan must be between £1 and £8,000.</p>'
    } else if ((salary < 10000) || (salary > 150000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>'
    } else if ((salary < 10000) || (salary > 150000)) {
        document.querySelector('#output').innerHTML = '<H2>Error</H2><p class="output">Salary must be between £10,000 and £150,000.</p>'
    } else {

        if (repaymentTime < 1) {
            repaymentTime = 1
        }

        if (monthlyPayment >= borrowedAmount) {
            document.querySelector('#output').innerHTML = '<h2> Borrowing Information</h2>' +
                '<p class="output">UpFront Admin Fee: £' + upfrontFee + '.</p>' +
                '<p class="output">Total Borrowed Amount: £' + borrowedAmount + '.</p>' +
                '<p class="output">Monthly payments of £' + borrowedAmount + '</p>'
        } else {

            document.querySelector('#output').innerHTML = '<h2> Borrowing Information</h2>' +
                '<p class="output">UpFront Admin Fee: £' + upfrontFee + '.</p>' +
                '<p class="output">Total Borrowed Amount: £' + borrowedAmount + '.</p>' +
                '<p class="output">Monthly payments of £' + monthlyPayment + ' for ' + repaymentTime + ' months. One final payment of £' + finalPayment + '.' + '</p>'
        }
    }
})







