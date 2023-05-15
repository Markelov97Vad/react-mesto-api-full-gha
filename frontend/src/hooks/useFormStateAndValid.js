import { useCallback, useState } from "react";

function useFormStateAndValid(inputValues) {
  const [values, setValues] = useState(inputValues);
  const  [errorMessages, setErrorMesages] = useState({});
  const [formIsValid, setFormIsValid] = useState(false)

  const handleChange = (event) => {
    const {name, value} = event.target;
    const isValid = event.target.closest('form').checkValidity();

    setValues({...values, [name]: value})
    setErrorMesages({...errorMessages, [name]: event.target.validationMessage})
    setFormIsValid(isValid);
  };

  const resetFormValues = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrorMesages(newErrors);
    setFormIsValid(newIsValid);
  }, [setValues, setErrorMesages, setFormIsValid]);

  return { values, handleChange, setValues, formIsValid, errorMessages, resetFormValues }
}

export default useFormStateAndValid;