export default function validateLogin(value){
  let errors = {};

  if (!value.email) {
    errors.email = 'Email is required';
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)){
  errors.email = 'Invalid email address';
  }

  if (!value.password) {
    errors.password = 'Password is required';
  } else if ( value.password.length < 6 ) {
    errors.password = 'Password must be at least 6 characters long';
  }
  return errors;
}