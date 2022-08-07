export const required = value => value.trim() !== '';

export const length = props => value => {
  let isValid = true;
  if (props.min) {
    isValid = isValid && value.trim().length >= props.min;
  }
  if (props.max) {
    isValid = isValid && value.trim().length <= props.max;
  }
  if (props.exact) {
    isValid = isValid && value.trim().length === props.exact
  }
  return isValid;
};

export const isMatch = value => matchedValue => value.trim() === matchedValue.trim()

export const isNumberOrComma = value => /^[0-9,]*$/.test(value)

export const isNumber = value => /^[\d]*$/.test(value)

export const isNonAlphabetic = value => /^[0-9()-\s]*$/.test(value)
// later : check amount of numeric chars

export const isEmail = value =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    .test(value)

