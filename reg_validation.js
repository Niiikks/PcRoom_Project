document.getElementById('btn').addEventListener('click', (event) => {
    // პაროლის დამთხვევა
    let valid = true;
    let pwd = document.getElementById('password').value;
    let confirmPwd = document.getElementById('confirm-password').value;
    let matchPwd = document.getElementById('match-pwd');
    if(pwd !== confirmPwd) {
        matchPwd.style.display= 'block';
        valid = false;
    }
    else {
        matchPwd.style.display= 'none';
    }

    // ელფოსტის ვალიდურობა
    let email = document.getElementById('gmail').value;
    let errorDiv = document.getElementById('error-div');
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if(!regex.test(email)) {
        errorDiv.style.display = 'block';
        valid = false;
    }
    else {
        errorDiv.style.display = 'none';
    }
    // მობილურის ვალიდურობა
    let phone = document.getElementById('phone').value;
    let phoneErr = document.getElementById('phone-err');
    let phoneRegex = /^\d{9}$/

    if(!phoneRegex.test(phone)) {
        phoneErr.style.display = 'block';
        valid = false;
    }
    else {
        phoneErr.style.display = 'none';
    }

    // ყველა ველის შევსება 
    let form =  document.querySelector('form');
    let emptystr = 0;
    document.getElementById('error-fill').style.display = 'none';
    for(let i = 0 ; i < form.length -1; i++) {
        if(form[i].value.length < 1) {
            valid = false;
            form[i].style.border = "1px solid #a94442"
            document.getElementById('error-fill').style.display = 'block'
        }
        else {
            form[i].style.border = "1px solid #e5e5e5";
        }
    }
    if(valid === false) {
        return;
    }


    alert('რეგისტრაცია წარმატებით დასრულდა');
})

// პაროლის სიძლიერე
document.getElementById('password').addEventListener('input', (e)=> {
    let lang = document.getElementById('lang').textContent;
    let checkPwd = document.getElementById('check-pwd');
    let pwd = e.target.value;
    let susti = /^(?=.*[a-z])[a-z]+$/;
    let sashualo = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/
    let dzlieri = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/

    if(susti.test(pwd)) {
        checkPwd.style.display = 'block';
        if(lang === "ENG") {
            checkPwd.textContent = "Weak";
        }
        else {
            checkPwd.textContent = "სუსტი";
        }
        checkPwd.style.color = "red";
    }
    else if(sashualo.test(pwd)) {
        checkPwd.style.display = 'block';
        if(lang === "ENG") {
            checkPwd.textContent = "Average";
        }
        else {
            checkPwd.textContent = "საშუალო";
        }
        checkPwd.style.color = "orange";
    }
    else if(dzlieri.test(pwd)) {
        checkPwd.style.display = 'block';
        if(lang === "ENG") {
            checkPwd.textContent = "Strong";
        }
        else {
            checkPwd.textContent = "ძლიერი";
        }
        checkPwd.style.color = "green";
    }    
    else {
        checkPwd.style.display = 'none';
    }
})