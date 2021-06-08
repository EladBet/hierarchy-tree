let userInfo = {};

export const url = "https://gongfetest.firebaseio.com";

const poision = [
  156,
  33,
  64,
  174,
  120,
  204,
  69,
  242,
  177,
  98,
  16,
  244,
  75,
  5,
  21,
  7,
  145,
  39,
  156,
  119,
  246,
  63,
  43,
  201,
  91,
  164,
  171,
  244,
  198,
  100,
  252,
  91,
  92,
  193,
  95,
  70,
  131,
  18,
  69,
  131,
  88,
  40,
  241,
  203,
  190,
  210,
  154,
  138,
  4,
  5,
  212,
  34,
  25,
  151,
  150,
  253,
  135,
  59,
  144,
  152,
  202,
  190,
  196,
  29,
  23,
  165,
  234,
  254,
  6,
  245,
  142,
  18,
  234,
  49,
  63,
  31,
  33,
  152,
  73,
  6,
  212,
  119,
  245,
  182,
  248,
  40,
  167,
  206,
  230,
  204,
  245,
  48,
  200,
  169,
  186,
  110,
  124,
  105,
  22,
  7,
  128,
  56,
  85,
  12,
  48,
  130,
  207,
  114,
  168,
  216,
  104,
  20,
  28,
  183,
  78,
  194,
  131,
  33,
  245,
  47,
  203,
  214,
  109,
  27,
  8,
  214,
  195,
  249,
  152,
  240,
  51,
  142,
  123,
  250,
  208,
  160,
  51,
  207,
  6,
  67,
  63,
  111,
  75,
  198,
  63,
  50,
  181,
  137,
  163,
  43,
  160,
  141,
  19,
  188,
  37,
  50,
  105,
  20,
  252,
  93,
  134,
  39,
  130,
  234,
  109,
  223,
  161,
  74,
  175,
  44,
  35,
  62,
  201,
  159,
  3,
  170,
  224,
  28,
  113,
  184,
  243,
  116,
  166,
  132,
  77,
  93,
  130,
  101,
  198,
  173,
  143,
  8,
  131,
  180,
  130,
  61,
  242,
  43,
  39,
  105,
  44,
  239,
  157,
  181,
  86,
  150,
  180,
  100,
  172,
  134,
  53,
  76,
  220,
  18,
  210,
  150,
  99,
  234,
  57,
  252,
  242,
  40,
  205,
  185,
  53,
  162,
  160,
  211,
  134,
  91,
  44,
  65,
  160,
  30,
  9,
  28,
  192,
  239,
  255,
  92,
  108,
  226,
  242,
  67,
  0,
  201,
  158,
  39,
  128,
  97,
  215,
  65,
  221,
  197,
  22,
  231
];

function make32(s) {
  let r = s;
  while (r.length < 32) r += s;
  r = r.substring(0, 32);
  let ret = [];
  for (let i = 0; i < r.length; ++i) ret.push(r.charCodeAt(i));
  return ret;
}

export function encode(email, password) {
  let e = make32(email);
  let p = make32(password);
  let code = "";

  for (let i = 0; i < 32; ++i)
    code += ("0" + poision[(e[i] ^ p[i]) & 0xff].toString(16))
      .slice(-2)
      .toUpperCase();

  return code;
}

export function fetchData(url, data, isDelete) {
  let method = "GET";
  if (data) {
    method = "PUT";
  }
  if (isDelete) {
    method = "DELETE";
  }
  return fetch(url, {
    method,
    body: JSON.stringify(data)
  }).then((res) => {
    if (res.statusText !== "OK") {
      const err = new Error();
      err.message = res.statusText;
      err.status = res.status;
      return Promise.reject(err);
    }
    return res.json();
  });
}

export function getUsersByManager(arr = []) {
  let map = {},
    node,
    res = [],
    i;
  for (i = 0; i < arr.length; i += 1) {
    if (arr[i]) {
      map[arr[i].id] = i;
      arr[i].children = [];
    }
  }
  for (i = 0; i < arr.length; i += 1) {
    if (arr[i]) {
      node = arr[i];
      if (node.managerId) {
        arr[map[node.managerId]].children.push(node);
      } else {
        res.push(node);
      }
    }
  }
  return res;
}

export function findChildrenByNode(node, id) {
  let collection = [];
  for (let i = 0; i < node.length; i++) {
    findNodeInObj(node[i], id, collection);
  }

  return collection;
}

function findNodeInObj(node, id, collection) {
  if (node.id === id) {
    bfs(node, collection);
  }

  for (let i = 0; i < node.children.length; i++) {
    findNodeInObj(node.children[i], id, collection);
  }

  return;
}

export function bfs(tree, collection) {
  collection.push(tree.id);

  if (!tree.children || tree.children.length === 0) {
    return;
  }
  for (var i = 0; i < tree.children.length; i++) {
    var child = tree.children[i];
    bfs(child, collection);
  }
  return;
}
