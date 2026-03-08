function getid(id){
    return document.getElementById(id);


}


document.getElementById("signin-btn").addEventListener('click', function() {
    const id =getid('admin').value;
    const password = getid('password').value;
    if(id === 'admin' && password === 'admin123') {
        alert("Sign in successful!");
        window.location.href='./home.html'
    } else {
       alert("Type Correctly!!");
       return;
    }
});