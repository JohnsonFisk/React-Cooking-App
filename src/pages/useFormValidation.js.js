import { useEffect, useCallback } from 'react';

const useFormValidation = () => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const form = document.getElementById("caca");
    const queryTypeSelected = document.querySelector('input[name="queryType"]:checked');
    const emailError = document.querySelector(".emailError");
    const fistNameError = document.querySelector(".fistNameError");
    const lastNameError = document.querySelector(".lastNameError");
    const queryError = document.querySelector(".queryError");
    const notification = document.getElementById("notification");
    let hasError = false;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const textArea = document.getElementById("textArea");
    const conscent = document.getElementById("conscent");
    const conscentLabel = document.getElementById("conscentLabel");
    const generalContainer = document.getElementById("generalContainer");
    const supportContainer = document.getElementById("supportContainer");

    if (firstName && firstName.value === "") {
      firstName.style.border = "1px solid red";
      if (fistNameError) fistNameError.style.visibility = "visible";
      hasError = true;
    } else {
      if (firstName) firstName.style.border = "";
      if (fistNameError) fistNameError.style.visibility = "hidden";
    }

    if (lastName && lastName.value === "") {
      lastName.style.border = "1px solid red";
      if (lastNameError) lastNameError.style.visibility = "visible";
      hasError = true;
    } else {
      if (lastName) lastName.style.border = "";
      if (lastNameError) lastNameError.style.visibility = "hidden";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && email.value === "") {
      email.style.border = "1px solid red";
      if (emailError) {
        emailError.textContent = "Please enter an email address";
        emailError.style.visibility = "visible";
      }
      hasError = true;
    } else if (email && !emailRegex.test(email.value)) {
      email.style.border = "1px solid red";
      if (emailError) {
        emailError.textContent = "Please enter a valid email address";
        emailError.style.visibility = "visible";
      }
      hasError = true;
    } else {
      if (email) email.style.border = "";
      if (emailError) emailError.style.visibility = "hidden";
    }

    if (queryTypeSelected == null) {
      if (generalContainer) generalContainer.style.border = "1px solid red";
      if (supportContainer) supportContainer.style.border = "1px solid red";
      if (queryError) queryError.style.visibility = "visible";
      hasError = true;
    } else {
      if (generalContainer) generalContainer.style.border = "";
      if (supportContainer) supportContainer.style.border = "";
      if (queryError) queryError.style.visibility = "hidden";
    }

    if (conscent && !conscent.checked) {
      if (conscentLabel) conscentLabel.style.color = "red";
      hasError = true;
    } else {
      if (conscentLabel) conscentLabel.style.color = "";
    }

    if (textArea && textArea.value === "") {
      textArea.style.border = "1px solid red";
      hasError = true;
    } else {
      if (textArea) textArea.style.border = "";
    }

    if (!hasError) {
      if (notification) {
        notification.style.visibility = "visible";
        notification.classList.add("show");

        setTimeout(function () {
          notification.classList.remove("show");
          form.submit();
        }, 5000);
      }
    }
  }, []);

  const handleInput = useCallback((e) => {
    const { id, value } = e.target;
    const errorElement = document.querySelector(`.${id}Error`);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (id === 'email' && value !== '' && !emailRegex.test(value)) {
      e.target.style.border = "1px solid red";
      if (errorElement) {
        errorElement.textContent = "Please enter a valid email address";
        errorElement.style.visibility = "visible";
      }
    } else if (value === '') {
      e.target.style.border = "1px solid red";
      if (errorElement) {
        errorElement.textContent = `Please enter a valid ${id}`;
        errorElement.style.visibility = "visible";
      }
    } else {
      e.target.style.border = "";
      if (errorElement) errorElement.style.visibility = "hidden";
    }
  }, []);

  const handleQueryTypeChange = useCallback((e) => {
    const queryError = document.querySelector(".queryError");
    const generalContainer = document.getElementById("generalContainer");
    const supportContainer = document.getElementById("supportContainer");
    if (!e.target.checked) {
      if (generalContainer) generalContainer.style.border = "1px solid red";
      if (supportContainer) supportContainer.style.border = "1px solid red";
      if (queryError) queryError.style.visibility = "visible";
    } else {
      if (generalContainer) generalContainer.style.border = "";
      if (supportContainer) supportContainer.style.border = "";
      if (queryError) queryError.style.visibility = "hidden";
    }
  }, []);

  const handleTextAreaInput = useCallback((e) => {
    const textArea = e.target;
    if (textArea.value === "") {
      textArea.style.border = "1px solid red";
    } else {
      textArea.style.border = "";
    }
  }, []);

  useEffect(() => {
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) submitBtn.addEventListener("click", handleSubmit);
    const firstName = document.getElementById("firstName");
    if (firstName) firstName.addEventListener("input", handleInput);
    const lastName = document.getElementById("lastName");
    if (lastName) lastName.addEventListener("input", handleInput);
    const email = document.getElementById("email");
    if (email) email.addEventListener("input", handleInput);
    const queryTypeInputs = document.querySelectorAll('input[name="queryType"]');
    queryTypeInputs.forEach((radio) => {
      radio.addEventListener("change", handleQueryTypeChange);
    });
    const textArea = document.getElementById("textArea");
    if (textArea) textArea.addEventListener("input", handleTextAreaInput);

    return () => {
      if (submitBtn) submitBtn.removeEventListener("click", handleSubmit);
      if (firstName) firstName.removeEventListener("input", handleInput);
      if (lastName) lastName.removeEventListener("input", handleInput);
      if (email) email.removeEventListener("input", handleInput);
      queryTypeInputs.forEach((radio) => {
        radio.removeEventListener("change", handleQueryTypeChange);
      });
      if (textArea) textArea.removeEventListener("input", handleTextAreaInput);
    };
  }, [handleSubmit, handleInput, handleQueryTypeChange, handleTextAreaInput]);
};

export default useFormValidation;
