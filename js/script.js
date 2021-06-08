// Значения текстовых импутов
const totalCost = document.getElementById("total-cost");
const anInitialFee = document.getElementById("an-initial-fee");
const creditTerm = document.getElementById("credit-term");

// Значения range импутов
const totalCostRange = document.getElementById("total-cost-range");
const anInitialFeeRange = document.getElementById("an-initial-fee-range");
const creditTermRange = document.getElementById("credit-term-range");

// Итоговые значения
const totalAmountOfCredit = document.getElementById("amount-of-credit");
const totalMonthlyPayment = document.getElementById("monthly-payment");
const totalRecommendedIncome = document.getElementById("recommended-income");

// Все range :
const inputsRange = document.querySelectorAll(".input-range");

// Все кнопки с процентной ставкой :
const bankBtns = document.querySelectorAll(".bank");
// console.log(bankBtns);

const assignValue = () => {
  totalCost.value = totalCostRange.value;
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
};

assignValue();

const banks = [
  {
    name: "alfa",
    present: 8.7,
  },
  {
    name: "sberbank",
    present: 8.4,
  },
  {
    name: "pochta",
    present: 7.9,
  },
  {
    name: "tinkoff",
    present: 9.2,
  },
];

let currentPrecent = banks[0].present;
let currentBank;

const calculator = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
  // Ежемесячный платеж -ЕП
  // Размер кредита -РК
  // Процентная ставка -ПС
  //Кол-во месяцев -КМ
  // ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ;

  let lounAmount = totalCost - anInitialFee; //Размер кредита;
  let interestRate = currentPrecent; // Процентная ставка;
  let numberOfYears = creditTerm; // кол-во лет;
  let numberOfMonths = 12 * numberOfYears; // кол-во месяцев;

  monthlyPayment =
    (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) /
    numberOfMonths;
  // console.log(monthlyPayment);
  const monthlyPaymentArounded = Math.round(monthlyPayment);
  // console.log(monthlyPaymentArounded);

  totalAmountOfCredit.innerHTML = `${lounAmount} р`;
  totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} р`;
  totalRecommendedIncome.innerHTML = `${
    monthlyPaymentArounded + (monthlyPaymentArounded / 100) * 35
  } р`;
};

const takeActiveBank = (currentActive) => {
  const dataAttrValue = currentActive.dataset.name;
  // console.log(dataAttrValue);
  currentBank = banks.find((bank) => bank.name === dataAttrValue);
  // console.log(currentBank);
  currentPrecent = currentBank.present;
  // console.log(currentPrecent);
  calculator(totalCost.value, anInitialFee.value, creditTerm.value);
};

// console.log(currentPrecent);
for (let bank of bankBtns) {
  bank.addEventListener("click", () => {
    // console.log(bank);
    for (let item of bankBtns) {
      item.classList.remove("active"); //Удаление класса active
    }
    bank.classList.add("active"); //Добавление класса active
    takeActiveBank(bank);
  });
}

for (let input of inputsRange) {
  // console.log(input);
  input.addEventListener("input", () => {
    assignValue();
    // console.log(totalCost.value);
    calculator(totalCost.value, anInitialFee.value, creditTerm.value);
  });
}
