import StateModule from "@src/store/module";
import { ProfileState } from "./types";

/**
 * Состояние профиля
 */
class ProfileModule extends StateModule<ProfileState> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): ProfileState {
    return {
      data: {},
      waiting: false,
    };
  }

  /**
   * Загрузка профиля
   */
  async load() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState(
      {
        waiting: true,
        data: {},
      },
      "Ожидание загрузки профиля"
    );

    try {
      const json = await this.services.api.request({
        url: "/api/v1/users/self",
      });
      // Товар загружен успешно
      this.setState(
        {
          data: json.result,
          waiting: false,
        },
        "Профиль загружен"
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState(
        {
          data: {},
          waiting: false,
        },
        "Ошибка загрузки профиля"
      );
    }
  }
}

export default ProfileModule;
