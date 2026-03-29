const modules = import.meta.glob("./*.png", { eager: true, as: "url" });

const flags: { [key: string]: string } = {};

for (const path in modules) {
  const name = path.split("/").pop()!.replace(".png", "");
  flags[name] = modules[path] as string;
}

export default flags;