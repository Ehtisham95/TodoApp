export const evaluateData = ({todos, isCompleted}) => {
  if (todos) {
    let itemsArray = new Array();

    Object.keys(todos).map(dayKey => {
      Object.keys(todos[dayKey]).map(timeKey => {
        if (isCompleted) {
          if (todos[dayKey][timeKey].isCompleted)
            itemsArray.push(todos[dayKey][timeKey]);
        } else {
          if (!todos[dayKey][timeKey].isCompleted)
            itemsArray.push(todos[dayKey][timeKey]);
        }
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
