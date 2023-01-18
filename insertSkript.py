import psycopg2
import random

try:
    connection = psycopg2.connect(user="postgres",
                                  password="472372239",
                                  host="localhost",
                                  port="5432",
                                  database="users")
    cursor = connection.cursor()

    # postgres_insert_query = """ INSERT INTO aufgaben (aufgabenstellung, musterloesung, kategorie, schwerigkeit) VALUES %s"""

    # 这下面开始改条件语句 和 循环
    record_to_insert = []
    # for i in range(1,11):
    #     for j in range(1,11):
    #       k=(i-1)*10+j-1
    #       record_to_insert.append(((i-1)*10+j, str(i-1)+'+'+str(j-1), str(k),'Mathematik', 1))

    for i in range(1, 101):

        r = random.randint(1, 2)
        if r == 1:
            a = random.randint(0, 9)
            b = random.randint(0, 9)
            k = a + b
            record_to_insert.append((str(a) + '+' + str(b), str(k), 'Mathematik', 1))
        if r == 2:
            a = random.randint(0, 9)
            b = random.randint(0, a)
            k = a - b
            record_to_insert.append((str(a) + '-' + str(b), str(k), 'Mathematik', 1))

            # stufe 2 here  100 +-  10*

    for i in range(1, 101):

        r = random.randint(1, 3)
        if r == 1:
            a = random.randint(10, 99)
            b = random.randint(10, 99)
            k = a + b
            record_to_insert.append((str(a) + '+' + str(b), str(k), 'Mathematik', 2))
        if r == 2:
            a = random.randint(10, 99)
            b = random.randint(0, a)
            k = a - b
            record_to_insert.append((str(a) + '-' + str(b), str(k), 'Mathematik', 2))

        if r == 3:
            a = random.randint(0, 9)
            b = random.randint(0, 9)
            k = a * b
            record_to_insert.append((str(a) + 'x' + str(b), str(k), 'Mathematik', 2))

            # stufe 3 100 *
    for i in range(1, 101):
        a = random.randint(10, 99)
        b = random.randint(10, 99)
        k = a * b
        record_to_insert.append((str(a) + 'x' + str(b), str(k), 'Mathematik', 3))

        # class 4 divi innerhalbs 100

    for i in range(0, 100):
        a = random.randint(0, 99)
        b = random.randint(1, 99)
        k = round(a / b, 2)
        record_to_insert.append((str(a) + ' divide ' + str(b), str(k), 'Mathematik', 4))

    # class 5 mix operation add multi minus

    for i in range(0, 100):
        r = random.randint(1, 4)
        if r == 1:
            a = random.randint(0, 99)
            b = random.randint(0, 99)
            c = random.randint(0, 99)
            d = random.randint(0, min(99, a * b + c))
            k = a * b + c - d
            record_to_insert.append((str(a) + 'x' + str(b) + '+' + str(c) + '-' + str(d), str(k), 'Mathematik', 5))
        if r == 2:
            a = random.randint(0, 99)
            b = random.randint(1, a)
            c = random.randint(0, a // b)
            d = random.randint(0, 99)
            k = a - b * c + d
            record_to_insert.append((str(a) + '-' + str(b) + 'x' + str(c) + '+' + str(d), str(k), 'Mathematik', 5))
        if r == 3:
            a = random.randint(0, 99)
            b = random.randint(0, 99)
            c = random.randint(0, 99)
            d = random.randint(0, min(a, b, c))
            k = a + b * c - d
            record_to_insert.append((str(a) + '+' + str(b) + 'x' + str(c) + '-' + str(d), str(k), 'Mathematik', 5))
        if r == 4:
            a = random.randint(0, 99)
            b = random.randint(0, 99)
            c = random.randint(0, min(99, a * b))
            d = random.randint(0, 99)
            k = a * b - c + d
            record_to_insert.append((str(a) + 'x' + str(b) + '-' + str(c) + '+' + str(d), str(k), 'Mathematik', 5))

    newaufgaben = ','.join(cursor.mogrify("(%s,%s,%s,%s)", x).decode('utf-8') for x in record_to_insert)
    cursor.execute(
        "INSERT INTO aufgaben (aufgabenstellung, musterloesung, kategorie, schwerigkeit) VALUES " + newaufgaben)

    # 改上面
    connection.commit()
    count = cursor.rowcount
    print(count, "Record inserted successfully into mobile table")

except (Exception, psycopg2.Error) as error:
    print("Failed to insert record into mobile table", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
