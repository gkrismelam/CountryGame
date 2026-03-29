import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const modules = import.meta.glob("./*.png", { eager: true, as: "url" });

const flags: { [key: string]: string } = {};
const fullNames: { [key: string]: string} = {};

for (const path in modules) {
  const shortName = path.split("/").pop()!.replace(".png", "");
  flags[shortName] = modules[path] as string;

  const uppeShortName = shortName.toUpperCase();
  const name = countries.getName(uppeShortName, "en") || shortName
  fullNames[shortName] = name;
}

export default { flags, fullNames };