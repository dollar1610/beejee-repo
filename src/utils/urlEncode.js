export default function getUrl(data) {
  let url = '';
  Object.keys(data).forEach((key) => {
      url += `${key}=${encodeURIComponent(data[key])}`;
      url += `&`;
  });
  url = url.slice(0,url.length-1);
  return url;
}