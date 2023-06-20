var Filter = require("bad-words");
const filter = new Filter();
filter.removeWords("hells", "sadist", "hell");
export default filter;
