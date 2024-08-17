export class ValidationHelper {
    async hasEmptyFields<T>(obj: T): Promise<boolean> {
        for (let key in obj) {
          if (typeof obj[key] === "object") {
            if (await this.hasEmptyFields(obj[key])) {
              return true;
            }
          } else {
            if (!obj[key]) {
              return true;
            }
          }
        }
      return false;
    }
}