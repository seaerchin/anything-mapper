const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: '.',
        paths: {
          '@assets/*': ['./src/assets/*'],
          '@contexts/*': ['./src/contexts/*'],
          '@constants/*': ['./src/constants/*'],
          '@components/*': ['./src/components/*'],
          '@hooks/*': ['./src/hooks/*'],
          '@pages/*': ['./src/pages/*'],
          '@services/*': ['./src/services/*'],
          '@typings/*': ['./src/typings/*'],
        },
      },
    },
  ],
}
