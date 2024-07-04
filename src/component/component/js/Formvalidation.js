const Formvalidation = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@!#$%^&*]{6,}$/;
    
    const isEmailValid = emailRegex.test(email);
    const isPassValid = passRegex.test(password);
    
    return {
    isEmailValid,
    isPassValid,
    emailMessage: isEmailValid ? "" : "Email is not valid",
    passMessage: isPassValid ? "" : "Password is not valid",
    };
    }
    
    export default Formvalidation;