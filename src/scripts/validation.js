function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(validationConfig, form);
  });
};

function clearValidation(validationConfig, form) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);
  inputs.forEach((input) => {
    hideInputError(validationConfig, form, input);
  });
  toggleButtonState(validationConfig, inputs, button);
}

function showInputError(validationConfig, form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError(validationConfig, form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(validationConfig, form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(validationConfig, form, input, input.validationMessage);
  } else {
    hideInputError(validationConfig, form, input);
  }
};

function setEventListeners(validationConfig, form) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(validationConfig, inputs, button);
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(validationConfig, form, input);
      toggleButtonState(validationConfig, inputs, button);
    });
  });
};

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  })
}

function toggleButtonState(validationConfig, inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export { enableValidation, clearValidation }