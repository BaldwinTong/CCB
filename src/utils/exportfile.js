function export2Excel(datalist,Cfield,Efield,fileName) {
    // var that = this;
    require.ensure([], () => {
        const { export_json_to_excel } = require("../excel/Export2Excel"); //这里必须使用绝对路径
        const tHeader = Cfield; // 导出的表头名
        const filterVal = Efield; // 导出的表头字段名
        const data = formatJson(filterVal, datalist);
        export_json_to_excel(tHeader, data, fileName); // 导出的表格名称，根据需要自己命名
    });
}

function formatJson(filterVal, jsonData) {
    return jsonData.map((v) => filterVal.map((j) => v[j]));
}

export default export2Excel