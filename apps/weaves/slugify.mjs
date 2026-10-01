function slugify(str) {
  return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/(?:[^a-z0-9\s-]|\d+)\S/g, '-').replace(/(?:[^a-z0-9\s-]|\d+)\S/g, '-');
}

function countWords(str) {
  return str.match(/\S+/g).length;
}
