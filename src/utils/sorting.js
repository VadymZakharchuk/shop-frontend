const  compare = ( a, b, field ) => {
  if ( a[`${field}`] < b[`${field}`] ){
    return -1;
  }
  if ( a[`${field}`] > b[`${field}`] ){
    return 1;
  }
  return 0;
}
export const sortByField = (arr, field, mode = 0) => {
  return mode
    ? arr.sort((a, b) => compare(b, a, field))
    : arr.sort((a, b) => compare(a, b, field));
}