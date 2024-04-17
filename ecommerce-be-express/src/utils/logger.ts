import winston, { format } from "winston";
import dateFnsTz from "date-fns-tz";

const { combine, colorize, timestamp, splat, simple, json } = format;

const timestampWithTimezone = () => {
  const timeZone = "Asia/Seoul";
  return dateFnsTz.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone });
};

const searchLogFilter = format((info, opts) => {
  if (info.message.includes("[검색로그]")) {
    return info;
  }
  return false; // 이 조건에 맞지 않는 로그는 필터링됩니다.
});

// 로거 인스턴스 생성
const logger = winston.createLogger({
  level: "info", // 로그 레벨 설정
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: timestampWithTimezone }), splat(), simple()),
    }),
    new winston.transports.File({
      filename: "logs/search.log",
      format: combine(searchLogFilter(), timestamp({ format: timestampWithTimezone }), splat(), simple()),
    }),
  ],
});

export default logger;
