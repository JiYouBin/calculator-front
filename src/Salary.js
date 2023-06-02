import axios from "axios";
import { useState } from "react";
import calimg from "./img/Calculator1.png"
import './salary.css';
import { FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

function Salary() {

    const [inputPay, setInputPay] = useState('');                       // 연봉
    const [taxFree, setTaxFree] = useState('2400000');                   // 비과세액
    const [dependent, setDependent] = useState(1);                      // 부양가족 수(본인 포함 - 기본 1명)
    const [underTwenty, setUnderTwenty] = useState(0);                  // 20세 이하 자녀 수
    const [choosePeriod, setChoosePeriond] = useState('0');             // 급여 기준(연봉/ 월급)
    const [retirementInclude, setRetirementInclude] = useState('0');    // 퇴직금(별도/ 포함)
    const [card, setCard] = useState('');                               // 카드값
    const [result, setResult] = useState({});                           // 결과값

    // 연봉 , 추가
    const handlerChange = e => {
        const inputValue = e.target.value.replace(/,/g, '');            // 쉼표를 제거
        const parsedValue = parseFloat(inputValue);                     // 입력된 값을 부동소수점 숫자로 변환

        // 만약 변환된 값이 NaN (숫자가 아님)인 경우, 빈 문자열로 설정하여 화면에 표시되지 않도록 함
        setInputPay(isNaN(parsedValue) ? '' : parsedValue);
    };

    const onIncrease = () => {
        setDependent(dependent + 1);
    };

    const onDecrease = () => {
        setDependent(dependent - 1);
    };

    const onIncreaseTwen = () => {
        setUnderTwenty(underTwenty + 1);
    };

    const onDecreaseTwen = () => {
        setUnderTwenty(underTwenty - 1);
    };

    //토글
    const [selectedButton, setSelectedButton] = useState('myButton1');   // 기본값으로 'myButton1' 설정
    const [selectedButton2, setSelectedButton2] = useState('myButton3'); // 기본값으로 'myButton1' 설정

    //급여 기준
    const handleButtonClick = (buttonId) => {
        let selectedValue;
        if (buttonId === 'myButton1') {
            selectedValue = 0; // 연봉 선택한 경우
        } else {
            selectedValue = 1; // 월급 선택한 경우
        }

        // 선택된 항목이 이미 있는 경우, 선택 해제
        if (selectedButton !== buttonId) {
            setSelectedButton(buttonId);
            setChoosePeriond(selectedValue);
        }
    };

    const handleButtonClick2 = (buttonId) => {
        let selectedValue;
        if (buttonId === 'myButton4') {
            selectedValue = 1; // 포함 선택한 경우
        } else {
            selectedValue = 0; // 별도 선택한 경우
        }

        if (selectedButton2 !== buttonId) {
            setSelectedButton2(buttonId);
            setRetirementInclude(selectedValue);
        }
    };

    // 비과세액 , 추가
    const handlerChangeTax = e => {
        const taxValue = e.target.value.replace(/,/g, '');
        const parsedValue = parseFloat(taxValue);

        setTaxFree(isNaN(parsedValue) ? '' : parsedValue);
    };

    const handlerChangeDependent = e => setDependent(e.target.value);
    const handlerChangeUnderTwenty = e => setUnderTwenty(e.target.value);

    // 카드 , 추가
    const handlerChangeCard = e => {
        const cardValue = e.target.value.replace(/,/g, '');
        const parsedValue = parseFloat(cardValue);

        setCard(isNaN(parsedValue) ? '' : parsedValue);
    };

    const handlerClick = () => {
        if (!inputPay) {
            // 입력 값이 없는 경우
            Swal.fire({
                title: '⛔ 급여를 입력해주세요! ⛔',
                showConfirmButton: false,
                timer: 800
            });
            return;
        }

        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/salaryCal/${inputPay}/${taxFree}/${dependent}/${underTwenty}/${choosePeriod}/${retirementInclude}`)
            .then((response) => {
                console.log(response.data);
                setResult(response.data);
            })
            .catch((error) => console.log(error));
    };

    const [selectedButton5, setSelectedButton5] = useState('myButton6'); // 기본값으로 'myButton1' 설정

    const handleClick2 = (buttonId) => {
        let selectedValue;
        if (buttonId === 'myButton5') {
            selectedValue = "/"; // 포함 선택한 경우
            window.location.href = '/'
        } else {
            selectedValue = "/Salary";
            window.location.href = '/Salary'; // 별도 선택한 경우
        }

        // 선택된 항목이 이미 있는 경우, 선택 해제
        if (selectedButton5 === buttonId) {
            setSelectedButton5(null);
        } else {
            setSelectedButton5(buttonId);
        }
    };

    // 비과세액 info 
    const [showTooltip, setShowTooltip] = useState(false);

    const handleIconClick = () => {
        setShowTooltip(!showTooltip);
    };

    return (
        <>
            <div id="cal-container">
                <div className="salary_container">
                    <div className="toggle_button_container">
                        <button className="salary_salary_btn"
                            id="myButton5"
                            onClick={() => handleClick2('myButton5')}
                            style={{
                                backgroundColor: selectedButton5 === 'myButton5' ? 'black' : 'white',
                                color: selectedButton5 === 'myButton5' ? 'white' : 'black'
                            }}>
                            연차
                        </button>
                        <button className="salary_holi_btn" id="myButton6" onClick={() => handleClick2('myButton6')}
                            style={{
                                backgroundColor: selectedButton5 === 'myButton6' ? 'black' : 'white',
                                color: selectedButton5 === 'myButton6' ? 'white' : 'black'
                            }}>
                            연봉
                        </button>
                    </div>

                    {/* 입력값 */}
                    <div className="paycheck-container">
                        <div className="paycheck-header">
                            <div className="salary-title">개미는 뚠뚠 오늘도 뚠뚠...🐜</div>
                        </div>

                        <div className="paycheck-body">
                            <div className="paycheck-box">
                                <div className="pay-input">
                                    <p>급여</p>
                                    <input
                                        type="text"
                                        className="won-box1"
                                        value={inputPay ? parseFloat(inputPay).toLocaleString() : ''}
                                        onChange={handlerChange}
                                        placeholder="급여를 입력하세요"
                                    />
                                    <span className="won1">원</span>
                                </div>

                                <div className="taxfree-input">
                                    <p>
                                        비과세액{'  '}
                                        <FaInfoCircle className="taxfree-icon" onClick={handleIconClick} />

                                        {showTooltip && (
                                            <>
                                                <div className="taxfree-info">
                                                    <div className="tooltip-semo"></div>
                                                    <span className="tooltip">
                                                        대표적인 비과세항목인 식대는 월 20만원까지 비과세입니다.
                                                        <br></br>
                                                        그 외에 비과세 항목은 급여명세서를 통해서 확인할 수 있습니다.
                                                        <span className="tooltip-present">
                                                            (❗ 현재 입력된 비과세는 연봉을 기준으로 작성 되었습니다)
                                                        </span>
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </p>
                                    <input type="text"
                                        className="won-box2"
                                        value={taxFree ? parseFloat(taxFree).toLocaleString() : ''}
                                        onChange={handlerChangeTax}
                                        placeholder="비과세액" />
                                    <label className="won2">원</label>
                                </div>

                                {/* 업, 다운 버튼 */}
                                <div className="form_field">
                                    <div className="spin_button number">
                                        <p>부양가족 수</p>
                                        <button type="button"
                                            onClick={onDecrease}
                                            className="minus"
                                            id="dependent_btn">▼</button>
                                        <input type="text"
                                            id="dependent"
                                            value={dependent}
                                            maxLength="2"
                                            onChange={handlerChangeDependent} />
                                        <button type="button"
                                            onClick={onIncrease}
                                            className="plus"
                                            id="dependent_btn">▲</button>
                                    </div>

                                    <div className="spin_button2">
                                        <p>20세 이하 자녀 수</p>
                                        <button type="button"
                                            onClick={onIncreaseTwen}
                                            className="plus"
                                            id="dependent_btn">▲</button>
                                        <input type="text"
                                            id="dependent"
                                            value={underTwenty}
                                            maxLength="2"
                                            onChange={handlerChangeUnderTwenty} />
                                        <button type="button"
                                            onClick={onDecreaseTwen}
                                            className="minus"
                                            id="dependent_btn">▼</button>
                                    </div>
                                </div>

                                {/* 토글 */}
                                <div className="form_field_2">
                                    <span className="spin_button">
                                        <p>급여 기준</p>
                                        <button id="myButton1"
                                            onClick={() => handleButtonClick('myButton1')}
                                            style={{
                                                backgroundColor: selectedButton === 'myButton1' ? 'black' : 'initial',
                                                color: selectedButton === 'myButton1' ? 'white' : 'initial'
                                            }}>연봉</button>
                                        <button id="myButton2"
                                            onClick={() => handleButtonClick('myButton2')}
                                            style={{
                                                backgroundColor: selectedButton === 'myButton2' ? 'black' : 'initial',
                                                color: selectedButton === 'myButton2' ? 'white' : 'initial'
                                            }}>월급</button>
                                    </span>

                                    <span className="spin_button2">
                                        <p>퇴직금</p>
                                        <button
                                            id="myButton3"
                                            onClick={() => handleButtonClick2('myButton3')}
                                            style={{
                                                backgroundColor: selectedButton2 === 'myButton3' ? 'black' : 'initial',
                                                color: selectedButton2 === 'myButton3' ? 'white' : 'black'
                                            }}>별도 </button>
                                        <button
                                            id="myButton4"
                                            onClick={() => handleButtonClick2('myButton4')}
                                            style={{
                                                backgroundColor: selectedButton2 === 'myButton4' ? 'black' : 'initial',
                                                color: selectedButton2 === 'myButton4' ? 'white' : 'black'
                                            }}>포함</button>
                                    </span>
                                </div>

                                {/* 카드값 */}
                                <div className="form_field_3">
                                    <p>카드값 (선택사항)</p>
                                    <input type="text"
                                        className="won-box3"
                                        value={card ? parseFloat(card).toLocaleString() : ''}
                                        onChange={handlerChangeCard}
                                        placeholder="평균적으로 사용한 카드값을 입력하세요" />
                                    <label className="won3">원</label>
                                </div>

                                {/* 계산하기 버튼 */}
                                <button className="cal-btn" onClick={handlerClick}>
                                    계산하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* 결과값 */}
                <div className="result-container">
                    <div className="result-box-all">
                        <div className="result-box">
                            {result && result.data &&
                                <ul>
                                    <h1>개미의 자급생활 금액🍭</h1>
                                    <dl>
                                        <span className="title">건강보험</span>
                                        <span className="result">{result.data.health_insurance.toLocaleString()}원</span>
                                    </dl>
                                    <dl>
                                        <span className="title">소득세</span>
                                        <span className="result">{result.data.income_tax.toLocaleString()}원</span>
                                    </dl>
                                    <dl>
                                        <span className="title">장기요양</span>
                                        <span className="result">{result.data.longterm_care_insurance.toLocaleString()}원</span>
                                    </dl>
                                    <dl>
                                        <span className="title">국민연금</span>
                                        <span className="result">{result.data.national_pension.toLocaleString()}원</span>
                                    </dl>
                                    <dl>
                                        <span className="title">지방소득세</span>
                                        <span className="result">{result.data.residence_tax.toLocaleString()}원</span>
                                    </dl>
                                    <dl>
                                        <span className="title">고용보험</span>
                                        <span className="result">{result.data.unemployment_insurance.toLocaleString()}원</span>
                                    </dl>
                                    <dl>
                                        <span className="title">공제액 합계</span>
                                        <span className="result">{result.data.total_tax_deduction.toLocaleString()}원</span>
                                    </dl>
                                    <dl>
                                        <span className="title">카드값</span>
                                        <span className="result">{card ? parseFloat(card).toLocaleString() : ''}원</span>
                                    </dl>

                                    <dl className="pay_result">
                                        <div className="pay_result-box">
                                            <p className="pay_result-title">월 예상 실 수령액</p>
                                            <p className="pay_result-content">
                                                {result.data.after_tax_income - card ? (result.data.after_tax_income - card).toLocaleString() : ''}
                                                <span className="content-won"> 원</span>
                                            </p>
                                        </div>
                                    </dl>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Salary;