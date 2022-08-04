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

export const isNumberOrComma = value => /^[0-9,]*$/.test(value)

