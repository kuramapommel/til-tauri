# TAURI 勉強用リポジトリ

## プロジェクトの雛形作成

### [Tauri のマニュアルセットアップ](https://v2.tauri.app/ja/start/create-project/#%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97) を参考にフロントエンドのプロジェクト雛形を構築する

```sh
npx create-next-app@latest tauri-app
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*
```

```sh
cd tauri-app
yarn add -D @tauri-apps/cli@latest
```

```sh
yarn tauri init

yarn run v1.22.22
✔ What is your app name? · tauri-app
✔ What should the window title be? · tauri-app
✔ Where are your web assets (HTML/CSS/JS) located, relative to the "<current dir>/src-tauri/tauri.conf.json" file that will be created? · ..
✔ What is the url of your dev server? · http://localhost:3000
✔ What is your frontend dev command? · yarn dev
✔ What is your frontend build command? · yarn build
```

### Next.js のビルド周りを修正

下記を参考に `./tauri-app/package.json` の `script` に `tauri` コマンドを追加

https://github.com/kuramapommel/til-tauri/blob/28fbc69fae2d7aa2513563864068caeef68988f1/tauri-app/package.json#L10

下記を参考に `./tauri-app/next.config.ts` を修正

https://github.com/kuramapommel/til-tauri/blob/28fbc69fae2d7aa2513563864068caeef68988f1/tauri-app/next.config.ts#L1-L14

ビルド可能であることを確認

```sh
yarn build
```

### プロジェクトの起動確認

```sh
export CC=clang && yarn tauri dev
```

Apple Silicon の場合, `export CC=clang` を指定しなければビルドに失敗してしまう
