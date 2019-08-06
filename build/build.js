process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')

const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const terser = require('rollup-plugin-terser').terser;

const utils = require('./utils')

async function compileWithRollup({ minify, format }) {
  const bundle = await rollup.rollup({
    input: utils.resolve('src/index.js'),
    plugins: [
      replace({
        'process.env.VERSION': JSON.stringify(require('../package.json').version)
      }),
      minify ? terser() : false
    ]
    .filter(Boolean)
  })

  await bundle.write({
    name: 'ExtfansGa',
    file: utils.resolve(`dist/extfans-ga${format === 'es' ? '.esm' : ''}${minify ? '.min' : ''}.js`),
    format,
  })
}

async function compile() {
  await compileWithRollup({
    format: 'es',
    minify: false
  });

  await compileWithRollup({
    format: 'es',
    minify: true
  });

  await compileWithRollup({
    format: 'umd',
    minify: false
  });

  await compileWithRollup({
    format: 'umd',
    minify: true
  });
}

const spinner = ora('项目构建中...')
spinner.start()

// 删除上次构建产出的文件
rm(
  utils.resolve('dist'),
  err => {
    if (err) {
      throw err
    }

    compile()
      .then(
        () => {
          spinner.stop()
          console.log(chalk.cyan('  构建完成。\n'))
        },
        e => {
          spinner.stop()
          console.log(chalk.red('  构建失败。 \n'))
          console.log(e);
        }
      )
  }
)