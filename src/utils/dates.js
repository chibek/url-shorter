import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

export const dayMonthBeauty = (value) => {
  dayjs.extend(customParseFormat);
  return dayjs(value).format('DD MMM');
};