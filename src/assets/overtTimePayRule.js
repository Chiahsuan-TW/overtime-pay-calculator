//輸入資料,哪一個工作型態
//
//{輪班:[公式1,公式2],非輪班:[公式1,公式2]}

//使用資料的

export default function getOverTimePay(currentMonthRecordingData, currentWorkPattern) {
  console.log(currentMonthRecordingData, currentWorkPattern);
  if (currentWorkPattern === "輪班") {
    console.log("輪班");

    currentMonthRecordingData.forEach((item) => {
      console.log(moment(item.date));
    });
    return;
  }
  if (currentWorkPattern === "非輪班") {
    console.log("非輪班");
    currentMonthRecordingData.forEach((item) => {
      console.log(item.date);
    });
    return;
  }
}

//輸出薪資
