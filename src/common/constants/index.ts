const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction
  ? process.env.PUBLIC_URL || process.env.REACT_APP_URL
  : process.env.REACT_APP_PROXY_TARGET;

export { isProduction, baseURL };

export const KeyCode = {
  ENTER: 13,
  UP: 38,
  DOWN: 40,
};
