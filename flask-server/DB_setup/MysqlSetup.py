import mysql.connector
import os


class MysqlSetup:
    def MysqlFileRun(file_name):
        script_dir = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(script_dir, file_name)

        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
        )
        cursor = conn.cursor()

        fd = open(file_path, 'r')
        sqlFile = fd.read()
        fd.close()

        statements = sqlFile.strip().split(';')

        for statement in statements:
            if statement.strip() != '':
                try:
                    cursor.execute(statement)
                except mysql.connector.Error as e:
                    print(e)

        conn.commit()
        conn.close()

    MysqlFileRun('DB.sql')
    MysqlFileRun('tablesetup.sql')

