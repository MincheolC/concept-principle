import path from "path";
import fs from "fs";
import YAML from "js-yaml";
import _ from "lodash";

interface SwaggerSpec {
  openapi: string;
  info: Record<string, any>;
  servers: Array<Record<string, any>>;
  paths: Record<string, any>;
  components: {
    schemas: Record<string, any>;
  };
}

export const readSwaggerFiles = (): SwaggerSpec => {
  const docsDir = path.resolve(__dirname, "../docs");
  let spec: SwaggerSpec = {
    openapi: "3.0.0",
    info: {},
    servers: [],
    paths: {},
    components: { schemas: {} },
  };

  // 재귀적으로 디렉토리 탐색
  const readDirectory = (dir: string) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        // 디렉토리인 경우 재귀적으로 탐색
        readDirectory(filePath);
      } else if (fileStat.isFile() && file.endsWith(".yaml")) {
        // YAML 파일인 경우만 처리
        const fileContent = fs.readFileSync(filePath, "utf8");
        const yamlData: any = YAML.load(fileContent);

        spec = _.merge({}, spec, yamlData);
      }
    });
  };

  // 디렉토리 탐색 시작
  readDirectory(docsDir);

  return spec;
};
