import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import SampleComponent from "./sample-component";
import { mockIPC } from "@tauri-apps/api/mocks";

// IPC mock の使い方を確認するためのサンプルテスト
// IPC = Inter-Process Communication (プロセス間通信)
// https://v2.tauri.app/ja/concept/inter-process-communication/
describe("sample-components", () => {
  it("should pass", async () => {
    // Rust 側で定義している関数の呼び出しを mock する
    mockIPC((cmd, arg) => {
      if (cmd === "rust_fn" && arg && "a" in arg && "b" in arg) {
        return `${arg.a} ${arg.b}`;
      }
    });

    render(<SampleComponent />);
    const button = screen.getByRole("button", { name: "click" });
    // mock を使用していない場合, 下記のようなエラーが発生する
    // TypeError: Cannot read properties of undefined (reading 'invoke')
    // ❯ invoke node_modules/@tauri-apps/api/core.js:177:39
    //    175|  */
    //    176| async function invoke(cmd, args = {}, options) {
    //    177|     return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
    //       |                                       ^
    //    178| }
    //    179| /**
    await userEvent.click(button);
  });
});
