# TAURI 勉強用リポジトリ

## プロジェクトの雛形作成

### [Tauri のマニュアルセットアップ](https://v2.tauri.app/ja/start/create-project/#%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97) を参考にフロントエンドのプロジェクト雛形を構築する

```sh
mkdir tauri-app
cd tauri-app
yarn create vite . --template react-ts
```

```sh
yarn add -D @tauri-apps/cli@latest
```

```sh
yarn tauri init

yarn run v1.22.22
✔ What is your app name? · tauri-app
✔ What should the window title be? · tauri-app
✔ Where are your web assets (HTML/CSS/JS) located, relative to the "<current dir>/src-tauri/tauri.conf.json" file that will be created? · ..
✔ What is the url of your dev server? · http://localhost:5173
✔ What is your frontend dev command? · yarn dev
✔ What is your frontend build command? · yarn build
```

### プロジェクトの起動確認

```sh
export CC=clang && yarn tauri dev
```

Apple Silicon の場合, `export CC=clang` を指定しなければビルドに失敗してしまう
