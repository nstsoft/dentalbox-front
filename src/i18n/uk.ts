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
      select: "Обрати",
      returnToLogin: "Повернутись до лігін-сторінки",
      applyFilter: "Фільтрувати",
      accept: "Прийняти",
      create: "Створити",
      upload: "Завантажити",
      save: "Зберегти",
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
        address: "Адреса",
      },
      workspace: {
        title: "Виберіть кабінет",
        name: "Назва кабінету",
        image: "Зображення кабінету",
        description: "Опис кабінету",
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
      packageIntervals: {
        week: "Тижневий абонемент",
        month: "Місчний абонемент",
        year: "Річний абонемент",
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
    sideMenu: {
      pages: {
        workspace: "Середовище",
        cabinets: "Кабінети",
        calendar: "Календар",
        staff: "Персонал",
        profile: "Профіль",
        patients: "Пацієнти",
      },
    },
    pages: {
      workspace: {
        workspace: "Середовище",
        stuff: "Персонал",
        address: "Адреса",
        phone: "Телефон",
        notes: "Замітки",
        currentStaff: "Поточно кількість персоналу",
        maxStaff: "Максимальна кількість персоналу",
        addStaff: "Додати користувача",

        subscription: "Підписка",
        package: "Пакет",
        price: "Ціна",
        description: "Опис",
        status: "Статус",
        subscriptionStatus: {
          active: "Активний",
          canceled: "Скасований",
          incomplete: "Невиконаний",
          incomplete_expired: "Невиконаний  протермінований",
          past_due: "Протермінований",
          paused: "Призупинений",
          trialing: "Пробний період",
          unpaid: "Несплачений",
        },
        interval: { week: "Тиждень", month: "Місяць", year: "Рік" },
        period: "Період",
        cancel: "Скасувати",
        pause: "Пауза",
        paymentsSection: {
          payments: "Платіжні методи",
          default: "Картка по замовчуванню",
          delete: "Видалити",
          makeDefault: "Зробити картку по замовчуванню",
        },
        popover: {
          email: "Емейл",
          role: "Роль",
        },
        roleItems: {
          admin: "Адміністратор",
          manager: "Менеджер",
          doctor: "Лікар",
          assistant: "Асистент",
          owner: "Власник акаунту",
        },
        paymentMethods: {
          confirmDeleteLabel:
            "Видалити поточний метод платежу? Ви не зможете його використати для оплати підписки.",
          setDefault: "Зробити картку по замовчуванню",
          addCardLabel: "Додати новий метод платежу",
        },
        tabs: {
          workspace: "Середовище",
          subscription: "Підписка",
          paymentMethods: "Платіжні методи",
          invoices: "Інвойси",
        },
      },
      staff: {
        staff: "Персонал",
        search: "Пошук",
        isVerified: "Веріфікований",
        roles: "Роль",
        roleItems: {
          admin: "Адміністратор",
          manager: "Менеджер",
          doctor: "Лікар",
          assistant: "Асистент",
          owner: "Власник акаунту",
        },
        invitationStatuses: {
          pending: "Очікується",
          accepted: "Прийнята",
          declined: "Відхилена",
          expired: "Протермінована",
        },
        verifiedItems: { verified: "Так", notVerified: "Ні" },
        verification: "Верифікований",
        email: "Емейл",
        name: "Ім'я",
        secondName: "Прізвище",
        surname: "По батькові",
        phone: "Телефон",
        dob: "Дата народження",
        address: "Адреса",
        status: "Статус",
        activeTill: "Активна до",
        invitations: "Запрошення",
      },
      cabinet: {
        cabinet: "Кабінет",
        name: "Назва",
        phone: "Телефон",
        address: "Адреса",
        notes: "Замітки",
        actions: "Дії",
        createCabinet: "Створити кабінет",
        chair: "Крісло",
        image: "Фото",
      },
      patient: {
        patient: "Пацієнт",
        name: "Ім'я",
        secondName: "Прізвище",
        surname: "По батькові",
        dob: "Дата народження",
        email: "Емейл",
        phone: "Телефон",
        address: "Адреса",
        createPatient: "Створити пацієнта",
        image: "Фото",
        imageSuccess: "Фото успішно завантажене",
        sex: "Стать",
        sexItems: { male: "Чоловік", female: "Жінка" },
      },
      patientCard: {
        patientCard: "Картка пацієнта",
        name: "Ім'я",
        secondName: "Прізвище",
        surname: "По батькові",
        dob: "Дата народження",
        phone: "Телефон",
        email: "Емейл",
        address: "Адреса",
        notes: "Замітки",
        sex: "Стать",
        sexItems: { male: "Чоловік", female: "Жінка" },
      },
      calendar: {
        messages: {
          today: "Сьогодні",
          previous: "Назад",
          next: "Вперед",
          month: "Місяць",
          week: "Тижден",
          day: "День",
          agenda: "Адженда",
          date: "Дата",
          time: "Час",
          event: "Подія",
        },
      },
    },
  },
};