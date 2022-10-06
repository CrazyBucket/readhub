//通过时间戳来计算新闻发布时间为多久之前
export function calculate(timestamp) {
  let mistiming = Math.round(new Date() / 1000) - timestamp;
  mistiming = Math.abs(mistiming);
  let arrn = [31536000, 259200, 172800, 86400, 3600, 60, 1];
  let t1 = Math.floor(mistiming / arrn[0]);
  if (t1 != 0) {
    return overYear(timestamp);
  }
  let t2 = Math.floor(mistiming / arrn[1]);
  if (t2 != 0) {
    return mouth_Day(timestamp);
  }
  let t3 = Math.floor(mistiming / arrn[2]);
  if (t3 != 0) {
    return "前天";
  }
  let t4 = Math.floor(mistiming / arrn[3]);
  if (t4 != 0) {
    return "昨天";
  }
  let t5 = Math.floor(mistiming / arrn[4]);
  if (t5 != 0) {
    return t5 + "小时前";
  }
  let t6 = Math.floor(mistiming / arrn[5]);
  if (t6 != 0) {
    return t6 + "分钟前";
  }
  let t7 = Math.floor(mistiming / arrn[6]);
  if (t7 != 0) {
    return t7 + "秒前";
  }
}

function overYear(timestamp) {
  if (timestamp === 0 || timestamp == null) {
    return "";
  } else {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + "-";
    let M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return Y + M + D;
  }
}
function mouth_Day(timestamp) {
  if (timestamp === 0 || timestamp == null) {
    return "";
  } else {
    let date = new Date(timestamp * 1000);
    let M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return M + D;
  }
}
