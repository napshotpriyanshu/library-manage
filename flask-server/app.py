from config import app, mysql
from DB_setup.MysqlSetup import MysqlSetup
from flask import Flask, jsonify, request, flash, redirect, url_for
import MySQLdb
from datetime import datetime

from utils import AddCustomer,AddBook,IssueBook,ReturnBook
@app.route('/booklist', methods=['GET'])
def booklist():
    cur = mysql.connection.cursor()

    result = cur.execute(
        "SELECT id,title,author FROM Books"
    )
    books = cur.fetchall()
    print(jsonify(books))

    cur.close()

    if result > 0:
        return jsonify(books)
    else:
        msg = 'No Books Found'
        return msg



@app.route('/book/<string:id>', methods=['GET'])
def viewBook(id):
    cur = mysql.connection.cursor()

    result = cur.execute("SELECT * FROM Books WHERE id=%s", [id])
    book = cur.fetchone()

    cur.close()

    # Render Template
    if result > 0:
        return jsonify(book)
    else:
        msg = 'This Book Does Not Exist'
        return msg


@app.route('/create_book', methods=['POST'])
def create_book():

    form = AddBook(request.form)


    if form.validate():

        cur = mysql.connection.cursor()

        result = cur.execute(
            "SELECT id FROM Books WHERE id=%s", [form.id.data])

        book = cur.fetchone()
        print(form.isbn13.data)
        if book:
            error = 'Book with that ID already exists'
            return "form"

        # Execute SQL Query
        cur.execute(
            "INSERT INTO Books (id,title,author,average_rating,isbn,isbn13,total_quantity,available_quantity) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            [
                form.id.data,
                form.title.data,
                form.author.data,
                form.average_rating.data,
                form.isbn.data,
                form.isbn13.data,
                # form.language_code.data,
                # form.num_pages.data,
                # form.ratings_count.data,
                # form.text_reviews_count.data,
                # form.publication_date.data,
                # form.publisher.data,
                form.total_quantity.data,
                # # When a book is first added, available_quantity = total_quantity
                form.total_quantity.data
            ])


        # Commit to DB
        mysql.connection.commit()

        # Close DB Connection
        cur.close()

        # Flash Success Message
        flash("New Book Added", "success")

        # Redirect to show all books
        return 'books'

        # To handle GET request to route
    return "hello some error"

# @app.route('/edit_book/<string:id>', methods=['POST'])
# def edit_book(id):
#     # Get form data from request
#     form = AddBook(request.form)
#
#     # Create MySQLCursor
#     cur = mysql.connection.cursor()
#
#     # To get existing values of selected book
#     result = cur.execute("SELECT * FROM Books WHERE id=%s", [id])
#     book = cur.fetchone()
#
#     # To handle POST request to route
#     if form.validate():
#         # Check if book with same ID already exists (if ID field is being edited)
#         if(form.id.data != id):
#             result = cur.execute(
#                 "SELECT id FROM Books WHERE id=%s", [form.id.data])
#             book = cur.fetchone()
#             if book:
#                 error = 'Book with that ID already exists'
#                 return error
#
#         # Calculate new available_quantity (No. of books available to be rented)
#         available_quantity = book['available_quantity'] + \
#             (form.total_quantity.data - book['total_quantity'])
#
#         # Execute SQL Query
#         cur.execute("UPDATE Books SET id=%s,title=%s,author=%s,average_rating=%s,isbn=%s,isbn13=%s WHERE id=%s", [
#             form.id.data,
#             form.title.data,
#             form.author.data,
#             form.average_rating.data,
#             form.isbn.data,
#             form.isbn13.data,
#             id])
#
#         # Commit to DB
#         mysql.connection.commit()
#
#         # Close DB Connection
#         cur.close()
#
#         # Flash Success Message
#         flash("Book Updated", "success")
#
#         # Redirect to show all books
#         return 'books'
#
#     # To handle GET request to route
#     # To render edit book form
#     return 'edit_book'


@app.route('/delete_book/<string:id>', methods=['DELETE'])
def delete_book(id):
    cur = mysql.connection.cursor()

    # Since deleting parent row can cause a foreign key constraint to fail
    try:
        # Execute SQL Query
        cur.execute("DELETE FROM Books WHERE id=%s", [id])

        # Commit to DB
        mysql.connection.commit()
    except (MySQLdb.Error, MySQLdb.Warning) as e:

        print(e)
        # Flash Failure Message
        flash("Book could not be deleted", "danger")
        flash(str(e), "danger")

        # Redirect to show all members
        return 'books not deleted could be in trasaction'
    finally:
        # Close DB Connection
        cur.close()

    # Flash Success Message
    flash("Book Deleted", "success")

    # Redirect to show all books
    return 'books'


@app.route('/customer', methods=['GET'])
def customer():
    # Create MySQLCursor
    cur = mysql.connection.cursor()

    # Execute SQL Query
    result = cur.execute("SELECT * FROM customer")
    customers = cur.fetchall()
    print(customers)
    cur.close()

    # Render Template
    if result > 0:
        return jsonify(customers)
    else:
        msg = 'No Members Found'
        return msg


@app.route('/customer/<string:id>')
def viewCustomerr(id):

    cur = mysql.connection.cursor()

    # Execute SQL Query
    result = cur.execute("SELECT * FROM customer WHERE id=%s", [id])
    customer_details = cur.fetchone()

    cur.close()
    # Render Template
    if result > 0:
        return customer_details
    else:
        msg = 'This Member Does Not Exist'
        return msg


@app.route('/add_customer', methods=['POST'])
def add_customer():
    # Get form data from request
    form = AddCustomer(request.form)

    # To handle POST request to route
    if form.validate():
        name = form.name.data
        email = form.email.data

        # Create MySQLCursor
        cur = mysql.connection.cursor()
        print(name)
        # Execute SQL Query
        cur.execute(
            "INSERT INTO customer (name, email) VALUES (%s, %s)", (name, email))

        # Commit to DB
        mysql.connection.commit()

        # Close DB Connection
        cur.close()

        # Flash Success Message
        flash("New Member Added", "success")

        # Redirect to show all members
        return 'succefull'


    return 'error'

@app.route('/edit_customer/<string:id>', methods=['POST'])
def edit_member(id):
    # Get form data from request
    form = AddCustomer(request.form)

    # To handle POST request to route
    if form.validate():
        name = form.name.data
        email = form.email.data

        # Create MySQLCursor
        cur = mysql.connection.cursor()

        # Execute SQL Query
        cur.execute(
            "UPDATE customer SET name=%s, email=%s WHERE id=%s", (name, email, id))

        # Commit to DB
        mysql.connection.commit()

        # Close DB Connection
        cur.close()

        # Flash Success Message
        flash("customer Updated", "success")

        # Redirect to show all members
        return 'customer'

    # To handle GET request to route

    # # To get existing field values of selected member
    # cur2 = mysql.connection.cursor()
    # result = cur2.execute("SELECT name,email FROM members WHERE id=%s", [id])
    # member = cur2.fetchone()
    # # To render edit member form
    # return edit_member

@app.route('/delete_customer/<string:id>', methods=['DELETE'])
def delete_member(id):

    # Create MySQLCursor
    cur = mysql.connection.cursor()
    # Since deleting parent row can cause a foreign key constraint to fail
    try:
        # Execute SQL Query
        cur.execute("DELETE FROM customer WHERE id=%s", [id])

        # Commit to DB
        mysql.connection.commit()
    except (MySQLdb.Error, MySQLdb.Warning) as e:
        print(e)
        # Flash Failure Message
        flash("Member could not be deleted", "danger")
        flash(str(e), "danger")

        # Redirect to show all members
        return 'member not deleted'
    finally:
        # Close DB Connection
        cur.close()

    # Flash Success Message
    flash("Member Deleted", "success")
    return 'member deleted'


@app.route('/transactions', methods=['GET'])
def transactions():
    # Create MySQLCursor
    cur = mysql.connection.cursor()

    # Execute SQL Query
    result = cur.execute("SELECT * FROM transactions")
    transactions = cur.fetchall()
    cur.close()

    # To handle empty fields
    for transaction in transactions:
        for key, value in transaction.items():
            print(key, value)
            if value is None:
                transaction[key] = "-"

    if result > 0:
        return jsonify(transactions)
    else:
        msg = 'No Transactions Found'
        return msg

@app.route('/book_issue', methods=['POST'])
def book_issue():
    form = IssueBook(request.form)

    cur = mysql.connection.cursor()

    cur.execute("SELECT id, title FROM Books")
    books = cur.fetchall()

    books_list=[]

    for book in books:
        temp =(book['id'], book['title'])
        books_list.append(temp)

    cur.execute("SELECT id, name FROM customer")
    customers = cur.fetchall()
    customers_list=[]

    for customer in customers:
        temp =(customer['id'], customer['name'])
        customers_list.append(temp)

    form.book_id.choices = books_list
    form.customer_id.choices = customers_list

    if form.validate():
        cur.execute("SELECT available_quantity FROM Books WHERE id=%s", [
            form.book_id.data])
        result = cur.fetchone()
        print(result)
        available_quantity = result['available_quantity']

        # Check if book is available to be rented/issued
        if (available_quantity < 1):
            error = 'No copies of this book are availabe to be rented'
            return error

        # Execute SQL Query to create transaction
        cur.execute("INSERT INTO transactions (book_id,customer_id,per_day_fee) VALUES (%s, %s, %s)", [
            form.book_id.data,
            form.customer_id.data,
            form.per_day_fee.data,
        ])

        # Update available quantity, rented count of book
        cur.execute(
            "UPDATE Books SET available_quantity=available_quantity-1, rented_count=rented_count+1 WHERE id=%s",
            [form.book_id.data])

        # Commit to DB
        mysql.connection.commit()

        # Close DB Connection
        cur.close()
        # Flash Success Message
        flash("Book Issued", "success")

        # Redirect to show all transactions
        return 'transactions'

@app.route('/return_book/<string:transaction_id>', methods=['POST'])

def return_book(transaction_id):

    form = ReturnBook(request.form)
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM transactions WHERE id=%s", [transaction_id])
    transaction = cur.fetchone()

    date = datetime.now()
    diff = date - transaction["borrowed_on"]
    diff = diff.days

    total_charge = diff * transaction['per_day_fee']
    print(form.amount_paid)

    if form.validate():
        transaction_debt = total_charge - form.amount_paid.data

        cur.execute("SELECT outstanding_debt, amount_spent FROM customer WHERE id=%s", [transaction['customer_id']])

        result = cur.fetchone()
        outstanding_debt, amount_spent = result['outstanding_debt'], result['amount_spent']

        if outstanding_debt+amount_spent > 500:
            error = 'Outstanding debt is more than 500'
            return error

        cur.execute("UPDATE transactions SET returned_on=%s, total_charge=%s, amount_paid=%s WHERE id=%s", [
            date,
            total_charge,
            form.amount_paid.data,
            transaction_id
        ])

        cur.execute("UPDATE customer SET outstanding_debt=%s, amount_spent=%s WHERE id=%s", [
            outstanding_debt+transaction_debt,
            amount_spent+form.amount_paid.data,
            transaction['customer_id']
        ])

        cur.execute("UPDATE Books SET available_quantity=available_quantity+1 WHERE id=%s", [transaction['book_id']])

        mysql.connection.commit()
        cur.close()

        flash("book returned", "success")
        return "book returned"

    return "over"


if __name__ == '__main__':

    MysqlSetup
    app.run(debug=True)