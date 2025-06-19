# 淄博技师学院耗材信息管理系统
这个项目是淄博技师学院的耗材管理系统的前端程序
## 技术栈
- Vue3
- Vite
- Element Plus
- Pinia
- Axios
- Echarts
- Vue Router
- 文心一言
- chatgpt

## 运行项目
1. 克隆项目到本地
    ```bash
    git clone http://192.168.113.82/bourbon/hhhhh.git
    ```
    2. 进入项目目录
    ```bash
    cd hhhhh
    ```
    3. 安装依赖
    ```bash
    npm install
    ```
    4. 启动项目
    ```bash
    npm run dev
    ```
    5. 打开浏览器访问 `http://localhost:5173/`
    ## 打包项目
    1. 打包项目
    ```bash
    npm run build
    ```
    2. 打包后的文件在 `dist` 目录下
    3. 将 `dist` 目录下的文件上传到服务器的根目录
    4. 在服务器上运行以下命令
    ```bash
    npm install -g serve
    serve -s dist
    ```
    5. 打开浏览器访问服务器的 IP 地址
  ## 功能
  - 登录功能
  - 耗材信息管理
  - 耗材出入库管理
  - 耗材报表导出
  - 耗材信息搜索
  ## 贡献
如果你想为这个项目贡献代码，请先 Fork 这个项目，然后在本地修改代码，最后提交 Pull Request。
## 什么是顶级微操
顶级微操是指对代码的精细操作，更改一段，或一个参数，使得代码运行更高效或更符合预期。顶级微操可以包括优化算法、改进数据结构、减少不必要的计算等。
禁止使用顶级微操来修改代码的功能或逻辑，除非你非常确定这样做不会引入新的问题。
当每次修改处大于10次时，禁止使用顶级微操作为提交消息
## 许可证
这个项目使用 MIT 许可证，详细信息请查看 [LICENSE](LICENSE) 文件。

