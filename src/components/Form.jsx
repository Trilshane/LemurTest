import { useRef, useState } from "react";
import MaskedInput from "react-text-mask";
import styles from "./scss/Form.module.scss";
import axios from "axios";

const Form = ({ click, closeWindow }) => {
  const [name, setName] = useState(""); //стейт инпута "имя"
  const [phone, setPhone] = useState("+7(___) ___-__-__"); // стейт инпута "телефон"
  const [checked, setChecked] = useState(""); // стейт чекбоксов для обратной связи
  const [checkedData, setCheckedData] = useState(false); // стейт чекбоксов для обработки персональных данных
  const [maskstyle, setConstMaskStyle] = useState(false); // стейт при котором подсвечивается форма телефона, при пустом значении
  const [clickedMusk, setClickedMusk] = useState(false); // стейт для отслеживания клика по форме телефона, для изменения цвета маски

  const nameRef = useRef();
  const checkRef1 = useRef();
  const checkRef2 = useRef();
  const checkDataRef = useRef();

  // функция для изменения цвета маски при пустой форме телефона, при клике вне инпута
  const phoneMask = document.querySelector("#phoneMask");
  document.addEventListener("click", (e) => {
    const withinBoundaries = e.composedPath().includes(phoneMask);
    if (!withinBoundaries && clickedMusk && phone == "+7(___) ___-__-__") {
      setClickedMusk(false);
    }
  });

  const handleSubmit = (e) => {
    if (!name) {
      nameRef.current.style.borderColor = "#ff0000";
      nameRef.current.style.boxShadow = "0 0 5px 0 #ff0000";
      e.preventDefault();
    }
    if (phone == "+7(___) ___-__-__" || !phone) {
      setConstMaskStyle(true);
      e.preventDefault();
    }
    if (!checked) {
      checkRef1.current.style.borderColor = "#ff0000";
      checkRef2.current.style.borderColor = "#ff0000";
      checkRef1.current.style.boxShadow = "0 0 5px 0 #ff0000";
      checkRef2.current.style.boxShadow = "0 0 5px 0 #ff0000";
      e.preventDefault();
    }
    if (!checkedData) {
      checkDataRef.current.style.borderColor = "#ff0000";
      checkDataRef.current.style.boxShadow = "0 0 5px 0 #ff0000";
      e.preventDefault();
    }
    if (name && phone !== "+7(___) ___-__-__" && checked && checkedData) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("check", checked);
      axios({
        url: "/sendEmail.php",
        method: "post",
        data: formData,
      })
        .then((res) => {
          setName("");
          setPhone("+7(___) ___-__-__");
          setChecked(false);
          setCheckedData(false);
          setConstMaskStyle(false);
          closeWindow();
          nameRef.current.style.borderColor = "#a29f9e4d";
          nameRef.current.style.boxShadow = "0 0 15px 0 #a29f9e4d";
          checkRef1.current.style.borderColor = "#a29f9e4d";
          checkRef2.current.style.borderColor = "#a29f9e4d";
          checkRef1.current.style.boxShadow = "0 0 5px 0 #a29f9e4d";
          checkRef2.current.style.boxShadow = "0 0 5px 0 #a29f9e4d";
          checkDataRef.current.style.borderColor = "#a29f9e4d";
          checkDataRef.current.style.boxShadow = "0 0 5px 0 #a29f9e4d";
          console.log("Письмо успешно отправлено");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    e.preventDefault();
  };

  const style1 = maskstyle
    ? {
        borderColor: "#ff0000",
        boxShadow: "0 0 5px 0 #ff0000",
        color: "#A29F9E",
      }
    : {};
  const style2 =
    phone === "+7(___) ___-__-__" ? { color: "#A29F9E" } : { color: "black" };

  const style3 =
    clickedMusk && phone === "+7(___) ___-__-__" ? { color: "black" } : {};

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.firstTitle}>Обратная связь</h1>
      <h3 className={styles.secondTitle}>
        Оставьте ваши контактные данные и мы свяжемся с вами в течение одного
        рабочего дня
      </h3>
      <div className={styles.inputContainer}>
        <input
          ref={nameRef}
          value={name}
          type="text"
          name="name"
          className={styles.input}
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
        />
        <MaskedInput
          id="phoneMask"
          style={{ ...style1, ...style2, ...style3 }}
          onClick={() => {
            setClickedMusk(true);
          }}
          mask={[
            "+",
            "7",
            "(",
            /[1-9]/,
            /\d/,
            /\d/,
            ")",
            " ",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
          ]}
          placeholder="+7(___) ___-__-__"
          showMask
          type="tel"
          name="phone"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <h3 className={styles.thirdTitle}>Выберите удобный способ связи:</h3>
      <div className={styles.radiosContainer}>
        <div className={styles.radioContainer}>
          <input
            type="radio"
            id="check1"
            name="check"
            value="Перезвонить"
            checked={checked == "Перезвонить" ? true : false}
            onChange={(e) => setChecked(e.target.value)}
          />
          <div
            ref={checkRef1}
            className={styles.checkZone}
            onClick={() => setChecked("Перезвонить")}
          >
            {checked == "Перезвонить" && <div className={styles.checked}></div>}
          </div>
          <label htmlFor="check1">Перезвонить</label>
        </div>
        <div className={styles.radioContainer}>
          <input
            type="radio"
            id="check2"
            name="check"
            value="Написать в телеграмм"
            checked={checked == "Написать в телеграмм" ? true : false}
            onChange={(e) => setChecked(e.target.value)}
          />
          <div
            ref={checkRef2}
            className={styles.checkZone}
            onClick={() => setChecked("Написать в телеграмм")}
          >
            {checked == "Написать в телеграмм" && (
              <div className={styles.checked}></div>
            )}
          </div>
          <label htmlFor="check2">Написать в телеграмм</label>
        </div>
      </div>
      <button className={styles.btn} type="submit">
        Отправить
      </button>
      <div className={styles.personalInformation}>
        <input
          type="checkbox"
          name="check"
          checked={checkedData}
          onChange={() => checkedData(!checkedData)}
        />
        <div
          ref={checkDataRef}
          className={styles.checkDataZone}
          onClick={() => setCheckedData(!checkedData)}
        >
          {checkedData && <div className={styles.checkedData}></div>}
        </div>
        <label>
          я согласен с{" "}
          <span className={styles.link} onClick={click}>
            правилами обработки
          </span>{" "}
          моих персональных данных
        </label>
      </div>
    </form>
  );
};
export default Form;
