import Mock from 'mockjs';
import bill from "./bill.js"

Mock.mock('/detailData', 'get', bill())


