import fs from "fs-extra";
import inquirer from "inquirer";

// Sử dụng inquirer để hỏi người dùng về định dạng tên mới cho các file
inquirer
  .prompt([
    {
      type: "input",
      name: "newFileNameFormat",
      message: "Nhập định dạng tên mới cho các file:",
    },
    {
      type: "input",
      name: "folderPath",
      message: "Nhập đường dẫn thư mục chứa các file:",
    },
  ])
  .then((answers) => {
    const newFileNameFormat = answers.newFileNameFormat;
    const folderPath = answers.folderPath;

    // Đọc danh sách các file trong thư mục
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      // Duyệt qua từng file và thay đổi tên
      files.forEach((file) => {
        const oldPath = `${folderPath}/${file}`;
        const newPath = `${folderPath}/${newFileNameFormat}${file}`;

        // Sử dụng fs.rename để thay đổi tên file
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(`Error renaming file ${file}:`, err);
          } else {
            console.log(`Renamed file: ${file} -> ${newFileNameFormat}${file}`);
          }
        });
      });
    });
  });
