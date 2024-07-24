import client from "scp2";
import { Client } from "ssh2";

function projectName() {
  const [name] = process.cwd().split("/").reverse();
  return name;
}

const currentFolder = process.argv[2];
const targetFilePath = `/app/web/capell-saas-frontend/${projectName()}/dist`;

const sshConfig = {
  host: "10.10.101.71",
  username: "root",
  password: "xckj123456",
};

function executeRemoteCommand(sshConfig, command) {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn
      .on("ready", () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            reject(err);
            return;
          }

          let output = "";
          let stderr = "";

          stream
            .on("close", () => {
              conn.end();
              resolve(output);
            })
            .on("data", (data) => {
              output += data.toString();
            })
            .stderr.on("data", (data) => {
              // 处理服务器输出
              stderr += data.toString();
            });
        });
      })
      .on("error", (err) => {
        reject(err);
      })
      .connect(sshConfig);
  });
}

console.log("上传文件中...");

await client.scp(
  `${process.cwd()}/${currentFolder}`,
  { ...sshConfig, path: targetFilePath },
  (err) => {
    if (!err) {
      console.log("文件上传成功");
      executeRemoteCommand(sshConfig, "/app/nginx/sbin/nginx -s reload")
        .then(() => {
          console.log("nginx 重启成功");
        })
        .catch((err) => {
          console.error("发生错误：", err);
        });
    } else {
      console.error(err);
    }
  }
);
