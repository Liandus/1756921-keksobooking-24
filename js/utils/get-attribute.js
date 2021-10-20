const getAttribute = (fieldNeedToAtribute, atributeName, atributeValue) => {
  fieldNeedToAtribute.forEach((element) => {
    element.setAttribute(atributeName, atributeValue);
  });
};

export {getAttribute};
