# 使用官方 Python 运行时作为父镜像
FROM python:3.10

# 设置工作目录为 /app
WORKDIR /app

# 将当前目录内容复制到位于 /app 的容器中
COPY . /app

# 安装 requirements.txt 中的所有依赖
RUN pip install --no-cache-dir -r requirements.txt

# 使端口 5000 可供此容器外的环境使用
EXPOSE 5000

# 定义环境变量
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# 运行 app.py 当容器启动时
CMD ["flask", "run"]
