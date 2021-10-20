const deleteAttribute = (fieldNeedToRemoveAtribute, atributeName) => {
  fieldNeedToRemoveAtribute.forEach((element) => {
    element.removeAttribute(atributeName);
  });
};

export {deleteAttribute};
