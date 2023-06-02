import { useState } from "react";
import Moment from "react-moment";
import axios from "axios";
import "./holi.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import calimg from "./img/Calculator1.png"
import Swal from "sweetalert2";
import { HiOutlineInformationCircle } from "react-icons/hi";


function Holi() {

  const [nowTime, setNowTime] = useState(Date.now())
  const [startDate, setStartDate] = useState(nowTime);
  const [result, setResult] = useState({});
  const [workDay, setWorkDay] = useState('');
  const [loading, setLoading] = useState(false);

  const handlerChange = e => {
    setStartDate(e.target.value.replaceAll("-", ""));
  };

  const handlerClick = () => {
    showLoadingToast(); // 로딩 중 메시지 표시

    setTimeout(() => {
      axios
        .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/calcurate/${startDate}`)
        .then(response => {
          setResult(response.data);
          setWorkDay(response.data.data.work_day);
          setLoading(false); // 로딩 상태를 false로 설정

          Swal.fire({
            title: '🎉결과가 나왔습니다!🎉',
            showConfirmButton: false,
            timer: 800
          });
        })
        .catch(error => console.log(error));
    }, 2500); // 2.5초 후에 결과를 가져오도록 설정
  };

  // 로딩 중 메시지 표시 함수
  const showLoadingToast = () => {
    Swal.fire({
      title: '소중한 연차를 계산 중입니다...🧐',
      width: '600px',
      showConfirmButton: false,
      imageUrl: process.env.PUBLIC_URL + '/img/1495.gif',
      imageWidth: 500,
      imageHeight: 50,
      imageAlt: 'Custom image',
      onOpen: () => {
        Swal.showLoading();
      }
    });
  };

  // 버튼 커스텀
  const [selectedButton, setSelectedButton] = useState('myButton1'); // 기본값으로 'myButton1' 설정

  const handleClick = (buttonId) => {
    let selectedValue;
    if (buttonId === 'myButton1') {
      selectedValue = "/HoliCal"; // 포함 선택한 경우
    } else {
      selectedValue = "/Salary";
      window.location.href = '/Salary'; // 별도 선택한 경우
    }

    // 선택된 항목이 이미 있는 경우, 선택 해제
    if (selectedButton === buttonId) {
      setSelectedButton(null);
    } else {
      setSelectedButton(buttonId);
    }
  };

  return (
    <>
      <div id="cal-container">
        <div className="holi_container">
          <div className="holi-title">직장인으로 살아남기🏝️</div>
          {/* 토글 */}
          <div className="toggle_button_container">
            <button className="holi_salary_btn"
              id="myButton1"
              onClick={() => handleClick('myButton1')}
              style={{
                backgroundColor: selectedButton === 'myButton1' ? 'black' : 'black',
                color: selectedButton === 'myButton1' ? 'white' : 'white'
              }}>연차</button>
            <button className="holi_holi_btn"
              id="myButton2"
              onClick={() => handleClick('myButton2')}
              style={{
                backgroundColor: selectedButton === 'myButton2' ? 'black' : 'initial',
                color: selectedButton === 'myButton2' ? 'white' : 'initial'
              }}>연봉</button>
          </div>

          {/* 인풋박스 */}
          <div className="holical">
            <div className="join_date">
              <p className="join_date_text">입사일</p>
              <input type="date"
                className="calender"
                onChange={handlerChange}
                placeholder="입사일" />
            </div>

            <div className="worked_date">
              <p className="worked_date_text">근무 일수</p>
              <input type="text"
                className="calender_2"
                placeholder="얼마나 다녔을까...?"
                readOnly
                value={workDay} />
            </div>
          </div>

          <div>
            {/* 클릭 버튼 */}
            <button onClick={handlerClick} className="cal-btn_2" title="계산하기">과연 나의 연차는??✈️</button>

            <div className="info-text">
              <HiOutlineInformationCircle className="info-icon" />
              입사일을 입력한 후 👆위 버튼👆을 클릭하면 자동으로 근무일수와 연차가 자동 계산되어 나타납니다!
            </div>
          </div>

          <div className="holiresult">
            {result && result.data &&
              <ul>
                <Moment format={"yyyy/MM/DD"} className={'moment-box'}>{nowTime}</Moment> 기준으로 <br />
                총 연차일수는  <span>{result.data.holi_day}일</span> 입니다.
                <li>본 연봉계산기는 가장 범용적인 기준으로 만들었으나, 연봉 지급 조건과 상황에 따라 약간의 오차가 발생할 수 있으니 참고용으로 활용하시기 바랍니다.<br />
                  본 계산기는 모의계산 결과로 법적 효력이 없습니다.</li>
              </ul>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Holi;
