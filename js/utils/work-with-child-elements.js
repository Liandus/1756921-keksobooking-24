const setAttributeOnChild = (parent, setFunction, attribute) => {
  for (const element of parent.children) {
    setFunction(element, attribute, '');
  }
};

export {setAttributeOnChild};
