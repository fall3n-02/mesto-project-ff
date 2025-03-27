const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error-active');
};

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input-error');
  errorElement.classList.remove('popup__input_error-active');
  errorElement.textContent = '';
};

const checkInputValidity = (form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector(".popup__button");
  toggleButtonState(inputs, button);
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
};

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

const resetValidation = (form) => {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector(".popup__button");
  inputs.forEach((input) => {
    hideInputError(form, input);
    button.disabled = true;
    button.classList.add("popup__button-is-inactive");
  });
  toggleButtonState(inputs, button);
}

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputs, button) => {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add("popup__button-is-inactive");
  } else {
    button.disabled = false;
    button.classList.remove("popup__button-is-inactive");
  }
}

export { enableValidation, resetValidation }