import React, {useState, useEffect} from 'react'

const useValidation = (initialState, validate, fn) => {
  
  const [value, setValue] = useState(initialState);
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  
    useEffect(() => {
      if (isSubmitting) {
        const noErrors = Object.keys(error).length === 0;
        if (noErrors){
          fn();
        }
        setIsSubmitting(false);
      }
    }, [error])
    
const handleChange = e => {
  setValue({
    ...value,
    [e.target.name]: e.target.value
  });
}

const handleSubmit = e => {
  e.preventDefault();
  const validationErrors = validate(value);
  setError(validationErrors);
  setIsSubmitting(true);
}

const handleBlur = () => {
  const validationErrors = validate(value);
  setError(validationErrors);
}

  return {
    value,
    error,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur
  }
    
}

export default useValidation