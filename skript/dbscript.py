import pandas as pd
import psycopg2

# 读取包含德语翻译的 CSV 文件
csv_file_path = '../Prototype/processed_lemmas_60k_with_translation.csv'
df = pd.read_csv(csv_file_path)

# 建立数据库连接
connection = psycopg2.connect(user="postgres",
                              password="472372239",
                              host="localhost",
                              port="5432",
                              database="users")
cursor = connection.cursor()

# 将DataFrame中的数据导入到数据库表中
record_to_insert = df[['description_de', 'lemma', 'kategorie', 'difficulty', 'discrimination']].values
newaufgaben = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s)", x).decode('utf-8') for x in record_to_insert)
cursor.execute(
    "INSERT INTO aufgaben (aufgabenstellung, musterloesung, kategorie, schwerigkeit, discrimination) VALUES " + newaufgaben)

# 提交更改
connection.commit()
count = cursor.rowcount
print(count, "Record inserted successfully into aufgaben table")

# 关闭游标和连接
cursor.close()
connection.close()
