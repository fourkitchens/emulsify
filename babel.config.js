module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env', {
        useBuiltIns: 'entry'
      },
    ],
    'minify',
  ];

  return { presets };
};
