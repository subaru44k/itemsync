module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'production',
   
    entry: {
      'index': './src/index.ts',
      'create_channel': './src/create_channel.ts',
      'public_channels': './src/public_channels.ts',
      'private_channels': './src/private_channels.ts',
      'publicchannel': './src/publicchannel.ts',
      'anonymouschannel': './src/anonymouschannel.ts',
      'privatechannel': './src/privatechannel.ts'
    },

    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/public/javascripts`,
      // 出力ファイル名
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          // 拡張子 .ts の場合
          test: /\.ts$/,
          // TypeScript をコンパイルする
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue$/,
          loader: ['vue-loader']
        }
      ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
      extensions: [
        '.ts', '.vue', '.js'
      ],
      // Webpackで利用するときの設定
      alias: {
        vue: 'vue/dist/vue.js'
      }
    }
  };
  