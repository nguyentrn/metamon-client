const createFormData = (data) => {
  const bodyFormData = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    bodyFormData.append(key, val);
  });

  return bodyFormData;
};

export default createFormData;
