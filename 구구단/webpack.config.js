const path = require("path");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports={
    name:"word-relay-setting",
    mode:'development', // 실서비스-production
    devtool:'eval', // 실서비스 - hidden-source-map

    resolve:{
        extensions:['.js','.jsx']
    },

    entry:{
        app:['./client']
    },//입력

    module:{
        rules:[{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options:{
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ]
            },
        }],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ],

    output:{
        path: path.join(__dirname,'dist'),
        filename: 'app.js',
        publicPath:'/dist'
    },//출력

    devServer:{
        devMiddleware:{
            publicPath:'/dist',
        },
        static:{
            directory:path.resolve(__dirname)
        },
        hot:true,
    },
}