import { ResourceLanguage } from "i18next";

export const UA: ResourceLanguage = {
  translation: {
    buttons: {
      cancel: "Відмінити",
      next: "Вперед",
      back: "Назад",
      close: "Закрити",
      submit: "Підтвердити",
      resendOtp: "Надіслати повторний код",
      login: "Увійти",
      signUp: "Зареєструватись",
      select: "Вибрати",
      returnToLogin: "Повернутись до лігін-сторінки",
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
      dontHaveAccount: "Не маєш акаунту?",
      signUp: "Зареєструватися?",
      signInGoogle: "Увійти за  допомогою Google",
      resetPassword: "Скинути пароль",
      resetPasswordText:
        "Введіть свій емейл, і ми надішлемо вам посилання для скидання пароля.",
      email: "Емейл",
      invalidCredentials: "Неправильний логін або пароль",
      authenticationErrorHeader: "Помилка автентифікації",
      authenticationErrorText:
        "Ми маємо труднощі з перевіркою ваших облікових даних. Будь ласка, перевірте своє ім'я користувача та пароль і спробуйте знову. Якщо проблема продовжується, можливо, вам потрібно скинути пароль або звернутися до служби підтримки для отримання допомоги.",
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
      userData: {
        title: "Персональні дані",
        name: "Ім'я",
        surname: "Прізвище",
        secondName: "По батькові",
        email: "Електронна пошта",
        password: "Пароль",
        confirmPassword: "Підтвердіть пароль",
        phone: "Номер телефону",
        birthDate: "Дата народження",
      },
      workspace: {
        title: "Виберіть кабінет",
        name: "Назва кабінету",
        image: "Зображення кабінету",
        description: "Опис кабінету",
        upload: 'Завантажити',
      },
      userProduct: {
        title: "Оберіть продукт",
        intervals: {
          week: "Тиждень",
          month: "Місяць",
          year: "Рік",
        },
        people: "людей",
      },
      subscriptionForm: {
        title: "Підписка",
      },
    },
    header: {
      profile: "Профіль",
      dashboard: "Дошка",
      workspace: "Середовище",
      logout: "Вийти",
    },
    confirmRegister: {
      userData: "Дані користувача",
      dob: "Дата народження",
      phone: "Телефон",
      email: "Емейл",
      name: "Ім'я",
      secondName: "Прізвище",
      surname: "По батькові",
      role: "Роль",
      owner: "Власник акаунту",
      workspaceData: "Дані середовища",
      workspaceName: "Назва",
      workspaceDescription: "Нотатки",
      checkbox: "Я погоджуюсь з умовами користування платформою",
      acceptTos: "Будь ласка, підтвердіть умови користування платформою",
    },
  },
};
