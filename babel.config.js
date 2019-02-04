module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env', {
        useBuiltIns: 'entry',
        debug: true
      },
    ],
    'minify',
  ];

  return { presets };
};
