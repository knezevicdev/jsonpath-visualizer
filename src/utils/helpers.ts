//returns a string "type" of input object
export const toType = (obj: any): string => {
  let type = getType(obj);
  // some extra disambiguation for numbers
  if (type === 'number') {
    if (isNaN(obj)) {
      type = 'nan';
    } else if ((obj | 0) != obj) {
      //bitwise OR produces integers
      type = 'float';
    } else {
      type = 'integer';
    }
  }
  return type;
};

//source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
const getType = (obj: any): string => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};
