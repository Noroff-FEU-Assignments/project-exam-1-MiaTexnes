export function getQueryStringParam(param) {
  const queryString = document.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}
