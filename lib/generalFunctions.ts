export function toTitleCase(str: string) {
  if (!str) return str;
  const res = str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      const target = word[0] == "'" ? word[1] : word[0];
      return word.replace(target, target.toUpperCase());
    })
    .join(" ");
  //   console.log(res);
  return res;
}
