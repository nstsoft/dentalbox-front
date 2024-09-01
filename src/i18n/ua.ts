import { ResourceLanguage } from "i18next";

export const UA: ResourceLanguage = {
  translation: {
    buttons: {
      cancel: "Відмінити",
      next: "Вперед",
      back: "Назад",
      close: "Закрити",
      submit: "Підтвердити",
    },
    login: {
      login: "Логін",
      loginPlaceholder: "Ваш емейл або телефон",
      passwordPlaceholder: "Пароль",
      forgotPassword: "Забув пароль?",
      loginError:
        "Будь ласка, введіть правильний емейл або телефон в форматі +380XXXXXXXXX.",
      passwordError: "Введіть пароль не менше 6-ти символів.",
      password: "Пароль",
      signIn: "Увійти",
      or: "або",
      dontHaveAccount: "Не маеш акаунту?",
      signUp: "Зареєструватися?",
      signInGoogle: "Увійти за  допомогою Google",
      resetPassword: "Скинути пароль",
      resetPasswordText:
        "Введіть свій емейл, і ми надішлемо вам посилання для скидання пароля.",
      email: "Емейл",
      invalidCredentials: "Неправильний логін або пароль",
    },
    selectWorkspace: {
      workspaces: "Ваші середовища",
      selectWorkspaceTest:
        "Будь ласка, виберіть робочу область, до якої ви хочете увійти.",
    },
    confirmOtp: {
      confirmOtp: "Підтвердити OTP код",
      confirmOtpText:
        "Щоб продовжити користуватися платформою управління та забезпечити безпеку вашого облікового запису, будь ласка, підтвердьте свій OTP код. Цей крок необхідний для підтвердження вашої особи та доступу до всіх функцій платформи.",
    },
    navbar: {
      signIn: "Увійти",
      createCabinet: "Створити кабінет",
    },
    signUpWizard: {
      nextButton: "Далі",
      previousButton: "Назад",
      userData: {
        name: "Ім'я",
        surname: "Прізвище",
        secondName: "По батькові",
        email: "Електронна пошта",
        password: "Пароль",
        phone: "Номер телефону",
      },
      workspace: {
        name: "Назва кабінету",
        image: "Зображення кабінету",
        description: "Опис кабінету",
      },
      userPlan: {
        title: "Оберіть план",
        createAccount: "Створити користувача",
      },
    },
  },
};