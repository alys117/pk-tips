function setOrder(data, parentOrder = "0") {
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      item.order = parentOrder + "-" + index;
      if (item.children) {
        setOrder(item.children, item.order);
      }
    });
  } else {
    data.order = parentOrder + "-1";
    if (data.children) {
      setOrder(data.children, data.order);
    }
  }
}
const outline4 = {
  id: "root",
  topic: "咪咕视频产品质量分析",
  children: [
    {
      id: "tmp_0408_migu_pioneer_research",
      topic: "先锋用户调研数据",
      expanded: false,
      table_cname: "先锋用户调研数据",
      table_ename: "tmp_0408_migu_pioneer_research",
    },
    {
      id: "tmp_0408_migu_import_KEI",
      topic: "重点KEI数据",
      expanded: false,
      table_cname: "重点KEI数据",
      table_ename: "tmp_0408_migu_import_KEI",
    },
    {
      id: "tmp_0408_migu_export_KEI",
      topic: "非重点KEI数据",
      expanded: false,
      table_cname: "非重点KEI数据",
      table_ename: "tmp_0408_migu_export_KEI",
    },
    {
      id: "tmp_0408_migu_satis_value",
      topic: "用户满意度数据",
      expanded: false,
      table_cname: "用户满意度数据",
      table_ename: "tmp_0408_migu_satis_value",
    },
    {
      id: "tmp_0408_migu_score_all",
      topic: "产品质量指标总分",
      expanded: false,
      table_cname: "产品质量指标总分",
      table_ename: "tmp_0408_migu_score_all",
    },
    {
      id: "tmp_0408_migu_tousu",
      topic: "咪咕视频投诉数据",
      expanded: false,
      table_cname: "咪咕视频投诉数据",
      table_ename: "tmp_0408_migu_tousu",
    },
    {
      id: "tmp_0408_migu_tousu_reci",
      topic: "咪咕视频投诉热词数",
      expanded: false,
      table_cname: "咪咕视频投诉热词数",
      table_ename: "tmp_0408_migu_tousu_reci",
    },
    {
      id: "tmp_0408_migu_dialing",
      topic: "拨测数据",
      expanded: false,
      table_cname: "拨测数据",
      table_ename: "tmp_0408_migu_dialing",
    },
    {
      id: "tmp_0408_migu_ceping_problem",
      topic: "测评问题",
      expanded: false,
      table_cname: "测评问题",
      table_ename: "tmp_0408_migu_ceping_problem",
    },
    {
      id: "tmp_0408_migu_product_demand",
      topic: "一二类产品需求",
      expanded: false,
      table_cname: "一二类产品需求",
      table_ename: "tmp_0408_migu_product_demand",
    },
    {
      id: "tmp_0408_migu_operational_needs",
      topic: "两级运营需求",
      expanded: false,
      table_cname: "两级运营需求",
      table_ename: "tmp_0408_migu_operational_needs",
    },
    {
      id: "tmp_0408_migu_product_version",
      topic: "产品版本管理",
      expanded: false,
      table_cname: "产品版本管理",
      table_ename: "tmp_0408_migu_product_version",
    },
    {
      id: "tmp_0408_migu_pioneer_question",
      topic: "先锋用户体验测评问题",
      expanded: false,
      table_cname: "先锋用户体验测评问题",
      table_ename: "tmp_0408_migu_pioneer_question",
    },
  ],
};

setOrder(outline4);
console.log(outline4);

const arr = [
  { order: null, a: 1 },
  { order: "0-1-2" },
  { order: "0-1-1" },
  { order: "0-1-3" },
  { order: "1-1-14" },
  { order: null, a: 2 },
  { order: "1-1-12" },
  { order: "1-1-3" },
  { order: "1-2-1" },
  { order: "1-5" },
  { order: "1-6-2-1" },
  { order: "1-6-1" },
  { order: null, a: 3 },
];
arr.sort((a, b) => {
  if (a.order === null || b.order === null) {
    return a.order === null ? 1 : -1;
  }
  const _a = a.order.split("-");
  const _b = b.order.split("-");
  for (let i = 0; i < _a.length; i++) {
    if (_a[i] !== _b[i]) {
      return _a[i] - _b[i];
    }
  }
});
console.log(arr);

console.log(numToWords(1001));
