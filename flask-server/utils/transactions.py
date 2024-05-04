from wtforms import Form, validators, StringField, FloatField, IntegerField, DateField, SelectField


class IssueBook(Form):
    book_id = SelectField('Book ID', choices=[])
    customer_id = SelectField('Member ID', choices=[])
    per_day_fee = FloatField('Per Day Renting Fee', [
                             validators.NumberRange(min=1)])


class ReturnBook(Form):
    amount_paid = FloatField('Amount Paid', [validators.NumberRange(min=0)])
