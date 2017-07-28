var path = require('path');
var OpenBrowserPlugin=require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:path.resolve(__dirname,'src/js/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module:{
        rules:[
             {
                test: /\.jsx?$/,
                use:[
                    {
                        loader:"babel-loader",
                        options:{
                            presets: ['es2015', 'react']
                        }
                    }
                ]

            },
            // 处理在js 中使用css
             {
                test: /\.css$/,
                use:['style-loader','css-loader'],
            },
            // 处理js中的 scss 文件 
            {
                test: /\.scss$/,
                use:['style-loader','css-loader','sass-loader'],
            },
                //处理图片操作
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: 'url-loader?limit=25000'
                },
                //处理字体文件
                {
                    test: /\.(eot|woff|ttf|woff2|svg)$/,
                    use: 'url-loader?limit=25000'
                }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({url:'http://localhost:8080',browser:'chrome'}),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["vendors.js", "bundle.js"]
                }
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
    ]
}
