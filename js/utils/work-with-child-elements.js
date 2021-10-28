const setOrDelSomeAttributeOnChild = (parent, setOrDelFunction, attribute) => {
  for (const element of parent.children) {
    setOrDelFunction(element, attribute, '');
  }
};

export {setOrDelSomeAttributeOnChild};
