import zxcvbn from "zxcvbn";
const minStrength = 3;
const thresholdLength = 7;

const isEmail = (val) => {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(val)) {
    return false;
  }
  return true;
};

const isPasswordSafe = (value) => {
  // ensure password is long enough
  if (value.length <= thresholdLength) return false;
  // ensure password is strong enough using the zxcvbn library
  if (zxcvbn(value).score < minStrength) return false;
  return true;
};

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export { isEmail, isPasswordSafe, addDecimals };
