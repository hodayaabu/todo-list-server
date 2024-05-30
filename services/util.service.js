import http from "http";
import https from "https";

export const utilService = {
  httpGet,
  makeId,
};

function httpGet(url) {
  const protocol = url.startsWith("https") ? https : http;
  const options = {
    method: "GET",
  };

  return new Promise((resolve, reject) => {
    const req = protocol.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    });
    req.on("error", (err) => {
      reject(err);
    });
    req.end();
  });
}

function makeId(length = 5) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
