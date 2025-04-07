# TAURI 勉強用リポジトリ

## プロジェクトの雛形作成

基本的には下記の公式マニュアルに沿って環境構築を進めれば良い

- [必要事項](https://v2.tauri.app/ja/start/prerequisites/)
- [プロジェクトの作成](https://v2.tauri.app/ja/start/create-project/)

ここでは, ぼくが実際に進めた手順を記載しておく

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

### iOS 開発環境の構築

iOS 開発ができるように下記コマンドを実行して初期化する

```sh
# `./tauri-app/` で実行
yarn tauri ios init
```

起動確認する

```sh
yarn tauri ios dev
```

シミュレータがダウンロードされていない場合は, コマンド実行中にダウンロードが始まってしまうので, 先に済ませておいた方が良い  
シミュレータが起動した後も Tauri のバンドルが時間がかかる（体感１０分くらい待った）ので, シミュレータ起動後何も動いていないように感じても気長に待つ必要がある

### Android 開発環境の構築

```sh
# `./tauri-app/` で実行
yarn tauri android init
```

起動確認する

```sh
yarn tauri android dev
```

シミュレータがダウンロードされていない場合は, エラーになってしまうので, 先に済ませておく
Tauri の対応 Java バージョンが 17 なので,　ビルド時に Java17 が指定されていないとエラーになってしまう

## ユニットテスト実行環境の構築

### Vitest を用いたフロントエンドユニットテスト

基本的には下記の Next.js 公式ドキュメントを参考に進める

- [Setting up Vitest with Next.js](https://nextjs.org/docs/app/building-your-application/testing/vitest)

```sh
# `./tauri-app/` で実行
yarn add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

`./tauri-app/vitest.config.mts` を作成する

https://github.com/kuramapommel/til-tauri/blob/d17b12a4ee393659a3114c87e869cf3f9c632c68/tauri-app/vitest.config.mts#L1-L13

下記を参考に `./tauri-app/package.json` の `script` に `test:front` コマンドを追加

https://github.com/kuramapommel/til-tauri/blob/d17b12a4ee393659a3114c87e869cf3f9c632c68/tauri-app/package.json#L12

下記コマンドでテストを実行する

```sh
yarn test:front
```

### フロントエンドテストで [IPC(Inter-Process Communication)](https://v2.tauri.app/ja/concept/inter-process-communication/) をモック化したい場合

```sh
# `./tauri-app/` で実行
yarn add -D @tauri-apps/api @testing-library/user-event
```

下記のように `mockIPC` を用いて IPC(Inter-Process Communication) をモック化することができる

https://github.com/kuramapommel/til-tauri/blob/46c48e0ea57b43367cca4aa08bce62611383fd92/tauri-app/src/components/sample-components.test.tsx#L13-L17

### cargo test を用いたバックエンドのユニットテスト

Cargo には標準でテスト機構が含まれているため, 特別な環境構築は不要

下記コマンドでテストを実行する

```sh
# `./tauri-app/src-tauri/` で実行
cargo test
```

### Vitest と cargo test を `yarn test` コマンドひとつにまとめる

下記を参考に `./tauri-app/package.json` の `script` に `test` コマンドにフロントエンドテストとバックエンドテストをまとめる

https://github.com/kuramapommel/til-tauri/blob/51f492f7853084a454d02b3938a55eddea77ed97/tauri-app/package.json#L11

下記コマンドでテストを実行する

```sh
# `./tauri-app/` で実行
yarn test
```

フロントエンドとバックエンドのテストもそれぞれ分けて実行できるように, 下記を参考に `./tauri-app/package.json` の `script` に `test:front` コマンドと `test:back` コマンドをそれぞれ作成

https://github.com/kuramapommel/til-tauri/blob/51f492f7853084a454d02b3938a55eddea77ed97/tauri-app/package.json#L12-L13

## e2e テスト実行環境の構築

### Playright を用いた e2e テスト

基本的には下記の Playright 公式ドキュメントを参考に進める

[Installation](https://playwright.dev/docs/intro#installation)

下記のコマンドで Playwright をインストールする

```sh
# `./tauri-app/` で実行
yarn create playwright

# ...（中略）
✔ Where to put your end-to-end tests? · e2e
✔ Add a GitHub Actions workflow? (y/N) · false
✔ Install Playwright browsers (can be done manually via 'yarn playwright install')? (Y/n) · true
```

自動生成される `./tests-examples/demo-todo-app.spec.ts` は削除してしまっても構わない

下記を参考に `./playwright.config.ts` を編集

- レポートの出力先を `./playwright-report` に指定し, ブラウザを起動しないように設定する
  - https://github.com/kuramapommel/til-tauri/blob/6274a4c03661a4408f060b58dd99129ecf9f465f/tauri-app/playwright.config.ts#L25
- モバイル向けテストエージェントを活性化（コメントアウトを外す）する
  - https://github.com/kuramapommel/til-tauri/blob/6274a4c03661a4408f060b58dd99129ecf9f465f/tauri-app/playwright.config.ts#L52-L60

下記を参考に vitest のテスト対象から `./e2e/` 配下を外す

https://github.com/kuramapommel/til-tauri/blob/24def96627401ec476439f3999f14a7f11cf005d/tauri-app/vitest.config.mts#L9

下記を参考に `./tauri-app/package.json` の `script` に `e2e` コマンドを追加

https://github.com/kuramapommel/til-tauri/blob/791877e88a54f0f15b71be9966e25bbdeb3b9f77/tauri-app/package.json#L14

下記コマンドでテストを実行する

```sh
# `./tauri-app/` で実行
yarn e2e
```

## CI 構築

### husky の構築

#### Prettier の導入

基本的には下記の Next.js 公式ドキュメントを参考に進める

[ESLint Plugin#With Prettier](https://nextjs.org/docs/app/api-reference/config/eslint#with-prettier)

```sh
# `./tauri-app/` で実行
yarn add -D prettier eslint-config-prettier
```

下記を参考に `./tauri-app/package.json` の `script` に `format` コマンドを追加

https://github.com/kuramapommel/til-tauri/blob/f97e0dce03d6819c5f387cffa4bdf3bdaa1895d1/tauri-app/package.json#L10

下記を参考に `./tauri-app/eslint.config.mjs` に `prettier` を追加

https://github.com/kuramapommel/til-tauri/blob/f97e0dce03d6819c5f387cffa4bdf3bdaa1895d1/tauri-app/eslint.config.mjs#L13

`./tauri-app/src-tauri` をフォーマット対象から省くため下記を参考に `./.prettierignore` を作成

https://github.com/kuramapommel/til-tauri/blob/f97e0dce03d6819c5f387cffa4bdf3bdaa1895d1/tauri-app/.prettierignore#L1

#### husky の構築

```sh
# `./tauri-app/` で実行
yarn add -D husky
```

下記コマンドで husky を初期化する

```sh
# `./tauri-app/` で実行
npx husky init
```

下記を参考に自動生成される `./.husky/pre-commit` を修正

https://github.com/kuramapommel/til-tauri/blob/c5856648f3c6de68dc3e11bc1ac856013bfb2ed2/tauri-app/.husky/pre-commit#L1-L10

> [!TIP] > `cargo fmt` や `cargo clippy` が導入されていない場合は下記コマンドを実行して導入する
>
> ```sh
> # rustfmt （cargo fmt）の導入
> rustup component add rustfmt
> ```
>
> ```sh
> # clippy （cargo clippy）の導入
> rustup component add clippy
> ```

下記を参考に自動生成される `./tauri-app/package.json` の `script` の `prepare` コマンドを修正

https://github.com/kuramapommel/til-tauri/blob/f97e0dce03d6819c5f387cffa4bdf3bdaa1895d1/tauri-app/package.json#L13

下記コマンドを実行して, husky が参照する `pre-commit` ファイルを適応

```sh
# `./tauri-app/` で実行
yarn
```

### GitHub Actions の構築

#### フロントエンド CI のワークフロー構築

下記を参考に `.github/workflows/integration-frontend.yml` を作成

https://github.com/kuramapommel/til-tauri/blob/c4c0ecbcc957e5d258f1a89e4a93279b9736c804/.github/workflows/integration-frontend.yml#L1-L56

#### バックエンド CI のワークフロー構築

下記を参考に `.github/workflows/integration-backend.yml` を作成

https://github.com/kuramapommel/til-tauri/blob/366f3a6d48151984e8b6998e559bd93b8929b233/.github/workflows/integration-backend.yml#L1-L43

## UI カタログの構築

### Storybook を用いた UI カタログ

基本的に下記の Storybook 公式ドキュメントを参考に進める

- [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs#getting-started)

下記のコマンドで Storybook をインストールする

```sh
# `./tauri-app/` で実行
yarn create storybook

# ...（中略）
What do you want to use Storybook for? # そのまま Enter

# ...（中略）
Do you want to migrate? … yes
```

自動生成される `./src/stories` は不要なので削除

下記を参考に自動生成される `./.storybook/main.ts` を修正

https://github.com/kuramapommel/til-tauri/blob/86600f5256ba8fa8696072cc954e776d3e88ebaf/tauri-app/.storybook/main.ts#L4

下記を参考に自動生成される `./.storybook/preview.ts` を修正

https://github.com/kuramapommel/til-tauri/blob/86600f5256ba8fa8696072cc954e776d3e88ebaf/tauri-app/.storybook/preview.ts#L1

下記を参考に `./postcss.config.mjs` を修正

https://github.com/kuramapommel/til-tauri/blob/86600f5256ba8fa8696072cc954e776d3e88ebaf/tauri-app/postcss.config.mjs#L2-L4

下記コマンドで Storybook を起動する

```sh
# `./tauri-app/` で実行
yarn storybook
```

## CD の構築

### GitHub Actions の構築

#### Storybook のデプロイ

下記を参考に `.github/workflows/integration-frontend.yml` に追記

- Storybook をビルド
  - https://github.com/kuramapommel/til-tauri/blob/c4c0ecbcc957e5d258f1a89e4a93279b9736c804/.github/workflows/integration-frontend.yml#L58-L87
- Storybook を GitHub Pages にデプロイ
  - https://github.com/kuramapommel/til-tauri/blob/c4c0ecbcc957e5d258f1a89e4a93279b9736c804/.github/workflows/integration-frontend.yml#L89-L100

GitHub の設定ページから GitHub Pages を GitHub Action からデプロイするように設定

- [このページ](https://qiita.com/shun198/items/18f852caea2b4068ebaf#github-pages%E3%81%AE%E8%A8%AD%E5%AE%9A) が参考になる
