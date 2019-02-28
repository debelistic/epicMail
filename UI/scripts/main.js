const navbutton = document.querySelector('i#navbutton');
const navmenu = document.querySelector('nav ul');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const signinform = document.forms.signinform;
const message = document.querySelector('#message');

const patterns = {
	username: /^[a-z\d]{5,}$/i,
	password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/,
};

if (signinform,username,password,message) {
    console.log('fired');
    
}

const validate = (field, regex) => {
	
	if (regex.test(field.value)) {
        console.log('work');
        
		field.className = 'valid';
	} else{
        console.log('not working');
		field.className = 'invalid';
	}
};

inputs.forEach((input) => {
	input.addEventListener('keyup', (e) => {
		validate(e.target, patterns[e.target.attributes.name.value]);
		const p = div.querySelector('p');
		if(p) div.removeChild(p);		
		
	})
});

navbutton.addEventListener('click', () => {
    navmenu.classList.toggle('open');

})

signinform.addEventListener('submit', (event) => {
	//prevent default form behaviour.
    //event.preventDefault();
    console.log('fired');
    

	//store password and username.
	const password = form.querySelector('input[type="password"]').value;
	const username = form.querySelector('input[type="username"]').value;
	
	//initiate count for password strength.
	let count = 0;

	//individual tests for password.	
	const lowercase = /[a-z]/;
	const uppercase = /[A-Z]/;
	const specialCharacter = /[$@#&!]/;
	const fullPassword = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[$@#&!]).{6,}$/;

	if (lowercase.test(password)) count += 25;
	if (uppercase.test(password)) count += 25;
	if (specialCharacter.test(password)) count += 25;
	if (password.length >= 6) count += 25;
	if ( count == 100) {
		message.classList.add('valid');
		message.className ='valid';
	} else {
		//myDiv.classList.remove('valid');
		message.className ='invalid';
	}
		

	//return password strength count.
	const warning = document.createElement('p');
	warning.textContent = 'Password is ' + count + "% compelete";
	message.appendChild(warning);

	//to reset the form
	if(fullPassword.test(password)) form.reset();
	
	
})