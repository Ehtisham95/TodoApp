export const evaluateData = todos => {
  if (todos) {
    let itemsArray = new Array();

    Object.keys(todos).map(dayKey => {
      Object.keys(todos[dayKey]).map(timeKey => {
        itemsArray.push(todos[dayKey][timeKey]);
      });
    });
    itemsArray.sort((a, b) => b.id - a.id);
    return itemsArray;
  }
};

export const searchDay = ({item, response}) => {
  let day = '';
  Object.keys(response).map(dayKey => {
    Object.keys(response[dayKey]).map(timeKey => {
      if (item.id == timeKey) {
        day = dayKey;
      }
    });
  });
  return day;
};
