import { invoke } from "@tauri-apps/api/core";

const SampleComponent = () => {
  return (
    <button onClick={() => invoke("rust_fn", { a: 0, b: "b" })}>click</button>
  );
};

export default SampleComponent;
