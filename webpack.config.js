// Este archivo va a tener toda la config de webpack.
// Esto implica importar los módulos necesarios y exportar la configuración.
// Nota: se usa la sintaxis de "CommonJS" para estos imports/exports, no las nativas de JS.

// Importamos el html-webpack-plugin.
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Exportamos la config.
module.exports = {
  // Agregamos el plugin de html-webpack-plugin.
  // plugins es un array que contiene las instancias de los plugins.
  plugins: [
    new HtmlWebpackPlugin({
      // Con template indicamos el .html que sirve de base.
      template: "public/index.html",
      // Podemos agregar propiedades también otras propiedades arbitrarias que queremos que estén
      // disponibles para usar en el template.
      // La única limitación es que no pueden usar nombres que estén reservados como opciones del
      // plugin.
      title: "Título puesto por webpack",
      heading: ":D de webpack",
    }),
  ],
  // Nosotros queremos ahora hacer que Babel "compile" los archivos de JS.
  // Para indicarle a webpack cómo manejar ciertos archivos, usamos la propiedad "rules" de la propiedad
  // "module".
  module: {
    // rules es un array de objetos de configuraciones para aplicar.
    // Cada objeto representa un manejo de algún tipo(s) de archivo.
    rules: [
      {
        // Indicamos que esta regla va a aplicar solo a archivos JS.
        // Para indicar este "filtro", usamos la propiedad "test" seguida de la expresión regular
        // que el nombre del archivo debe cumplir.
        test: /\.js$/, // Archivos que terminen en ".js".
        // Excluimos de la regla los archivos que estén dentro de node_modules.
        exclude: /node_modules/,
        // Indicamos qué loaders "usar" con la propiedad "use".
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Configuramos los loaders para CSS.
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
