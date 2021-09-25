export const hasErrors = (errors) => Object.values(errors).some(Boolean);

export const getInputError = (errors, touched, fieldName) =>
  touched[fieldName] && errors[fieldName];
