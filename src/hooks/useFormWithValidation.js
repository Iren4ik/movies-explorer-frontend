import React, { useCallback } from "react";

export function useFormWithValidation() {
  //Поднятие стейт переменных
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  //Обработчик изменений в полях данных
  const handleChange = (event) => {
    const target = event.target;
    console.log(target);
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest(".form").checkValidity());
  };

  //Колбек для сброса данных
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm };
}