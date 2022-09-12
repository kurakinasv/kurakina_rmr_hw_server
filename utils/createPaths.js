const createPaths = (paths) => {
  const extendedPaths = {
    ...paths,
    fullPaths: Object.keys(paths.children).reduce(
      (result, key) => ({
        ...result,
        [key]: `${paths.ROOT}${paths.children[key]}`,
      }),
      {}
    ),
  };

  return extendedPaths;
};

module.exports = createPaths;
