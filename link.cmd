rm -rf packages\postcss-syntax\node_modules\postcss-html
rm -rf packages\postcss-syntax\node_modules\postcss-jsx
rm -rf packages\postcss-syntax\node_modules\postcss-markdown
rm -rf packages\postcss-syntax\node_modules\postcss-styled
rm -rf packages\postcss-jsx\node_modules\postcss-styled
rm -rf packages\postcss-jsx\node_modules\postcss-syntax
rm -rf packages\postcss-html\node_modules\postcss-syntax
rm -rf packages\postcss-markdown\node_modules\postcss-syntax
rm -rf packages\postcss-styled\node_modules\postcss-syntax
mklink /d packages\postcss-syntax\node_modules\postcss-html %cd%\packages\postcss-html
mklink /d packages\postcss-syntax\node_modules\postcss-jsx %cd%\packages\postcss-jsx
mklink /d packages\postcss-syntax\node_modules\postcss-markdown %cd%\packages\postcss-markdown
mklink /d packages\postcss-syntax\node_modules\postcss-styled %cd%\packages\postcss-styled
mklink /d packages\postcss-jsx\node_modules\postcss-styled %cd%\packages\postcss-styled
mklink /d packages\postcss-jsx\node_modules\postcss-syntax %cd%\packages\postcss-syntax
mklink /d packages\postcss-html\node_modules\postcss-syntax %cd%\packages\postcss-syntax
mklink /d packages\postcss-markdown\node_modules\postcss-syntax %cd%\packages\postcss-syntax
mklink /d packages\postcss-styled\node_modules\postcss-syntax %cd%\packages\postcss-syntax
